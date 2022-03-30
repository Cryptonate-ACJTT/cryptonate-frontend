import { getFromIndexer } from "../../Fetch/ApiFetches";
import Store from "../Store";
import StoreSlice from "../StoreSlice";

/*
	Example store slice for explanation; make sure to remove reference to this in the actual project
*/

/* 
	what we want to do is create two corresponding functions for interacting with any given store slice;
	a reducer function which takes the state and applies a function, and a dispatch function which calls
	the store to dispatch the reducer.
*/
const addExampleReducer = (state, thing) => {	// reducer
	return [...state, thing];
}
const addExampleFxn = (thing) => { // dispatch function
	Store.dispatch({type: "addExampleReducer", payload: thing});
}

/*
	After we have all the reducers/interactions we want, we then create and export the store slice for use
	in React components
*/
const storeKey = "EXAMPLE";
const initialState = [];
const reducers =  {addExampleReducer}
const reducerFxns = {addExampleFxn}

const ExampleSlice = new StoreSlice(storeKey, initialState, reducers, reducerFxns);

console.log(ExampleSlice.getState());
ExampleSlice.reducerFxns.addExampleFxn("thing");
console.log(ExampleSlice.getState());

(async () => {	// testing getting data via fetch request
	const data = await getFromIndexer("/health")

	ExampleSlice.reducerFxns.addExampleFxn(data);
	console.log(ExampleSlice.getState());
})();

export default ExampleSlice;