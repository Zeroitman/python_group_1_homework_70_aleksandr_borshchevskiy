import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import movieListReducer from "./movie-list";
import movieEditReducer from "./movie-edit";
import hallListReducer from "./hall-list";
import hallEditReducer from "./hall-edit";
import hallDetailReducer from "./hall-detail";
import movieDetailReducer from "./movie-detail";
import personalEditReducer from "./personal-edit"
import hallAddReducer from "./hall-add";
import movieAddReducer from "./movie-add";
import registerReducer from "./register";

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    movieList: movieListReducer,
    movieEdit: movieEditReducer,
    movieDetail: movieDetailReducer,
    movieAdd: movieAddReducer,
    hallDetail: hallDetailReducer,
    hallList: hallListReducer,
    hallEdit: hallEditReducer,
    hallAdd: hallAddReducer,
    personalEdit: personalEditReducer,
    register: registerReducer,
});

export default rootReducer;