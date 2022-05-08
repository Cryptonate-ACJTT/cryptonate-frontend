import { Grid, Typography, Box,CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFPStats } from "../../Fetch/ApiFetches";
import image from './Images/image1.png'

const Home = (props) => {

	let [stats, setStats] = useState({});

	useEffect(() => {
		getFPStats({callback: (data) => {
			setStats(data);
		}});
	}, []);

    return (	
		<Grid sx={{pr:"3.5vw",pl:"3.5vw"}}>
		<Grid container alignItems="center" >
			<Grid item xs={7} sx={{pt:"3vw"}} >
				<Typography variant="title">CHANGE THE WORLD<br/> WITH <b>CRYPTONATE</b></Typography>
					<br/><br/>
				<Typography variant="tagline">blockchain for a better tomorrow</Typography>
				<Box ml="10vw" mr="10vw" pt="2vh" sx={{borderTop: "3px dotted rgba(0,0,0,0.2)"}}>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<Typography variant="stats">Fundraisers</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="stats">Donated</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="stats">Donors</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="stats">{stats ? stats.fundraiserCount : 0}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="stats">{stats ? stats.total : 0}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="stats">{stats ? stats.donorCount : 0}</Typography>
						</Grid>
					</Grid>
				</Box>
			</Grid>
			<Grid item xs={5}>
				<Box>
				<CardMedia  component="img" image={image} alt="img" />
				</Box>
			</Grid>
		</Grid>
		</Grid>
    )
}

export default Home;

