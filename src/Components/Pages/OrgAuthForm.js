import React, { useState, useEffect } from "react";
import "./OrgAuthForm.css";
import { useNavigate } from "react-router-dom";
import { submitOrgAuthForm } from "../../Fetch/ApiFetches";
import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";


const OrgAuthForm = (props) => {

    const [isEditing, setIsEditing] = useState(false);

    const handleIsEditing = (e) => { setIsEditing(!isEditing) }

    const userSlice = UserSlice.useSlice();
    // const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        console.log("!!!!!!!! ORG FORM !!!!!!!!")
        console.log(formData)
        submitOrgAuthForm(userSlice.userInfo.id, formData, {
            callback: (data) => {
                // navigate("/profile", { replace: true });
            }
        });
        // how to append user Id?
    }

    return (
        <div className="basic-div basic-form">
            <p className="account-page-title">Information Form for Authentication</p>
            <form onSubmit={submitForm} className="form-group basic-group" encType="multipart/form-data">
                <div className="input-container">
                    <div className="input-tag-group">
                        <div>
                            <label id="org-username">[ {userSlice.userInfo.username} ]</label>
                            {userSlice.userInfo.approved == true ?
                                <p className="approved-tag">Approved</p>
                                :
                                <p className="not-approved-tag">Not Approved</p>
                            }
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
                            <button type="button" onClick={handleIsEditing} className="edit-info-button"> Edit Info</button>
                        </div>
                        <input disabled={!isEditing} name="name" className="input-box"></input>
                        <input disabled={!isEditing} name="EIN" className="input-box"></input>
                        <div>
                            <select disabled={!isEditing} name="category" id="category-select">
                                <option>Animal</option>
                                <option>Children</option>
                            </select>
                        </div>
                        <input disabled={!isEditing} name="email" className="input-box"></input>
                        <input disabled={!isEditing} name="phone" className="input-box"></input>
                        <input disabled={!isEditing} name="location" className="input-box"></input>
                        <input disabled={!isEditing} name="website" className="input-box"></input>

                    </div>

                </div>
                <div id="warning"> * fields are mandatory</div>

                <button type="submit" className="button-group submit-button">SUBMIT</button>
            </form>
        </div>

    );
}

export default OrgAuthForm;