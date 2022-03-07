import React from 'react';
import './App.css';

// import BackgroundCanvas from './Components/PageBits/BackgroundCanvas/BackgroundCanvas.js'
import SiteHeader from './Components/PageBits/SiteHeader/SiteHeader.js';
import SiteContent from './Components/PageBits/SiteContent/SiteContent';

import HomePage from './Components/Pages/Home';
//import Explore from './Components/Pages/Explore';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <HomePage/>
    }
  }

  changePage = (page) => {
    this.setState({content: page});
  }

  render() {
    return ( //background canvas later
      <div className="App">
        <SiteHeader onClick={this.changePage}/>
        <SiteContent content={this.state.content}/>
      </div>
    );
  }
}

export default App;