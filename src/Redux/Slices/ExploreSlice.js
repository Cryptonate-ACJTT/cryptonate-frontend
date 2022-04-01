import { postToBackend } from "../../Fetch/ApiFetches";
import Store from "../Store";
import StoreSlice from "../StoreSlice";

/*
	Redux stuff for the Explore page.
*/

// Sort types
export const SORTINGS = {
	CLOSE_TO_GOAL: "Close to Goal"
}


/**
 * 
 * @param {*} state 
 * @param {*} options 
 * @returns 
 */
const exploreSortReducer = (state, options) => {
	return Object.assign({}, state, {
		sorting: options
	})
}

const exploreSortFxn = (sorting) => {
	Store.dispatch({type: "exploreSortReducer", payload: sorting});
}

const exploreSearchReducer = (state, search) => {
	return Object.assign({}, state, {
		search: search
	});
}

const exploreSearchFxn = (search) => {
	Store.dispatch({type: "exploreSearchReducer", payload: search});
	console.log(Store.getState());
}

/*
	How should projects be stored on the front end? Data structure wise?
*/

// only request what the client needs?

// send request to backend: search / categorize

// add project(s) to state

// remove project(s) from state

// sort projects in state according to sorting priority


export const storeKey = "EXPLORE_PROJECTS";
const initialState = {
	sorting: null
};
const reducers = {exploreSortReducer, exploreSearchReducer};
const reducerFxns = {exploreSortFxn, exploreSearchFxn};

const ExploreSlice = new StoreSlice(storeKey, initialState, reducers, reducerFxns);
export default ExploreSlice;