import Store from "../Store";
import StoreSlice from "../StoreSlice";

/*
	Redux stuff for the User!
*/


// reducers

const userLoginReducer = (state, loginInfo) => {
	return Object.assign({}, loginInfo, {
		loggedIn: true,
		userInfo: loginInfo
	});
}

const userLoginFxn = (loginInfo) => {
	Store.dispatch({type: "userLoginReducer", payload: loginInfo});
}

const userLogoutReducer = (state) => {
	return Object.assign({}, state, {
		loggedIn: false,
		userInfo: null
	});
}

const userLogoutFxn = () => {
	Store.dispatch({type: "userLogoutReducer", payload: null});
}



export const storeKey = "USER_SLICE";	// slice the user

const initState = {
	loggedIn: false,
	userInfo: null
}

const reducers = {
	userLoginReducer, 
	userLogoutReducer
};

export const reducerFxns = {
	userLoginFxn,
	userLogoutFxn
};

const UserSlice = new StoreSlice(storeKey, initState, reducers, reducerFxns);
export default UserSlice;