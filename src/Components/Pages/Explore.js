import React from "react";
import "./Explore.css";
import image from "./Images/temp.jpg";

const Explore = (props) => {
  return (
    <div className="search-container">
      <h1>Explore and Discover</h1>
      <ExploreSearch />
      <ExploreContent />
    </div>
  );
};

const ExploreContent = (props) => {
  return (
    <div className="explore-content">
      <ExploreFilter />
      <ExploreTiling />
    </div>
  );
};

const ExploreTile = (props) => {
  return (
    <div className="explore-tile">
        <h4 className="explore-tile-title">{props.title}</h4>
        {/* <img src={props.img} class="explore-tile-img"/> */}
        <div class="explore-tile-img-contain">
            <img src={image} class="explore-tile-img" style={{ width: "300px" }} />
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

const ExploreTiling = (props) => {
  return (
    <div className="explore-tiling">
      <ExploreTile
        title="Title"
        img="ee"
        desc="description"
        progress={rBetween(1, 100)}
      />
      <ExploreTile
        title="Title"
        img="ee"
        desc="description"
        progress={rBetween(1, 100)}
      />
      <ExploreTile
        title="Title"
        img="ee"
        desc="description"
        progress={rBetween(1, 100)}
      />
      <ExploreTile
        title="Title"
        img="ee"
        desc="description"
        progress={rBetween(1, 100)}
      />
      <ExploreTile
        title="Title"
        img="ee"
        desc="description"
        progress={rBetween(1, 100)}
      />
      <ExploreTile
        title="Title"
        img="ee"
        desc="description"
        progress={rBetween(1, 100)}
      />
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
