import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'



import SiteHeader from './Components/PageBits/SiteHeader/SiteHeader.js';
import SiteContent from './Components/PageBits/SiteContent/SiteContent';


import Home from './Components/Pages/Home'
import Explore from './Components/Pages/Explore'
import About from './Components/Pages/About'
import Crypto from './Components/Pages/WhyCrypto'
import SignupLogin from './Components/Pages/SignUpLogin'
import TestRegister from './Components/Pages/TestRegister';

const App = () => {
  return (
    <BrowserRouter>
     <div className="App">
       <SiteHeader/>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/why-crypto" element={<Crypto/>} />
        <Route path="/login-signup" element={<SignupLogin/>} />
        <Route path="test-register" element={<TestRegister/>}/>
      </Routes>
      </div>
    </BrowserRouter>

    ) 
  }




// class App extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     content: <Explore/>
//   //   }
//   // }

//   // changePage = (page) => {
//   //   this.setState({content: page});
//   // }

//   render() {
//     return ( //background canvas later

//       <Router>
//         <div className="App">
//           <SiteHeader/>
//           {/* <SiteContent content={this.state.content} passDownOnClick={this.changePage}/> */}
//           </div>
//         <Routes>
//           <Route exact path="/" component={Home}/>
//         </Routes>
//       </Router>
      
//       // <div className="App">
//       //   <SiteHeader onClick={this.changePage}/>
//       //   <SiteContent content={this.state.content} passDownOnClick={this.changePage}/>
//       // </div>
//     );
//   }
// }

export default App;