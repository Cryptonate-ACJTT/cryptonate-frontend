import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES, submitProjectForm } from "../../Fetch/ApiFetches";
import { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";
import Alert from '@mui/material/Alert'


import './ProjectForm.css'

const ProjectForm = (props) => {

	const navigate = useNavigate();

    const [errorOccured, setErrorOccured] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")

	const submitForm = (e) => {
		e.preventDefault();
		let formData = new FormData(e.currentTarget);
		
		submitProjectForm(JSON.stringify(props.userSlice.userInfo), formData, {callback: (data) => {
			userReducers.userWalletFxn(data.wallet);
            userReducers.userProjectFxn(data.project)
			navigate("/explore/project/" + data.project._id);
		} , resHandler: async (response) => {
            if (response.ok) {
                return await response.json()
            } else {
                const error = await response.json();
                setErrorMsg(error.msg)
                setErrorOccured(true)
                return Promise.reject(response.status);
            }

        }})
	}

	//action="http://localhost:4000/api/v1/project/create" method="POST" enctype="multipart/form-data" class="project-form-group">
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
                                <textarea id="title-input" rows="1" cols="50" name="projectName" required />
                            </div>
                            <div className="form-input-group">
                                <label htmlFor="org-input" className="form-label">Org name</label>
                                <textarea id="org-input" rows="1" cols="50" name="orgName" required />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="subtitle-input" className="form-label">Subtitle</label>
                                <textarea id="subtitle-input" rows="1" cols="50" name="projectSubTitle" required />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="summary-input" className="form-label">Summary</label>
                                <textarea id="summary-input" name="summary" required cols="50" placeholder="Briefly summarize the project" />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="goal-input" className="form-label">Goal Amount</label>
                                <input type={"number"} min="0" step="any" id="goal-input" name="goalAmount" required placeholder="Enter the goal in Algo" />
                            </div>

                            <div>
                                <label className ="header-label" >Image</label>
                                <input type={"file"} name="image" id="selectedFile" ></input>
                            </div>
                            
                        </div>
                    </div>
                    <div className="form-right">

                        <div id="the-form" action="#" method="POST" name="project-form">

                            <div className="form-input-group">
                                <label htmlFor="detail-input" className="form-label">Detail</label>
                                <textarea id="detail-input" name="project-detail" required rows="6" cols="50" placeholder="Explain the project detail" />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="solution-input" className="form-label">Solution</label>
                                <textarea id="solution-input" name="solution" required rows="6" cols="50" placeholder="Explain the project solution" />
                            </div>
                            <div className="form-input-group">
                                <label className="header-label" >Category</label>
                                <select id="category-input" name="category">
                                    <option>Animal</option>
                                    <option>Children</option>
                                </select>
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