import React, { useContext, useState } from "react";
import './SignUpLogin.css'

const SignUpLogin = (props) => {

    const [loginTabClicked, toggleLoginTabClicked] = useState(false);
    const [signUpTabClicked, toggleSignUpTabClicked] = useState(false);


    const handleLoginTabClicked = async (e) => {

        toggleSignUpTabClicked(false);
        toggleLoginTabClicked(true);
    }

    const handleSignUpTabClicked = async (e) => {

        toggleLoginTabClicked(false);
        toggleSignUpTabClicked(true);
    }



    const validEmail = (value) => {
        if (!isEmail(value)) {
          return (
            <div className="alert alert-danger" role="alert">
              This is not a valid email.
            </div>
          );
        }
      };
      const vusername = (value) => {
        if (value.length < 3 || value.length > 20) {
          return (
            <div className="alert alert-danger" role="alert">
              The username must be between 3 and 20 characters.
            </div>
          );
        }
      };
      const vpassword = (value) => {
        if (value.length < 6 || value.length > 40) {
          return (
            <div className="alert alert-danger" role="alert">
              The password must be between 6 and 40 characters.
            </div>
          );
        }
      };
      const Register = () => {
        const form = useRef();
        const checkBtn = useRef();
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [successful, setSuccessful] = useState(false);
        const { message } = useSelector(state => state.message);
        const dispatch = useDispatch();
        const onChangeUsername = (e) => {
          const username = e.target.value;
          setUsername(username);
        };
        const onChangeEmail = (e) => {
          const email = e.target.value;
          setEmail(email);
        };
        const onChangePassword = (e) => {
          const password = e.target.value;
          setPassword(password);
        };
        const handleRegister = (e) => {
          e.preventDefault();
          setSuccessful(false);
          form.current.validateAll();
          if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, email, password))
              .then(() => {
                setSuccessful(true);
              })
              .catch(() => {
                setSuccessful(false);
              });
          }
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

                    <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

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

}


export default SignUpLogin;
