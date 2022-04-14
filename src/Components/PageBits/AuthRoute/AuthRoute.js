import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserSlice from "../../../Redux/Slices/UserSlice";

// based on authorized route stuff from https://www.freecodecamp.org/news/react-router-tutorial/

/**
 * Basically, bounce a user back to home if they're not logged in / do not have a valid jwt token.
 * @param {React.Component} Component 
 * @returns JSX.Element
 */
const AuthorizedRoute = (props) => {
	const slice = UserSlice.useSlice();
	useEffect(() => {
		return UserSlice.unsubscribe();
	});

	if(slice.loggedIn) {
		return <props.component userSlice={slice}/>;	// pass userslice
	}

	return <Navigate replace to="/home" />;
}

export default AuthorizedRoute;