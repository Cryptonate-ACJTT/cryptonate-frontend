import React, { Profiler, useState } from "react";
import { API_ROUTES, postToBackend } from "../../Fetch/ApiFetches";
import { CONTENT_TYPES } from "../../Fetch/Fetcher";
import AuthorizedRoute from "../PageBits/AuthRoute/AuthRoute";
import './ProjectForm.css'

const ProjectForm = (props) => {

	const submitForm = (e) => {
		e.preventDefault();
		let formData = new FormData(e.currentTarget);
		postToBackend(API_ROUTES.BACKEND.CREATE_PROJECT, formData, {credentials: true, contentType: CONTENT_TYPES.FORM_DATA});
	}

	//action="http://localhost:4000/api/v1/project/create" method="POST" enctype="multipart/form-data" class="project-form-group">
    return (

        <div class="basic-div basic-form">

            <div class="account-page-title">Project Form</div>

            <form onSubmit={submitForm} className="project-form-group"> 

                <div class="project-form-container">

                    <div class="form-left">
                        <div id="the-form" name="project-form">

                            <div class="form-input-group">
                                <label for="title-input" class="form-label">Title</label>
                                <textarea id="title-input" rows="1" cols="50" name="projectName" required />
                            </div>
                            <div class="form-input-group">
                                <label for="org-input" class="form-label">Org name</label>
                                <textarea id="org-input" rows="1" cols="50" name="orgName" required />
                            </div>

                            <div class="form-input-group">
                                <label for="subtitle-input" class="form-label">Subtitle</label>
                                <textarea id="subtitle-input" rows="1" cols="50" name="projectSubTitle" required />
                            </div>

                            <div class="form-input-group">
                                <label for="summary-input" class="form-label">Summary</label>
                                <textarea id="summary-input" name="summary" required cols="50" placeholder="Briefly summarize the project" />
                            </div>

                            <div class="form-input-group">
                                <label for="goal-input" class="form-label">Goal Amount</label>
                                <input type={"number"} min="0" step="any" id="goal-input" name="goalAmount" required placeholder="Enter the goal in Algo" />
                            </div>

                            <div>
                                <h class ="header-label" >Image</h>
                                <input type={"file"} name="image" id="selectedFile" ></input>
                            </div>
                            
                        </div>
                    </div>
                    <div class="form-right">

                        <div id="the-form" action="#" method="POST" name="project-form">

                            <div class="form-input-group">
                                <label for="detail-input" class="form-label">Detail</label>
                                <textarea id="detail-input" name="project-detail" required rows="6" cols="50" placeholder="Explain the project detail" />
                            </div>

                            <div class="form-input-group">
                                <label for="solution-input" class="form-label">Solution</label>
                                <textarea id="solution-input" name="solution" required rows="6" cols="50" placeholder="Explain the project solution" />
                            </div>
                            <div className="form-input-group">
                                <h className="header-label" >Category</h>
                                <select id="category-input" name="category">
                                    <option>Animal</option>
                                    <option>Children</option>
                                </select>
                            </div>

                        </div>
                    </div>

                </div>

                <button id="submit-button" type="submit" class="submit-button button-group" >SUBMIT</button>

            </form>


        </div>
    );

}

export default ProjectForm;