import React from "react";
import './SiteHeader.css';

import Home from "../../Pages/Home";
import Explore from "../../Pages/Explore";
import About from "../../Pages/About";


import SiteHeaderButton from "./SiteHeaderButton/SiteHeaderButton";
import WhyCrypto from "../../Pages/WhyCrypto";
import SignUpLogin from "../../Pages/SignUpLogin";

const SiteHeader = (props) => {

    return (
        <header className="site-hdr">
            <div className="site-hdr-logo-div"/>
            <div className="site-hdr-btn-div">
                <SiteHeaderButton btnText="Home" onClick={props.onClick} page={<Home/>}/>
                <SiteHeaderButton btnText="Explore" onClick={props.onClick} page={<Explore/>}/>
                <SiteHeaderButton btnText="About Us" onClick={props.onClick} page={<About/>}/>
                <SiteHeaderButton btnText="Why Crypto?" onClick={props.onClick} page={<WhyCrypto/>}/>
                <SiteHeaderButton btnText="Login | Sign Up" onClick={props.onClick} page={<SignUpLogin/>}/>
            </div>
        </header>
    );
}

export default SiteHeader;