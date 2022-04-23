import React from "react";
import "./OrgAuthForm.css";
import { API_ROUTES, postToBackend } from "../../Fetch/ApiFetches";
import { CONTENT_TYPES } from "../../Fetch/Fetcher";

const OrgAuthForm = (props) => {

    const submitForm = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        console.log("!!!!!!!! ORG FORM !!!!!!!!")
        console.log(formData)
        postToBackend(API_ROUTES.BACKEND.SUBMIT_ORG_FORM, formData, { contentType: CONTENT_TYPES.FORM_DATA });
    }

    return (
        <div class="basic-div basic-form">
            <h class="account-page-title">Information Form for Authentication</h>
            <form onSubmit={submitForm} class="form-group basic-group" encType="multipart/form-data">

                {/* <input name="orgId" class="input-box" />
                <input name="name" class="input-box" />
                <input name="EIN" class="input-box" />
                <input name="category" class="input-box" />
                <input name="email" class="input-box"></input>
                <input name="phone" class="input-box"></input>
                <input name="location" class="input-box"></input>
                <input name="website" class="input-box"></input> */}

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
                        <input name="name" class="input-box"></input>
                        <input name="EIN" class="input-box"></input>
                        <div>
                            <select name="category" id="category-select">
                                <option>Animal</option>
                                <option>Children</option>
                            </select>
                        </div>
                        <input name="email" class="input-box"></input>
                        <input name="phone" class="input-box"></input>
                        <input name="location"class="input-box"></input>
                        <input name="website"class="input-box"></input>

                    </div>

                </div>
                <div id="warning"> * fields are mandatory</div>

                <div class="button-group">
                    <button type="submit" class="submit-button">SUBMIT</button>
                </div>
            </form>
        </div>

    );
}

export default OrgAuthForm;