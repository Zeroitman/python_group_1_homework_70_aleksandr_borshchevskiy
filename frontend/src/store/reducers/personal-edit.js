import {
    PERSONAL_EDIT_ERROR,
    PERSONAL_EDIT_REQUEST,
    PERSONAL_EDIT_SUCCESS,
    PERSONAL_LOAD_SUCCESS
} from "../actions/personal-edit";

const initialState = {
    personal: null,
    errors: {}
};

const personalEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case PERSONAL_LOAD_SUCCESS:
            return {...state, personal: action.personal};
        case PERSONAL_EDIT_REQUEST:
            return {...state, errors: {}};
        case PERSONAL_EDIT_SUCCESS:
            return {...state, personal: action.personal};
        case PERSONAL_EDIT_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default personalEditReducer;