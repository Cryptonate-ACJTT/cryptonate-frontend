import { buildFetch, FETCH_TYPE } from "./Fetcher";

const backendBase = "http://localhost:4000/api";
const algoIndexerAddress = "https://algoindexer.algoexplorerapi.io/";

/* ====== BACKEND ====== */

/**
 * Send a GET request to the backend at /'path'.
 * -- OPTIONS:	-resHandler handles the response object,
 * 				-credentials injects a credentials header for auth functionality
 * 				-callback replaces default callback function (which returns res.json()) 
 * @param {string} path 
 * @param {*} options
 * @returns Promise
 */
export const getFromBackend = (path, {callback, credentials, resHandler} = {}) => {
	return buildFetch(FETCH_TYPE.GET, backendBase + path, {callback, credentials, resHandler})
}


/**
 * Send a POST request to the backend at /'path' containing 'data'.
 * -- OPTIONS:	-resHandler handles the response object,
 * 				-credentials injects a credentials header for auth functionality
 * 				-callback replaces default callback function (which returns res.json()) 
 * @param {string} path 
 * @param {*} data
 * @param {*} options
 * @returns Promise
 */
export const postToBackend = (path, data, {callback, credentials, resHandler} = {}) => {
	return buildFetch(FETCH_TYPE.POST, backendBase + path, {callback, credentials, data, resHandler});
}

/* ====== ALGOEXPLORER ====== */

/**
 * Send a GET request to AlgoExplorer at /'path'
 * -- OPTIONS:	-resHandler handles the response object,
 * 				-credentials injects a credentials header for auth functionality
 * 				-callback replaces default callback function (which returns res.json()) 
 * @param {string} path 
 * @param {*} options
 * @returns Promise
 */
export const getFromIndexer = (path, {callback, credentials, resHandler} = {}) => {
	return buildFetch(FETCH_TYPE.GET, algoIndexerAddress + path, {callback, credentials, resHandler});
}