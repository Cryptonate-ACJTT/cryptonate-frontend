import React from "react";
import './Home.css'
import image from './Images/image1.png'

const Home = (props) => {
    return (
        <div className="basic-div container-center">
            <div>
                <h1 className="title">CHANGE THE WORLD <br/>WITH CRYPTONATE</h1>
                <h className="tagline">blockchain for a better tomorrow</h>
            <img className="home-screen-image" src={image} alt="img" />
            </div>
           
        </div>
    )
}

export default Home;

