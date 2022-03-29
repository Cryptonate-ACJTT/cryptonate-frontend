import { buildFetch, FETCH_TYPE } from "./Fetcher";

const backendBase = "http://localhost:4000/api";
const algoIndexerAddress = "https://algoindexer.algoexplorerapi.io/";

/* ====== BACKEND ====== */

/**
 * Send a GET request to the backend at /'path'
 * @param {string} path 
 * @param {function} callback 
 * @returns Promise
 */
export const getFromBackend = (path, callback = null) => {
	return buildFetch(FETCH_TYPE.GET, backendBase + path, null, callback);
}


/**
 * Send a POST request to the backend at /'path' containing 'data'
 * @param {string} path 
 * @param {*} data 
 * @param {function} callback 
 * @returns Promise
 */
export const postToBackend = (path, data, callback = null) => {
	return buildFetch(FETCH_TYPE.POST, backendBase + path, data, callback);
}



/* ====== ALGOEXPLORER ====== */

/**
 * Send a GET request to AlgoExplorer at /'path'
 * @param {string} path 
 * @param {function} callback 
 * @returns Promise
 */
export const getFromIndexer = (path, callback = null) => {
	return buildFetch(FETCH_TYPE.GET, algoIndexerAddress + path, null, callback);
}