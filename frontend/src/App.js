import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import MovieList from "./containers/MovieList/MovieList";
import MovieDetail from "./containers/MovieDetail/MovieDetail";
import MovieAdd from "./containers/MovieAdd/MovieAdd";
import MovieEdit from "./containers/MovieEdit/MovieEdit";
import Layout from "./components/Layout/Layout";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/movies/add" component={MovieAdd}/>
                        {/* :id обозначает переменную id */}
                        <Route path="/movies/:id/edit" component={MovieEdit}/>
                        <Route path="/movies/:id" component={MovieDetail}/>
                        <Route path="/" component={MovieList}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
