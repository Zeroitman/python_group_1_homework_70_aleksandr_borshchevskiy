import axios from "axios";

export const MOVIE_ADD_REQUEST = "MOVIE_EDIT_REQUEST";
export const MOVIE_ADD_SUCCESS = "MOVIE_EDIT_SUCCESS";
export const MOVIE_ADD_ERROR = "MOVIE_EDIT_ERROR";


const gatherFormData = (hall) => {
    let formData = new FormData();
    // console.log("Сбор данных", formData);
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


export const saveMovie = (movie) => {
    return dispatch => {
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        };
        dispatch({type: MOVIE_ADD_REQUEST});
        return axios.post('movies/', gatherFormData(movie), options).then(response => {
            console.log(response);
            return dispatch({type: MOVIE_ADD_SUCCESS, movie: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: MOVIE_ADD_ERROR, errors: error.response.data});
        });
    }
};