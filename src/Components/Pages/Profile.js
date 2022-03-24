import React, { Profiler, useState } from "react";
import './Profile.css'

const Profile = (props) => {

    return (

        <div class="profile-screen">

            <div class="profile-container">
                <div class = "profile-title-container">
                    <h class="profile-user-name">[ USER NAME ]</h>
                    <h class="approve-tag">Approved</h>
                </div>

                <div class="approved-project-container">

                </div>
            </div>
        </div>

    );

}


export default Profile;