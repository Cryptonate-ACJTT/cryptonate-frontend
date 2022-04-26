import { Icon, SvgIcon } from "@mui/material";
import rawSVG from "./algorand_logo_mark_black.svg";

const BaseIcon = (props) => {
	return (
		<Icon sx={{textAlign: "center", height: "100%"}}>
			<img src={props.src} alt="" style={{height: "100%", display: "flex", height: "inherit", width: "inherit"}}/>
		</Icon>
	)
}

/**
 * AlgoIcon, can pass style to props!
 * @param {*} props 
 * @returns 
 */
export const AlgoIcon = (props) => {
	return (
		<SvgIcon sx={{textAlign: "center", verticalAlign:"middle"}}>
			<path d="M 19.9013,20.3424 H 16.8427 L 14.838,12.8752 10.5393,20.3424 H 7.10867 L 13.7427,8.77758 12.668,4.74239 3.71933,20.3424 H 0.288666 L 11.6347,0.561584 h 3.0173 l 1.302,4.929606 h 3.1 l -2.108,3.70239 z" style={props.style}/>
		</SvgIcon>
	);
}


//<path d="./algorand_logo_mark_black.svg"/>, "DarkAlgo");
	//, "DarkAlgo");