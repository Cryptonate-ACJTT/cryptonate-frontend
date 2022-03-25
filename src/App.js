import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthContextProvider } from './auth';

import 'bootstrap/dist/css/bootstrap.css';

import SiteHeader from './Components/PageBits/SiteHeader/SiteHeader.js';
import SiteContent from './Components/PageBits/SiteContent/SiteContent';


import Home from './Components/Pages/Home'
import Explore from './Components/Pages/Explore'
import About from './Components/Pages/About'
import Crypto from './Components/Pages/WhyCrypto'
import SignUpLogin from './Components/Pages/SignUpLogin'
import TestRegister from './Components/Pages/TestRegister';
import Project from './Components/Pages/Project';

import Profile from './Components/Pages/Profile';
import AuthenticationForm from './Components/Pages/AuthenticationForm';
import ProjectForm from './Components/Pages/ProjectForm';
import WhyCrypto from './Components/Pages/WhyCrypto';


const App = () => {
  return (
    <BrowserRouter>
    <AuthContextProvider>
     <div className="App">
       <SiteHeader/>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/why-crypto" element={<WhyCrypto/>} />
        <Route path="/login-signup" element={<SignUpLogin/>} />
        <Route path="test-register" element={<TestRegister/>}/>
        <Route path="/explore/project-example" element={<Project/>}/>
      </Routes>
      </div>
    </AuthContextProvider>
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