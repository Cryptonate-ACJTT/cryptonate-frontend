import React, { useEffect, useState } from "react";
import { API_ROUTES, getAccountTxns, postToBackend, txnBasic } from "../../Fetch/ApiFetches";
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Paper, Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { ExpandMoreRounded } from "@mui/icons-material";
import Visualizer from "../PageBits/Visualize/Visualize";
//import logo from "./Images/algorand_logo_mark_black.svg";
// class Wallet extends React.Component {

const Wallet = (props) => {
	const slice = props.userSlice;

	const [accounts, setAccounts] = useState([]);

	/**
	 * Get account balances;
	 */
	useEffect(() => {
		let acc = [];

		(async () => {
			let addrs = slice.userInfo.wallet.accounts;
			await postToBackend(API_ROUTES.BACKEND.CHECK_BALANCE, {addresses: addrs}, {callback: (data) => {
				for(let account of data.balances) {
					acc.push(account);
				}
			}});
			
			setAccounts(acc);
		})();

	}, [slice.userInfo.wallet.accounts]);



	const addWalletAccounts = (accounts) => {
		let accountsReturned = [];

		for(let i = 0; i < accounts.length; i++) {
			accountsReturned.push(
				<WalletAccordion key={i} address={accounts[i].address} balance={accounts[i].balance}/>
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

	return (
		<Box className="page-container">
			<Typography variant="h3" sx={{mb: "20px", borderBottom: "3px solid rgba(0,0,0,0.2)"}}>My Wallet</Typography>
			
			<div>
				<Paper elevation={1} mt="100px">
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Typography variant="h4">Account</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h4">Balance</Typography>
					</Grid>
				</Grid>
				</Paper>
				{addWalletAccounts(accounts)}
			</div>
			<button onClick={testTxn}>Test send</button>
		</Box>
	)
	
}

const WalletAccordion = (props) => {

	const [open, setOpen] = useState(false);	// is the accordion open?
	const [accData, setAccData] = useState(null);
	const [tableData, setTableData] = useState(null);


	/**
	 * Open/close the accordion, and populate data to it if none yet exists.
	 */
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

	/**
	 * Create a DataGrid containing account transaction information.
	 * @param {*} txns 
	 */
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
			<div style={{display:"flex", height:"320px", width:"100%"}}>
				<DataGrid
					rows={tbData}
					columns={dataCols}
					pageSize={5}
					rowsPerPageOptions={[5]}
					columnBuffer={8}
					disableSelectionOnClick
					disableColumnFilter
					disableColumnMenu
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
			<AccordionDetails sx={{borderTop: "3px dotted rgba(0,0,0,0.2)"}}>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Typography variant="h6">Transaction History</Typography>
						{open ? tableData : null}
					</Grid>
					<Grid item xs={4}>
						<Typography variant="h6">Visualization</Typography>
						<Visualizer variant="mini" height="320px"/>
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
}

export default Wallet;