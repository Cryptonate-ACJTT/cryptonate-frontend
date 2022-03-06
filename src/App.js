//import logo from './logo.svg';
import './App.css';
import SiteHeader from './Components/PageBits/SiteHeader/SiteHeader.js';
import BackgroundCanvas from './Components/PageBits/BackgroundCanvas/BackgroundCanvas.js'
import SiteContent from './Components/PageBits/SiteContent/SiteContent';
import React from 'react';

//const pages = ["Home", "Explore", "About", "Why Crypto?"];


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: "Home"
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
  return ( 
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