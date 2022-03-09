import React from 'react';
import vis from "./Images/vis.png"
// uses algoexplorer https://algoexplorer.io/ because setting up the indexer requires a free hard drive

const Visualizer = () => {
    return (
        <div className="vis-container">
            <img src={vis} alt="visualizer" style={{"border-radius": "15px"}}/>
        </div>
    );
}

export default Visualizer;