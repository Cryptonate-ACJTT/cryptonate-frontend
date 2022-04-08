import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_ROUTES, getFromBackend, postToBackend } from "../../Fetch/ApiFetches";
import ExploreSlice, { CATEGORIES, reducerFxns, SORTINGS } from "../../Redux/Slices/ExploreSlice"
import "./Explore.css";

const PROJECTS_PER_PAGE = 20;


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
			<ExploreSearch slice={slice}/>
			<ExploreFilter slice={slice} sorts={Object.values(SORTINGS)} categories={CATEGORIES}/>
			<ExploreTiling slice={slice}/>
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
				<option key={"option" + i}>{sortOptions[i]}</option>
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
			reducerFxns.exploreCategoriesFxn(categories.filter(cat => cat.checked == true));
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
		reducerFxns.exploreSortFxn(e.target.value);
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
	// pagination

	const page = useRef(1);
	const maxPages = useRef(1);	// pagination
	let [tiles, setTiles] = useState([]);

	/**
	 * Listen for changes in props.slice.projects and set tiles appropriately.
	 */
	useEffect(() => {
		setTiles(makeTiles(props.slice.projects));
	}, [props.slice.projects]);

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
				/>
			);
		}

		return tiling;
	}

	/**
	 * Sort the tiles, given a sorting directive.
	 * @param {*} tiles 
	 * @param {*} sort 
	 */
	const sortTiles = (tiles, sort) => {
		
	}

	return (
		<div className="explore-content">
			<div className="explore-tiling">
				{tiles}
			</div>
		</div>
	)
}



const ExploreTile = (props) => {
	const tileClick = (e) => {

	}

	return (
		<Link to={"/explore/project/" + props.id}>
			<div className="explore-tile" onClick={tileClick}>
				<h4 className="explore-tile-title">{props.title}</h4>
				<div className="explore-tile-img-contain">
					<img src={props.image} alt={""} className="explore-tile-img"/>
				</div>
				<p className="explore-tile-desc">{props.desc}</p>
				<p className="explore-tile-prog-desc">{props.progress}%</p>
				<progress value={props.progress} max="100" className="explore-tile-prog"/>
			</div>
		</Link>
	)

}

export default Explore;