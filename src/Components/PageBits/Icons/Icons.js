import { Box, createSvgIcon, Icon, SvgIcon } from "@mui/material";

/* Thanks to https://materialdesignicons.com/ and algorand for the icons used here. */

const iconBase = (path) => createSvgIcon(path);

const ICONS = {
	ALGO: iconBase(<path d="M 19.9013,20.3424 H 16.8427 L 14.838,12.8752 10.5393,20.3424 H 7.10867 L 13.7427,8.77758 12.668,4.74239 3.71933,20.3424 H 0.288666 L 11.6347,0.561584 h 3.0173 l 1.302,4.929606 h 3.1 l -2.108,3.70239 z"/>),
	UNVERIFIED: iconBase(<path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />),
	VERIFIED: iconBase(<path d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10A8,8 0 0,0 14,2M4.93,5.82C3.08,7.34 2,9.61 2,12A8,8 0 0,0 10,20C10.64,20 11.27,19.92 11.88,19.77C10.12,19.38 8.5,18.5 7.17,17.29C5.22,16.25 4,14.21 4,12C4,11.7 4.03,11.41 4.07,11.11C4.03,10.74 4,10.37 4,10C4,8.56 4.32,7.13 4.93,5.82M18.09,6.08L19.5,7.5L13,14L9.21,10.21L10.63,8.79L13,11.17" />)
}

const makeIconComponent = (Icon, color) => {
	return (
		<SvgIcon sx={{textAlign: "center", verticalAlign:"middle"}}>
			<Icon color={color ? color : "white"}/>
		</SvgIcon>
	);
}

/**
 * AlgoIcon, can pass color to props!
 * @param {*} props 
 * @returns 
 */
export const AlgoIcon = (props) => {
	return makeIconComponent(ICONS.ALGO, props.color);
}


export const UnverifiedIcon = (props) => {
	return makeIconComponent(ICONS.UNVERIFIED, props.color);
}

export const VerifiedIcon = (props) => {
	return makeIconComponent(ICONS.VERIFIED, props.color);
}
