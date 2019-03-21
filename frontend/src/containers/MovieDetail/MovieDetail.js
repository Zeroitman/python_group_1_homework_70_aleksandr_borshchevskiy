import React, {Component} from 'react'
import {MOVIES_URL, SHOWS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import axios from 'axios';
import moment from 'moment';
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";


// компонент, который выводит одну карточку с фильмом
// фильм также загружается при выводе компонента на экран (mount),
// а не при обновлении (didUpdate), т.к. компонент выводится на отдельной странице,
// и при переключении страниц исчезает с экрана, а потом снова маунтится.
class MovieDetail extends Component {
    state = {
        movie: null,
        shows: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(MOVIES_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(movie => {
                this.setState({movie});

                // Загрузка расписания показов
                this.loadShows(movie.id);
            })
            .catch(error => console.log(error));
    }

    loadShows = (movieId) => {
        // https://momentjs.com/ - библиотека для работы с датой и временем в JS
        // более удобная, чем встроенный класс Date(). Не забудьте импортировать.
        // установка: npm install --save moment (уже ставится вместе с реактом)
        // импорт: import moment from 'moment';

        // вернёт текущую дату со временем в формате ISO с учётом временной зоны
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        // вернёт только дату на 3 дня вперёд от текущей в указанном формате
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');

        // encodeURI закодирует строку для передачи в запросе
        // отличается от encodeURIComponent тем, что пропускает символы,
        // входящие в формат URI, в т.ч. & и =.
        const query = encodeURI(`movie_id=${movieId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        axios.get(`${SHOWS_URL}?${query}`).then(response => {
            console.log(response);
            this.setState(prevState => {
                let newState = {...prevState};
                newState.shows = response.data;
                return newState;
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };

    deleteMovie = (id) => {
        axios.delete('movies/' + id).then(this.props.history.replace('/'))
    };

    render() {
        // если movie в state нет, ничего не рисуем.
        if (!this.state.movie) return null;

        // достаём данные из movie
        const {name, poster, description, release_date, finish_date, categories, id} = this.state.movie;

        return <div className="mt-3">
            <div className="d-flex justify-content-center">
                <div className="mr-5">
                    {poster ? <div className='text-center'>
                        <img className="img-fluid rounded" src={poster} alt={"постер"} width="1200px" height="1200px"/>
                    </div> : null}
                </div>
                <div className="text-center">
                    <h1>{name}</h1>
                    {categories.length > 0 ? <MovieCategories categories={categories}/> : null}
                    <p className="text-secondary">
                        В прокате c: {release_date} до: {finish_date ? finish_date : "Неизвестно"}</p>
                    {description ? <div className="text-left">{description}</div> : null}
                    <NavLink to={'/movies/' + id + '/edit'}
                             className="btn btn-primary px-2 py-0 m-2">Редактирование</NavLink>
                    <button className="btn btn-danger px-2 py-0 m-2"
                            onClick={() => this.deleteMovie(id)}
                    >Удалить
                    </button>
                    {this.state.shows ? <ShowSchedule shows={this.state.shows}/> : null}
                </div>
            </div>
        </div>;
    }
}


export default MovieDetail;
