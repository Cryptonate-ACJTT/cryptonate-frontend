import { Icon } from "@mui/material";
import rawSVG from "./algorand_logo_mark_black.svg";

const BaseIcon = (props) => {
	return (
		<Icon sx={{textAlign: "center", height: "100%"}}>
			<img src={props.src} alt="" style={{height: "100%", display: "flex", height: "inherit", width: "inherit"}}/>
		</Icon>
	)
}

export const DarkAlgoIcon = () => {
	return <BaseIcon src={rawSVG}/>
}


//<path d="./algorand_logo_mark_black.svg"/>, "DarkAlgo");
	//, "DarkAlgo");