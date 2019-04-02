import axios, {MOVIES_URL, SHOWS_URL} from "../../api-urls";
import moment from "moment";

export const MOVIE_DETAIL_REQUEST_SUCCESS = "MOVIE_DETAIL_REQUEST_SUCCESS";
export const MOVIE_SHOWS_REQUEST_SUCCESS = "MOVIE_SHOWS_REQUEST_SUCCESS";

export const loadMovie = (id) => {
    const startsAfter = moment().format('YYYY-MM-DD HH:mm');
    const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
    const query = encodeURI(`movie_id=${id}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
    return dispatch => {
        axios.get(MOVIES_URL + id).then(response => {
            return dispatch({type: MOVIE_DETAIL_REQUEST_SUCCESS, movie: response.data});
        }).catch(error => console.log(error));
        axios.get(`${SHOWS_URL}?${query}`).then(response => {
            return dispatch({type: MOVIE_SHOWS_REQUEST_SUCCESS, shows: response.data});
        }).catch(error => console.log(error));
    }
};