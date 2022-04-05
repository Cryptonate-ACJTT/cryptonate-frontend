import React, { useEffect, useState } from "react";
import { API_ROUTES, getFromBackend } from "../../Fetch/ApiFetches";
import './Home.css'
import image from './Images/image1.png'

const Home = (props) => {

	let [stats, setStats] = useState({});

	useEffect(() => {
		getFromBackend(API_ROUTES.BACKEND.FRONTPAGE_STATS, {callback: (data) => {
			setStats(data);
		}});
	}, []);

    return (
        <div className="basic-div container-center">
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
        </div>
    )
}

export default Home;

