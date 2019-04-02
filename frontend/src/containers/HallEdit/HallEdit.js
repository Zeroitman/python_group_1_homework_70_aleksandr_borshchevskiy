import React, {Component, Fragment} from 'react'
import HallForm from "../../components/HallForm/HallForm";
import {loadHall, HALL_EDIT_SUCCESS, saveHall} from "../../store/actions/hall-edit";
import {connect} from "react-redux";


class HallEdit extends Component {
    componentDidMount() {
        this.props.loadHall(this.props.match.params.id);
    }

    formSubmitted = (hall) => {
        const {auth} = this.props;
        return this.props.saveHall(hall, auth.token).then(result => {
            if (result.type === HALL_EDIT_SUCCESS) {
                this.props.history.push('/halls/' + result.hall.id);
            }
        });
    };

    render() {
        const {hall, errors} = this.props.hallEdit;
        return <Fragment>
            {hall ? <HallForm onSubmit={this.formSubmitted} hall={hall} errors={errors}/> : null}
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        hallEdit: state.hallEdit,
        auth: state.auth
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadHall: (id) => dispatch(loadHall(id)),
        saveHall: (hall, token) => dispatch(saveHall(hall, token))
    }
};


export default connect(mapStateToProps, mapDispatchProps)(HallEdit);
