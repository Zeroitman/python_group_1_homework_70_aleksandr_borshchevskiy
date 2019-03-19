import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
// стили для дэйтпикера (без них он не выводится).
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {BASE_URL} from "./api-urls";

axios.defaults.baseURL = BASE_URL;
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
