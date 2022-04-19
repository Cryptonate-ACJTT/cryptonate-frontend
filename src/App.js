import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';

import SiteHeader from './Components/PageBits/SiteHeader/SiteHeader.js';


import Home from './Components/Pages/Home'
import Explore from './Components/Pages/Explore'
import About from './Components/Pages/About'
import Crypto from './Components/Pages/WhyCrypto'
import SignUpLogin from './Components/Pages/SignUpLogin'
import Project from './Components/Pages/Project';
import Wallet from './Components/Pages/Wallet';


import Profile from './Components/Pages/Profile';
import OrgAuthForm from './Components/Pages/OrgAuthForm';
import ProjectForm from './Components/Pages/ProjectForm';
import AuthorizedRoute from './Components/PageBits/AuthRoute/AuthRoute';
import { API_ROUTES } from './Fetch/ApiFetches';

const PAGES = API_ROUTES.FRONTEND;

// TODO: protected routes for profile, wallet, project form, etc
const App = () => {
  return (
    <BrowserRouter>
    	<div className="App">
       		<SiteHeader/>
      
      		<Routes>
				<Route path="/home" element={<Home/>} />
				<Route path="/explore" element={<Explore/>} />
				<Route path="/about" element={<About/>} />
				<Route path="/why-crypto" element={<Crypto/>} />
				<Route path="/login-signup" element={<SignUpLogin/>} />
				<Route path="/explore/project/:id" element={<Project/>}/>

				<Route path="/profile" element={<AuthorizedRoute component={Profile}/>} />
				<Route path="/organization-auth-form" element={<AuthorizedRoute component={OrgAuthForm}/>} />
				<Route path="/project-form" element={<AuthorizedRoute component={ProjectForm}/>} />
				<Route path="/wallet" element={<AuthorizedRoute component={Wallet}/>} />

				<Route path="/logout" element={<Navigate replace to="/home"/>}/>
				<Route path="/login" element={<Navigate replace to="/profile"/>}/>

				<Route path="*" element={<Navigate replace to="/home"/>}/>
    		</Routes>
    	</div>
    </BrowserRouter>
    ) 
  }

export default App;