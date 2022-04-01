import React from "react";
import "./Explore.css";
import image from "./Images/temp.jpg";
import Project from "./Project";
import { Link } from 'react-router-dom'

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTarget: "",
      matchingProjects: []
    };
  }

  exploreSearch = (e) => {
    e.preventDefault();

    let val = e.target.searchy.value;
    this.setState({searchTarget: val});
    e.target.searchy.value = "";
    
    console.log(val);
  };

  exploreFilter = () => {

  }

  getProjectPage = (projectID, projectTitle, projectImage, projectProgress) => {
    console.log(projectID);
    
    this.props.passDownOnClick(<Project id={projectID} title={projectTitle} image={projectImage} progress={projectProgress}/>);
  }

  render = () => {
    return (
      <div className="explore-container">
        <h1 className="page-title">Explore & Discover</h1>
        <ExploreSearch searchFunction={this.exploreSearch}/>
        <ExploreContent getProject={this.getProjectPage}/>
      </div>
    );
  }
}

/*
const Explore = (props) => {

  const exploreProjects = {};

  const exploreSearch = (e) => {
    e.preventDefault();
    let val = e.target.searchy.value;
    e.target.searchy.value = "";
    console.log(val);
  };

  return (
    <div className="explore-container">
      <h1>Explore and Discover</h1>
      <ExploreSearch searchFunction={exploreSearch}/>
      <ExploreContent passDownOnClick={props.passDownOnClick}/>
    </div>
  );
};
*/
const ExploreContent = (props) => {
  return (
    <div className="explore-content">
      <ExploreFilter />
      <ExploreTiling getProject={props.getProject} />
    </div>
  );
};

const ExploreTile = (props) => {

  const tileClick = () => { // temporary testing for sending project links down through
    console.log(props.link);
    props.getProject(props.id, props.title, props.image, props.progress);
  }

  return (
    <Link to="/explore/project-example">
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
    </Link>
  );
};

function rBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genExploreTile = (props, id) => {
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
        id={id}
        getProject={props.getProject}
      />
  );
}

const ExploreTiling = (props) => {
  // need to set this up to work with filtering
  let tiles = [];
  for(let i = 0; i < rBetween(1, 20); i++) {
    tiles.push(genExploreTile(props, i));
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

      <div className="explore-search-piece">
        <label htmlFor="sort-select">Sort By: </label>
        <select id="sort-select">
          <option>Close to Goal</option>
          <option>Recently Added</option>
        </select>
      </div>

      <h3>Categories</h3>
    </div>
  );
};

const ExploreSearch = (props) => {
  //const [searchTerm, setSearchTerm] = React.useState("");



  return (
    <div className="explore-search">
      <div className="explore-search-piece">
        <form onSubmit={props.searchFunction}>
          <input type="text" name="searchy" placeholder="Search by Keyword" />
          <input type="submit" value="Search" />
        </form>
      </div>
      {/* <div className="explore-search-piece">
        <label htmlFor="sort-select">Sort By: </label>
        <select id="sort-select">
          <option>Close to Goal</option>
        </select>
      </div> */}
    </div>
  );
};

export default Explore;
