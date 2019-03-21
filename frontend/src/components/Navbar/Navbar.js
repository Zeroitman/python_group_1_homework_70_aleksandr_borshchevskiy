import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import './Navbar.css';


class Navbar extends Component {
    render() {
        return <div className='App'>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container">
                    <NavLink to='/' className="navbar-brand"> Cinema</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="ml-5 collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <NavLink to='/' className="nav-link"> Фильмы</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to='/halls' className="nav-link"> Залы </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/movies/add' className="nav-link"> Добавить фильм </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/halls/add' className="nav-link"> Добавить зал </NavLink>
                            </li>
                            <li className="nav-item">
                                {localStorage.getItem('auth-token') ? null :
                                    <NavLink to='/login' className="nav-link ml-5"> Войти </NavLink>}
                            </li>
                            <li className="nav-item">
                                {localStorage.getItem('auth-token') ?
                                    <NavLink to='/logout' className="nav-link ml-5"> Выйти </NavLink>:null
                                }
                            </li>
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


export default Navbar;