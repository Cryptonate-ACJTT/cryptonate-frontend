import React from "react";
import './SignUpLogin.css'



const showLogin = (props) => {

    return (
        <div class="sign-up-screen">
            <div class="login-container">
                <h class="currently-clicked" >LOGIN</h>
                <h class="not-clicked" >SIGN UP</h>
            </div>
            <div class="login-group">

                <div class="email">EMAIL</div>
                <input class="email-input"></input>
                <div class="password">PASSWORD</div>
                <input class="password-input"></input>

                <div class="forgot-password">Forgot password?</div>

                <div class="overlap-group1">
                    <div class="sign-up-button">LOGIN</div>
                </div>
            </div>
        </div>

    );

}

const SignUpLogin = (props) => {

    return (
        <div class="sign-up-screen">
            <div class="login-container">
                <h class="not-clicked" onClick={() => showLogin()} >LOGIN</h>
                <h class="empty-space"></h>
                <h class="currently-clicked" >SIGN UP</h>
            </div>
            <div class="overlap-group">

                <div class="user-name">USER NAME</div>
                <input class="user-name-input"></input>
                <div class="email">EMAIL</div>
                <input class="email-input"></input>
                <div class="password">PASSWORD</div>
                <input class="password-input"></input>

                <div class="flex-row-2">
                    <div class="are-you-an-organization">Are you an organization?</div>
                    <input type="checkbox" class="rectangle-7"></input>
                </div>
                <div class="overlap-group1">
                    <div class="sign-up-button">SIGN UP</div>
                </div>
            </div>
        </div>

    );
}




export default SignUpLogin;