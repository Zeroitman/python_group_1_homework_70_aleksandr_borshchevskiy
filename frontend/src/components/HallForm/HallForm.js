import React, {Component} from 'react';

class HallForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hall: {
                name: "",
            },

            submitEnabled: true
        };
        if(this.props.hall) {
            this.state.hall= this.props.hall;
        }
    }

    componentDidMount() {
        console.log(this.props.hall);
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

    updateHallState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let hall = {...prevState.movie};
            hall[fieldName] = value;
            newState.hall= hall;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateHallState(fieldName, value);
    };

    formSubmitted = (event) => {
        if(this.state.submitEnabled) {
            event.preventDefault();
            this.disableSubmit();
            this.props.onSubmit(this.state.hall)
                .then(this.enableSubmit);
        }
    };

    render() {
        if (this.state.hall) {
            const name = this.state.hall.name;
            const submitEnabled = this.state.submitEnabled;
            return <div className="mt-3">
                {alert}
                <form onSubmit={this.formSubmitted}>
                    <div className="form-group">
                        <label className="font-weight-bold">Название</label>
                        <input type="text" className="form-control" name="name" value={name}
                               onChange={this.inputChanged}/>
                    </div>
                    <button disabled={!submitEnabled} type="submit"
                            className="btn btn-primary">Сохранить
                    </button>
                </form>
            </div>;
        }
        else return null;
    }
}


export default HallForm;