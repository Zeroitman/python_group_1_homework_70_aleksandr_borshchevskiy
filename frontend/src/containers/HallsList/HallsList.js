import React, {Fragment, Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import HallCard from "../../components/HallCard/HallCard";
import axios from 'axios';

class HallsList extends Component {
    state = {
        halls: [],
    };

    componentDidMount() {
        axios.get(HALLS_URL)
            .then(response => {return response.data;})
            .then(halls => this.setState({halls}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <div className='row'>
                {this.state.halls.map(hall => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3' key={hall.id}>
                        <HallCard hall={hall}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default HallsList;




// import React, {Component} from 'react';
// import GetList from '../../components/GetList/GetList';
// import axios from 'axios';
//
//
// class AllMovies extends Component {
//     state = {
//         allHalls: {},
//     };
//
//     getAll = () => {
//         axios.get('halls').then(response => {
//             const requests = response.data;
//             return Promise.all(requests);})
//             .then(allHalls => {this.setState({allHalls});})
//             .catch(error => {console.log(error);});
//     };
//
//     componentDidMount() {
//         this.getAll();
//     }
//
//     render() {
//         return (
//             <div className={'AllHalls'}>
//                 <GetList
//                     name={'halls'}
//                     list={this.state.allHalls}
//                 />
//             </div>
//         );
//     }
// }
//
// export default AllMovies;