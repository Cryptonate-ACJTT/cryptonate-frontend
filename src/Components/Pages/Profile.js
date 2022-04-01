import React, { useState } from "react";
import './Profile.css'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const Profile = (props) => {

    const [passwordEditing, togglePasswordEditing] = useState(false);
    const [nameEditing, toggleNameEditing] = useState(false);
    const [emailEditing, toggleEmailEditing] = useState(false);


    const handlePasswordEditing = async (e) => {
        togglePasswordEditing(!passwordEditing);
        console.log(passwordEditing);
    }

    const handleNameEditing = async (e) => {
        toggleNameEditing(!nameEditing);
        console.log(nameEditing);
    }

    const handleEmailEditing = async (e) => {
        toggleEmailEditing(!emailEditing);
        console.log(emailEditing);
    }

    return (

        <div class="basic-div basic-form profile-screen">

            <h class="account-page-title">My Profile</h>
            <div class="profile-container basic-group">
                <div class="p-user-name-area ">
                    {nameEditing ? 
                    <input id="p-user-name-input" onBlur={handleNameEditing}></input>
                    :
                    <h class="profile-label" id="p-user-name">[ USER NAME ]</h>
                    }
                    <text onClick={handleNameEditing} class="edit-info">edit</text>
                </div>

                <div class="user-status"> <h class="approve-tag">Donor</h> </div>
                <div class="project-inprogress profile-label">Donated Project In Progress</div>
                <div class="project-completed profile-label">Donated Project Completed</div>
                <div class="project-inprogress-box">
                    <div class="active-project-container project-container"></div>
                </div>
                <div class="project-completed-box">
                    <div class="non-active-project-container project-container"></div>
                </div>
                <div class="email-label profile-label">Email</div>
                <div class="p-email">
                    {emailEditing ?
                        <input id="p-email-input" onBlur={handleEmailEditing}></input>
                        :
                        <h id="p-email">USEREMAIL@EMAIL.COM</h>
                    }
                    <text onClick={handleEmailEditing} class="edit-info">edit</text>
                </div>
                <div class="password-label profile-label">Password</div>
                <div class="p-password">
                    {passwordEditing ?
                        <input id="p-password-input" type={"password"} onBlur={handlePasswordEditing}></input>
                        :
                        <h id="p-password">SOME PASSWORD</h>
                    }
                    {/* <text onClick={handlePasswordEditing} class="edit-info">edit</text> */}
                    <EditOutlinedIcon id="edit-icon"  onClick={handlePasswordEditing}></EditOutlinedIcon>
                </div>

            </div>
        </div>

    );

}


export default Profile;