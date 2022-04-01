import React, { useContext, useState } from "react";
import './SignUpLogin.css'
// import auth from '../auth/index.js'
// import store from '../../Redux/Store.js'
// import AuthContext from "../../auth";
// import GlobalStoreContext from "../../Redux/GlobalStoreContext";

const SignUpLogin = (props) => {

    const [loginTabClicked, toggleLoginTabClicked] = useState(false);
    const [signUpTabClicked, toggleSignUpTabClicked] = useState(false);
    // const { auth } = useContext(AuthContext);
    // const { store } = useContext(GlobalStoreContext);
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [role, setRole] = useState("");


    const handleLoginTabClicked = async (e) => {

        toggleSignUpTabClicked(false);
        toggleLoginTabClicked(true);
    }

    const handleSignUpTabClicked = async (e) => {

        toggleLoginTabClicked(false);
        toggleSignUpTabClicked(true);
    }

    // const handleLogin = (e) =>{
    //     e.preventDefault();
    //     auth.loginUser({
    //         email: email,
    //         password: password,
    //         role: role

    //     }, store)
    // }


    if (signUpTabClicked || (!signUpTabClicked && !loginTabClicked)) {

        return (
            <div class="basic-div basic-form">

                <div id="signup">
                    <div class="tab-container">
                        <h id="login-tab" class="basic-tab not-active" onClick={handleLoginTabClicked} >LOGIN</h>
                        <h id="signup-tab" class="basic-tab active" onClick={handleSignUpTabClicked}> SIGN UP</h>
                    </div>

                    <div class="signup-login-group basic-group">

                        <div class="user-name input-label">USER NAME</div>
                        <input class="basic-input"></input>
                        <div class="email input-label">EMAIL</div>
                        <input class="basic-input"></input>
                        <div class="password input-label">PASSWORD</div>
                        <input class="basic-input" type="password"></input>

                        <div class="question-container">
                            <div class="warning">Are you an organization?</div>
                            <input id="signup-checkbox" type="checkbox"></input>
                        </div>

                        <div class="button-group">
                            <div class="submit-button">SIGN UP</div>
                        </div>
                    </div>
                </div>
            </div>);
    }
    else if (loginTabClicked) {


        return (
            <div class="basic-div basic-form">

                <div id="login" >

                    <div class="tab-container">
                        <h class="basic-tab active" onClick={handleLoginTabClicked} >LOGIN</h>
                        <h class="basic-tab not-active" onClick={handleSignUpTabClicked} >SIGN UP</h>
                    </div>

                    <div class="signup-login-group basic-group">

                        <div class="email input-label">EMAIL</div>
                        <input class="basic-input"></input>
                        <div class="password input-label">PASSWORD</div>
                        <input class="basic-input"></input>

                        <div class="warning">Forgot password?</div>

                        <div class="button-group">
                            <div class="submit-button">LOGIN</div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
    



}




export default SignUpLogin;