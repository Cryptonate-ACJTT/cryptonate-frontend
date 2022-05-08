import React, { useContext, useEffect, useState } from "react";
import Alert from '@mui/material/Alert'
import './SignUpLogin.css'
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, signUpUser } from "../../Fetch/ApiFetches";
import { FormControlLabel, FormGroup, Checkbox, Typography, Button, Box, Tab, TextField } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';

import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";

//import SignUpLoginSlice, { CATEGORIES, reducerFxns} from "../../Redux/Slices/SignUpSlice"
//import { registerUser } from "./UserAction.js";

const SignUpLogin = (props) => {
    const slice = UserSlice.useSlice();

    useEffect(() => {
        return UserSlice.unsubscribe();
    })

    const navigate = useNavigate();


    const [loginTabClicked, toggleLoginTabClicked] = useState(false);
    const [loginErrorOccured, toggleLoginErrorOccured] = useState(false);
    const [signupErrorOccured, toggleSignupErrorOccured] = useState(false);

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [UserName, setName] = useState("");
    const [ConfirmPasword, setConfirmPasword] = useState("");
    const [Role, setRole] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")


    const onEmailHandler = (e) => { setEmail(e.currentTarget.value); };

    const onUserNamerHandler = (e) => { setName(e.currentTarget.value); };

    const onPasswordHanlder = (e) => { setPassword(e.currentTarget.value); };

    const onRoleSwitch = (e) => { setRole(e.currentTarget.checked); }

    const onConfirmPasswordHandler = (e) => { setConfirmPasword(e.currentTarget.value); };


    const location = useLocation;

    const from = location.state?.from?.pathname || "/";

    /**
     * Handles clicking between tabs
     * @param {*} e 
     */
    const handleTabSwitch = () => {
        if (loginTabClicked) {
            toggleLoginTabClicked(false);
        } else {
            toggleLoginTabClicked(true);
        }
    }


    /**
     * Intercepts new user and passes to backend
     * @param {*} e 
     */
    const SignUpHandler = (e) => {
        e.preventDefault();

        console.log(Role ? "organization" : "donor");

        if (ConfirmPasword !== Password) {
            toggleLoginErrorOccured(true)
            setErrorMsg("Passwords does not match.")
        } else {

            signUpUser(Email, UserName, Password, Role ? "organization" : "donor", {
                callback: (data) => {
                    userReducers.userLoginFxn(data.user);
                    navigate("/profile", { replace: true });
                }
                , resHandler: async (response) => {
                    if (response.ok) {
                        return await response.json()
                    } else {
                        const signUpError = await response.json();
                        setErrorMsg(signUpError.msg)
                        toggleSignupErrorOccured(true)
                        return Promise.reject(response.status);
                    }
                }
            });
        }
    };

    /**
     * Intercepts login click and passes to backend
     * @param {*} e 
     */
    const LoginHandler = (e) => {
        e.preventDefault();

        loginUser(Email, UserName, Password, Role ? "organization" : "donor", {
            callback: (data) => {
                userReducers.userLoginFxn(data.user);
                navigate("/profile", { replace: true });
            }
            , resHandler: async (response) => {
                if (response.ok) {
                    return await response.json()
                } else {
                    const loginError = await response.json();
                    setErrorMsg(loginError.msg)
                    toggleLoginErrorOccured(true)
                    return Promise.reject(response.status);
                }

            }
        });
    };

    const [value, setValue] = useState('login')
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="basic-div basic-form">

            <Box sx={{ display: 'contents', width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box >
                        <TabList onChange={handleChange} centered aria-label="lab API tabs example">
                            <Tab sx={{ fontSize: 'xx-large' }} label="LOGIN" value="login" />
                            <Tab sx={{ fontSize: 'xx-large' }} label="SIGN UP" value="signup" />
                        </TabList>
                    </Box>
                    <div className="signup-login-group basic-group">

                        <TabPanel value="login">
                            {loginErrorOccured ?
                                <Alert severity="error">{errorMsg}</Alert> : <></>
                            }
                            <form
                                onSubmit={LoginHandler}
                                style={{ display: "flex", flexDirection: "column" }}>
                                <TextField label="Email" variant="standard" type="email" value={Email} onChange={onEmailHandler} sx={{ margin: '10px' }} />
                                <TextField label="Password" variant="standard" type="password" value={Password} onChange={onPasswordHanlder} sx={{ margin: '10px' }} />
                                <br />
                                <Button variant="contained" type="submit">Login</Button>
                            </form>


                        </TabPanel>
                        <TabPanel value="signup">
                            {signupErrorOccured ?
                                <Alert severity="error">{errorMsg}</Alert> : <></>
                            }
                            <form
                                onSubmit={SignUpHandler}
                                style={{ display: "flex", flexDirection: "column" }}>

                                <TextField label="Email" variant="standard" type="email" value={Email} onChange={onEmailHandler} sx={{ margin: '10px' }} />
                                <TextField label="User Name" variant="standard" type="test" value={UserName} onChange={onUserNamerHandler} sx={{ margin: '10px' }} />
                                <TextField label="Password" variant="standard" type="password" value={Password} onChange={onPasswordHanlder} sx={{ margin: '10px' }} />
                                <TextField label="Confirm Password" variant="standard" type="password" value={ConfirmPasword} onChange={onConfirmPasswordHandler}  sx={{ margin: '10px' }}/>
                                  
                                <FormControlLabel control={<Checkbox onChange={onRoleSwitch} />} label="Are you an organization?" labelPlacement="start" sx={{alignSelf:'center', marginRight:'0'}}/>
                                <br />
                                <Button variant="contained" type="submit">Sign Up</Button>
                            </form>


                        </TabPanel>
                    </div>

                </TabContext>
            </Box>

        </div>
    );
}

export default SignUpLogin;

