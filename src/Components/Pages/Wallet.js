import React, { useEffect, useState } from "react";
import './Default.css'	// was messing around with this pay no mind.
import { API_ROUTES, postToBackend } from "../../Fetch/ApiFetches";
import './Wallet.css'
import { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";
import logo from "./Images/algorand_logo_mark_black.svg";
// class Wallet extends React.Component {

const Wallet = (props) => {
    const slice = UserSlice.useSlice();


	const slice = props.userSlice;

	const [accounts, setAccounts] = useState([]);


	useEffect(() => {
		let acc = [];

		(async () => {
			let addrs = slice.userInfo.wallet.accounts;
			for(let i = 0; i < addrs.length; i++) {
				await postToBackend(API_ROUTES.BACKEND.CHECK_BALANCE, {address: addrs[i]}, {callback: (data) => {
					acc.push({
						address: addrs[i], 
						balance: data.balance}
					);
				}});
			}
			console.log(acc);
			setAccounts(acc);
		})();

	}, [slice.userInfo.wallet.accounts]);


	const addWallet = (e) => {
		// nauw
	}

	const generateWallet = (e) => {
		postToBackend(API_ROUTES.BACKEND.CREATE_WALLET, {
			email: slice.userInfo.email,
			role: slice.userInfo.role
		}, {
			credentials: true, 
			callback: (data) => {
				userReducers.userWalletFxn(data.wallet);
			}
		});
	}


	const addWalletAccounts = (accounts) => {
		let accountsReturned = [];

		for(let i = 0; i < accounts.length; i++) {
			accountsReturned.push(
				<div key={i} className="page-informatic basic-description flex-vertical">
					<div className="account-id vflex-75">{accounts[i].address}</div>
					<div className="account-balance vflex-25">
						Balance: {accounts[i].balance}<img src={logo} style={{"height":"2.5em", "display":"inline"}}/>
					</div>
				</div>
			);
		}

		return accountsReturned;
	}

	if(!slice.userInfo.wallet) {
		return (
			<div className="page-container">
				<h1 class="page-title">My Wallet</h1>
				<hr/>
				<p className="basic-description">You don't have a wallet yet!</p>
				<p className="basic-description">
					<button onClick={addWallet}>CONNECT</button> or <button onClick={generateWallet}>GENERATE</button> one now!
				</p>
			</div>
		)
	} else {
		return (
			<div className="page-container">
				<h1 class="page-title">My Wallet</h1>
				<hr/>
				<div className="page-content-group">
					{addWalletAccounts(accounts)}
				</div>
			</div>
		)
	}

	/*
	<div className="flex-horizontal">
					<div className="page-content-group vflex-40" style={{"background-color": "red"}}>

					</div>
					<div className="page-content-group vflex-60" style={{"background-color":"yellow"}}/>
				</div>
				*/
	/*
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
                    </div> }
            </div>
        </div>


    );*/



}
export default Wallet;