import React, { useContext, useState } from "react";
import './SignUpLogin.css'
import { Link, Navigate, useLocation } from "react-router-dom";
import { API_ROUTES, getFromBackend, postToBackend } from "../../Fetch/ApiFetches";

import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";

//import SignUpLoginSlice, { CATEGORIES, reducerFxns} from "../../Redux/Slices/SignUpSlice"
//import { registerUser } from "./UserAction.js";

const SignUpLogin = (props) => {
	const slice = UserSlice.useSlice();


	const [loginTabClicked, toggleLoginTabClicked] = useState(false);
	const [signUpTabClicked, toggleSignUpTabClicked] = useState(false);
	
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [UserName, setName] = useState("");
	const [ConfirmPasword, setConfirmPasword] = useState("");
	const [Role, setRole] = useState("");
	
	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onUserNamerHandler = (e) => {
		setName(e.currentTarget.value);
	};

	const onPasswordHanlder = (e) => {
		setPassword(e.currentTarget.value);
	};
/*
	const onRoleHandler = (e) => {
		if (e.currentTarget.value == true){
			setRole(state.isOrg)
		}
		else{
			setRole(state.isDonor)
		}
	}
*/
const onRoleHandler = (e) => {
    const checked = e.target.checked;
    if (checked) {
		setRole(state.isOrg)
    } else {
		setRole(state.isDonor)
    }
  };
	let state = {
		isDonor: "donor",
		isOrg: "organization"
		
	};

	const onConfirmPasswordHandler = (e) => {
		setConfirmPasword(e.currentTarget.value);
	};

	const handleLoginTabClicked = async (e) => {

		toggleSignUpTabClicked(false);
		toggleLoginTabClicked(true);
	}
	const location = useLocation;
	
	const from = location.state?.from?.pathname || "/";

	const handleSignUpTabClicked = async (e) => {

		toggleLoginTabClicked(false);
		toggleSignUpTabClicked(true);
	}
	const SignUpHandler = (e) => {
		e.preventDefault();
		
		console.log(Email);
		console.log(Password);
		console.log(UserName);

		let body = {
			email: Email,
			password: Password,
			username: UserName,
			role : Role
		};

		postToBackend(API_ROUTES.BACKEND.REGISTER_USER, body,  {callback: (data) => {
			console.log(data);
		}});
	};

	const LoginHandler = (e) => {
		e.preventDefault();
		
		console.log( Email);
		console.log(Password);
		

		let body = {
			email: Email,
			password: Password,
			username: UserName,
			role: Role
		};



		// TODO: redirect from here to profile page
		postToBackend(API_ROUTES.BACKEND.LOGIN_USER, body, {callback: (data) => {
			userReducers.userLoginFxn(data.user);
		}});
		Navigate('/profile');
		slice.loggedin = true;
	};

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
              <div class="question-container">
                <div class="are-you-an-organization">Are you an organization?</div>
                <input  onClick={(e) => {
                                onRoleHandler(e);
                            }} type="checkbox"/>

              </div>
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

  } else {
    return null;
  }
}

export default SignUpLogin;
