import React, {Component} from 'react';
import {CATEGORIES_URL, MOVIES_URL} from "../../api-urls";

// Добавить Layout
// Подключить datepicker
// загрузить постер (файл)
// Подключить react-select


class MovieAdd extends Component {
    state = {
        movie: {
            name: "",
            description: "",
            release_date: "",
            categories: []
        },
        categories: [],
        alert: null,
        submitDisabled: false
    };


    componentDidMount() {
        fetch(CATEGORIES_URL)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                return json;
            })
            .then(categories => this.setState(prevState => {
                let newState = {...prevState};
                newState.categories = categories;
                return newState;
            }))
            .catch(error => console.log(error));
    }

    updateMovieState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let movie = {...prevState.movie};
            movie[fieldName] = value;
            newState.movie = movie;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateMovieState(fieldName, value);
    };

    selectChanged = (event) => {
        const value = [];
        const fieldName = event.target.name;
        const options = event.target.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) value.push(+options[i].value);
        }
        this.updateMovieState(fieldName, value);
    };

    formSubmitted = (event) => {
        event.preventDefault();
        console.log(this.state);
        const data = JSON.stringify(this.state.movie);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Content-Length': data.length
        });
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });
        fetch(MOVIES_URL, {method: 'POST', body: data, headers})
            .then(response => response.json())
            .then(json => {
                console.log(json);
                return json;
            })
            .then(movie => this.setState(prevState => {
                // let newState = {...prevState};
                // newState.alert = {type: 'success', message: `Movie ${movie.name} successfully added!`};
                // newState.submitDisabled = false;
                // return newState;

                this.props.history.replace('/movies/' + movie.id);
            }))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Movie was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        const {name, description, release_date, categories} = this.state.movie;
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Дата выхода</label>
                    <input type="text" className="form-control" name="release_date" value={release_date}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Категории</label>
                    <select multiple onChange={this.selectChanged} name="categories">
                        {this.state.categories.map(category => {
                            return <option value={category.id}
                                           selected={category.id in categories}>{category.name}</option>
                        })}
                    </select>
                </div>
                <button disabled={this.state.submitDisabled} type="submit" className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    }
}


export default MovieAdd;
