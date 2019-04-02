import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios'
import {loadHall} from "../../store/actions/hall-detail";
import {connect} from "react-redux";
import ShowSchedule from '../../components/ShowSchedule/ShowSchedule'


class HallDetail extends Component {
    componentDidMount() {
        this.props.loadHall(this.props.match.params.id)
    }

    deleteHall = (id) => {
        axios.delete('halls/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(this.props.history.replace('/'))
    };

    render() {
        if (this.props.hallDetail) {
            const {name, id} = this.props.hallDetail.hall;
            const isAdmin = this.props.auth.is_admin;
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
                    {this.props.hallDetail.shows ?
                        <ShowSchedule shows={this.props.hallDetail.shows} movie={true} hall={false}/> : null}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        hallDetail: state.hallDetail,
        auth: state.auth
    }
};
const mapDispatchToProps = (dispatch) => ({
    loadHall: (id) => dispatch(loadHall(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HallDetail);