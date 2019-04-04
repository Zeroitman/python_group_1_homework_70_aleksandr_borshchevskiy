import React, {Component, Fragment} from 'react';
import {login, LOGIN_SUCCESS} from '../../store/actions/login'
import {connect} from "react-redux";


class Login extends Component {
    state = {
        credentials: {
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            email: "",
        },
    };

    formSubmitted = (event) => {
        event.preventDefault();
        const {username, password, first_name, email, last_name} = this.state.credentials;
        this.props.login(username, password, first_name, email, last_name).then((result) => {
            if (result.type === LOGIN_SUCCESS) {
                this.props.history.replace('/');
            } else {
                this.props.history.replace('/login')
            }
        });
    };


    showErrors = (name) => {
        if (this.props.errors && this.props.errors[name]) {
            return this.props.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };


    inputChanged = (event) => {
        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials, [event.target.name]: event.target.value
            }
        })
    };

    render() {
        const {username, password} = this.state.credentials;
        return <Fragment>
            <h2>Вход</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row">
                    <label className="font-weight-bold">Логин</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged}/>
                    {this.showErrors('username')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged}/>
                    {this.showErrors('password')}
                </div>
                <button type="submit" className="btn btn-primary mt-2">Войти</button>
            </form>
        </Fragment>
    }
}


const mapStateToProps = state => state.login;

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(login(username, password))
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);