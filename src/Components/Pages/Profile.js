import React, { useState, useEffect } from "react";
import './Profile.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";
import { Link } from "react-router-dom";


const Profile = (props) => {

    const userSlice = UserSlice.useSlice();

    let userRole = userSlice.userInfo.role;
    let userEmail = userSlice.userInfo.email;
    let userName = userSlice.userInfo.username;

    let projects = userSlice.userInfo.projects;

    console.log(projects)


    const [passwordEditing, togglePasswordEditing] = useState(false);
    const [nameEditing, toggleNameEditing] = useState(false);
    const [emailEditing, toggleEmailEditing] = useState(false);


    const handlePasswordEditing = async (e) => { togglePasswordEditing(!passwordEditing); }

    const handleNameEditing = async (e) => { toggleNameEditing(!nameEditing); }

    const handleEmailEditing = async (e) => { toggleEmailEditing(!emailEditing); }

    let projectLabel = {
        donorInProgress: "Donated Project In Progress",
        donorCompleted: "Donated Project Completed"
    }

    return (

        <div class="basic-div basic-form profile-screen">

            <h class="account-page-title">My Profile</h>
            <div class="profile-container basic-group">
                <div class="p-user-name-area ">
                    {nameEditing ?
                        <input id="p-user-name-input" onBlur={handleNameEditing}></input>
                        :
                        <h class="profile-label" id="p-user-name">[ {userName} ]</h>
                    }
                    <text onClick={handleNameEditing} class="edit-info">edit</text>
                </div>

                <div class="user-status"> <h class="approve-tag">{userRole}</h></div>
                <div class="project-inprogress profile-label">My Projects In Progress</div>
                <div class="project-completed profile-label">My Projects Completed</div>


                <div class="project-inprogress-box">
                    <div class="active-project-container my-project-container">
                        <ProjectTiling slice={userSlice} />
                    </div>
                </div>
                <div class="project-completed-box">
                    <div class="non-active-project-container my-project-container"></div>
                </div>
                <div class="email-label profile-label">Email</div>
                <div class="p-email">
                    {emailEditing ?
                        <input id="p-email-input" onBlur={handleEmailEditing}></input>
                        :
                        <h id="p-email">{userEmail}</h>
                    }
                    <text onClick={handleEmailEditing} class="edit-info">edit</text>
                </div>
                {/* <div class="password-label profile-label">Password</div> */}
                {/* <div class="p-password"> */}
                {/* {passwordEditing ? */}
                {/* <input id="p-password-input" type="password" onBlur={handlePasswordEditing} defaultValue={slice.password}></input> */}
                {/* : */}
                {/* <h id="p-password">{slice.password}</h> */}
                {/* } */}
                {/* <text onClick={handlePasswordEditing} class="edit-info">edit</text> */}
                {/* <EditOutlinedIcon id="edit-icon"  onClick={handlePasswordEditing}></EditOutlinedIcon> */}
                {/* </div> */}

            </div>
        </div>

    );

}

const ProjectTiling = (props) => {

    let [tiles, setTiles] = useState([]);

    useEffect(() => {
        setTiles(makeTiles(props.slice.userInfo.projects.slice()));
    }, [props.slice.userInfo.projects]);


    const makeTiles = (projects) => {
        let tiling = [];
        for (const project of projects) {
            tiling.push(
                <ProjectTile
                    id={project._id}
                    title={project.projectName}
                    progress={Math.floor(project.totalSaved / project.goalAmount) * 100}
                />
            );
        }

        return tiling;
    }

    return (
        <div>
            <div className="project-tiling">
                {tiles}
            </div>
        </div>
    );
}

const ProjectTile = (props) => {
    return (
        <div>
            <Link to={"/explore/project" + props.id}>
                <div className="project-list-item">
                    <h4 className="project-list-title">{props.title}</h4>
                    <h4 className="project-list-title">{props.progress}</h4>

                </div>
            </Link>
        </div>
    );
}



export default Profile;