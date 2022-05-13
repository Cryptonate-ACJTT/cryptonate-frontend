import { API_ROUTES, getFromBackend } from "../../Fetch/ApiFetches";
import Store from "../Store";
import StoreSlice from "../StoreSlice";

/*
	Redux stuff for the Explore page.
*/

/**
 * Types of sortings the user can select on the explore page.
 */

/**
 * Categories the user can select on the explore page.
 */
export const CATEGORIES = [{name: "Animal", checked: false}];

const initState = {
	sorting: SORTINGS[0],
	search: "",
	categories: [],
	projects: []
}


// REDUCERS

const sorterReducer = (state, sort) => {
	return Object.assign({}, state, {
		sorting: sort
	})
}

const searchFxn = (sorting) => {
	Store.dispatch({type: "exploreSortReducer", payload: sorting});
	// TODO: SORT THE PROJECTS
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


export const storeKey = "EXPLORE_PROJECTS";
const reducers = {
	exploreSortReducer,
	exploreSearchReducer, 
	exploreProjectsReducer, 
	exploreCategoriesReducer
};

export const reducerFxns = {
	exploreSortFxn, 
	exploreSearchFxn, 
	exploreProjectsFxn, 
	exploreCategoriesFxn
};

const SearchSlice = new StoreSlice(storeKey, initState, reducers, reducerFxns);
export default SearchSlice;
