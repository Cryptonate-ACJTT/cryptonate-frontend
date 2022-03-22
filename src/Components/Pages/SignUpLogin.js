import React, { useState } from "react";
import './SignUpLogin.css'
const SignUpLogin = (props) => {

    const [loginTabClicked, toggleLoginTabClicked] = useState(false);
    const [signUpTabClicked, toggleSignUpTabClicked] = useState(true);

    const handleLoginTabClicked = async (e) => {

        if (loginTabClicked) {
            toggleSignUpTabClicked(false);
            console.log("LOGIN CLICKED")
        }
        else {
            toggleLoginTabClicked(true);
        }
    }

    const handleSignUpTabClicked = async (e) => {

        if (signUpTabClicked) {
            toggleLoginTabClicked(false);
        }
        else {
            toggleSignUpTabClicked(true);
        }
    }

    if (signUpTabClicked) {
        return (
            <div class="sign-up-login-screen">

                <div id="signup">
                    <div class="tab-container">
                        <h id="login-tab" class="not-active" onClick={handleLoginTabClicked} ><a href="#login">LOGIN</a></h>
                        <h id="signup-tab" class="active" onClick={handleSignUpTabClicked}> <a href="#signup">SIGN UP</a></h>
                    </div>

                    <div class="signup-group">

                        <div class="user-name">USER NAME</div>
                        <input class="user-name-input"></input>
                        <div class="email">EMAIL</div>
                        <input class="email-input"></input>
                        <div class="password">PASSWORD</div>
                        <input class="password-input" type="password"></input>

                        <div class="question-container">
                            <div class="are-you-an-organization">Are you an organization?</div>
                            <input type="checkbox" class="rectangle-7"></input>
                        </div>

                        <div class="button-group">
                            <div class="sign-up-button">SIGN UP</div>
                        </div>
                    </div>
                </div>
            </div>);
    }
    else if (loginTabClicked) {
        return (
            <div class="sign-up-login-screen">

                <div id="login" >

                    <div class="tab-container">
                        <h id="login-tab" class="active" onClick={handleLoginTabClicked} ><a href="#login">LOGIN</a></h>
                        <h id="signup-tab" class="not-active" onClick={handleSignUpTabClicked} > <a href="#signup">SIGN UP</a></h>
                    </div>

                    <div class="login-group">

                        <div class="email">EMAIL</div>
                        <input class="email-input"></input>
                        <div class="password">PASSWORD</div>
                        <input class="password-input"></input>

                        <div class="forgot-password">Forgot password?</div>

                        <div class="button-group">
                            <div class="sign-up-button">LOGIN</div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }



}




export default SignUpLogin;