import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ADDRESSES, API_ROUTES, getFromBackend } from "../../Fetch/ApiFetches";
import ExploreSlice, { CATEGORIES, reducerFxns, SORTINGS } from "../../Redux/Slices/ExploreSlice"
import { Card, CardContent, CardMedia, Grid, Tooltip, Typography, Box, CircularProgress } from "@mui/material"
import "./Explore.css";
import "./Default.css";

const PROJECTS_PER_PAGE = 9; // multiple of three please


const Explore = () => {
	const slice = ExploreSlice.useSlice();

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

		console.log(route);
		
		getFromBackend(route, { callback: (data) => {
			reducerFxns.exploreProjectsFxn(data.projects);
		}});
	}

	return (
		<div className="explore-container">
        	<h1 className="page-title">Explore & Discover</h1>
			<hr/>
			<ExploreSearch slice={slice}/>
			<div>
				<ExploreFilter slice={slice} sorts={SORTINGS} categories={CATEGORIES}/>
				<ExploreTiling slice={slice}/>
			</div>
		</div>
	);
}



/**
 * Explore page search bar!
 * @param {*} props 
 */
const ExploreSearch = (props) => {

	/**
	 * Intercepts onSubmit; cleans input and
	 * @param {*} e 
	 */
	const exploreSearchIntercept = (e) => {
		e.preventDefault();
		let val = "" + e.target.searchy.value;	// string for safety
		//e.target.searchy.value = "";

		reducerFxns.exploreSearchFxn(val);
	}

	return (
		<div className="explore-search">
			<div className="explore-search-piece">
				<form onSubmit={exploreSearchIntercept}>
					<input type="text" name="searchy" placeholder="Search by Keyword" />
          			<input type="submit" value="Search" />
				</form>
			</div>
		</div>
	)
}



/**
 * Contains the filtering options on the Explore page.
 * @param {*} props 
 * @returns 
 */
const ExploreFilter = (props) => {

	/**
	 * Adds options to the sort selection
	 * @param {*} props 
	 * @returns 
	 */
	const addSortOptions = (sortOptions) => {
		let sortOptionsReturned = [];
		
		for(let i = 0; i < sortOptions.length; i++) {
			sortOptionsReturned.push(
				<option key={"option" + i}>{sortOptions[i].name}</option>
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
				<div className="explore-category" key={"checkbox" + i} >
					<input className="explore-category-checkbox" type="checkbox" id={"checkbox-" + categories[i].name} name={categories[i].name} onChange={(e) => {checkBoxHandler(e, i)}}/>
					<label className="explore-category-label" htmlFor={"checkbox-" + categories[i].name}>{categories[i].name}</label>
				</div>
			)
		}

		return categoriesReturned;
	}

	/**
	 * intercepts the onchange
	 * @param {*} e 
	 */
	const exploreSortIntercept = (e) => {
		let sorting = SORTINGS.filter(s => s.name == e.target.value)[0];
		reducerFxns.exploreSortFxn(sorting);
	}

	return (
		<div className="explore-filter">
			<h2>Filter</h2>
			<div className="explore-search-piece">
				<label htmlFor="sort-select">Sort By:</label>
				<select id="sort-select" onChange={exploreSortIntercept}>
					{addSortOptions(props.sorts)}
				</select>
			</div>
			<h3>Categories</h3>
			<div className="explore-categories">
				{addCategories(props.categories)}
			</div>
		</div>
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
					verified = {false}	// UPDATE THIS LATER
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
		<div className="explore-content">
			<div className="create-project">
				<Link to="/project-form">
					<button className="create-project-btn">Create Project</button>
				</Link>
			</div>
			<div className="explore-tiling-pages">
				<button className="explore-paginate-previous" onClick={prevPage}>{"<"}</button>
				<span className="explore-paginate-desc">{"Page " + page + " of " + maxPages.current}</span>
				<button className="explore-paginate-next" onClick={nextPage}>{">"}</button>
			</div>
			<Grid container spacing={3}>
				{tiles}
			</Grid>
			
		</div>
	);
}
/*
<div className="explore-tiling">
				{tiles}
			</div>
*/

/**
 * Tile used to display a project.
 * @param {*} props 
 * @returns 
 */
const ExploreTile = (props) => {
	return (
		<Grid item xs={4}>
			<Link to={"/explore/project/" + props.id}>
				<Card className="explore-tile" variant="outlined" sx={{"border-radius": "20px"}}>
					<CardContent>
						<Typography variant="h4">{props.title}</Typography>
					</CardContent>
					
					<CardMedia component="img" alt="" height="150" image={ADDRESSES.BACKEND + props.image} sx={{"border-radius":"10px", border:"2px solid lightgray"}}/>
					<CardContent style={{"padding-bottom": 0}}>
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<Typography maxHeight="100px" minHeight="100px" variant="body2" xs={{"overflowWrap":"breakWord", "overflow": "hidden"}}>{props.desc}</Typography>
							</Grid>

							<Grid item xs={4}>
								<Box sx={{ position: 'relative', display: 'inline-flex' }}>
									<CircularProgress variant="determinate" value={100} size={"75px"} thickness={7} sx={{"position": "absolute", color:"gray"}}/>
									<CircularProgress variant="determinate" value={props.progress} size={"75px"} thickness={7}/>
									<Box sx={{inset: "0 0 0 0", position: "absolute", display: "flex", alignItems: "center", justifyContent: "center"}}>
										<Typography variant="caption">{props.progress}%</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={8}>
								<Typography variant="caption">{new Date(props.date).toDateString()}</Typography>
							</Grid>
							<Grid item xs={4} sx={{"text-align": "right"}}>
								<Tooltip title={
									<React.Fragment>
										<Typography>{props.verified ? "This project has been verified!" : "Unverified as of " + new Date(props.date).toDateString()}</Typography>
									</React.Fragment>}
								>
									<Typography variant="h6">{props.verified ? "🟢":"🔴"}</Typography>	
								</Tooltip>
								
							</Grid>
						</Grid>
					</CardContent>
					
				</Card>
			</Link>
		
		</Grid>
		
	)
}


export default Explore;