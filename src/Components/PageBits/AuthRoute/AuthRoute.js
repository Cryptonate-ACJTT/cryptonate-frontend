import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_ROUTES } from "../../../Fetch/ApiFetches";
import UserSlice from "../../../Redux/Slices/UserSlice";

// based on authorized route stuff from https://www.freecodecamp.org/news/react-router-tutorial/

/**
 * Basically, bounce a user back to home if they're not logged in / do not have a valid jwt token.
 * Pass redirect={path} and role={role} as props!
 * @param {React.Component} Component 
 * @returns JSX.Element
 */
const AuthorizedRoute = (props) => {
	const slice = UserSlice.useSlice();
	useEffect(() => {
		return UserSlice.unsubscribe();
	});

	if(slice.loggedIn) {
		if(props.role) {
			if(slice.userInfo.role === props.role) {
				return <props.component userSlice={slice}/>;
			} else {
				return <Navigate replace to={props.redirect ? props.redirect : API_ROUTES.FRONTEND.HOME}/>
			}
		} else {
			return <props.component userSlice={slice}/>;	// pass userslice
		}
	}

	return <Navigate replace to={props.redirect ? props.redirect : API_ROUTES.FRONTEND.HOME} />;
}

export default AuthorizedRoute;