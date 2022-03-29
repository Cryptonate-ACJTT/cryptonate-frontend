import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './Redux/Store';
import ExampleSlice from './Redux/Slices/ExampleSlice';	// for testing purposes, remember to remove
// import reportWebVitals from './reportWebVitals';

// initialize the store
Store.getInstance();

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
