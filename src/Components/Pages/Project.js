import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./Project.css"
import { ADDRESSES, API_ROUTES, grabProjectData, txnDelete, txnDonate, getOrgAuthForm } from "../../Fetch/ApiFetches";
import { Box, Button, Dialog, DialogContent, InputAdornment, DialogContentText, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AlgoIcon } from "../PageBits/Icons/Icons";
import UserSlice from "../../Redux/Slices/UserSlice";
import PageContainer from "../PageBits/PageContainer/PageContainer";
import Image from "mui-image"
import { UnverifiedIcon, VerifiedIcon } from "../PageBits/Icons/Icons";

const Project = (props) => {
	const { id } = useParams();
	const slice = UserSlice.useSlice();
	let [projectData, setProjectData] = useState();
	let [orgData, setOrgData] = useState();
	let [donateOpen, setDonateOpen] = useState(false);
	let [loggedInAlert, setLoggedInAlert] = useState(false);

	/**
	 * Get page data before component render.
	 */


	useEffect(() => {

		grabProjectData(id, {
			callback: (data) => {

				setProjectData(data.project);
				// console.log(data.project.creatorID)
				// getOrgAuthForm(data.project.creatorID, {
				// 		callback: (result) => {
				// 			setOrgData(result.form)
				// 			console.log(orgData)
				// 		}
				// 	});
				
			}
		});

		return (() => {
			UserSlice.unsubscribe();
		});
	}, []);

	const dialogHandler = () => {
		if (slice.loggedIn && projectData.projectOpen) {
			if (donateOpen) {
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

	const deleteProjectButton = () => {

		const deleteProjectAttempt = () => {
			txnDelete(slice.userInfo, projectData.appID, {
				callback: (data) => {
					if (data) {
						return <Navigate replace to={API_ROUTES.FRONTEND.EXPLORE} />;
					}
				}
			});
		}

		if (slice.userInfo) {
			if (slice.userInfo.id === projectData.creatorID) {
				return (
					<Button disabled={!projectData.projectOpen} onClick={deleteProjectAttempt} fullWidth color="secondary" variant="contained" sx={{ color: "white", pb: "2vh", pt: "2vh", mb: "1vh", borderRadius: "5px 10px 5px 10px" }}>
						<b>{projectData.projectOpen ? "Delete Project" : "Project Already Deleted"}</b>
					</Button>
				);
			}
		}

		return null;
	}


	if (projectData) {
		return (
			<PageContainer content={
				<Box>
					<Grid container spacing={2} >
						<Grid item xs={7}>
							{deleteProjectButton()}
							<Box sx={{ background: "white", borderRadius: "20px" }}>
								<Box sx={{ background: "#1C3E64", borderRadius: "20px 20px 0 0", borderBottom: "10px solid rgba(0,0,0,0.2)", pt: "2vh", pb: "1vh" }}>
									<Typography variant="h3" sx={{ color: "white" }}>{projectData.projectName}</Typography>
									<Box sx={{ borderBottom: "3px dotted rgba(255,255,255,0.2)", mt: ".5vh", mb: ".5vh" }} />
									<Typography variant="h5" sx={{ color: "white" }}>{projectData.projectSubTitle}</Typography>
								</Box>
								<Box>
									<Image src={ADDRESSES.BACKEND + projectData.image} width="100%" height="400px" fit="cover" sx={{ borderBottom: "10px groove rgba(0,0,0,0.5)" }} />
								</Box>
								<Box p="2vh 2vw 2vh 2vw" sx={{ background: "white", borderRadius: "0 0 20px 20px" }}>
									<Typography textAlign="left" variant="h5">About {projectData.projectName}</Typography>
									<Typography textAlign="left" variant="body1">
										{projectData.solution}
									</Typography>
								</Box>
								{/* <Box p="2vh 2vw 2vh 2vw">
									<Typography textAlign="left" variant="body1">
										Organization details (TODO)
									</Typography>
								</Box> */}
							</Box>

						</Grid>
						<Grid item xs={5}>
							<Box sx={{ background: "white", borderRadius: "20px 20px 20px 20px" }}>
								<Box sx={{ border: "5px solid rgba(0,0,0,0.2)", borderRadius: "20px 20px 0 0", }}>
									<Grid container spacing={2} sx={{ p: "1vh 0 1vh 0" }}>
										<Grid item xs={6}>
											<Box sx={{ background: "#1C3E64", ml: "16px", borderRadius: "10px 10px 10px 10px", p: "1vh 0 1vh 0" }}>
												<Typography variant="stats" sx={{ color: "white" }}>{projectData.projectName}'s Goal</Typography>
											</Box>
										</Grid>
										<Grid item xs={6}>
											<Box sx={{ p: "1vh 0 1vh 0", textAlign: "left" }}>
												<Typography fontSize="20px" variant="data"><AlgoIcon />{projectData.goalAmount}</Typography>
											</Box>
										</Grid>
										<Grid item xs={6}>
											<Box sx={{ background: "#1C3E64", ml: "16px", borderRadius: "10px 10px 10px 10px", p: "1vh 0 1vh 0" }}>
												<Typography variant="stats" sx={{ color: "white" }}>Total Raised</Typography>
											</Box>
										</Grid>
										<Grid item xs={6}>
											<Box sx={{ p: "1vh 0 1vh 0", textAlign: "left" }}>
												<Typography fontSize="20px" variant="data"><AlgoIcon />{projectData.totalSaved}</Typography>
											</Box>
										</Grid>
									</Grid>
								</Box>
								<Button onClick={dialogHandler} disabled={!projectData.projectOpen} variant="contained" color="secondary" fullwidth="true" sx={{ width: "100%", borderRadius: "0 0 20px 20px", p: "1vh 0 1vh 0", border: "5px groove rgba(255,255,255,0.2)", ":hover": { border: "5px ridge rgba(255,255,255,0.2)" } }}>
									<Typography fontSize="30px" variant="data" sx={{ color: "white" }}><b>{projectData.projectOpen ? "DONATE" : "PROJECT CLOSED"}</b></Typography>
								</Button>
							</Box>
							{/* <Box sx={{ mt: "2vw" }}>
								<Box sx={{ background: "#1C3E64", borderRadius: "20px 20px 0 0", borderBottom: "10px solid rgba(0,0,0,0.2)", pt: "2vh", pb: "1vh" }}>
									<Typography variant="h5" sx={{ color: "white" }}>Organization Details</Typography>
									<Box sx={{ borderBottom: "3px dotted rgba(255,255,255,0.2)", mt: ".5vh", mb: ".5vh" }} />
									<Typography variant="h4" sx={{ color: "white" }}>{orgData.name}</Typography>
								</Box>
								<Box p="2vh 2vw 2vh 2vw" sx={{ background: "white", borderBottom: "3px dashed rgba(0,0,0,0.2)" }}>
									<Typography variant="h6">EIN : {orgData.EIN}</Typography>
								</Box>
								<Box p="2vh 2vw 2vh 2vw" sx={{ background: "white", borderBottom: "3px dashed rgba(0,0,0,0.2)" }}>
									<Typography variant="h6">Website : {orgData.website}</Typography>
								</Box>
								<Box p="2vh 2vw 2vh 2vw" sx={{ background: "white", borderBottom: "3px dashed rgba(0,0,0,0.2)" }}>
									<Typography variant="h6">Email : {orgData.email}</Typography>
								</Box>
								<Box p="2vh 2vw 2vh 2vw" sx={{ background: "white", borderRadius: "0 0 20px 20px" }}>
									<Typography variant="h6">Contact : {orgData.phone}</Typography>
								</Box>
							</Box> */}

						</Grid>
						{/* <Grid item xs={12}>
							<Box sx={{ mt: "2vw" }}>
								<Box sx={{ background: "#1C3E64", borderRadius: "20px 20px 0 0", borderBottom: "10px solid rgba(0,0,0,0.2)", pt: "2vh", pb: "1vh" }}>
									<Typography variant="h5" sx={{ color: "white" }}>Transactions</Typography>
									<Box sx={{ borderBottom: "3px dotted rgba(255,255,255,0.2)", mt: ".5vh", mb: ".5vh" }} />
								</Box>
							</Box>
						</Grid> */}
					</Grid>
					<DonateModal open={donateOpen} close={dialogHandler} project={projectData} userInfo={slice.userInfo} accounts={slice.userInfo !== null ? slice.userInfo.wallet.accounts : []} />
				</Box>
			} />
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

		txnDonate(props.userInfo, data.get("account"), props.project.address, props.project.appID, data.get("amount"));
	}

	const makeAccountSelect = (accounts) => {
		let displayItems = [];

		for (let i = 0; i < accounts.length; i++) {
			displayItems.push(
				<MenuItem key={i} value={accounts[i]}>
					{accounts[i]}
				</MenuItem>);
		}

		return displayItems;
	}

	return (
		<Dialog open={props.open} onClose={props.close} fullwidth="true" maxWidth="md" PaperProps={{ sx: { borderRadius: "20px" } }}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={9}>
						<DialogContent sx={{ p: "1vh 1vw 0 1vw" }}>
							<DialogContentText variant="caption">{(props.project.projectName + " ADDRESS: " + props.project.address).toUpperCase()}</DialogContentText>
						</DialogContent>
					</Grid>
					<Grid item xs={3} sx={{ display: "flex", justifyContent: "right" }}>
						<Button onClick={closeButton} variant="contained" sx={{ borderRadius: "0 20px 0 10px", height: "3rem" }}><Typography fontFamily="sans-serif">X</Typography></Button>
					</Grid>
					{/* {props.project.verified !== true ?
						<Grid item xs={12}>
							<Box sx={{ background: "#1C3E64", m: "0 2vw 0 2vw", p: "1vh 1vw", borderRadius: "10px" }}>
								<Grid container spacing={2}>
									<Grid item xs={1} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}><UnverifiedIcon color="secondary" fontSize="2.5rem" /></Grid>
									<Grid item xs={11}>
										<Typography fontSize="15px" variant="data" sx={{ color: "white" }}>
											<b>WARNING:</b> The trustworthiness of the organization which created this project has not been verified. Do not send cryptocurrency to addresses you do not trust.
										</Typography>
									</Grid>
								</Grid>
							</Box>
						</Grid> : null} */}

					<Grid item xs={4}>
						<Box sx={{ background: "#1C3E64", borderRadius: "20px 5px 5px 5px", p: "1vh 1vw", m: "1vh 0 0 1vw" }}>
							<Typography sx={{ color: "white" }}>Which account would you like to donate from?</Typography>
						</Box>
					</Grid>
					<Grid item xs={8}>
						<Box sx={{ p: "1.5vh 1vw 0 0" }}>
							{props.accounts ? <Select fullwidth="true" name="account" value={props.accounts[0]}>
								{makeAccountSelect(props.accounts)}
							</Select> : null}
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box sx={{ background: "#1C3E64", borderRadius: "5px 5px 5px 20px", p: "1vh 1vw", m: "0 0 1vh 1vw" }}>
							<Typography sx={{ color: "white" }}>How many {<AlgoIcon fontSize="1rem" />}lgos would you like to donate?</Typography>
						</Box>
					</Grid>
					<Grid item xs={8}>
						<Box sx={{ p: "0.5vh 1vw 0 0 " }}>
							<TextField name="amount" type="text" inputProps={{ inputMode: 'decimal', pattern: '[0-9].*' }} step="0.01" fullwidth="true" variant="outlined" placeholder="0" InputProps={{ startAdornment: (<InputAdornment position="start"><AlgoIcon /></InputAdornment>) }}></TextField>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Button type="submit" variant="contained" color="secondary" fullwidth="true" sx={{ width: "100%", borderRadius: "0 0 20px 20px", p: "1vh 0 1vh 0", border: "5px groove rgba(255,255,255,0.2)", ":hover": { border: "5px ridge rgba(255,255,255,0.2)" } }}>
							<Typography fontSize="30px" variant="data" sx={{ color: "white" }}><b>SEND</b></Typography>
						</Button>
					</Grid>
				</Grid>
			</form>
		</Dialog>
	)

}

const AlertModal = (props) => {

}


export default Project;