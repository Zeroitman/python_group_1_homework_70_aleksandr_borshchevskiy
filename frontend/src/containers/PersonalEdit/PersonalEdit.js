import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {loadPersonal, savePersonal} from "../../store/actions/personal-edit";
import {PERSONAL_EDIT_SUCCESS} from "../../store/actions/personal-edit";
import PersonalForm from "../../components/PersonalForm/PersonalForm";


class PersonalEdit extends Component {
    componentDidMount() {
        this.props.loadPersonal(this.props.auth.id);
    }

    formSubmitted = (personal) => {
        return this.props.savePersonal(personal).then(result => {
            if (result.type === PERSONAL_EDIT_SUCCESS) {
                this.props.history.push('/personal/');
            }
        });
    };

    render() {
        const {personal, errors} = this.props.personalEdit;
        return <Fragment>
            {personal ? <PersonalForm onSubmit={this.formSubmitted} personal={personal} errors={errors}/> : null}
        </Fragment>
    }
}


const mapStateToProps = state => {
    return {
        personalEdit: state.personalEdit,
        auth: state.auth
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadPersonal: (id) => dispatch(loadPersonal(id)),
        savePersonal: (personal) => dispatch(savePersonal(personal))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(PersonalEdit);

