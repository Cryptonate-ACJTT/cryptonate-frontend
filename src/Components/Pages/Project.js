import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Project.css"
import ExploreSlice from "../../Redux/Slices/ExploreSlice";


const Project = (props) => {
	const { id } = useParams();
	const slice = ExploreSlice.useSlice();
	console.log(slice.projects);

	useEffect(() => {
		return(() => {

			
			ExploreSlice.unsubscribe();
		});
	});

	return (
		<p>{id}</p>
	)
}
/*
import Visualizer from './Visualizer';
import logo from "./Images/algorand_logo_mark_black.svg";
import image from "./Images/temp.jpg"
import Donate from "../Modals/Donate"
*/
/*
const Project = (props) => {
    return (
        <div className="project-container">
            <ProjectDescription title="Example Project" image={image}/>

            <div className="project-ality-container">
                <DonateButton progress={rBetween(1, 100)} goal={rBetween(100, 20000)} title="Example Project"/>
                <div className="project-tracker-container">
                    <Visualizer/>
                </div>
            </div>
        </div>
    );
}

const ProjectSocial = (props) => {
    return (
        <div className="project-social">
            <img className="project-social-logo" src={props.logo} style={{"height":"3em"}}/>   <a href={props.link}>{props.site}</a>
        </div>
    )
}

const ProjectDescription = (props) => {
    return (
        <div className="project-description-container">
            <h1 className="project-description-title">{props.title}</h1>
            <div className="project-description-top">
                <div className="project-description-image">
                    <img src={props.image} style={{width: "300px", "border-radius": "15px"}}/>
                </div>
                <div className="project-description-socials">
                    <ProjectSocial logo={logo} link="https://www.algorand.com" site="Social Media Example"/>
                </div>
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

	const [showDonate, toggleShowDonate] = useState(false);

    const setShowDonate = (props) => {
		toggleShowDonate(!showDonate);
        console.log(showDonate)
	};
    // let modal = <></>
    // if (showDonate){modal = <Donate  handleShowDonate={setShowDonate} showDonate={showDonate} />}


    return (
        <div className="project-donate-container">
            <div className="project-donate-tracker">
                <div className="project-goal">
                    <h2>{props.title}'s Goal:  <img src={logo} style={{"height":"2.5em", "display":"inline-block"}}/> {props.goal}</h2> 
                    <h2>Total Raised:  <img src={logo} style={{"height":"2.5em", "display":"inline-block"}}/> {props.goal * (props.progress/100)}</h2>
                </div>
                <progress value={props.progress} max="100"/>
            </div>
            
        
            <div className="project-donate-button">
                <button className="donate-button" onClick={setShowDonate}>DONATE</button>
            </div>
            {
                (<Donate handleShowDonate={setShowDonate} showDonate={showDonate}/>)
            // modal
            }
        </div>
    );
}
*/
export default Project;
