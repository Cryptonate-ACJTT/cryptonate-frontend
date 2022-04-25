import React, { useContext, useEffect, useState } from "react";
import './SignUpLogin.css'
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, signUpUser } from "../../Fetch/ApiFetches";

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
	
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [UserName, setName] = useState("");
	const [ConfirmPasword, setConfirmPasword] = useState("");
	const [Role, setRole] = useState(false);

	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onUserNamerHandler = (e) => {
		setName(e.currentTarget.value);
	};

	const onPasswordHanlder = (e) => {
		setPassword(e.currentTarget.value);
	};

	const onRoleSwitch = (e) => {
		setRole(e.currentTarget.checked);
	}
/*
	let state = {
		isDonor: "donor",
		isOrg: "organization"
	};
*/
	const onConfirmPasswordHandler = (e) => {
		setConfirmPasword(e.currentTarget.value);
	};


	const location = useLocation;
	
	const from = location.state?.from?.pathname || "/";

	/**
	 * Handles clicking between tabs
	 * @param {*} e 
	 */
	const handleTabSwitch = () => {
		if(loginTabClicked) {
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
		
		signUpUser(Email, UserName, Password, Role ? "organization" : "donor", {callback: (data) => {
			userReducers.userLoginFxn(data.user);
			navigate("/profile", {replace: true});
		}});
	};

	/**
	 * Intercepts login click and passes to backend
	 * @param {*} e 
	 */
	const LoginHandler = (e) => {
		e.preventDefault();

		loginUser(Email, UserName, Password, Role ? "organization" : "donor", {callback: (data) => {
			userReducers.userLoginFxn(data.user);
			navigate("/profile", {replace: true});
		}});
	};

  if (!loginTabClicked) {

    return (
      <div className="basic-div basic-form">

        <div id="signup">
          <div className="tab-container">
            <p id="login-tab" className="basic-tab not-active" onClick={handleTabSwitch} >LOGIN</p>
            <p id="signup-tab" className="basic-tab active" onClick={handleTabSwitch}> SIGN UP</p>
          </div>
          
          <div className="signup-login-group basic-group">

            <form
              onSubmit={SignUpHandler}
              style={{ display: "flex", flexDirection: "column" }}>
              <label>Email</label>
              <input type="email" value={Email} onChange={onEmailHandler} />

              <label>UserName</label>
              <input type="test" value={UserName} onChange={onUserNamerHandler} />

              <label>Password</label>
              <input type="password" value={Password} onChange={onPasswordHanlder} />

              <label>ConfirmPasword</label>
              <input
                type="password"
                value={ConfirmPasword}
                onChange={onConfirmPasswordHandler}
              />
              <div className="question-container">
                <div className="are-you-an-organization">Are you an organization?</div>
                <input type="checkbox" onChange={onRoleSwitch}/>

              </div>
              <br />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>);
  }
  else {
    return (
      <div className="basic-div basic-form">

        <div id="login" >

          <div className="tab-container">
            <p className="basic-tab active" onClick={handleTabSwitch} >LOGIN</p>
            <p className="basic-tab not-active" onClick={handleTabSwitch} >SIGN UP</p>
          </div>

          <div className="signup-login-group basic-group">

            <form
              onSubmit={LoginHandler}
              style={{ display: "flex", flexDirection: "column" }}>
              <label>Email</label>
              <input type="email" value={Email} onChange={onEmailHandler} />



              <label>Password</label>
              <input type="password" value={Password} onChange={onPasswordHanlder} />


              <br />
				<button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpLogin;
