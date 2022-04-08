import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './Redux/Store';
// import reportWebVitals from './reportWebVitals';

// initialize the store
Store.getInstance();

console.log(
    "  ______                             __                           __       \n" +
      "  / ____/   _____   __  __    ____   / /_  ____    ____   ____ _  / /_  ___ \n" +
      " / /       / ___/  / / / /   / __ \\ / __/ / __ \\  / __ \\ / __ `/ / __/ / _ \\\n" +
      "/ /___    / /     / /_/ /   / /_/ // /_  / /_/ / / / / // /_/ / / /_  /  __/\n" +
      "\\____/   /_/      \\__, /   / .___/ \\__/  \\____/ /_/ /_/ \\__,_/  \\__/  \\___/ \n" +
      "                 /____/   /_/                                               \n" +
	  "                                                             frontend v0.1    "
  );	// yes thank you I love startup logos

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
