import React from "react";
import './SignUpLogin.css'


const Login = (props) => {

    return (

        <Link to="/login-signup/signup">
        <div id="login" >

                <div class="tab-container">
                    <h id="login-tab" class="active" onClick={() =>clickSignup} ><a href="#login">LOGIN</a></h>
                    <h id="signup-tab" class="not-active" > <a href="#signup">SIGN UP</a></h>
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
            </Link>
    );
}




export default Login;