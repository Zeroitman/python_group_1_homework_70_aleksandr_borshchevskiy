import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import movieListReducer from "./movie-list";
import movieEditReducer from "./movie-edit";
import hallListReducer from "./hall-list";
import hallEditReducer from "./hall-edit";
import hallDetailReducer from "./hall-detail";

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    movieList: movieListReducer,
    movieEdit: movieEditReducer,
    hallDetail:hallDetailReducer,
    hallList: hallListReducer,
    hallEdit: hallEditReducer,
});

export default rootReducer;