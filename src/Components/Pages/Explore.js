import { API_ROUTES, postToBackend } from "../../Fetch/ApiFetches";
import ExploreSlice from "../../Redux/Slices/ExploreSlice"


const Explore = () => {
	const slice = ExploreSlice.useSlice();

	/**
	 * 
	 * @param {*} searchTerm 
	 * @returns 
	 */
	const searchRequest = (searchTerm) => {
		searchTerm = "" + searchTerm; // make sure it's a string juuuuust in case
		let searchJson = {};
		return postToBackend(API_ROUTES.EXPLORE_SEARCH, searchJson);
	}


	return (
		<div className="explore-container">
        	<h1 className="page-title">Explore & Discover</h1>
			<ExploreSearch/>
			<ExploreFilter sorts={["hello", "ahgh", "priaij"]}/>
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
		return null;
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

const ExploreContent = () => {

}

const ExploreTile = () => {

}

export default Explore;