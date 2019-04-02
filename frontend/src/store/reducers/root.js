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

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    movieList: movieListReducer,
    movieEdit: movieEditReducer,
    movieDetail: movieDetailReducer,
    hallDetail: hallDetailReducer,
    hallList: hallListReducer,
    hallEdit: hallEditReducer,
    personalEdit: personalEditReducer
});

export default rootReducer;