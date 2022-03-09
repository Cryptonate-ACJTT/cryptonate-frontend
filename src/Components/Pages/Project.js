import React from 'react';
import "./Project.css"

import Visualizer from './Visualizer';
import image from "./Images/temp.jpg"

const Project = (props) => {
    return (
        <div className="project-container">
            <ProjectDescription title={props.title}/>

            <div className="project-ality-container">
                <DonateButton progress={props.progress}/>
                <div className="project-tracker-container">
                    <Visualizer/>
                </div>
            </div>
        </div>
    );
}

const ProjectSocials = (props) => {

    return (
        <div className="project-social">
            <img className="project-social-logo"/>
            <a href="social media">Social Media</a>
        </div>
    )
}

const ProjectDescription = (props) => {
    return (
        <div className="project-description-container">
            <h1 className="project-description-title">{props.title}</h1>
            <div className="project-description-image">
                <img src={props.image} style={{width: "300px", "border-radius": "15px"}}/>
            </div>
            <div className="project-description-socials">
                <ProjectSocials/>
            </div>
            <div className="project-description-text">
                <p className="project-description-text-box">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    );
}

const DonateButton = (props) => {
    return (
        <div className="project-donate-container">
            <div className="project-donate-tracker">
                <progress value={props.progress} max="100"/>
            </div>
            <div className="project-donate-button">
                <button>DONATE</button>
            </div>
        </div>
    );
}

export default Project;