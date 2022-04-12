import React, { useState } from "react";
import './SiteHeader.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import SiteHeaderButton from "./SiteHeaderButton/SiteHeaderButton";
import image from '../../Pages/Images/cryptonate-logo.png'

import { Link, Navigate } from 'react-router-dom'
import UserSlice, { reducerFxns as userReducers } from "../../../Redux/Slices/UserSlice";

const SiteHeader = (props) => {

	const slice = UserSlice.useSlice();

    const handleLogout = (e) => {
        userReducers.userLogoutFxn();
		<Navigate to="/"/>
    }

    return (
        <nav className="site-hdr">
            <div className="site-hdr-logo-div">
                <img className="site-hdr-logo" src={image} alt="img" />
                <Link to="/">
                    <div id="site-hdr-name">CRYPTONATE</div>
                </Link>

            </div>
            <div className="site-hdr-btn-div">
                <Link to="/home">
                    <SiteHeaderButton btnText="Home"/>
                </Link>
                <Link to="/explore">
                    <SiteHeaderButton btnText="Explore"/>
                </Link>
                <Link to="/about">
                    <SiteHeaderButton btnText="About"/>
                </Link>
                <Link to="/why-crypto">
                    <SiteHeaderButton btnText="Why Crypto"/>
                </Link>
                {slice.loggedIn ?
                    <div className="dropdown">
                        {/* <div class="dropbtn">My Account</div> */}
                        <AccountCircleOutlinedIcon sx={{ml:1, mr:1}}></AccountCircleOutlinedIcon>

                        <div className="dropdown-content">
                            <Link to ="/profile"> Profile</Link>
                            <Link to ="/wallet"> Wallet</Link>
                            <Link to ="/organization-auth-form"> Form</Link>
							<Link to ="/logout" onClick={handleLogout}>Log Out</Link>
                            
                        </div>
                    </div>
                    :
                    <Link to="/login-signup">
                        <SiteHeaderButton btnText="Login | Sign Up"/>
                    </Link>

                }
            </div>
        </nav>


    );
}

export default SiteHeader;