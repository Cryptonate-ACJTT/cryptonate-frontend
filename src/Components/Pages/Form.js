import React from "react";
import "./Form.css";
import { Link } from 'react-router-dom'

// import login information?

const Form = (props) => {

    return (
        <div class="form-screen">
            <div class="form-container">
                <h class="information-form-title">Information Form for Authentication</h>
            </div>
            <div class="form-group">

                <div class="input-container">
                    <div class="input-tag-group">
                        <div>
                            <h>Organization's user name</h>
                            <h class="approve-tag">Approved</h>
                        </div>
                        <h class="input-tag">1. Organization Name*</h>
                        <h class="input-tag">2. Employment Identification Number*</h>
                        <h class="input-tag">3. Category*</h>
                        <h class="input-tag">4. Organization Email*</h>
                        <h class="input-tag">5. Organization Phone Number</h>
                        <h class="input-tag">6. Location</h>
                        <h class="input-tag">7. Website Address*</h>
                    </div>
                    <div class="input-group">
                        <div class="edit-info-button-group">
                            <button class="edit-info-button"> Edit Info</button>
                        </div>
                        <input class="input-box"></input>
                        <input class="input-box"></input>
                        <div>
                            <select id="category-select">
                                <option>Animal</option>
                                <option>Children</option>
                            </select>
                        </div>
                        <input class="input-box"></input>
                        <input class="input-box"></input>
                        <input class="input-box"></input>
                        <input class="input-box"></input>

                    </div>

                </div>
                <div class="warning"> * fields are mandatory</div>

                <div class="button-group">
                    <div class="submit-button">SUBMIT</div>
                </div>
            </div>
        </div>

    );
}

export default Form;