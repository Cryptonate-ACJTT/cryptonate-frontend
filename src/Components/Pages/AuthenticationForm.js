import React from "react";
import "./AuthenticationForm.css";
import { Link } from 'react-router-dom'

const AuthenticationForm = (props) => {

    return (
        <div class="basic-div basic-form">
                <h class="account-page-title">Information Form for Authentication</h>
            <div class="form-group basic-group">

                <div class="input-container">
                    <div class="input-tag-group">
                        <div>
                            <label id="org-username">Organization's user name</label>
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
                <div id="warning"> * fields are mandatory</div>

                <div class="button-group">
                    <div class="submit-button">SUBMIT</div>
                </div>
            </div>
        </div>

    );
}

export default AuthenticationForm;