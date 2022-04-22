import React, { useEffect, useState } from "react";
import './Default.css'	// was messing around with this pay no mind.
import { API_ROUTES, getAccountTxns, postToBackend, txnBasic } from "../../Fetch/ApiFetches";
import './Wallet.css'
import { reducerFxns as userReducers } from "../../Redux/Slices/UserSlice";
import { Accordion, AccordionSummary, AccordionDetails, Grid, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { DataGrid, getGridColDef } from "@mui/x-data-grid"
import { ExpandMoreRounded } from "@mui/icons-material";
//import logo from "./Images/algorand_logo_mark_black.svg";
// class Wallet extends React.Component {

const Wallet = (props) => {


	const slice = props.userSlice;

	const [accounts, setAccounts] = useState([]);

	console.log(slice);

	useEffect(() => {
		let acc = [];

		(async () => {
			let addrs = slice.userInfo.wallet.accounts;
			for(let i = 0; i < addrs.length; i++) {
				await postToBackend(API_ROUTES.BACKEND.CHECK_BALANCE, {address: addrs[i]}, {callback: (data) => {
					acc.push({
						address: addrs[i], 
						balance: data.balance
					});
				}});
			}
			console.log(acc);
			setAccounts(acc);
		})();

	}, [slice.userInfo.wallet.accounts]);


	const getBalances = () => {
		
	}
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
				<WalletAccordion key={i} address={accounts[i].address} balance={accounts[i].balance}/>

				/*
				<div key={i} className="page-informatic basic-description flex-vertical">
					<div className="account-id vflex-75">{accounts[i].address}</div>
					<div className="account-balance vflex-25">
						Balance: {accounts[i].balance}<img src={null} style={{"height":"2.5em", "display":"inline"}}/>
					</div>
				</div>*/
			);
		}

		return accountsReturned;
	}

	const testTxn = (e) => {
		console.log(e.target.value);
		console.log(slice.userInfo);
		txnBasic(slice.userInfo, slice.userInfo.wallet.accounts[0], "MGTGN4OD5PFCOSDAQK5OP6S2PKOU2K6L3CVDYZNPCSIP2BBSQ46TX2HUEE", 10000, {callback: (data) => {
			console.log(data);
		}})
	}

	if(!slice.userInfo.wallet) {
		return (
			<div className="page-container">
				<h1 class="page-title">My Wallet</h1>
				<hr/>
				<p className="basic-description">You don't have a wallet yet!</p>
				<p className="basic-description">
					<button onClick={addWallet} disabled>CONNECT</button> or <button onClick={generateWallet}>GENERATE</button> one now!
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
				<button onClick={testTxn}>Test send</button>
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

const WalletAccordion = (props) => {

	const [open, setOpen] = useState(false);	// is the accordion open?
	const [accData, setAccData] = useState(null);
	const [tableData, setTableData] = useState(null);

	useEffect(() => {

	});

	const openAccordion = () => {
		if(!open) {
			setOpen(true);

			if(accData === null) {
				console.log("Sending shit");
				getAccountTxns(props.address, {callback: (data) => {
					let filtered = data.txns.transactions.filter(txn => txn["tx-type"] == "pay");
					setAccData(filtered);
					dataExploration(filtered);
				}});
			}
		} else {
			setOpen(false);
		}
	}

	const dataExploration = (txns) => {
		let dataCols = [
			{ field: "id", headerName: "ID", minWidth: "80", flex: 2 },
			{ field: "toFrom", headerName: "To / From", minWidth: "30", flex: 1 },
			{ field: "account", headerName: "Account", minWidth: "80", flex: 2 },
			{ field: "amount", headerName: "Amount", minWidth: "50", flex: 1 },
			{ field: "fee", headerName: "Fee", minWidth: "30", flex: 1 },
			{ field: "time", headerName: "Date", minWidth: "50", flex: 1 }
		]

		let tbData = [];

		
		for(let i = 0; i < txns.length; i++) {

			/*
			let tbCell = {
				id: txns[i].id,
				toFrom: txns[i].sender === props.address ? "Outgoing ->" : "Incoming <-",
				amount: txns[i]["payment-transaction"].amount,
				fee: txns[i].fee
			}*/

			console.log(Date.now(), txns[i]["round-time"]);

			tbData.push({
				id: txns[i].id,
				toFrom: txns[i].sender === props.address ? "Outgoing ->" : "Incoming <-",
				account: txns[i].sender === props.address ? txns[i]["payment-transaction"].receiver : txns[i].sender,
				amount: txns[i]["payment-transaction"].amount,
				fee: txns[i].fee,
				time: new Date(txns[i]["round-time"] * 1000).toString()
			});
		}


		setTableData(
			<div style={{display:"flex", height:"350px", width:"100%"}}>
				<DataGrid
					rows={tbData}
					columns={dataCols}
					pageSize={5}
					rowsPerPageOptions={[5]}
					columnBuffer={8}
				/>
			</div>
		);
	}

	return (
		<Accordion expanded={open}>
			<AccordionSummary expandIcon={<ExpandMoreRounded/>} onClick={openAccordion}>
				<Grid container spacing={2}>
					<Grid item xs={8}>{props.address}</Grid>
					<Grid item xs={4}>{props.balance}</Grid>
				</Grid>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						{open ? tableData : null}
					</Grid>
					<Grid item xs={4}>

					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);

	/*
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>To/From</TableCell>
									<TableCell>Amount</TableCell>
									<TableCell>Fee</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{open ? tableData : null}
							</TableBody>
						</Table>
						*/

}

export default Wallet;