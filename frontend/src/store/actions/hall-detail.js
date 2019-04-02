import axios, {HALLS_URL} from "../../api-urls";
import {SHOWS_URL} from "../../api-urls";
import moment from "moment";

export const HALL_DETAIL_REQUEST_SUCCESS = "HALL_DETAIL_REQUEST_SUCCESS";
export const HALL_SHOWS_REQUEST_SUCCESS = "HALL_SHOWS_REQUEST_SUCCESS";

export const loadHall = (id) => {
    const startsAfter = moment().format('YYYY-MM-DD HH:mm');
    const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
    const query = encodeURI(`hall_id=${id}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
    console.log('Загрузка тест');
    return dispatch => {
        axios.get(HALLS_URL + id)
            .then(response => {
                console.log('Загрузка 1');
                return dispatch({type: HALL_DETAIL_REQUEST_SUCCESS, hall: response.data});
            }).catch(error => console.log(error));
        axios.get(`${SHOWS_URL}?${query}`)
            .then(response => {
                console.log('Загрузка 2');
                return dispatch({type: HALL_SHOWS_REQUEST_SUCCESS, shows: response.data});
            }).catch(error => console.log(error));
    }
};