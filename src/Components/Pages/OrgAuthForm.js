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
        <div className="basic-div basic-form">
            <p className="account-page-title">Information Form for Authentication</p>
            <form onSubmit={submitForm} className="form-group basic-group" encType="multipart/form-data">

                {/* <input name="orgId" class="input-box" />
                <input name="name" class="input-box" />
                <input name="EIN" class="input-box" />
                <input name="category" class="input-box" />
                <input name="email" class="input-box"></input>
                <input name="phone" class="input-box"></input>
                <input name="location" class="input-box"></input>
                <input name="website" class="input-box"></input> */}

                <div className="input-container">
                    <div className="input-tag-group">
                        <div>
                            <label id="org-username">Organization's user name</label>
                            <p className="approve-tag">Approved</p>
                        </div>
                        <p className="input-tag">1. Organization Name*</p>
                        <p className="input-tag">2. Employment Identification Number*</p>
                        <p className="input-tag">3. Category*</p>
                        <p className="input-tag">4. Organization Email*</p>
                        <p className="input-tag">5. Organization Phone Number</p>
                        <p className="input-tag">6. Location</p>
                        <p className="input-tag">7. Website Address*</p>
                    </div>
                    <div className="input-group">
                        <div className="edit-info-button-group">
                            <button className="edit-info-button"> Edit Info</button>
                        </div>
                        <input name="name" className="input-box"></input>
                        <input name="EIN" className="input-box"></input>
                        <div>
                            <select name="category" id="category-select">
                                <option>Animal</option>
                                <option>Children</option>
                            </select>
                        </div>
                        <input name="email" className="input-box"></input>
                        <input name="phone" className="input-box"></input>
                        <input name="location"className="input-box"></input>
                        <input name="website"className="input-box"></input>

                    </div>

                </div>
                <div id="warning"> * fields are mandatory</div>

                <div className="button-group">
                    <button type="submit" className="submit-button">SUBMIT</button>
                </div>
            </form>
        </div>

    );
}

export default OrgAuthForm;