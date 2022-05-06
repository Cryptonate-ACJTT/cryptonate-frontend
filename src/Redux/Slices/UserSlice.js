import Store from "../Store";
import StoreSlice from "../StoreSlice";

/*
	Redux stuff for the User!
*/


// reducers

const userApprovedReducer = (state, approved) => {
	return Object.assign({}, state, {
		userInfo: {
			id: state.userInfo.id,
			username: state.userInfo.username,
			email: state.userInfo.email,
			role: state.userInfo.role,
			wallet: {
				id: state.userInfo.wallet.id,
				accounts: state.userInfo.wallet.accounts
			},
			projects: state.userInfo.projects,
			approved: approved
		}
	});
}

const userApprovedFxn = (approved) => {
	Store.dispatch({ type: "userApprovedReducer", payload: approved })
}

const userLoginReducer = (state, loginInfo) => {
	return Object.assign({}, state, {
		loggedIn: true,
		userInfo: loginInfo
	});
}

const userLoginFxn = (loginInfo) => {
	if (!localStorage.getItem("userInfo")) {
		localStorage.setItem("userInfo", JSON.stringify(loginInfo));
	}

	Store.dispatch({ type: "userLoginReducer", payload: loginInfo });
}

/**
 * Logs the user out (of the store slice);
 * @param {*} state 
 * @returns 
 */
const userLogoutReducer = (state) => {
	return Object.assign({}, state, {
		loggedIn: false,
		userInfo: null
	});
}

/**
 * Dispatches userLogoutReducer to store.
 */
const userLogoutFxn = () => {
	localStorage.clear();
	Store.dispatch({ type: "userLogoutReducer", payload: null });
}


const userWalletReducer = (state, wallet) => {
	console.log("in fxn ", state);
	return Object.assign({}, state, {
		userInfo: {
			...state.userInfo,
			wallet: wallet
		}
	});
}

const userWalletFxn = (wallet) => {
	Store.dispatch({ type: "userWalletReducer", payload: wallet });
}



export const storeKey = "USER_SLICE";	// slice the user

const initState = {
	loggedIn: false,
	userInfo: null
}

const reducers = {
	userLoginReducer,
	userLogoutReducer,
	userWalletReducer,
	userApprovedReducer
};

export const reducerFxns = {
	userLoginFxn,
	userLogoutFxn,
	userWalletFxn,
	userApprovedFxn
};

const UserSlice = new StoreSlice(storeKey, initState, reducers, reducerFxns);
export default UserSlice;