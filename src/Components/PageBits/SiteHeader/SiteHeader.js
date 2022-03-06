import React from "react";
import './SiteHeader.css';

import SiteHeaderButton from "./SiteHeaderButton/SiteHeaderButton";

const SiteHeader = (props) => {

    return (
        <header className="site-hdr">
            <div className="site-hdr-logo-div"/>
            <div className="site-hdr-btn-div">
                <SiteHeaderButton btnText="Home" onClick={props.onClick}/>
                <SiteHeaderButton btnText="Explore" onClick={props.onClick}/>
                <SiteHeaderButton btnText="About" onClick={props.onClick}/>
                <SiteHeaderButton btnText="Why Crypto?" onClick={props.onClick}/>
                <SiteHeaderButton btnText="Login | Sign Up" onClick={props.onClick}/>
            </div>
        </header>
    );
}

export default SiteHeader;