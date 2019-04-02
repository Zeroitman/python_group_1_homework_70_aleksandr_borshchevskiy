import {HALL_DETAIL_REQUEST_SUCCESS} from "../actions/hall-detail";
import {HALL_SHOWS_REQUEST_SUCCESS} from "../actions/hall-detail";

const initialState = {
    hall: [],
    shows: []
};

const hallDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_DETAIL_REQUEST_SUCCESS :
            return {...state, hall: action.hall};
        case HALL_SHOWS_REQUEST_SUCCESS :
            return {...state, shows: action.shows};
        default:
            return state;
    }
};

export default hallDetailReducer;