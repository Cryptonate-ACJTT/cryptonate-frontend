import { Grid, Typography, Box } from "@mui/material";

import React, { useEffect, useState } from "react";
import { getFPStats } from "../../Fetch/ApiFetches";
import './Home.css'
import image from './Images/image1.png'

const Home = (props) => {

	let [stats, setStats] = useState({});

	useEffect(() => {
		getFPStats({callback: (data) => {
			setStats(data);
		}});
	}, []);

    return (	
		<Grid container spacing={2} alignItems="center" mt="20vh">
			<img className="home-screen-image" src={image} alt="img" />
			<Grid item xs={9}>
				<Typography variant="title">CHANGE THE WORLD<br/> WITH CRYPTONATE</Typography>
					<br/><br/>
				<Typography variant="tagline">blockchain for a better tomorrow</Typography>
			</Grid>
			<Grid item xs={3}/>
			<Grid item xs={9}>
				<Box ml="15vw" mr="15vw" pt="2vh" sx={{borderTop: "3px dotted rgba(0,0,0,0.2)"}}>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<Typography variant="stats">Open Fundraisers</Typography>
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
		</Grid>
    )
}

/*<div className="basic-div container-center">
            <div>
                <h1 className="title">CHANGE THE WORLD <br/>WITH CRYPTONATE</h1>
                <h2 className="tagline">blockchain for a better tomorrow</h2>
            <img className="home-screen-image" src={image} alt="img" />
            </div>

			<div className="home-stats">
				
				<table>
					<thead>
						<tr>
							<th>{stats ? stats.fundraiserCount : 0}</th>
							<th>{stats ? stats.total : 0}</th>
							<th>{stats ? stats.donorCount : 0}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Open Fundraisers</td>
							<td>Donated</td>
							<td>Donors</td>
						</tr>
					</tbody>
				</table>
			</div>
        </div>*/

export default Home;

