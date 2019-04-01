import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import axios from 'axios';
import {HALLS_URL, SHOWS_URL} from "../../api-urls";
import moment from "moment";
import connect from "react-redux/es/connect/connect";


class HallDetail extends Component {
    state = {
        halls: null,
        shows: null
    };

    componentDidMount() {
        const match = this.props.match;
        axios.get(HALLS_URL + match.params.id).then(response => {
            return response.data;
        })
            .then(halls => {
                this.setState({halls});
                this.loadShows(halls.id);
            })
            .catch(error => console.log(error));
    }


    loadShows = (hallId) => {
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
        const query = encodeURI(`hall_id=${hallId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        axios.get(`${SHOWS_URL}?${query}`).then(response => {
            this.setState(prevState => {
                let newState = {...prevState};
                newState.shows = response.data;
                return newState;
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };


    deleteHall = (id) => {
        axios.delete('halls/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(this.props.history.replace('/'))
    };


    render() {
        if (!this.state.halls) return null;
        const {name, id} = this.state.halls;
        const isAdmin = this.props.auth.is_admin;
        console.log(this.props.auth);
        return (
            <div className="card mt-3 text-center">
                <div className="card-header h1">{name}</div>
                <div className="mt-2">
                    <NavLink to={'/halls/' + id + '/edit'} className="btn btn-primary px-2 py-0 m-2"
                    >Редактировать</NavLink>
                    {isAdmin === true ?
                        <button className="btn btn-danger px-2 py-0 m-2"
                                onClick={() => this.deleteHall(id)}>Удалить</button> : null}
                </div>
                {this.state.shows ? <ShowSchedule shows={this.state.shows} movie={true} hall={false}/> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps)(HallDetail);