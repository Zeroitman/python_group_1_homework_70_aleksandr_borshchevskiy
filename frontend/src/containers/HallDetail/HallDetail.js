import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import axios from 'axios';


class HallDetail extends Component {
    state = {
        HallDetail: null,
        shows: null
    };

    componentDidMount() {this.getHall(this.props.match.params.id);}

    getHall = (id) => {axios.get('halls/' + id).then(response => {return response.data})
            .then(HallDetail => {this.setState({HallDetail})})
            .catch(error => {console.log(error)});
        const showsUrl = this.composeUrl(id);
        this.getShows(showsUrl)
    };


    composeUrl = (id) => {
        const start_date = new Date();
        const end_date = new Date();
        end_date.setDate(start_date.getDate() + 3);
        const start = start_date.toISOString().slice(0, 10);
        const end = end_date.toISOString().slice(0, 10);
        return 'shows/?hall_id=' + id + '&starts_after=' + start + '&starts_before=' + end;
    };

    getShows = (showsUrl) => {
        axios.get(showsUrl).then(response => {return response.data})
            .then(shows => {this.setState({shows})})
            .catch(error => {console.log(error)})};

    deleteHall = (id) => {axios.delete('halls/' + id).then(this.props.history.replace('/halls/'))};


    render() {
        if (!this.state.HallDetail) return null;
        const {name, id} = this.state.HallDetail;
        return (
            <div className="card mt-3 text-center">
                <div className="card-header h1">{name}</div>
                <div className="mt-2">
                    <NavLink to={'/halls/' + id + '/edit'} className="btn btn-primary px-2 py-0 m-2"
                    >Редактировать</NavLink>
                    <button className="btn btn-danger px-2 py-0 m-2" onClick={() => this.deleteHall(id)}
                    >Удалить
                    </button>
                </div>
                {this.state.shows ? <ShowSchedule shows={this.state.shows} movie={true} hall={false}/> : null}
            </div>
        );
    }
}

export default HallDetail;