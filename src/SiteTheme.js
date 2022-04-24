import { createTheme } from "@mui/material"

export const theme = createTheme({
palette: {
	type: 'light',
	primary: {
	main: '#1c3e64',
	},
	secondary: {
	main: '#f96c51',
	},
	background: {
	default: '#cbdffc',
	paper: '#ffffff',
	},
	text: {
		primary: '#1c3e64',
		secondary: 'rgba(0,0,0,0.53)',
	},
	typography: {
		h1: {
			color: "#1C3E64",
			fontWeight: "bold",
			fontFamily: "Roboto",
		},
		h2: {
			color: "#1C3E64",
			fontWeight: "bold",
			fontFamily: "Roboto",
		},
		h3: {
			color: "#1C3E64",
			fontWeight: "bold",
			fontFamily: "Roboto",
		},
	  },
},
});