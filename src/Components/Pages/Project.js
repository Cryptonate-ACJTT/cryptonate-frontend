import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Project.css"
import { ADDRESSES, API_ROUTES, getFromBackend, grabProjectData, postToBackend, txnBasic } from "../../Fetch/ApiFetches";
import FourOhFour from "./FourOhFour";
import { Alert, Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, InputAdornment, DialogContentText, DialogTitle, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AlgoIcon } from "../PageBits/Icons/Icons";
import UserSlice from "../../Redux/Slices/UserSlice";
import PageContainer from "../PageBits/PageContainer/PageContainer";
import Image from "mui-image"
import { UnverifiedIcon, VerifiedIcon } from "../PageBits/Icons/Icons";


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
		grabProjectData(id, {callback: (data) => {
			console.log("PROJECT: ", data);
			setProjectData(data.project);
		}});

		return(() => {
			UserSlice.unsubscribe();
		});
	}, []);

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

	


	if(projectData) {
		console.log(projectData);
		console.log(slice);
		return ( 
			<PageContainer content={
				<Box>
					<Grid container spacing={2} >
						<Grid item xs={7}>
							<Box sx={{background: "white", borderRadius: "20px"}}>
								<Box sx={{background:"#1C3E64", borderRadius:"20px 20px 0 0", borderBottom:"10px solid rgba(0,0,0,0.2)", pt:"2vh", pb:"1vh"}}>
									<Typography variant="h3" sx={{color: "white"}}>{projectData.projectName}</Typography>
									<Box sx={{borderBottom:"3px dotted rgba(255,255,255,0.2)", mt:".5vh", mb:".5vh"}}/>
									<Typography variant="h5" sx={{color:"white"}}>{projectData.projectSubTitle}</Typography>
								</Box>
								<Box>
									<Image src={ADDRESSES.BACKEND + projectData.image} width="100%" height="400px" fit="cover" sx={{borderBottom:"10px groove rgba(0,0,0,0.5)"}}/>
								</Box>
								<Box p="2vh 2vw 2vh 2vw" sx={{background:"white", borderBottom:"3px dashed rgba(0,0,0,0.2)"}}>
									<Typography textAlign="left" variant="body1">
										<Typography variant="h5">About {projectData.projectName}</Typography>
										{projectData.solution}
									</Typography>
								</Box>
								<Box p="2vh 2vw 2vh 2vw">
									<Typography textAlign="left" variant="body1">
										Organization details (TODO)
									</Typography>
								</Box>
							</Box>
							
						</Grid>
						<Grid item xs={5}>
							<Box sx={{background:"white", borderRadius:"20px 20px 20px 20px"}}>
								<Box sx={{border:"5px solid rgba(0,0,0,0.2)", borderRadius:"20px 20px 0 0", }}>
									<Grid container spacing={2} sx={{p:"1vh 0 1vh 0"}}>
										<Grid item xs={6}>
											<Box sx={{background:"#1C3E64", ml:"16px", borderRadius:"20px 5px 0 0", p:"1vh 0 1vh 0"}}>
												<Typography variant="stats" sx={{color: "white"}}>{projectData.projectName}'s Goal</Typography>
											</Box>
										</Grid>
										<Grid item xs={6}>
											<Box sx={{p:"1vh 0 1vh 0", textAlign:"left"}}>
												<Typography  fontSize="20px" variant="data"><AlgoIcon/>{projectData.goalAmount}</Typography>
											</Box>
										</Grid>
										<Grid item xs={6}>
											<Box sx={{background:"#1C3E64", ml:"16px", borderRadius:"0 0 5px 20px", p:"1vh 0 1vh 0"}}>
												<Typography variant="stats" sx={{color: "white"}}>Total Raised</Typography>
											</Box>
										</Grid>
										<Grid item xs={6}>
											<Box sx={{p:"1vh 0 1vh 0", textAlign:"left"}}>
												<Typography fontSize="20px" variant="data"><AlgoIcon/>{projectData.totalSaved}</Typography>
											</Box>
										</Grid>
									</Grid>
								</Box>
								<Button onClick={dialogHandler} variant="contained" color="secondary" fullwidth sx={{width: "100%", borderRadius:"0 0 20px 20px", p:"1vh 0 1vh 0", border:"5px groove rgba(255,255,255,0.2)", ":hover":{border:"5px ridge rgba(255,255,255,0.2)"}}}>
									<Typography fontSize="30px" variant="data" sx={{color:"white"}}><b>DONATE</b></Typography>							
								</Button>
							</Box>
						</Grid>
					</Grid>
					<DonateModal open={donateOpen} close={dialogHandler} project={projectData} userInfo={slice.userInfo} accounts={slice.userInfo !== null ? slice.userInfo.wallet.accounts : []}/>
				</Box>
			}/>
		);	
	}

	return null;
}

