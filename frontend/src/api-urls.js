import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/v1';
const MOVIES_URL = '/movies/';
const CATEGORIES_URL = '/categories/';
const SHOWS_URL = '/shows/';
const HALLS_URL = '/halls/';
const LOGIN_URL = '/login/';
const REGISTER_URL = '/register/';
const instance = axios.create({
    baseURL: BASE_URL
});
const TOKEN_LOGIN_URL = '/token-login/';

export {MOVIES_URL,CATEGORIES_URL, SHOWS_URL, BASE_URL, HALLS_URL, LOGIN_URL, REGISTER_URL,TOKEN_LOGIN_URL}

export default instance;