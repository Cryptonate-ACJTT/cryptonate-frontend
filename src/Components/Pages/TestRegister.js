import React from "react";


const handleSubmit = (event) => {
    console.log("submit pressed")
    event.preventDefault();
    const formData = new FormData(event.target);
    // eslint-disable-next-line no-console
    console.log({
      email: formData.get('email'),
      password: formData.get('password')
    });
}  



const TestRegister = (props) => {
    return (
    <div className="form" onSubmit={handleSubmit}>
            <form>
            <div className="input-container">
                <label>Email </label>
                <input type="text" id="email" name="email"/>
            </div>
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

export default TestRegister;