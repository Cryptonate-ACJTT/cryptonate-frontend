import React from "react";
import "./Explore.css";
import image from "./Images/temp.jpg";
import Project from "./Project";

const Explore = (props) => {
  return (
    <div className="explore-container">
      <h1>Explore and Discover</h1>
      <ExploreSearch />
      <ExploreContent passDownOnClick={props.passDownOnClick}/>
    </div>
  );
};

const ExploreContent = (props) => {
  return (
    <div className="explore-content">
      <ExploreFilter />
      <ExploreTiling passDownOnClick={props.passDownOnClick} />
    </div>
  );
};

const ExploreTile = (props) => {

  const tileClick = () => { // temporary testing for sending project links down through
    console.log(props.link);
    props.passDownOnClick(<Project/>)
  }

  return (
    <div className="explore-tile" onClick={() => tileClick()}>
        <h4 className="explore-tile-title">{props.title}</h4>
        <div className="explore-tile-img-contain">
            <img src={props.image} alt={props.imageAlt} className="explore-tile-img" style={{ width: "300px" }} />
        </div>
        <p className="explore-tile-desc">{props.desc}</p>
        <p className="explore-tile-prog-desc">{props.progress}%</p>
        <progress
            value={props.progress}
            max="100"
            className="explore-tile-prog"
        />
    </div>
  );
};

function rBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genExploreTile = (props) => {
  // simulate getting data from database
  let titles = ["Title", "Project", "Organization", "Assist"]
  let images = [image];
  let links = ["proj1", "proj2"];
  let tags = ["animal", "children", "education", "environment", "international", "women"];

  return (
      <ExploreTile
        title={titles[rBetween(0, titles.length-1)]}
        image={images[rBetween(0, images.length-1)]}
        desc="description"
        progress={rBetween(1, 100)}
        link={links[rBetween(0, links.length-1)]}
        tags={tags[rBetween(0, tags.length-1)]}
        passDownOnClick={props.passDownOnClick}
      />
  );
}

const ExploreTiling = (props) => {
  // need to set this up to work with filtering
  let tiles = [];
  for(let i = 0; i < rBetween(1, 20); i++) {
    tiles.push(genExploreTile(props));
  }
  return (
    <div className="explore-tiling">
      {[...tiles]}
    </div>
  );
};

const ExploreFilter = (props) => {
  return (
    <div className="explore-filter">
      <h2>Filter</h2>
      <h3>Categories</h3>
    </div>
  );
};

const ExploreSearch = (props) => {
  //const [searchTerm, setSearchTerm] = React.useState("");

  const searchInput = (e) => {
    e.preventDefault();
    let val = e.target.searchy.value;
    e.target.searchy.value = "";
    console.log(val);
  };

  return (
    <div className="explore-search">
      <div className="explore-search-piece">
        <form onSubmit={searchInput}>
          <input type="text" name="searchy" />
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className="explore-search-piece">
        <label htmlFor="sort-select">Sort By: </label>
        <select id="sort-select">
          <option>Close to Goal</option>
        </select>
      </div>
    </div>
  );
};

export default Explore;
