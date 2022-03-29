/**
 * Types of requests we can pass to fetch.
 */
export const FETCH_TYPE = {
	GET: "GET",
	POST: "POST"
}

/**
 * Basic function to create a GET request header
 * @returns json
 */
const buildGet = () => {
	return {
		method: "GET",
		mode: 'cors'
	}
}

/**
 * Basic function to create a POST request header, accepts json 'data'
 * @param {string} data 
 * @returns json
 */
const buildPost = (data) => {
	return {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}
}

/**
 * given a fetchtype, use either buildPost or buildGet helper methods
 * @param {FETCH_TYPE} fetchType 
 * @param {string} data 
 * @returns 
 */
const buildFetchType = (fetchType, data = null) => {
	if(fetchType === FETCH_TYPE.POST && data != null) {
		return buildPost(data);
	} else {
		return buildGet();
	}
}

/**
 * Handles the response from fetch and returns either json or an error
 * @param {*} response 
 * @returns json 
 */
const fetchResHandler = async (response) => {
	if(response.ok) {
		return await response.json();
	} else {
		console.log("Response not ok: code " + response.status);
		return Promise.reject(response.status);
	}
}

/**
 * Default handler for buildFetch; simply returns the json.
 * @param {*} json 
 * @returns json
 */
const buildFetchDefaultHandler = (json) => {
	//console.log(json);
	return json
}

/**
 * Builds a fetch request! Usually is wrapped in another function, see ./ApiFetches.js
 * @param {FETCH_TYPE} fetchType 
 * @param {string} path 
 * @param {string} data 
 * @param {function} callback 
 * @returns Promise that should resolve to JSON given a callback function
 */
export const buildFetch = async (fetchType, path, data = null, callback = null) => {
	if(callback === null) {
		callback = buildFetchDefaultHandler;
	}
	
	return await fetch(path, buildFetchType(fetchType, data))
		.then(fetchResHandler)
		.then(json => buildFetchDefaultHandler(json))
		.catch(err => {
			console.error("ERROR:", err);
		});
}