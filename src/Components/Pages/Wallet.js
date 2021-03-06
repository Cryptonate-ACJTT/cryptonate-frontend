import React, { useEffect, useState } from "react";
import { API_ROUTES, getAccountTxns, postToBackend } from "../../Fetch/ApiFetches";
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Paper, Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { ExpandMoreRounded } from "@mui/icons-material";
import PageContainer from "../PageBits/PageContainer/PageContainer";
import { AlgoIcon } from "../PageBits/Icons/Icons";
//import logo from "./Images/algorand_logo_mark_black.svg";
// class Wallet extends React.Component {

const Wallet = (props) => {
	const slice = props.userSlice;

	const [accounts, setAccounts] = useState([]);
	const [mainWalletInfo, setMainWalletInfo] = useState([]);

	/**
	 * Get account balances;
	 */
	useEffect(() => {
		let acc = [];
		let mainWallet = null;

		(async () => {
			let addrs = slice.userInfo.wallet.accounts;
			await postToBackend(API_ROUTES.BACKEND.CHECK_BALANCE, { addresses: addrs }, {callback: (data) => {
					let i = 0;
					// console.log("DATA:", data);
					for (let account of data.balances) {
						if(i === 0) {
							mainWallet = account;
							i++;
						} else {
							acc.push(account);
						}
					}
			}});

			setMainWalletInfo([mainWallet])
			setAccounts(acc);			
		})();
	}, [slice.userInfo.wallet.accounts]);



	const addProjectWalletAccounts = (accounts) => {
		let accountsReturned = [];

		for (let i = 0; i < accounts.length; i++) {
			accountsReturned.push(
				<WalletAccordion key={i} isProject={true} projectTitle={slice.userInfo.projects[i].projectName} address={accounts[i].address} balance={accounts[i].balance} />
			);
		}

		return accountsReturned;
	}

	const addMainWalletAccounts = (accounts) => {
		let accountsReturned = [];
		for (let i = 0; i < accounts.length; i++) {
			accountsReturned.push(
				<WalletAccordion key={i} isProject={false} address={accounts[i].address} balance={accounts[i].balance} />
			);
		}
		return accountsReturned;
	}

	return (
		<div>
			<PageContainer title={"My Wallet"} content={
				<div>
					<Paper elevation={1} mt="100px" pb="3vh" sx={{ backgroundColor: "#1C3E64", color: "white" }}>
						<Grid container spacing={2} pb="1vh">
							<Grid item xs={8}>
								<Typography variant="h4">Account</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography variant="h4">Balance</Typography>
							</Grid>
						</Grid>
					</Paper>
					{addMainWalletAccounts(mainWalletInfo)}
				</div>
			} />
			<Box sx={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }} />
			{slice.userInfo.role === "donor" ?
				<></>
				:
				<PageContainer title={"My Project Wallet"} content={
					<div>
						<Paper elevation={1} mt="100px" pb="3vh" sx={{ backgroundColor: "#1C3E64", color: "white" }}>
							<Grid container spacing={2} pb="1vh">
								<Grid item xs={8}>
									<Typography variant="h4">Account</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography variant="h4">Balance</Typography>
								</Grid>
							</Grid>
						</Paper>
						{addProjectWalletAccounts(accounts)}
					</div>
				} />


			}

		</div>
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
		if (!open) {
			setOpen(true);

			if (accData === null) {
				getAccountTxns(props.address, {
					callback: (data) => {
						let filtered = data.txns.transactions.filter(txn => txn["tx-type"] == "pay");
						setAccData(filtered);
						dataExploration(filtered);
					}
				});
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


		for (let i = 0; i < txns.length; i++) {
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
			<div style={{ display: "flex", height: "320px", width: "100%" }}>
				<DataGrid
					rows={tbData}
					columns={dataCols}
					pageSize={4}
					rowsPerPageOptions={[4]}
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
			<AccordionSummary expandIcon={<ExpandMoreRounded />} onClick={openAccordion}>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Typography variant="data" fontSize="18px">{props.address}</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant="data" fontSize="18px"><AlgoIcon />{(props.balance).toFixed(4)}</Typography>
					</Grid>
					{props.isProject ?
						<Grid item xs={12}>
							<Typography variant="h5">[{props.projectTitle}]</Typography>
						</Grid>
						:
						<></>
					}
				</Grid>
			</AccordionSummary>
			<AccordionDetails sx={{ borderTop: "3px dotted rgba(0,0,0,0.2)" }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h6">Transaction History</Typography>
						{open ? tableData : null}
					</Grid>
					{/* <Grid item xs={4}>
						<Typography variant="h6">Visualization</Typography>
						<Visualizer variant="mini" height="320px" />
					</Grid> */}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
}

export default Wallet;