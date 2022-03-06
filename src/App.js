import React from 'react';
import './App.css';

// import BackgroundCanvas from './Components/PageBits/BackgroundCanvas/BackgroundCanvas.js'
import SiteHeader from './Components/PageBits/SiteHeader/SiteHeader.js';
import SiteContent from './Components/PageBits/SiteContent/SiteContent';

import HomePage from './Components/Pages/Home';


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
/*
function App() {
  return ( 6
    <div className="App">
      <BackgroundCanvas/>
      <SiteHeader onClick={changePage}/>
      <SiteContent/>
    </div>
  );
}

const contentMagager = (props) => {
  return <SiteContent content={props.content}/>
}

const changePage = (page) => {
  console.log(page);
}
*/


export default App;