import StoreSlice from "../StoreSlice";

/*
	Redux stuff for the User!
*/



export const storeKey = "USER_SLICE";	// slice the user

const initState = {}

const reducers = {};
export const reducerFxns = {};

const UserSlice = new StoreSlice(storeKey, initState, reducers, reducerFxns);
export default UserSlice;