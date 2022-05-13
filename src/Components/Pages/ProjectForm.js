import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES, getOrgAuthForm, submitProjectForm } from "../../Fetch/ApiFetches";
import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";
import { Select, MenuItem, Input, InputAdornment, Alert, TextareaAutosize, Button } from "@mui/material";
import './ProjectForm.css'

const ProjectForm = (props) => {

    const userSlice = UserSlice.useSlice();
    const theId = userSlice.userInfo.id

    const navigate = useNavigate();

    const [errorOccured, setErrorOccured] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")
    const [orgName, setOrgName] = useState("")

    getOrgAuthForm(theId, {
        callback: (data) => {
            setOrgName(data.form.name)
        }
    });

    const submitForm = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        formData.append("orgName", orgName)

        submitProjectForm(JSON.stringify(props.userSlice.userInfo), formData, {
            callback: (data) => {
                userReducers.userWalletFxn(data.wallet);
                userReducers.userProjectFxn(data.project)
                navigate("/explore/project/" + data.project._id);
            }, resHandler: async (response) => {
                if (response.ok) {
                    return await response.json()
                } else {
                    const error = await response.json();
                    setErrorMsg(error.msg)
                    setErrorOccured(true)
                    return Promise.reject(response.status);
                }

            }
        })
    }

    return (

        <div className="basic-div basic-form">

            <div className="account-page-title">Project Form</div>

            <form onSubmit={submitForm} className="project-form-group">
                {
                    errorOccured ?
                        <Alert severity="error">{errorMsg}</Alert> : <></>
                }

                <div className="project-form-container">


                    <div className="form-left">
                        <div id="the-form" name="project-form">

                            <div className="form-input-group">
                                <label htmlFor="title-input" className="form-label">Title</label>
                                <TextareaAutosize className="form-input-textarea" id="title-input" minRows={2} cols="50" name="projectName" required />
                            </div>
                            <div className="form-input-group">
                                <label htmlFor="org-input" className="form-label">Org name</label>
                                <TextareaAutosize className="form-input-textarea" id="org-input" minRows={2} cols="50" name="orgName" value={orgName} disabled={orgName.length === 0 ? false: true} required />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="subtitle-input" className="form-label">Subtitle</label>
                                <TextareaAutosize className="form-input-textarea" id="subtitle-input" minRows={2} cols="50" name="projectSubTitle" required />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="summary-input" className="form-label">Summary</label>
                                <TextareaAutosize className="form-input-textarea" id="summary-input" name="summary" minRows={2} required cols="50" placeholder="Briefly summarize the project" />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="goal-input" className="form-label">Goal Amount</label>
                                <Input startAdornment={<InputAdornment position="start">ALGO</InputAdornment>} type={"number"} inputProps={{ min: 0 }} id="goal-input" name="goalAmount" required placeholder="Enter the goal amount" />
                            </div>

                            <div>
                                <label className="header-label" >Image</label>
                                <Input accept="image/*" id="contained-button-file" type="file" />
                                
                            </div>

                        </div>
                    </div>
                    <div className="form-right">

                        <div id="the-form" action="#" method="POST" name="project-form">

                            <div className="form-input-group">
                                <label htmlFor="detail-input" className="form-label">Detail</label>
                                <TextareaAutosize className="form-input-textarea" id="detail-input" name="project-detail" required minRows={6} cols="50" placeholder="Explain the project detail" />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="solution-input" className="form-label">Solution</label>
                                <TextareaAutosize className="form-input-textarea" id="solution-input" name="solution" required minRows={6} cols="50" placeholder="Explain the project solution" />
                            </div>
                            <div className="form-input-group">
                                <label className="form-label" >Category</label>
                                <Select defaultValue="" placeholder="Please select a category" displayEmpty id="category-input" name="category">
                                    <MenuItem disabled value="">
                                        <em>Please select a category.</em>
                                    </MenuItem>
                                    <MenuItem value="animal">Animal</MenuItem>
                                    <MenuItem value="children">Children</MenuItem>
                                </Select>
                            </div>

                        </div>
                    </div>

                </div>

                <button id="submit-button" type="submit" className="submit-button button-group" >SUBMIT</button>

            </form>


        </div>
    );

}

export default ProjectForm;