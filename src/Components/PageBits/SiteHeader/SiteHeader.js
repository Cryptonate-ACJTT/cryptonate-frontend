import React, { useState } from "react";
import './SiteHeader.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


import Home from "../../Pages/Home";
import Explore from "../../Pages/Explore";
import About from "../../Pages/About";
import Profile from "../../Pages/Profile";
import AuthenticationForm from "../../Pages/AuthenticationForm";
// import Wallet from "../../Pages/Wallet";



import SiteHeaderButton from "./SiteHeaderButton/SiteHeaderButton";
import WhyCrypto from "../../Pages/WhyCrypto";
import SignUpLogin from "../../Pages/SignUpLogin";
import image from '../../Pages/Images/cryptonate-logo.png'


import { Link } from 'react-router-dom'



const SiteHeader = (props) => {

    const [loggedIn, toggleloggedIn] = useState(true);

    const handleLogout = async (e) => {
        toggleloggedIn(false);
        console.log(loggedIn);
    }


    return (
        <nav className="site-hdr">
            <div className="site-hdr-logo-div">
                <img class="site-hdr-logo" src={image} alt="img" />
                <Link to="/">
                    <div id="site-hdr-name" page={Home} >CRYPTONATE</div>
                </Link>

            </div>
            <div className="site-hdr-btn-div">
                <Link to="/home">
                    <SiteHeaderButton btnText="Home" page={Home} />
                </Link>
                <Link to="/explore">
                    <SiteHeaderButton btnText="Explore" page={Explore} />
                </Link>
                <Link to="/about">
                    <SiteHeaderButton btnText="About" page={About} />
                </Link>
                <Link to="/why-crypto">
                    <SiteHeaderButton btnText="Why Crypto" page={WhyCrypto} />
                </Link>
                {loggedIn ?
                    <div class="dropdown">
                        {/* <div class="dropbtn">My Account</div> */}
                        <AccountCircleOutlinedIcon sx={{ml:1, mr:1}}></AccountCircleOutlinedIcon>


                        <div class="dropdown-content">
                            <Link to ="/profile"> Profile</Link>
                            <Link to ="/wallet"> Wallet</Link>
                            <Link to ="/authentication-form"> Form</Link>
                            <a href="#" onClick={handleLogout}>Log Out</a>
                        </div>
                    </div>
                    :
                    <Link to="/login-signup">
                        <SiteHeaderButton btnText="Login | Sign Up" page={SignUpLogin} />
                    </Link>

                }





            </div>
        </nav>


    );
}

export default SiteHeader;