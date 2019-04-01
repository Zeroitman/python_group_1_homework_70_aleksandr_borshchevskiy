import React, {Fragment, Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import axios from 'axios';
import {NavLink} from "react-router-dom";


class HallsList extends Component {
    state = {
        halls: [],
    };

    componentDidMount() {
        axios.get(HALLS_URL).then(response => {return response.data})
            .then(halls => this.setState({halls}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <div className='row'>
                {this.state.halls.map(hall => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3' key={hall.id}>
                        <div className="card mt-3 text-center btn-light">
                            <NavLink to={'/halls/' + hall.id} className="card-text m-4 h2">{hall.name}</NavLink>
                        </div>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default HallsList;
