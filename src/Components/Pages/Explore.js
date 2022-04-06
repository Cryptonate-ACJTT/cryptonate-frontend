import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ROUTES, getFromBackend, postToBackend } from "../../Fetch/ApiFetches";
import ExploreSlice, { CATEGORIES, reducerFxns, SORTINGS } from "../../Redux/Slices/ExploreSlice"

const PROJECTS_PER_PAGE = 20;


const Explore = () => {
	const slice = ExploreSlice.useSlice();
	//console.log(slice);

	
	useEffect(() => {
		exploreSearchBackend();//{search:"Third+Project", category:"Animals"});
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
			ExploreSlice.reducerFxns.exploreProjectsFxn(data.projects);
		}});
	}

	//postToBackend()

	//exploreSearchBackend({search:"Third+Project", category:"Animal"});

	return (
		<div className="explore-container">
        	<h1 className="page-title">Explore & Discover</h1>
			<ExploreSearch slice={slice}/>
			<ExploreFilter slice={slice} sorts={Object.values(SORTINGS)} categories={CATEGORIES}/>
			<ExploreTiling />
		</div>
	);
}



/**
 * Explore page search bar!
 * @param {*} props 
 */
const ExploreSearch = (props) => {

	/**
	 * Intercepts onSubmit; mostly here to prevent the default behavior.
	 * @param {*} e 
	 */
	const exploreSearchIntercept = (e) => {
		e.preventDefault();
		let val = e.target.searchy.value;
		e.target.searchy.value = "";

		ExploreSlice.reducerFxns.exploreSearchFxn(val);
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

		const checkBoxHandler = (e, i) => {
			categories[i].checked = e.target.checked;
			reducerFxns.exploreCategoriesFxn(categories);
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
		ExploreSlice.reducerFxns.exploreSortFxn(e.target.value);
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

	let page = 1;
	let maxPages = 1;	// pagination

	let tiles = props.projects;	// projects on page

	const makeTiles = (projects) => {

	}

	const getNextTiles = () => {

	}
	
	const reloadTiles = () => {

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
		<Link to={"/explore/" + props.id}>
			<div className="explore-tile" onClick={tileClick}>
				<h4 className="explore-tile-title">{props.title}</h4>
				<div className="explore-tile-img-contains">
					<img src={props.image} alt={props.imageAlt} className="explore-tile-img"/>
				</div>
				<p className="explore-tile-desc">{props.desc}</p>
				<p className="explore-tile-prog-desc">{props.progress}%</p>
				<progress value={props.progress} max="100" className="explore-tile-prog"/>
			</div>
		</Link>
	)

}

export default Explore;