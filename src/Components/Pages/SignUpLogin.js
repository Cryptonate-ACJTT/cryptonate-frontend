import React, { useContext, useState } from "react";
import './SignUpLogin.css'
import { API_ROUTES, getFromBackend, postToBackend } from "../../Fetch/ApiFetches";
import { CONTENT_TYPES } from "../../Fetch/Fetcher";
//import SignUpLoginSlice, { CATEGORIES, reducerFxns} from "../../Redux/Slices/SignUpSlice"
//import { registerUser } from "./UserAction.js";

const SignUpLogin = (props) => {

    const [loginTabClicked, toggleLoginTabClicked] = useState(false);
    const [signUpTabClicked, toggleSignUpTabClicked] = useState(false);

    const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserName, setName] = useState("");
  const [ConfirmPasword, setConfirmPasword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onUserNamerHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };

  const onSubmitHandler1 = (e) => {
    e.preventDefault();
    

		let formData1 = new FormData(e.currentTarget);
		postToBackend(API_ROUTES.BACKEND.REGISTER_USER, formData1, {contentType: CONTENT_TYPES.FORM_DATA});
	}
  const onSubmitHandler = (e) => {
    e.preventDefault();
    

		let formData2 = new FormData(e.currentTarget);
		postToBackend(API_ROUTES.BACKEND.LOGIN_USER, formData2, {contentType: CONTENT_TYPES.FORM_DATA});
  }
    const handleLoginTabClicked = async (e) => {

        toggleSignUpTabClicked(false);
        toggleLoginTabClicked(true);
    }

    const handleSignUpTabClicked = async (e) => {

        toggleLoginTabClicked(false);
        toggleSignUpTabClicked(true);
    }

    if (signUpTabClicked || (!signUpTabClicked && !loginTabClicked)) {

        return (
            <div class="basic-div basic-form">

                <div id="signup">
                    <div class="tab-container">
                        <h id="login-tab" class="basic-tab not-active" onClick={handleLoginTabClicked} >LOGIN</h>
                        <h id="signup-tab" class="basic-tab active" onClick={handleSignUpTabClicked}> SIGN UP</h>
                    </div>

                    <div class="signup-login-group basic-group">

                    <form
        onSubmit={onSubmitHandler1}
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
        <br />
        <button type="submit">Sign Up</button>
      </form>
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

                    <form
        onSubmit={onSubmitHandler}
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

    } else {
		return null;
	}
    



}

export default SignUpLogin;

