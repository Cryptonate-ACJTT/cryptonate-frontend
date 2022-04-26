import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box } from "@mui/system";


/**
 * Custom hook for getting D3 to work with React; credit to https://www.pluralsight.com/guides/using-d3.js-inside-a-react-app for help getting d3 working
 * @param {*} renderFxn 
 * @param {*} dependencies 
 * @returns 
 */
const useD3 = (renderFxn, dependencies = []) => {
	const ref = useRef();
	useEffect(() => {
		renderFxn(d3.select(ref.current));
	}, dependencies);

	return ref;
}

const TxnLine = (props) => {

}

const TxnWheel = (props) => {

}


// visualizer; shows data!
const Visualizer = (props) => {
	const ref = useD3((svg) => {
		svg.append("rect")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "pink");
	});


	if(props.variant === "mini") {

		
	} else if(props.variant === "full") {

	} else {

	}

	return (
		<Box sx={{width: "100%", height: props.height}}>
			<svg ref={ref} style={{width: "100%", height:"100%", margin:"0px"}}/>
		</Box>
	);
}


export default Visualizer;