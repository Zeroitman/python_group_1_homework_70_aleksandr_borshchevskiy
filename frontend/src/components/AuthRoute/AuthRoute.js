import React from 'react'
import {Redirect, Route} from 'react-router'
import {connect} from "react-redux";

const AuthRoute = (props) => {
    if(props.auth.id) {return <Route {...props} />} else {
        return <Redirect to={{
            pathname: "/login",
            state: {next: props.location}
        }}/>
    }
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps)(AuthRoute);
