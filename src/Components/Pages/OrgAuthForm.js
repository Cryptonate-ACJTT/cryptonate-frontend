import React, { useState, useEffect } from "react";
import NumberFormat from 'react-number-format';
import "./OrgAuthForm.css";

import PropTypes from 'prop-types';
import { ADDRESSES, getOrgAuthForm, updateOrgAuthForm, submitOrgAuthForm } from "../../Fetch/ApiFetches";
import { useNavigate } from "react-router-dom";
import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";
import { Grid, Typography, FormControlLabel, FormGroup, Switch, Button, Select, Alert, MenuItem, TextField } from "@mui/material";

const OrgAuthForm = (props) => {

    const userSlice = UserSlice.useSlice();
    const theId = userSlice.userInfo.id
    let approved = userSlice.userInfo.approved

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
                setIsApproved(data.form.approved)
            }
        });
        return (() => {	// runs on unmount
            UserSlice.unsubscribe();
        });
    }, [userSlice.userInfo])

    const [isEditing, setIsEditing] = useState(!approved);
    const [isApproved, setIsApproved] = useState(approved)
    const [orgName, setOrgName] = useState("")
    const [orgEmail, setOrgEmail] = useState("")
    const [orgCategory, setOrgCategory] = useState("")
    const [orgWebsite, setOrgWebsite] = useState("")
    const [orgEIN, setOrgEIN] = useState("")
    const [orgPhone, setOrgPhone] = useState("")
    const [orgLocation, setOrgLocation] = useState("")

    const [errorOccured, setErrorOccured] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")
    const handleIsEditing = (e) => { setIsEditing(!isEditing) }
    const navigate = useNavigate();

    const categories = ['Animals','Children','Climate Change','Disaster Recovery','Economic Development',
        'Education','Health','Human Rights','Humanitarian Assistance','Hunger','Water','Etc.'];

    const submitForm = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        // update org auth form's formData object being empty for some reason,
        // so forced appending.

        formData.append("EIN", orgEIN)
        formData.append("name", orgName)
        formData.append("category", orgCategory)
        formData.append("website", orgWebsite)
        formData.append("phone", orgPhone)
        formData.append("location", orgLocation)
        formData.append("email", orgEmail)

        if (isApproved) {

            updateOrgAuthForm(theId, formData, {
                callback: (data) => {
                }
            });
        }
        else {
            submitOrgAuthForm(theId, formData, {
                callback: (data) => {
                }
                , resHandler: async (response) => {
                    if (response.ok) {
                        setErrorOccured(false)
                        navigate("/profile", { replace: true });
                        return await response.json()
                    } else {
                        const error = await response.json();
                        setErrorMsg(error.msg)
                        setErrorOccured(true)
                        return Promise.reject(response.status);
                    }
                }
            }).then(() => {

                getOrgAuthForm(theId, {
                    callback: (data) => {
                        setIsApproved(data.form.approved)
                        userReducers.userApprovedFxn(data.form.approved)
                        setIsEditing(false)
                    }
                });
            })
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
                            {isApproved ?
                                <p className="approved-tag">Approved</p>
                                :
                                <p className="not-approved-tag">Not Approved</p>
                            }
                        </div>
                        <Typography className="input-tag">1. Organization Name*</Typography>
                        <Typography className="input-tag">2. Employment Identification Number*</Typography>
                        <Typography className="input-tag">3. Category*</Typography>
                        <Typography className="input-tag">4. Organization Email*</Typography>
                        <Typography className="input-tag">5. Organization Phone Number</Typography>
                        <Typography className="input-tag">6. Location</Typography>
                        <Typography className="input-tag">7. Website Address*</Typography>
                    </div>
                    <div className="input-group">
                        <div className="edit-info-button-group">
                            <FormGroup>
                                <FormControlLabel labelPlacement="start" control={<Switch checked={isEditing} onChange={handleIsEditing} />} label="Edit Info" />
                            </FormGroup>
                        </div>
                        <TextField required value={orgName} onChange={(e) => { setOrgName(e.target.value) }} placeholder="Organization Name" disabled={!isEditing} name="name" ></TextField>
                        <NumberFormat required customInput={TextField} format="##-#######" allowEmptyFormatting mask="_" value={orgEIN} onValueChange={(values) => { setOrgEIN(values.value) }} disabled={!isEditing} name="EIN" ></NumberFormat>
                        <Select required value={orgCategory} onChange={(e) => { setOrgCategory(e.target.value) }} placeholder="Category" disabled={!isEditing} name="category" >
                            <MenuItem disabled value="">
                                <em>Please select a category.</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem  key={category}  value={category}> {category} </MenuItem>
                            ))}
                        </Select>
                        <TextField required value={orgEmail} onChange={(e) => { setOrgEmail(e.target.value) }} placeholder="Email Address" disabled={!isEditing} name="email"></TextField>
                        <NumberFormat required value={orgPhone} onChange={(e) => { setOrgPhone(e.target.value) }} placeholder="Phone Number" disabled={!isEditing} name="phone" customInput={TextField} format="+1 (###) ###-####" allowEmptyFormatting mask="_" />
                        <TextField required value={orgLocation} onChange={(e) => { setOrgLocation(e.target.value) }} placeholder="Location" disabled={!isEditing} name="location" ></TextField>
                        <TextField required value={orgWebsite} onChange={(e) => { setOrgWebsite(e.target.value) }} placeholder="Website Address" disabled={!isEditing} name="website" ></TextField>

                    </div>
                </div>
                <div id="warning"> * fields are mandatory</div>

                {
                    errorOccured ?
                        <Alert sx={{ alignSelf: "center" }} severity="error">{errorMsg}</Alert> : <></>
                }
                {
                    isApproved ?
                        <Button variant="contained" disabled={!isEditing} onClick={handleIsEditing} type="submit" className="button-group submit-button">RE-SUBMIT</Button>
                        :
                        <Button variant="contained" disabled={!isEditing} onClick={handleIsEditing} type="submit" className="button-group submit-button">SUBMIT</Button>

                }
            </form >
        </div >




    );
}

export default OrgAuthForm;