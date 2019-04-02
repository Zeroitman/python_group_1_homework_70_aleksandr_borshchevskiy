import {MOVIE_DETAIL_REQUEST_SUCCESS, MOVIE_SHOWS_REQUEST_SUCCESS} from "../actions/movie-detail";

const initialState = {
    movie: [],
    shows: []
};

const movieDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_DETAIL_REQUEST_SUCCESS :
            return {...state, movie: action.movie};
        case MOVIE_SHOWS_REQUEST_SUCCESS :
            return {...state, shows: action.shows};
        default:
            return state;
    }
};

export default movieDetailReducer;