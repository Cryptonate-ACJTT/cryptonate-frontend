import React, { Profiler, useState } from "react";
import './ProjectForm.css'


const ProjectForm = (props) => {

    return (

        <div class="basic-div basic-form">
            <div class="account-page-title">Project Form</div>
            <div class="project-form-group">
                <div class="project-form-container">

                    <div class="form-left">
                        {/* <form id="the-form" action="#" method="POST" name="project-form"> */}
                        <div id="the-form" name="project-form">

                            <div class="form-input-group">
                                <label for="title-input" class="form-label">Title</label>
                                <textarea id="title-input" rows="1" cols="50" name="project-title" required="" />
                            </div>

                            <div class="form-input-group">
                                <label for="subtitle-input" class="form-label">Subtitle</label>
                                <textarea id="subtitle-input" rows="1" cols="50" name="project-subtitle" required="" />
                            </div>

                            <div class="form-input-group">
                                <label for="summary-input" class="form-label">Summary</label>
                                <textarea id="summary-input" name="project-summary" required="" cols="50" placeholder="Briefly summarize the project" />
                            </div>

                            <div class="form-input-group">
                                <label for="goal-input" class="form-label">Goal Amount</label>
                                <input type={"number"} min="0" step="any" id="goal-input" name="project-goal" required=""  placeholder="Enter the goal in Algo"/>
                            </div>

                            <div class="form-input-group">
                                <h id="img-label">Image</h> 
                                {/* <button id="image-input" name="project-image">Upload Image</button> */}
                                <input type={"file"} id="selectedFile" ></input>
                            </div>

                        </div>
                    </div>
                    <div class="form-right">

                        <div id="the-form" action="#" method="POST" name="project-form">

                            <div class="form-input-group">
                                <label for="detail-input" class="form-label">Detail</label>
                                <textarea id="detail-input" name="project-detail" required="" rows="6" cols="50" placeholder="Explain the project detail" />
                            </div>

                            <div class="form-input-group">
                                <label for="solution-input" class="form-label">Solution</label>
                                <textarea id="solution-input" name="project-solution" required="" rows="6" cols="50" placeholder="Explain the project solution" />
                            </div>

                        </div>
                    </div>

                </div>
                <div class="button-group">
                    <div class="submit-button">SUBMIT</div>
                </div>

            </div>
        </div>
    );

}

export default ProjectForm;