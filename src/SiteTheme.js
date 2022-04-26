import { createTheme } from "@mui/material/styles";

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
	},
	typography: {
		fontFamily: "Roboto",	
	},
	components: {
		MuiTypography: {
			variants: [
				{
					props: {variant: "title"},
					style: {
						color: "#1C3E64",
						fontSize: "60px",
						fontFamily: "Roboto",
						textAlign: "center"
					}
				},
				{
					props: { variant: "tagline" },
					style: {
						color: "#1C3E64",
						fontSize: "30px",
						fontWeight: "100",
						fontFamily: "Roboto",
						textAlign: "center"
					}
				},
				{
					props: { variant: "stats"},
					style: {
						color: "#1C3E64",
						fontSize: "20px",
						fontWeight: "100",
						fontFamily: "Roboto",
					}
				}

			],
			styleOverrides: {
				h1: {
					color: "#1C3E64",
					fontSize: "60px",
					//fontWeight: "bold",
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
				}
			}
		}, 

		MuiAccordion: {
			styleOverrides: {
				root: {
					"&.Mui-expanded": {		// removed expanded margin
						margin: "0 0",
						boxShadow: "rgba(0,0,0,0.1) 0px 5px 5px 0px inset",
					},
				},
			}
		}
	}
});