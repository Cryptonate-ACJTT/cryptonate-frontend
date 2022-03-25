import React, { useState } from "react";
import './Profile.css'


const Profile = (props) => {

    const [editing, toggleEditing] = useState(false);

    const handleEditing = async (e) => {
        toggleEditing(!editing);
        console.log(editing);
    }

    return (

        <div class="profile-screen">

            <h class="page-title">My Profile</h>
            <div class="profile-container">
                <div class="p-user-name-area ">
                    <h class="profile-label" id="p-user-name">[ USER NAME ]</h>
                    <text onClick={handleEditing} class="edit-info">edit</text>
                </div>

                <div class="user-status"> <h class="approve-tag">Donor</h> </div>
                <div class="project-inprogress profile-label">Donated Project In Progress</div>
                <div class="project-completed profile-label">Donated Project Completed</div>
                <div class="project-inprogress-box">
                    <div class="active-project-container"></div>
                </div>
                <div class="project-completed-box">
                    <div class="non-active-project-container"></div>
                </div>
                <div class="email-label profile-label">Email</div>
                <div class="p-email">
                    {editing ?
                        <input type={"text"} id="p-email">USEREMAIL@EMAIL.COM</input>
                        :
                        <h id="p-email">USEREMAIL@EMAIL.COM</h>
                    }
                    <text onClick={handleEditing} class="edit-info">edit</text>
                </div>
                <div class="password-label profile-label">Password</div>
                <div class="p-password">
                    <password id="p-email-input">SOME PASSWORD</password>
                    <text onClick={handleEditing} class="edit-info">edit</text>
                </div>

            </div>
        </div>

    );

}


export default Profile;