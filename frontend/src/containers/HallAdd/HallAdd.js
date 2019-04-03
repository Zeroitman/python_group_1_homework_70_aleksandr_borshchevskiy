import React, {Component} from 'react';
import HallForm from '../../components/HallForm/HallForm';
import {saveHall, HALL_ADD_SUCCESS} from "../../store/actions/hall-add";
import {connect} from "react-redux";

class HallAdd extends Component {
    state = {
        alert: null,
    };

    showErrorAlert = (error) => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.alert = {type: 'danger', message: `Зал не добавлен`};
            return newState;
        });
    };

    formSubmitted = (hall) => {
        const {auth} = this.props;
        return this.props.saveHall(hall, auth.token).then(result => {
            if (result.type === HALL_ADD_SUCCESS) {
                this.props.history.push('/halls/' + result.hall.id);
            }
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            this.showErrorAlert(error.response);
        });
    };

    render() {
        const alert = this.state.alert;
        return <div>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            <HallForm onSubmit={this.formSubmitted}/>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        hallAdd: state.hallAdd,
        auth: state.auth
    }
};
const mapDispatchProps = dispatch => {
    return {
        saveHall: (hall) => dispatch(saveHall(hall))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(HallAdd);