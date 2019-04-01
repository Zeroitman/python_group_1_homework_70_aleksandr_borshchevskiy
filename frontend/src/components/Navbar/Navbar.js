import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Navbar extends Component {
    state = {
        collapse: true
    };

    toggle = () => {
        this.setState({collapse: !this.state.collapse});
    };

    render() {
        const {username, is_admin} = this.props.auth;
        return <div className='App'>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container">
                    <NavLink to='/' className="navbar-brand"> Cinema</NavLink>
                    <button onClick={this.toggle} className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={(this.state.collapse ? "collapse" : "") + " navbar-collapse"}
                         id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink to='/' className="nav-link"> Фильмы</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to='/halls' className="nav-link"> Залы</NavLink>
                            </li>
                            {is_admin === true ?
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink to='/movies/add' className="nav-link"> Добавить фильм </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/halls/add' className="nav-link"> Добавить зал </NavLink>
                                    </li>
                                </ul> : null}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {username ? [
                                <li className="nav-item" key="username">
                                    <NavLink to='/personal'
                                             className="navbar-text"> Привет, {username}! </NavLink>
                                </li>,
                                <NavLink to="/logout" className="nav-link" key="logout">Выйти</NavLink>
                            ] : [
                                <NavLink to="/login" className="nav-link" key="login">Войти</NavLink>,
                                <NavLink to="/register" className="nav-link" key="register">Зарегистрироваться</NavLink>
                            ]}
                        </ul>


                    </div>
                </div>
            </nav>
            <div>
                {this.props.children}
            </div>
        </div>;
    }
}


// вытаскиваем данные об аутентификации из state
const mapStateToProps = state => ({auth: state.auth});
// никаких дополнительных действий здесь не нужно
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
