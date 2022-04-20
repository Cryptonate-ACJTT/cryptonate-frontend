import Store from "../Store";
import StoreSlice from "../StoreSlice";

/*
	Redux stuff a very specific thing I want to do for the whole site.
*/

const siteMsgReducer = (state, msg) => {
	return Object.assign({}, state, {
		msg: msg
	});
}

const siteMsgFxn = (msg) => {
	Store.dispatch({type: "siteMsgReducer", payload: msg});
}

export const storeKey = "SITE_SLICE";	// slice the user

const initState = {
	msg: "Please stand by..."
}

const reducers = {
	siteMsgReducer
};

export const reducerFxns = {
	siteMsgFxn
};

const SiteSlice = new StoreSlice(storeKey, initState, reducers, reducerFxns);
export default SiteSlice;