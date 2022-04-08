import { API_ROUTES, getFromBackend } from "../../Fetch/ApiFetches";
import Store from "../Store";
import StoreSlice from "../StoreSlice";

/*
	Redux stuff for the Explore page.
*/

// Sort types
export const SORTINGS = [
	{name: "Close to Goal", fxn: ((a, b) => { return (Math.floor(a.totalSaved / a.goalAmount) - Math.floor(b.totalSaved / b.totalAmount)) })},
	{name: "Recently Added", fxn: ((a, b) => { return (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) })}
];

export const CATEGORIES = [{name: "Animal", checked: false}];

const initState = {
	sorting: SORTINGS[0],
	search: "",
	categories: [],
	projects: []
}


// REDUCERS

const exploreSortReducer = (state, sort) => {
	return Object.assign({}, state, {
		sorting: sort
	})
}

const exploreSortFxn = (sorting) => {
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
const reducers = {exploreSortReducer, exploreSearchReducer, exploreProjectsReducer, exploreCategoriesReducer};
export const reducerFxns = {exploreSortFxn, exploreSearchFxn, exploreProjectsFxn, exploreCategoriesFxn};

const ExploreSlice = new StoreSlice(storeKey, initState, reducers, reducerFxns);
export default ExploreSlice;