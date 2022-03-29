import StoreSlice from "../StoreSlice";

/*
	Redux stuff for the Explore page.
*/

const storeKey = "EXPLORE_PROJECTS";
const initialState = [];
const reducers = {};
const reducerFxns = {};


const ExploreSlice = new StoreSlice(storeKey, initialState, reducers, reducerFxns);
export default ExploreSlice;