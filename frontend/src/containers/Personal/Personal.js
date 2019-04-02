import React, {Component, Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Personal extends Component {
    render() {
        console.log(this.props);
        const username = this.props.username;
        const first_name = this.props.first_name;
        const last_name = this.props.last_name;
        const email = this.props.email;
        return <Fragment>
            <h1 className="text-center font-weight-normal mt-4"> Добро пожаловать в личный кабинет!</h1>
            <h3 className="text-left font-weight-normal"><b>Логин:</b> {username}</h3>
            <h3 className="text-left font-weight-normal"><b>Имя: </b>{first_name}</h3>
            <h3 className="text-left font-weight-normal"><b>Фамилие:</b> {last_name}</h3>
            <h3 className="text-left font-weight-normal"><b>Email:</b> {email}</h3>
            <div className="mt-2">
                <NavLink to='/personal/edit' className="btn btn-primary p-3 m-2 font-weight-bold"
                >Редактировать профиль</NavLink>
            </div>
        </Fragment>
    }
}

const mapStateToProps = state => state.auth;
export default connect(mapStateToProps)(Personal);