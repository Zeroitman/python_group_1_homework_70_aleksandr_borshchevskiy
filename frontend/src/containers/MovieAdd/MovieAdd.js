import React, {Component, Fragment} from 'react';
import MovieForm from "../../components/MovieForm/MovieForm";
import {saveMovie, MOVIE_ADD_SUCCESS} from "../../store/actions/movie-add";
import {connect} from "react-redux";

class MovieAdd extends Component {
    state = {
        alert: null,
    };

    showErrorAlert = (error) => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.alert = {type: 'danger', message: `Фильм не добавлен`};
            return newState;
        });
    };

    formSubmitted = (movie) => {
        const {auth} = this.props;
        return this.props.saveMovie(movie, auth.token).then(result => {
            if (result.type === MOVIE_ADD_SUCCESS) {
                this.props.history.push('/movies/' + result.movie.id);
            }
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            this.showErrorAlert(error.response);
        });
    };

    render() {
        const alert = this.state.alert;
        return <Fragment>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            <MovieForm onSubmit={this.formSubmitted}/>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        movieAdd: state.movieAdd,
        auth: state.auth
    }
};
const mapDispatchProps = dispatch => {
    return {
        saveMovie: (movie) => dispatch(saveMovie(movie))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(MovieAdd);
