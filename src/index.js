import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-globally'
import initialState from "./initialState.js";

import App from './App';

ReactDOM.render(<Provider globalState={initialState}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById("root"));