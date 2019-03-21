import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import MovieList from "./containers/MovieList/MovieList";
import MovieDetail from "./containers/MovieDetail/MovieDetail";
import MovieAdd from "./containers/MovieAdd/MovieAdd";
import MovieEdit from "./containers/MovieEdit/MovieEdit";
import Layout from "./components/Layout/Layout";
import HallsList from './containers/HallsList/HallsList';
import HallDetail from './containers/HallDetail/HallDetail';
import HallEdit from './containers/HallEdit/HallEdit';
import HallAdd from './containers/HallAdd/HallAdd';
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/halls/add" component={HallAdd}/>
                        <Route path="/halls/:id/edit" component={HallEdit}/>
                        <Route path="/halls/:id" component={HallDetail}/>
                        <Route path="/halls" exact component={HallsList}/>
                        <Route path="/movies/add" component={MovieAdd}/>
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
