import { API_ROUTES, getFromBackend } from "../../Fetch/ApiFetches";
import Store from "../Store";
import StoreSlice from "../StoreSlice";

/*
	Redux stuff for the Explore page.
*/

// Sort types
export const SORTINGS = {
	CLOSE_TO_GOAL: "Close to Goal",
	RECENTLY_ADDED: "Recently Added"
}

export const CATEGORIES = [{name: "Animal", checked: false}];

const initState = {
	sorting: SORTINGS.CLOSE_TO_GOAL,
	search: "",
	categories: [],
	projects: []
}


// REDUCERS

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
}


const exploreProjectsReducer = (state, projects) => {
	return Object.assign({}, state, {
		projects: projects
	})
}

const exploreProjectsFxn = (projects) => {
	Store.dispatch({type: "exploreProjectsReducer", payload: projects});
}


const exploreCategoriesReducer = (state, categories) => {
	return Object.assign({}, state, {
		categories: categories
	});
}

const exploreCategoriesFxn = (categories) => {
	Store.dispatch({type: "exploreCategoriesReducer", payload: categories});
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
const reducers = {exploreSortReducer, exploreSearchReducer, exploreProjectsReducer, exploreCategoriesReducer};
export const reducerFxns = {exploreSortFxn, exploreSearchFxn, exploreProjectsFxn, exploreCategoriesFxn};

const ExploreSlice = new StoreSlice(storeKey, initState, reducers, reducerFxns);
export default ExploreSlice;