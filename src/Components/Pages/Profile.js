import React, { useState, useEffect } from "react";
import './Profile.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";
import { Link } from "react-router-dom";


const Profile = (props) => {

    const [passwordEditing, togglePasswordEditing] = useState(false);
    const [nameEditing, toggleNameEditing] = useState(false);
    const [emailEditing, toggleEmailEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


    const userSlice = UserSlice.useSlice();

    let userRole = userSlice.userInfo.role;
    let userEmail = userSlice.userInfo.email;
    let userName = userSlice.userInfo.username;

    let projects = userSlice.userInfo.projects;

    let projectsInProg = []
    let projectsCompleted = []

    for (const project of projects){
        if(project.projectOpen == true){
            projectsInProg.push(project)
        }
        else if(project.projectOpen == false){
            projectsCompleted.push(project)
        }
    }


    if (userRole == "admin") {
        setIsAdmin(true)
    }


    const handlePasswordEditing = async (e) => { togglePasswordEditing(!passwordEditing); }
    const handleNameEditing = async (e) => { toggleNameEditing(!nameEditing); }
    const handleEmailEditing = async (e) => { toggleEmailEditing(!emailEditing); }

    let projectInProgressLabel = ""
    let projectCompletedLabel = ""


    if (userRole == "admin") {
        projectInProgressLabel = "Organizations To Be Authorized"
        projectCompletedLabel = "Authorizaed Organizations"
    }
    else {
        projectInProgressLabel = "My Projects In Progress"
        projectCompletedLabel = "My Projects Completed"
    }


    return (

        <div className="basic-div basic-form profile-screen">

            <h className="account-page-title">My Profile</h>
            <div className="profile-container basic-group">
                <div className="p-user-name-area ">
                    {nameEditing ?
                        <input id="p-user-name-input" onBlur={handleNameEditing}></input>
                        :
                        <h className="profile-label" id="p-user-name">[ {userName} ]</h>
                    }
                    <text onClick={handleNameEditing} className="edit-info">edit</text>
                </div>

                <div className="user-status"> <h className="approve-tag">{userRole}</h></div>

                <div className="project-inprogress profile-label">{projectInProgressLabel}</div>
                <div className="project-completed profile-label">{projectCompletedLabel}</div>


                <div className="project-inprogress-box">
                    <div className="active-project-container my-project-container">
                        {
                            (projectsInProg.length == 0)?
                            <div className="no-project">No Projects In Progress</div>
                            :
                            <ProjectTiling projects={projectsInProg} />
                        }
                        
                    </div>
                </div>
                <div className="project-completed-box">
                    <div className="non-active-project-container my-project-container">
                        {
                            (projectsCompleted.length == 0)?
                            <div className="no-project">No Projects Completed</div>
                            :
                            <ProjectTiling projects={projectsCompleted} />
                        }
                        
                    </div>
                </div>
                <div className="email-label profile-label">Email</div>
                <div className="p-email">
                    {emailEditing ?
                        <input id="p-email-input" onBlur={handleEmailEditing}></input>
                        :
                        <h id="p-email">{userEmail}</h>
                    }
                    <text onClick={handleEmailEditing} className="edit-info">edit</text>
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
        setTiles(makeTiles(props.projects.slice()));
    }, [props.projects]);


    const makeTiles = (projects) => {
        let tiling = [];
        for (const project of projects) {
            tiling.push(
                <ProjectTile
                    key = {project._id}
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
        <Link to={"/explore/project/" + props.id}>
            <div className="project-list-item">
                <div className="project-list-title" >[ {props.title} ]</div>
                <div className="project-list-item-prog">{props.progress}%</div>
            </div>
        </Link>
    );
}



export default Profile;