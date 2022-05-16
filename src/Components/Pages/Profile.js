import React, { useState, useEffect } from "react";
import './Profile.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";



const Profile = (props) => {

    // const [passwordEditing, togglePasswordEditing] = useState(false);
    // const [nameEditing, toggleNameEditing] = useState(false);
    // const [emailEditing, toggleEmailEditing] = useState(false);
    const navigate = useNavigate();

    const userSlice = UserSlice.useSlice();

    let userRole = userSlice.userInfo.role;
    let userEmail = userSlice.userInfo.email;
    let userName = userSlice.userInfo.username;

    let projects = userSlice.userInfo.projects;
    let approved = userSlice.userInfo.approved;

    let projectsInProg = []
    let projectsCompleted = []

    useEffect(() => { 
        // setIsApproved(userSlice.userInfo.approved)
        return UserSlice.unsubscribe();
    },[])


    
    for (const project of projects) {
        if (project.projectOpen == true) {
            projectsInProg.push(project)
        }
        else if (project.projectOpen == false) {
            projectsCompleted.push(project)
        }
    }

    // const handlePasswordEditing = async (e) => { togglePasswordEditing(!passwordEditing); }
    // const handleNameEditing = async (e) => { toggleNameEditing(!nameEditing); }
    // const handleEmailEditing = async (e) => { toggleEmailEditing(!emailEditing); }

    const [approvedDialog, setApprovedDialog] = useState(!approved && userRole === "organization");

    const handleApprovedDialog = () => {
        if (approvedDialog) { setApprovedDialog(false); }
        else { setApprovedDialog(true); }
    };

    const handleOkayClicked = () => {
        if (approvedDialog) { setApprovedDialog(false); }
        else { setApprovedDialog(true); }
        navigate("/organization-auth-form", { replace: true });
    }

    return (

        <div className="basic-div basic-form profile-screen">
            <Dialog
                open={approvedDialog}
                onClose={handleApprovedDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Please Submit Authorization Form"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your action will be limited since you are not approved yet.
                        To be approved, please submit the authorization form.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleApprovedDialog}>Cancel</Button>
                    <Button onClick={handleOkayClicked} autoFocus>Okay</Button>
                </DialogActions>
            </Dialog>

            <p className="account-page-title">My Profile</p>
            <div className="profile-container basic-group">
                <div className="p-user-name-area ">
                    {/* {nameEditing ?
                        <input id="p-user-name-input" onBlur={handleNameEditing}></input>
                        : */}
                        <p className="profile-label" id="p-user-name">[ {userName} ]</p>
                    {/* } */}
                    {/* <p onClick={handleNameEditing} className="edit-info">edit</p> */}
                </div>

                <div className="user-status">
                    {(userRole === "donor" || approved) ?
                        <p className="approved-tag">{userRole}</p>
                        :
                        <p className="not-approved-tag">{userRole}</p>
                    }
                </div>

                <div className="project-inprogress profile-label">My Projects In Progress</div>
                <div className="project-completed profile-label">My Projects Completed</div>


                <div className="project-inprogress-box">
                    <div className="active-project-container my-project-container">
                        {
                            (projectsInProg.length == 0) ?
                                <div className="no-project">No Projects In Progress</div>
                                :
                                <ProjectTiling projects={projectsInProg} />
                        }

                    </div>
                </div>
                <div className="project-completed-box">
                    <div className="non-active-project-container my-project-container">
                        {
                            (projectsCompleted.length == 0) ?
                                <div className="no-project">No Projects Completed</div>
                                :
                                <ProjectTiling projects={projectsCompleted} />
                        }

                    </div>
                </div>
                <div className="email-label profile-label">Email</div>
                <div className="p-email">
                    {/* {emailEditing ?
                        <input id="p-email-input" onBlur={handleEmailEditing}></input>
                        : */}
                        <p id="p-email">{userEmail}</p>
                    {/* } */}
                    {/* <p onClick={handleEmailEditing} className="edit-info">edit</p> */}
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
                    key={project._id}
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
                <div className="project-list-title">[ {props.title.length > 63 ? props.title.substring(0,64) + "..." : props.title} ]</div>
                <div className="project-list-item-prog">{props.progress}%</div>
            </div>
        </Link>
    );
}



export default Profile;