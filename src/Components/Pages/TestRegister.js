import React from "react";
import { useContext } from 'react';
import AuthContext from '../../auth'

export default function TestRegister() {
    const { auth } = useContext(AuthContext);


    //console.log(AuthContext)
    const handleSubmit = (event) => {
        console.log("submit pressed")
        event.preventDefault();
        const formData = new FormData(event.target);
        // eslint-disable-next-line no-console
        console.log({
          userName: formData.get('uname'),
          password: formData.get('password'),
          role: 'donor'
        });

        // auth.registerUser({
        //     userName: formData.get('userName'),
        //     email: formData.get('email'),
        //     password: formData.get('password'),
        //     role: 'donor'
        // });
        auth.loginUser({
          username: formData.get('uname'),
          password: formData.get('password'),
          role: 'donor'
        })
    }  

    return (
        <div className="form" onSubmit={handleSubmit}>
                <form>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" id="uname" name="uname"/>
                </div>
                {/* <div className="input-container">
                    <label>Email </label>
                    <input type="text" id="email" name="email"/>
                </div> */}
                <div className="input-container">
                    <label>Password </label>
                    <input type="text" id="password" name="password" />
                    
                </div>
                <div className="button-container">
                    <input type="submit" value="Submit!"/>
                </div>
                </form>
        </div>
    )

}