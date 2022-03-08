import React from 'react';
import Visualizer from './Visualizer';

const Project = (props) => {
    return (
        <div className="project-container">
            <div className="project-description-container">
                <ProjectDescription/>
            </div>
            <div className="project-donate-container">
                <DonateButton/>
            </div>
            <div className="project-tracker-container">
                <Visualizer/>
            </div>
        </div>
    );
}

const ProjectDescription = (props) => {
    return (
        <p>project desc</p>
    );
}

const DonateButton = (props) => {
    return (
        <p>donatebtn</p>
    );
}

export default Project;