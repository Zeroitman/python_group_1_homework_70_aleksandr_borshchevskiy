import axios from "axios";

export const PERSONAL_EDIT_REQUEST = "PERSONAL_EDIT_REQUEST";
export const PERSONAL_EDIT_SUCCESS = "PERSONAL_EDIT_SUCCESS";
export const PERSONAL_EDIT_ERROR = "PERSONAL_EDIT_ERROR";

export const PERSONAL_LOAD_SUCCESS = "PERSONAL_LOAD_SUCCESS";

export const loadPersonal = (id) => {
    return dispatch => {
        axios.patch('/user/' + id + '/edit/').then(response => {
            return dispatch({type: PERSONAL_LOAD_SUCCESS, personal: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    }
};


export const gatherFormData = (personal) => {
    let data = {};
    Object.keys(personal).forEach(key => {
        data[key] = personal[key] === "" ? null : personal[key];
    });
    if (!data.password) {
        delete data['password']
    }
    return data;
};


export const savePersonal = (personal) => {
    return dispatch => {
        const url = 'user/' + personal.id + '/edit/';
        dispatch({type: PERSONAL_EDIT_REQUEST});
        return axios.patch(url, gatherFormData(personal)).then(response => {
            return dispatch({type: PERSONAL_EDIT_SUCCESS, personal: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: PERSONAL_EDIT_ERROR, errors: error.response.data});
        });
    }
};
