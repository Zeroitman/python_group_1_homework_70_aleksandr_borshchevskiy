import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import axios from 'axios';
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import {loadMovie} from "../../store/actions/movie-detail";
import {connect} from "react-redux";


class MovieDetail extends Component {
    componentDidMount() {
        this.props.loadMovie(this.props.match.params.id)
    }

    deleteMovie = (id) => {
        axios.delete('movies/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(this.props.history.replace('/'))
    };

    render() {
        if (!this.props.movieDetail) return null;
        const {name, poster, description, release_date, finish_date, id, categories} = this.props.movieDetail.movie;;
        return <div className="mt-3">
            <div className="d-flex justify-content-center">
                <div className="mr-5">
                    {poster ? <div className='text-center'>
                        <img className="img-fluid rounded" src={poster} alt={"постер"} width="1200px" height="1200px"/>
                    </div> : null}
                </div>
                <div className="text-center">
                    <h1>{name}</h1>
                    {categories ? <MovieCategories categories={categories}/> : null}
                    <p className="text-secondary">
                        В прокате c: {release_date} до: {finish_date ? finish_date : "Неизвестно"}</p>
                    {description ? <div className="text-left">{description}</div> : null}
                    <NavLink to={'/movies/' + id + '/edit'}
                             className="btn btn-primary px-2 py-0 m-2">Редактирование</NavLink>
                    {localStorage.getItem('is_admin') ?
                        <button className="btn btn-danger px-2 py-0 m-2"
                                onClick={() => this.deleteMovie(id)}>Удалить</button> : null}
                    {this.props.movieDetail.shows ? <ShowSchedule shows={this.props.movieDetail.shows}/> : null}
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        movieDetail: state.movieDetail,
        auth: state.auth
    }
};
const mapDispatchToProps = (dispatch) => ({
    loadMovie: (id) => dispatch(loadMovie(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);

