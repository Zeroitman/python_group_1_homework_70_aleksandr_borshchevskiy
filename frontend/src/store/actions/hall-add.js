import axios from "axios";

export const HALL_ADD_REQUEST = "HALL_EDIT_REQUEST";
export const HALL_ADD_SUCCESS = "HALL_EDIT_SUCCESS";
export const HALL_ADD_ERROR = "HALL_EDIT_ERROR";


const gatherFormData = (hall) => {
    let formData = new FormData();
    console.log("Сбор данных", formData);
    Object.keys(hall).forEach(key => {
        const value = hall[key];
        if (value) {
            if (Array.isArray(value)) {
                value.forEach(item => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        }
    });
    return formData;
};


export const saveHall = (hall) => {
    return dispatch => {
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        };
        dispatch({type: HALL_ADD_REQUEST});
        return axios.post('halls/', gatherFormData(hall), options).then(response => {
            console.log(response);
            return dispatch({type: HALL_ADD_SUCCESS, hall: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: HALL_ADD_ERROR, errors: error.response.data});
        });
    }
};

