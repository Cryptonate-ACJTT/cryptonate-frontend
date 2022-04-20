import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Project.css"
import { ADDRESSES, API_ROUTES, getFromBackend, postToBackend, txnBasic } from "../../Fetch/ApiFetches";
import FourOhFour from "./FourOhFour";
import { Alert, Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DarkAlgoIcon } from "../PageBits/Icons/Icons";
import UserSlice from "../../Redux/Slices/UserSlice";


const Project = (props) => {
	const { id } = useParams();
	const slice = UserSlice.useSlice();
	let [projectData, setProjectData] = useState();
	let [donateOpen, setDonateOpen] = useState(false);
	let [loggedInAlert, setLoggedInAlert] = useState(false);

	/**
	 * Get page data before component render.
	 */
	
	useEffect(() => {
		getPageData();

		return(() => {
			UserSlice.unsubscribe();
		});
	}, []);

	/**
	 * Gets page data! Put here so useEffect doesn't complain about missing dependencies.
	 */
	const getPageData = () => {
		postToBackend(API_ROUTES.BACKEND.GET_PROJECT, {id: id}, {callback: (data) => {
			setProjectData(data.project);
			console.log(data.project);
		}});
		/*
		if(!slice.projects.length) {
			
		} else {
			setProjectData(slice.projects.filter(proj => proj._id === id)[0]);
		}*/
	}

	const dialogHandler = () => {
		if(slice.loggedIn) {
			if(donateOpen) {
				setDonateOpen(false);
			} else {
				setDonateOpen(true);
			}
		} else {
			alertHandler();
		}
	}

	const alertHandler = () => {
		if (loggedInAlert) {
			setLoggedInAlert(false);
		} else {
			setLoggedInAlert(true);
		}
	}

	const donateHandler = (e) => {
		e.preventDefault();
		let formData = new FormData(e.currentTarget);
		

		if(slice.userInfo) {
			if(formData.get("amount") > 0) {
				if(formData.get("account")) {
					dialogHandler();
					return txnBasic(slice.userInfo, formData.get("account"), projectData.address, parseInt(formData.get("amount")));
				}
			}
		}		
	}

	const makeAccountSelect = (accounts) => {
		let displayItems = [];
		console.log("ACC", accounts)
		for(let i = 0; i < accounts.length; i++) {
			displayItems.push(
				<MenuItem key={i} value={accounts[i]}>
					{accounts[i]}
				</MenuItem>);
		}

		return displayItems;	
	}

	if(!projectData) {	// project doesn't exist probably
		return (
			<FourOhFour/>
		)
	} else {
		return ( 
			<Box>
				<Dialog open={loggedInAlert} onClose={alertHandler}>
					<Alert severity="warning">You must be logged in to donate.</Alert>
				</Dialog>
				
				<Dialog open={donateOpen} onClose={dialogHandler} fullWidth maxWidth="md">
					<form onSubmit={donateHandler}>
						<DialogContent>
							<DialogContentText variant="caption">
								Project Address: {projectData.address}
							</DialogContentText>
							<DialogContentText variant="h5">
								How much would you like to donate to {projectData.projectName}?
							</DialogContentText>
							<Select name="account" fullwidth value={slice.userInfo ? slice.userInfo.wallet.accounts[0] : null}>
								{slice.userInfo? makeAccountSelect(slice.userInfo.wallet.accounts) : null}
							</Select>
							<Grid container spacing={2}>
								<Grid item xs={1}>
									<DarkAlgoIcon/>
								</Grid>
								<Grid item xs={11}>
									<TextField name="amount" type="number" fullWidth variant="outlined" defaultValue={0}></TextField>
								</Grid>
							</Grid>
						</DialogContent>
						
						<DialogActions>
							<Button type="submit">DONATE</Button>
							<Button onClick={dialogHandler}>Cancel</Button>
						</DialogActions>
					</form>
				</Dialog>
				<Grid container spacing={2} height="100vw">
					<Grid item xs={7}>
						<Card>
							<CardContent sx={{borderBottom: "3px solid gray"}}>
								<Typography variant="h3" sx={{borderBottom: "3px dotted lightgray"}}>{projectData.projectName}</Typography>
								<Typography variant="h5">{projectData.projectSubTitle}</Typography>
							</CardContent>
							<CardMedia sx={{border: "3px solid lightgrey"}} component="img" alt="" image={ADDRESSES.BACKEND + projectData.image} height="400px"/>
							<CardContent sx={{textAlign:"left"}}>
								<Typography variant="body2">{projectData.solution}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={5}>
						<Card>
							<CardContent sx={{textAlign:"left", border:"3px dashed rgba(0,0,0,0.2)", margin: "5px"}}>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<Typography variant="h5">{projectData.orgName}'s Goal:</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="h5"><DarkAlgoIcon/>{projectData.goalAmount}</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<Typography variant="h5">Total raised: </Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="h5"><DarkAlgoIcon/>{projectData.totalSaved}</Typography>
									</Grid>
								</Grid>
							</CardContent>
							<CardContent>
								<Button sx={{width: "100%"}} onClick={() => {dialogHandler(true)}}>
									DONATE
								</Button>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		)
	}
}
/*

<div className="project-container">
				<div className="project-details">
					<p>{JSON.stringify(projectData)}</p>
					<h1 className="page-title">{projectData.projectName}</h1>
					<img className="project-image" src={projectData.image}/>
				</div>
			</div>	
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
