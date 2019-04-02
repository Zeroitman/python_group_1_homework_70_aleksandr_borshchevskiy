import React, {Component, Fragment} from 'react';

class PersonalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personal: {
                'first_name': "",
                'last_name': "",
                'email': "",
                'password': ''
            },
            submitEnabled: true
        };
        if (this.props.personal) {
            this.state.personal = this.props.personal;
        }
    }

    disableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = false;
            return newState;
        });
    };

    enableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = true;
            return newState;
        });
    };

    updatePersonalState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let personal = {...prevState.personal};
            personal[fieldName] = value;
            newState.personal = personal;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updatePersonalState(fieldName, value);
    };

    submitForm = (event) => {
        if (this.state.submitEnabled) {
            event.preventDefault();
            this.disableSubmit();
            this.props.onSubmit(this.state.personal)
                .then(this.enableSubmit);
        }
    };

    render() {
        if (this.state.personal) {
            const {first_name, last_name, email, password} = this.state.personal;
            // const submitEnabled = this.state.submitForm ;
            return <Fragment>
            <div className='container'>
                <form onSubmit={this.submitForm}>
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
        else return null;
    }
}


export default PersonalForm;