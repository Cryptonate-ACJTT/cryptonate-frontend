import React, { useState, useEffect } from "react";
import "./OrgAuthForm.css";
import { ADDRESSES, getOrgAuthForm, updateOrgAuthForm, submitOrgAuthForm } from "../../Fetch/ApiFetches";
import { useNavigate } from "react-router-dom";
import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";


const OrgAuthForm = (props) => {

    const userSlice = UserSlice.useSlice();
    const theId = userSlice.userInfo.id
    let approved = userSlice.userInfo.approved
    const [isEditing, setIsEditing] = useState(!approved);
    const [isApproved, setIsApproved] = useState(approved)
    const [orgName, setOrgName] = useState("")
    const [orgEmail, setOrgEmail] = useState("")
    const [orgCategory, setOrgCategory] = useState("")
    const [orgWebsite, setOrgWebsite] = useState("")
    const [orgEIN, setOrgEIN] = useState("")
    const [orgPhone, setOrgPhone] = useState("")
    const [orgLocation, setOrgLocation] = useState("")


    useEffect(() => {
        getOrgAuthForm(theId, {
            callback: (data) => {
                setOrgName(data.form.name)
                setOrgEmail(data.form.email)
                setOrgWebsite(data.form.website)
                setOrgEIN(data.form.EIN)
                setOrgCategory(data.form.category)
                setOrgPhone(data.form.phone)
                setOrgLocation(data.form.location)
            }
        });

    },[isApproved])

    const handleIsEditing = (e) => { setIsEditing(!isEditing) }
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        console.log(e.currentTarget)
        if (approved) 
        {

            // update org auth form's formData object being empty for some reason,
            // so forced appending.
            formData.append("EIN", orgEIN)
            formData.append("name", orgName)
            formData.append("category", orgCategory)
            formData.append("website", orgWebsite)
            formData.append("phone", orgPhone)
            formData.append("location", orgLocation)
            formData.append("email", orgEmail)


            updateOrgAuthForm(theId, formData, {
                callback: (data) => {
                }
            });
        }
        else {
            submitOrgAuthForm(theId, formData, {
                callback: (data) => {
                }
            });
        }

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
                        <input value={orgName} onChange={(e)=> {setOrgName(e.target.value)}} placeholder="Organization Name" disabled={!isEditing} name="name" className="input-box"></input>
                        <input value={orgEIN} onChange={(e) => {setOrgEIN(e.target.value)}} placeholder="Employment Identification Number" disabled={!isEditing} name="EIN" className="input-box"></input>
                        <div>
                            <select value={orgCategory} onChange={(e) => {setOrgCategory(e.target.value)}} placeholder="Category" disabled={!isEditing} name="category" id="category-select">
                                <option value="animal">Animal</option>
                                <option value="children">Children</option>
                            </select>
                        </div>
                        <input value={orgEmail} onChange={(e)=>{setOrgEmail(e.target.value)}} placeholder="Email Address" disabled={!isEditing} name="email" className="input-box"></input>
                        <input value={orgPhone} onChange={(e)=>{setOrgPhone(e.target.value)}} placeholder="Phone Number" disabled={!isEditing} name="phone" className="input-box"></input>
                        <input value={orgLocation} onChange={(e)=>{setOrgLocation(e.target.value)}} placeholder="Location" disabled={!isEditing} name="location" className="input-box"></input>
                        <input value={orgWebsite} onChange={(e)=>{setOrgWebsite(e.target.value)}} placeholder="Website Address" disabled={!isEditing} name="website" className="input-box"></input>

                    </div>

                </div>
                <div id="warning"> * fields are mandatory</div>

                {
                    approved ?
                        <button disabled={!isEditing} onClick={handleIsEditing} type="submit" className="button-group submit-button">RE-SUBMIT</button>
                        :
                        <button disabled={!isEditing} onClick={handleIsEditing} type="submit" className="button-group submit-button">SUBMIT</button>

                }
            </form>
        </div>

    );
}

export default OrgAuthForm;