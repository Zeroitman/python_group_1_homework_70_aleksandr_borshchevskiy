import React, {Component, Fragment} from 'react';
import axios from "axios";


class PersonalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personal: {
                'id': localStorage.getItem('id'),
                'first_name': localStorage.getItem('first_name'),
                'last_name': localStorage.getItem('last_name'),
                'email': localStorage.getItem('email'),
                'password': ''
            }
        };
        if (this.props.personal) {
            this.state.personal = this.props.personal;
        }
    }


    updateLocalStorage = () => {
        localStorage.setItem('first_name', this.state.personal.first_name);
        localStorage.setItem('last_name', this.state.personal.last_name);
        localStorage.setItem('email', this.state.personal.email);
        localStorage.setItem('password', this.state.personal.password);
    };

    gatherData = (personal) => {
        let data = {};
        Object.keys(personal).forEach(key => {
            data[key] = personal[key] === "" ? null : personal[key];
        });
        if(!data.password) {
            delete data['password']
        }
        return data;
    };

    formSubmitted = (event) => {
        event.preventDefault();
        const data = this.gatherData(this.state.personal);
        console.log(data);
        axios.put('user/'+ this.state.personal.id + '/edit/', data).then(response => {
            console.log(response.data);
            this.updateLocalStorage()
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
    };

    updatePersonal(field, value) {
        this.setState(prevState => {
            let newState = {...prevState};
            let personal = {...prevState.personal};
            personal[field] = value;
            newState.personal = personal;
            return newState;
        })
    }

    inputChanged = (event) => {
        const {name, value} = event.target;
        this.updatePersonal(name, value);
    };

    render() {
        const {first_name, last_name, email, password} = this.state.personal;
        return <Fragment>
            <div className='container'>
                <form onSubmit={this.formSubmitted}>
                    <h2 className="text-center mt-3"> Страница редактирования личных данных</h2>
                    <div>
                        <label className="mt-2 mb-0 font-weight-bold">Имя</label>
                        <input type="text" value={first_name} onChange={this.inputChanged} name='first_name'
                               className="form-control"/>
                    </div>
                    <div>
                        <label className="mt-2 mb-0 font-weight-bold">Фамилие</label>
                        <input type="text" value={last_name} onChange={this.inputChanged} name='last_name'
                               className="form-control"/>
                    </div>
                    <div>
                        <label className="mt-2 mb-0 font-weight-bold">Email</label>
                        <input type="email" value={email} onChange={this.inputChanged} name='email'
                               className="form-control"/>
                    </div>
                    <div>
                        <label className="mt-2 mb-0 font-weight-bold">Пароль</label>
                        <input type="password" value={password} onChange={this.inputChanged} name='password'
                               className="form-control"/>
                    </div>
                    <div className="mt-2">
                        <button type="submit" className="btn btn-success">Отредактировать профиль</button>
                    </div>
                </form>
            </div>
        </Fragment>
    }
}


export default PersonalEdit;

