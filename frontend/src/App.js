import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import MovieList from "./containers/MovieList/MovieList";
import MovieDetail from "./containers/MovieDetail/MovieDetail";
import MovieAdd from "./containers/MovieAdd/MovieAdd";
import MovieEdit from "./containers/MovieEdit/MovieEdit";
import Layout from "./components/Layout/Layout";
import HallsList from './containers/HallsList/HallsList';
import HallDetail from './containers/HallDetail/HallDetail';
import HallEdit from './containers/HallEdit/HallEdit';
import HallAdd from './containers/HallAdd/HallAdd';
import Login from './containers/Login/Login'
import Logout from './containers/Logout/Logout'
import AuthRoute from './components/AuthRoute/AuthRoute'
import Register from './containers/Register/Register'
import Personal from './containers/Personal/Personal'
import PersonalEdit from './containers/PersonalEdit/PersonalEdit'
import {tokenLogin} from "./store/actions/token-login";
import {connect} from "react-redux";

class App extends Component {
    componentDidMount() {
        this.props.tokenLogin();
    }
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/personal/edit" component={PersonalEdit}/>
                        <Route path="/personal" component={Personal}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={Register}/>
                        <AuthRoute path="/halls/add" component={HallAdd}/>
                        <AuthRoute path="/halls/:id/edit" component={HallEdit}/>
                        <Route path="/halls/:id" component={HallDetail}/>
                        <Route path="/halls" exact component={HallsList}/>
                        <AuthRoute path="/movies/add" component={MovieAdd}/>
                        <AuthRoute path="/movies/:id/edit" component={MovieEdit}/>
                        <Route path="/movies/:id" component={MovieDetail}/>
                        <Route path="/" component={MovieList}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
    tokenLogin: () => dispatch(tokenLogin())
});



export default connect(mapStateToProps, mapDispatchToProps)(App);
