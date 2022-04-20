import { Backdrop, CircularProgress, Alert, Stack, Typography } from "@mui/material"
import { useEffect } from "react";
import { usePromiseTracker } from "react-promise-tracker"
import SiteSlice from "../../../Redux/Slices/SiteSlice";


const Loading = (props) => {
	const promise = usePromiseTracker();
	const slice = SiteSlice.useSlice();

	useEffect(() => {
		return SiteSlice.unsubscribe();
	})

	return (
		<div>
			{promise.promiseInProgress ? 
				<Backdrop open={promise.promiseInProgress} sx={{color: "white"}}>
					<Stack alignItems="center" justifyContent="center" spacing={3}>
						<Typography variant="h5">{slice.msg}</Typography>
						
						<CircularProgress size={"100px"} variant="indeterminate" sx={{color:"#cbdffc"}}/>
					</Stack>
				</Backdrop>
			: null}
		</div>
	)
}

export default Loading;