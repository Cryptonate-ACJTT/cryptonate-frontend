import { Box, Typography } from "@mui/material";

/**
 * Contains a page's contents. Pass content={content} and title={title} to props!
 * @param {*} props 
 * @returns PageContainer
 */
const PageContainer = (props) => {
	return (
		<Box sx={{width: "95vw", height:"100%", margin:"2.5vw", marginLeft:"auto", marginRight:"auto"}}>
			<Typography variant="h3" sx={{mb: "3vh", pb: "0.5vh", borderBottom: "3px dotted rgba(0,0,0,0.2)"}}>{props.title}</Typography>
			{props.content}
		</Box>
	)
}

export default PageContainer;