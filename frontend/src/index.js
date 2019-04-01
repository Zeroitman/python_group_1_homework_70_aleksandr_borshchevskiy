import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {BASE_URL} from "./api-urls";
import {createStore, applyMiddleware} from 'redux'
import reducer from './store/reducer'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

axios.defaults.baseURL = BASE_URL;
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
