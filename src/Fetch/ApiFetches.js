import { trackPromise } from "react-promise-tracker";
import { buildFetch, CONTENT_TYPES, FETCH_TYPE } from "./Fetcher";

/*
	API interactions go in here!
*/


/*******************************
	REFERENCE VALUES
*******************************/

/**
 * The APIs we're using
 */
export const ADDRESSES = {
	BACKEND: "http://localhost:4000/api/v1",
	ALGORAND: "http://localhost:4001",
	INDEXER: "http://localhost:8980",
	KEYDAEMON: "http://localhost:4002"
	//INDEXER: "https://algoindexer.algoexplorerapi.io"
}


/**
 * Routes that the various API could take
 */
export const API_ROUTES = {
	FRONTEND: {
		/* HOME/ABOUT/WHY */
		HOME: "/home",
		ABOUT: "/about",
		WHY_CRYPTO: "/why-crypto",
		
		/* PROJECTS */
		EXPLORE: "/explore",
		PROJECT_PAGE: "explore/project/:id",
		
		/* FORMS */
		ORG_AUTH: "/organization-auth-form",
		PROJECT_FORM: "/project-form",
		
		/* USER STUFF */
		LOGIN_SIGNUP: "/login-signup",
		LOGIN: "/login",
		LOGOUT: "/logout",
		
		PROFILE: "/profile",
		WALLET: "/wallet",

		/* DEFAULT */
		DEFAULT: "*"
	},

	BACKEND: {
		/* MISC */
		FRONTPAGE_STATS: "/project/frontpage",
		
		/* USER */
		REGISTER_USER: "/user",
		SUBMIT_ORG_FORM:"/user/submitOrgForm",
		LOGIN_USER: "/user/login",
		GET_LOGGED_IN: "/user/loggedIn",
		LOGOUT_USER: "/user/logout",

		/* PROJECTS */
		GET_PROJECT: "/project",
		ALL_PROJECT: "/project/explore",
		CREATE_PROJECT: "/project/create",
		EXPLORE_SEARCH: "/project/explore/search",

		/* CRYPTO */
		CREATE_WALLET: "/crypto/newWallet",
		CHECK_BALANCE: "/crypto/balance",

		TXN_BASIC: "/crypto/txn/basic"
	},

	ALGORAND: {

	},

	INDEXER: {
		HEALTH: "/health?pretty"
	}	
}


/*******************************
	BACKEND BASICS
*******************************/

/**
 * Send a GET request to the backend at /'path'.
 * -- OPTIONS:	-resHandler handles the response object,
 * 				-credentials injects a credentials header for auth functionality,
 * 				-callback replaces default callback function (which returns res.json()).
 * @param {string} path 
 * @param {*} options
 * @returns Promise
 */
export const getFromBackend = (path, {callback, credentials, resHandler} = {}) => {
	return buildFetch(FETCH_TYPE.GET, ADDRESSES.BACKEND + path, {callback: callback, credentials: credentials, resHandler: resHandler})
}


/**
 * Send a POST request to the backend at /'path' containing 'data'.
 * -- OPTIONS:	-resHandler handles the response object,
 * 				-credentials injects a credentials header for auth functionality,
 * 				-callback replaces default callback function (which returns res.json()).
 * @param {string} path 
 * @param {*} data
 * @param {*} options
 * @returns Promise
 */
export const postToBackend = (path, data, {callback, credentials, resHandler, contentType} = {}) => {
	return buildFetch(FETCH_TYPE.POST, ADDRESSES.BACKEND + path, {callback: callback, credentials, data: data, resHandler: resHandler, contentType: contentType});
}


/*******************************
	HOME PAGE
*******************************/

/**
 * Get stats for the front page.
 * @param {*} param0 
 * @returns 
 */
export const getFPStats = ({callback} = {}) => {
	return getFromBackend(API_ROUTES.BACKEND.FRONTPAGE_STATS, {callback: callback});
}


/*******************************
	SIGN UP/LOGIN
*******************************/

/**
 * Sign up the user
 * @param {*} email 
 * @param {*} username 
 * @param {*} password 
 * @param {*} role 
 * @param {*} param4 
 * @returns 
 */
export const signUpUser = (email, username, password, role, {callback} = {}) => {
	return postToBackend(API_ROUTES.BACKEND.REGISTER_USER, {
		email: email,
		password: password,
		username: username,
		role: role
	}, {callback: callback, credentials: true});
}

/**
 * Log in the user
 * @param {*} email 
 * @param {*} username 
 * @param {*} password 
 * @param {*} role 
 * @param {*} param4 
 * @returns 
 */
export const loginUser = (email, username, password, role, {callback} = {}) => {
	return postToBackend(API_ROUTES.BACKEND.LOGIN_USER, {
		email: email,
		password: password,
		username: username,
		role: role
	}, {callback: callback, credentials: true});
}

/**
 * Log out the user
 * @param {*} param0 
 * @returns 
 */
export const logoutUser = ({callback} = {}) => {
	return postToBackend(API_ROUTES.BACKEND.LOGOUT_USER, {}, {callback: callback, credentials: true});
}

/*******************************
	PROJECT FORM
*******************************/

export const submitProjectForm = (userInfo, formData, {callback} = {}) => {
	formData.append("userInfo", userInfo); // userInfo not in form
	return postToBackend(API_ROUTES.BACKEND.CREATE_PROJECT, formData, {callback: callback, credentials: true, contentType: CONTENT_TYPES.FORM_DATA});
}

/*******************************
	CRYPTO TRANSACTIONS
*******************************/

/**
 * Sends a transaction request to the backend, which sends it on to algosdk
 * @returns Promise
 */
export const txnBasic = (userInfo, sender, receiver, amount, {callback} = {}) => {
	return trackPromise(
		postToBackend(API_ROUTES.BACKEND.TXN_BASIC, {
			email: userInfo.email,
			role: userInfo.role,
			wallet: userInfo.wallet.id,
			sender: sender,
			receiver: receiver,
			amount: amount
		}, {callback: callback, credentials: true})
	);
}