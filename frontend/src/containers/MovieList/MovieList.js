import React, {Fragment, Component} from 'react'
import {MOVIES_URL} from "../../api-urls";
import MovieCard from "../../components/MovieCard/MovieCard";


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class MovieList extends Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        fetch(MOVIES_URL)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                // для пагинации
                // return json.results;
                // без пагинации
                return json;
            })
            .then(movies => this.setState({movies}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <div className='row'>
                {this.state.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <MovieCard movie={movie}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default MovieList;