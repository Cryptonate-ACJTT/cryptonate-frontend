import React from "react";
import './SignUpLogin.css'

const Login = (props) => {

    return (
        <div class="sign-up-screen">
            <div class="login-container">
                <h class="log-in" onClick = "" >LOGIN</h>
                <h class="empty-space"></h>
                <h class="sign-up" onClick = "" >SIGN UP</h>
            </div>
            <div class="overlap-group">

                <div class="email">EMAIL</div>
                <input class="email-input"></input>
                <div class="password">PASSWORD</div>
                <input class="password-input"></input>

                <div class="flex-row-2">
                    <div class="are-you-an-organization">Forgot Password?</div>
                </div>
                <div class="overlap-group1">
                    <div class="sign-up-button">SIGN UP</div>
                </div>
            </div>
        </div>

    );
}

export default SignUpLogin;