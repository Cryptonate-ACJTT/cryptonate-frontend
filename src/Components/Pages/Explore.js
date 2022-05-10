import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ADDRESSES, API_ROUTES, getFromBackend } from "../../Fetch/ApiFetches";
import ExploreSlice, { CATEGORIES, reducerFxns, SORTINGS } from "../../Redux/Slices/ExploreSlice"
import { Card, CardContent, CardMedia, Grid, Tooltip, Typography, Box, CircularProgress, Stack, TextField, Button, Select, MenuItem, Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import "./Explore.css";
import "./Default.css";
import PageContainer from "../PageBits/PageContainer/PageContainer";
import UserSlice from "../../Redux/Slices/UserSlice";
import { UnverifiedIcon, VerifiedIcon } from "../PageBits/Icons/Icons";

const PROJECTS_PER_PAGE = 9; // multiple of three please


const Explore = () => {
	const slice = ExploreSlice.useSlice();
	const uSlice = UserSlice.useSlice();

	console.log(uSlice);

	/**
	 * Watches for changes in slice.search, slice.categories and then searches based on that!
	 */
	useEffect(() => {
		let search = slice.search.replace(/\s/g, "+");
		let categories = "";
		
		for(const cat of slice.categories) {
			categories += cat.name;
		}

		exploreSearchBackend({search: search, categories: categories});

		return (() => {	// runs on unmount
			ExploreSlice.unsubscribe();
			UserSlice.unsubscribe();
		});
	}, [slice.search, slice.categories]);
	
	
	const exploreSearchBackend = ({search, categories} = {}) => {
		let route = API_ROUTES.BACKEND.ALL_PROJECT;
		if(search || categories){ 
			route = API_ROUTES.BACKEND.EXPLORE_SEARCH;
			route += "?";

			if(categories) {
				route += "category=" + categories;
			}
	
			if(categories && search) {
				route += "&";
			}
		
			if(search) {
				route += "search=" + search;
			}
		}

		getFromBackend(route, { callback: (data) => {
			console.log(data);
			reducerFxns.exploreProjectsFxn(data.projects);
		}});
	}

	return (
		<PageContainer title="Explore & Discover" content={
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<ExploreSideBar slice={uSlice} sorts={SORTINGS} categories={CATEGORIES}/>
					
				</Grid>
				<Grid item xs={9}>
					<ExploreTiling slice={slice}/>
				</Grid>
			</Grid>
		}/>
	);
}

const ExploreSideBar = (props) => {

	/**
	 * Adds options to the sort selection
	 * @param {*} props 
	 * @returns 
	 */
	const addSortOptions = (sortOptions) => {
		let sortOptionsReturned = [];
		
		for(let i = 0; i < sortOptions.length; i++) {
			sortOptionsReturned.push(
				<MenuItem key={"option" + i} value={sortOptions[i].name}>{sortOptions[i].name}</MenuItem>
			)
		}
		return sortOptionsReturned;
	}
	
	/**
	 * Adds categories to the categories section.
	 * @param {*} categories 
	 * @returns 
	 */
	const addCategories = (categories) => {
		let categoriesReturned = [];

		/**
		 * Handles what happens when a checkbox is clicked
		 * @param {*} e 
		 * @param {*} i 
		 */
		const checkBoxHandler = (e, i) => {
			categories[i].checked = e.target.checked;
			reducerFxns.exploreCategoriesFxn(categories.filter(cat => cat.checked === true));
		}

		for(let i = 0; i < categories.length; i++) {
			categoriesReturned.push(
				<FormControlLabel key={"cat" + i} control={
					<Checkbox onChange={((e) => {checkBoxHandler(e, i)})}/>
				} label={<Typography fontSize="15px" variant="data"><b>{categories[i].name}</b></Typography>} />
			)
		}

		return categoriesReturned;
	}
	
	/**
	 * intercepts the onchange
	 * @param {*} e 
	 */
	const exploreSortIntercept = (e) => {
		let sorting = SORTINGS.filter(s => s.name === e.target.value)[0];
		reducerFxns.exploreSortFxn(sorting);
	}

	/**
	 * Intercepts onSubmit; cleans input and sends it to slice
	 * @param {*} e 
	 */
	 const exploreSearchIntercept = (e) => {
		e.preventDefault();
		let val = "" + e.target.searchy.value;	// string for safety
		//e.target.searchy.value = "";

		reducerFxns.exploreSearchFxn(val);
	}

	const createProjectButton = () => {
		if(props.slice.userInfo) {
			if(props.slice.userInfo.role === "organization") {
				return (
					<Link to={API_ROUTES.FRONTEND.PROJECT_FORM}>
						<Button fullWidth color="secondary" variant="contained" sx={{color:"white", pb:"2vh", pt:"2vh", mb: "1vh", borderRadius:"5px 10px 5px 10px"}}>
								<b>Create New Project</b>
						</Button>
					</Link>
				);
			}
		}

		return null;
	}

	return (
		<Stack  sx={{background:"rgba(255,255,255,0.5)", p:"2vh", borderRadius:"5px 10px 5px 10px"}}>
			{createProjectButton()}
			<form onSubmit={exploreSearchIntercept}>
				<Grid container spacing={2} sx={{pb:"1vh", mb: "1vh"}}>
					<Grid item xs={8}>
						<TextField fullWidth name="searchy" type="text" variant="outlined" label="Search by Keyword" style={{borderRadius:"10px 0 0 10px"}}/>
					</Grid>
					<Grid item xs={4} style={{paddingLeft:"0px"}}>
						<Button type="submit" value="search" variant="contained" sx={{width:"100%", height:"100%", borderRadius:"0 10px 10px 0"}}>Search</Button>
					</Grid>
					<Grid item xs={12}>
						<Box sx={{borderBottom: "1px solid rgba(0,0,0,0.2)"}}/>
					</Grid>
				</Grid>
			</form>

			<Grid container spacing={2}>
				<Grid item xs={4} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
					<Typography variant="stats">Sort By</Typography>
				</Grid>	
				<Grid item xs={8}>
					<Select fullWidth id="sort-select" onChange={exploreSortIntercept} label="sort">
						{addSortOptions(props.sorts)}
					</Select>
				</Grid>

				<Grid item xs={4} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
					<Typography variant="stats">Categories</Typography>
				</Grid>
				<Grid item xs={8}>
					<FormGroup sx={{alignItems:"center"}}>
						{addCategories(props.categories)}
					</FormGroup>
				</Grid>
				
			</Grid>
		</Stack>
	);
}


const ExploreTiling = (props) => {

	let maxPages = useRef();
	let [page, setPage] = useState(1);
	let [tiles, setTiles] = useState([]);

	/**
	 * Listen for changes in props.slice.projects and set tiles appropriately.
	 */
	useEffect(() => {
		maxPages.current = Math.ceil(props.slice.projects.length / PROJECTS_PER_PAGE);
		console.log(maxPages.current)
	}, [props.slice.projects]);


	/**
	 * Listen for page change and update tiles accordingly.
	 */
	useEffect(() => {		
		setTiles(makeTiles(props.slice.projects.slice((page - 1) * PROJECTS_PER_PAGE, page * PROJECTS_PER_PAGE)));
	}, [page, props.slice.projects]);


	/**
	 * Listen for changes to sorting fxn and update tiles accordingly. New sorting functions can be added in ExploreSlice
	 */
	useEffect(() => {
		sortTiles();
	}, [props.slice.sorting]);


	/**
	 * Create a set of tiles given project data (from slice);
	 * @param {*} projects 
	 * @returns 
	 */
	const makeTiles = (projects) => {
		let tiling = [];
		for(const project of projects) {
			tiling.push(
				<ExploreTile
					key = {project._id}
					id = {project._id}
					title = {project.projectName}
					image = {project.image}
					desc = {project.summary}
					progress = {Math.floor(project.totalSaved/project.goalAmount) * 100}
					date = {project.updatedAt}
					verified = {project.verified}	// UPDATE THIS LATER
					open = {project.projectOpen}
				/>
			);
		}

		return tiling;
	}

	/**
	 * Sort the tiles! Called when slice.sorting updates (see useeffect above);
	 */
	const sortTiles = () => {
		let sorted = [...props.slice.projects].sort(props.slice.sorting.fxn);
		console.log(sorted);
		reducerFxns.exploreProjectsFxn(sorted);
	}


	const nextPage = (e) => {
		if(page < maxPages.current) {
			setPage(page + 1);
		}
	}


	const prevPage = (e) => {
		if(page > 1) {
			setPage(page - 1);
		}
	}

	
	return (
		<Stack>
			<Grid container spacing={3}>
				{tiles}
			</Grid>
			<Box pt="1vh">
				<Button pr="1vw" variant="contained" onClick={prevPage}><b>{"<"}</b></Button>
					<span><Typography variant="stats" sx={{paddingLeft: "1vw", paddingRight: "1vw"}}>{page} of {maxPages.current}</Typography></span>
				<Button variant="contained" onClick={nextPage}><b>{">"}</b></Button>
			</Box>
		</Stack>
	);
}

/**
 * Tile used to display a project.
 * @param {*} props 
 * @returns 
 */
const ExploreTile = (props) => {
	return (
		<Grid item xs={4}>
			<Link to={"/explore/project/" + props.id}>
				<Card variant="outlined" sx={{background:"white", borderRadius:"15px", ":hover":{cursor: "pointer", boxShadow:"5px 5px rgba(0, 0, 0, 0.2)"}}}>
					<CardContent sx={{background: props.open ? "#1C3E64" : "#080808", color:"white", borderBottom:"5px solid rgba(0,0,0,0.2)"}}>
						<Typography variant="h4">{props.title}</Typography>
					</CardContent>
					
					<CardMedia component="img" alt="" height="150" image={ADDRESSES.BACKEND + props.image} sx={{"borderRadius":"0 0 15px 15px", borderBottom:"5px groove rgba(0,0,0,0.5)"}}/>
					<CardContent style={{"paddingBottom": 0}}>
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<Typography maxHeight="75px" minHeight="75px" variant="body2" sx={{overflowWrap:"break-word", overflow:"hidden", textOverflow:"ellipsis", textAlign:"left"}}>{props.desc}</Typography>
							</Grid>

							<Grid item xs={4}>
								<Box sx={{ position: 'relative', display: 'inline-flex' }}>
									<CircularProgress variant="determinate" value={100} size={"75px"} thickness={7} sx={{"position": "absolute", color:"lightgray"}}/>
									<CircularProgress variant="determinate" value={props.progress} size={"75px"} thickness={7}/>
									<Box sx={{inset: "0 0 0 0", position: "absolute", display: "flex", alignItems: "center", justifyContent: "center"}}>
										<Typography variant="caption">{props.progress}%</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<Box sx={{borderBottom: "1px solid rgba(0,0,0,0.2)"}}/>
							</Grid>
							<Grid item xs={8} sx={{display:"flex", justifyContent:"left", alignItems:"center"}} style={{paddingTop:"0"}}>
								<Typography fontSize="11px" variant="caption">{new Date(props.date).toDateString()}</Typography>
							</Grid>
							<Grid item xs={4} sx={{textAlign: "right"}} style={{paddingTop:"0"}}>
								<Tooltip title={
									<React.Fragment>
										<Typography>{props.verified ? "This project has been verified!" : "Unverified as of " + new Date().toDateString()}</Typography>
									</React.Fragment>}
								>
									<Typography variant="h6">{props.verified ? <VerifiedIcon color="primary"/>:<UnverifiedIcon color="secondary"/>}</Typography>	
								</Tooltip>
								
							</Grid>
						</Grid>
					</CardContent>
					
				</Card>
			</Link>
		
		</Grid>
	);
}


export default Explore;