const DonateModal = (props) => {


	const closeButton = () => {
		props.close();
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);

		props.close();
		
		txnBasic(props.userInfo, data.get("account"), props.project.address, data.get("amount"), {callback: (data) => {
			console.log(data);
		}});
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

	return (
		<Dialog open={props.open} onClose={props.close} fullWidth maxWidth="md" PaperProps={{sx:{borderRadius: "20px"}}}>
			<form onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={9}>
					<DialogContent sx={{p:"1vh 1vw 0 1vw"}}>
						<DialogContentText variant="caption">{(props.project.projectName + " ADDRESS: " + props.project.address).toUpperCase()}</DialogContentText>
					</DialogContent>
				</Grid>
				<Grid item xs={3} sx={{display:"flex", justifyContent:"right"}}>
					<Button onClick={closeButton} variant="contained" sx={{borderRadius:"0 20px 0 10px", height: "3rem"}}><Typography fontFamily="sans-serif">X</Typography></Button>
				</Grid>
				{props.project.verified !== true ? 
					<Grid item xs={12}>
						<Box sx={{background:"#1C3E64", m:"0 2vw 0 2vw", p:"1vh 1vw", borderRadius:"10px"}}>
							<Grid container spacing={2}>
								<Grid item xs={1} sx={{display:"flex", justifyContent:"center", alignContent:"center"}}><UnverifiedIcon color="secondary" fontSize="2.5rem"/></Grid>
								<Grid item xs={11}>
									<Typography fontSize="15px" variant="data" sx={{color:"white"}}>
										<b>WARNING:</b> The trustworthiness of the organization which created this project has not been verified. Do not send cryptocurrency to addresses you do not trust.
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Grid>: null}
				
					<Grid item xs={4}>
						<Box sx={{background:"#1C3E64", borderRadius:"20px 5px 5px 5px", p:"1vh 1vw", m:"1vh 0 0 1vw"}}>
							<Typography sx={{color:"white"}}>Which account would you like to donate from?</Typography>
						</Box>	
					</Grid>
					<Grid item xs={8}>
						<Box sx={{p:"1.5vh 1vw 0 0"}}>
							{props.accounts ? <Select fullWidth name="account" value={props.accounts[0]}>
								{makeAccountSelect(props.accounts)}
							</Select> : null}
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box sx={{background:"#1C3E64", borderRadius:"5px 5px 5px 20px", p:"1vh 1vw", m:"0 0 1vh 1vw"}}>
							<Typography sx={{color:"white"}}>How many {<AlgoIcon fontSize="1rem"/>}lgos would you like to donate?</Typography>
						</Box>	
					</Grid>
					<Grid item xs={8}>
						<Box sx={{p:"0.5vh 1vw 0 0 "}}>
							<TextField name="amount" type="text" inputProps={{inputMode: 'decimal', pattern: '[0-9].*' }} step="0.01" fullWidth variant="outlined" placeholder="0" InputProps={{startAdornment:(<InputAdornment position="start"><AlgoIcon/></InputAdornment>)}}></TextField>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Button type="submit" variant="contained" color="secondary" fullwidth sx={{width: "100%", borderRadius:"0 0 20px 20px", p:"1vh 0 1vh 0", border:"5px groove rgba(255,255,255,0.2)", ":hover":{border:"5px ridge rgba(255,255,255,0.2)"}}}>
							<Typography fontSize="30px" variant="data" sx={{color:"white"}}><b>SEND</b></Typography>							
						</Button>
					</Grid>
			</Grid>
			</form>
		</Dialog>
	)

}

const AlertModal = (props) => {

}
/*
<Box>
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
										<Typography variant="h5"><AlgoIcon/>{projectData.goalAmount}</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<Typography variant="h5">Total raised: </Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="h5"><AlgoIcon/>{projectData.totalSaved}</Typography>
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
*/
/*

				<Dialog open={loggedInAlert} onClose={alertHandler}>
					<Alert severity="warning">You must be logged in to donate.</Alert>
				</Dialog>
				
				<

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
