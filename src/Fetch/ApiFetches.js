import { buildFetch, FETCH_TYPE } from "./Fetcher";

/*
	API interactions go in here!
*/

/**
 * The APIs we're using
 */
export const ADDRESSES = {
	BACKEND: "http://localhost:4000/api/v1",
	INDEXER: "https://algoindexer.algoexplorerapi.io"
}


/**
 * Routes that the various API could take
 */
export const API_ROUTES = {
	BACKEND: {
		FRONTPAGE_STATS: "/project/frontpage",
		EXPLORE_SEARCH: "/project/explore/search",

		REGISTER_USER: "/user",
		LOGIN_USER: "/user/login",
		GET_LOGGED_IN: "/user/loggedIn",
		LOGOUT_USER: "/user/logout",

		GET_PROJECT: "/project",
		ALL_PROJECT: "/project/explore"
	},

	INDEXER: {
		HEALTH: "/health"
	}	
}



/* ====== BACKEND BASICS ====== */

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
	return buildFetch(FETCH_TYPE.GET, ADDRESSES.BACKEND + path, {callback, credentials, resHandler})
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
export const postToBackend = (path, data, {callback, credentials, resHandler} = {}) => {
	return buildFetch(FETCH_TYPE.POST, ADDRESSES.BACKEND + path, {callback, credentials, data: data, resHandler});
}



/* ====== ALGOEXPLORER ====== */

/**
 * Send a GET request to AlgoExplorer at /'path'
 * -- OPTIONS:	-resHandler handles the response object,
 * 				-credentials injects a credentials header for auth functionality,
 * 				-callback replaces default callback function (which returns res.json()).
 * @param {string} path 
 * @param {*} options
 * @returns Promise
 */
export const getFromIndexer = (path, {callback, credentials, resHandler} = {}) => {
	return buildFetch(FETCH_TYPE.GET, ADDRESSES.INDEXER + path, {callback, credentials, resHandler});
}
