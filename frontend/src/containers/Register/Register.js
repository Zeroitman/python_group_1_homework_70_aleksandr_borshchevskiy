import React, {Component, Fragment} from 'react';
import axios from "axios";
import {REGISTER_URL, LOGIN_URL} from "../../api-urls";

class Register extends Component {
    state = {
        user: {
            'username': '',
            'password': '',
            'passwordConfirm': '',
            'first_name': "",
            'last_name': "",
            'email': ""
        },
        errors: {}
    };

    passwordsMatch = () => {
        const {password, passwordConfirm} = this.state.user;
        return password === passwordConfirm
    };

    passwordConfirmChange = (event) => {
        this.inputChanged(event);
        const password = this.state.user.password;
        const passwordConfirm = event.target.value;
        const errors = (password === passwordConfirm) ? [] : ['Passwords do not match'];
        this.setState({
            errors: {
                ...this.state.errors,
                passwordConfirm: errors
            }
        });
    };

    performLogin = (username, password, first_name, last_name, email) => {
        axios.post(LOGIN_URL, {username, password, first_name, last_name, email}).then(response => {
            localStorage.setItem('auth-token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('first_name', response.data.first_name);
            localStorage.setItem('last_name', response.data.last_name);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('is_admin', response.data.is_admin);
            localStorage.setItem('is_staff', response.data.is_staff);
            this.props.history.replace('/');
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            this.props.history.replace({
                pathname: '/login/',
                state: {next: '/'}
            });
        })
    };


    formSubmitted = (event) => {
        event.preventDefault();
        if (this.passwordsMatch()) {
            const {username, password, first_name, last_name, email} = this.state.user;
            const data = {username, password, first_name, last_name, email};
            return axios.post(REGISTER_URL, data).then(response => {
                console.log(response);
                this.performLogin(username, password, first_name, last_name, email);
            }).catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({
                    ...this.state,
                    errors: error.response.data
                })
            });
        } else {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    passwordConfirm: ['Passwords do not match']
                }
            })
        }
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    };

    showErrors = (name) => {
        if (this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {first_name, email, last_name, username, password, passwordConfirm} = this.state.user;
        return <Fragment>
            <h2>Регистрация</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row">
                    <label className="font-weight-bold">Логин</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged}/>
                    {this.showErrors('username')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Имя</label>
                    <input type="text" className="form-control" name="first_name" value={first_name}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Фамилие</label>
                    <input type="text" className="form-control" name="last_name" value={last_name}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Email</label>
                    <input type="text" className="form-control" name="email" value={email}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged}/>
                    {this.showErrors('password')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Подтверждение пароля</label>
                    <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm}
                           onChange={this.passwordConfirmChange}/>
                    {this.showErrors('passwordConfirm')}
                </div>
                <button type="submit" className="btn btn-primary mt-2">Создать учётную запись</button>
            </form>
        </Fragment>
    }
}


export default Register
