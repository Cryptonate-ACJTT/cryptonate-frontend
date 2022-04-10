/**
 * Types of requests we can pass to fetch.
 */
export const FETCH_TYPE = {
	GET: "GET",
	POST: "POST"
}

export const CONTENT_TYPES = {
	FORM_DATA: "multipart/form-data",
	JSON: "application/json"
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
 * @param {CONTENT_TYPES} contentType
 * @returns json
 */
const buildPost = (data, contentType) => {
	if(!contentType) {	// default content-type to
		contentType = CONTENT_TYPES.JSON;
	}

	if(contentType == CONTENT_TYPES.JSON) {
		return {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": contentType
			},
			body: JSON.stringify(data)
		}
	}

	return {
		method: "POST",
		mode: "cors",
		data: data
	}
}

/**
 * Injects 'credentials'="include" into a header
 * @param {string} header 
 */
const injectCredentialHeader = (header) => {
	header.credentials = "include";
}

/**
 * given a fetchtype, use either buildPost or buildGet helper methods
 * @param {FETCH_TYPE} fetchType 
 * @param {string} data 
 * @returns 
 */
const buildFetchType = (fetchType, {data, contentType} = {}) => {
	if(fetchType === FETCH_TYPE.POST && data != null) {
		return buildPost(data, contentType);
	} else {
		return buildGet();
	}
}

/**
 * Handles the response from fetch and returns either json or an error
 * @param {*} response 
 * @returns json 
 */
const buildFetchDefaultHandler = async (response) => {
	if(response.ok) {
		return await response.json();
	} else {
		const errres = await response.json();
		console.error("RESPONSE ERROR: code " + response.status + "; " + errres.msg);
		return Promise.reject(response.status);
	}
}

/**
 * Default handler for buildFetch; simply returns the json.
 * @param {*} json 
 * @returns json
 */
const buildFetchDefaultCallback = (json) => {
	return json
}

/**
 * Builds a fetch request! Usually is wrapped in another function, see ./ApiFetches.js 
 * -- OPTIONS:	-resHandler handles the response object,
 * 				-data is for POST requests,
 * 				-credentials injects a credentials header for auth functionality,
 * 				-callback replaces default callback function (which returns res.json()).
 * @param {FETCH_TYPE} fetchType 
 * @param {string} path 
 * @param {*} options
 * @returns Promise
 */
export const buildFetch = async (fetchType, path, {callback, credentials, data, resHandler, contentType} = {}) => {
	if(callback === undefined) {
		callback = buildFetchDefaultCallback;
	}

	if(resHandler === undefined) {
		resHandler = buildFetchDefaultHandler;
	}

	const fetchHeader = buildFetchType(fetchType, {data: data, contentType: contentType});

	console.log("FH: ", fetchHeader)

	if(credentials !== undefined) {
		injectCredentialHeader(fetchHeader);
	}

	return await fetch(path, fetchHeader)
		.then(resHandler)
		.then(json => callback(json))
		.catch(err => {
			console.error("ERROR", err);
		});
}