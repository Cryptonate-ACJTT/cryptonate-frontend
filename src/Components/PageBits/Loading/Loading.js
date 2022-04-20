import { Backdrop, CircularProgress } from "@mui/material"
import { useState } from "react"
import { usePromiseTracker } from "react-promise-tracker"


const Loading = (props) => {
	const promise = usePromiseTracker();

	return (
		<div>
			{promise.promiseInProgress ? 
				<Backdrop open={promise.promiseInProgress} sx={{ color: "white",  filter:"blur(3px)"}}>
					<CircularProgress size={"100px"} variant="indeterminate" sx={{color:"#cbdffc"}}/>
				</Backdrop> 
			: null}
		</div>
	)
}

export default Loading;