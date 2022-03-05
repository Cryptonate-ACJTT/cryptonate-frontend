import React from "react";
import './SiteHeader.css';

import SiteHeaderButton from "./SiteHeaderButton/SiteHeaderButton";

const SiteHeader = (props) => {

    return (
        <header className="site-hdr">
            <div className="site-hdr-logo-div"/>
            <div className="site-hdr-btn-div">
                <SiteHeaderButton btnText="Home"/>
                <SiteHeaderButton btnText="Explore"/>
                <SiteHeaderButton btnText="About"/>
                <SiteHeaderButton btnText="Why Crypto?"/>
                <SiteHeaderButton btnText="Login | Sign Up"/>
            </div>
        </header>
    );
}

export default SiteHeader;