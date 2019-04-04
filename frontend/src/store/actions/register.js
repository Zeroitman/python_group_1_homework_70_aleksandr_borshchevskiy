import axios from "axios";
import {REGISTER_URL} from "../../api-urls";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';


export const registerUser = (user) => {
    return dispatch => {
        dispatch({type: REGISTER_REQUEST});
        return axios.post(REGISTER_URL, user).then(response => {
            console.log(response);
            return dispatch({type: REGISTER_SUCCESS})
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: REGISTER_ERROR, errors: error.response.data});
        });
    }
};

