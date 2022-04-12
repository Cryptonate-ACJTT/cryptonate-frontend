import React, { useState } from "react";
import './Wallet.css'
import UserSlice, { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";


const Wallet = (props) => {
    const slice = UserSlice.useSlice();


    return (
        <div class="basic-div profile-screen">

            <h class="account-page-title">My Wallet</h>
            <div class="wallet-container basic-group">
                <div class="w-user-name-area ">
                    <div class="profile-label" id="p-user-name" >[ {slice.username} ] 's Wallet</div>
                </div>
                <div class="w-user-status">  <h class="approve-tag">{slice.role}</h></div>
                <div class="change-wallet"><button >Change Wallet</button></div>

                <div class="balance-tag-area"> <div class="tag-box">Balance</div></div>
                <div class="balance-area">
                    <div class="balance-box wallet-box"></div>
                </div>
                <div class="transaction-tag-area"><div class="tag-box">Transactions</div></div>
                <div class="transaction-container">
                    <div class="transaction-box wallet-box"></div>

                </div>
                {/* <div class="project-inprogress profile-label">Donated Project In Progress</div>
                    <div class="project-completed profile-label">Donated Project Completed</div>
                    <div class="project-inprogress-box">
                        <div class="active-project-container"></div>
                    </div>
                    <div class="project-completed-box">
                        <div class="non-active-project-container"></div>
                    </div> */}
            </div>
        </div>


    );




}
export default Wallet;