import React, {Component} from 'react'
// import axios from "axios";
// import PersonalForm from "../../components/PersonalForm/PersonalForm";


class PersonalEdit extends Component {
    // state = {
    //     hall: null,
    // };
    //
    // componentDidMount() {
    //     axios.get('personal/' + this.props.match.params.id)
    //         .then(response => {
    //             const hall = response.data;
    //             this.setState(prevState => {
    //                 const newState = {...prevState};
    //                 newState.hall = hall;
    //                 return newState;
    //             });
    //             console.log(this.state)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             console.log(error.response);
    //         });
    // }
    //
    // gatherFormData = (hall) => {
    //     let formData = new FormData();
    //     Object.keys(hall).forEach(key => {
    //         const value = hall[key];
    //         if (value) {
    //             formData.append(key, value);
    //         }
    //     });
    //     return formData;
    // };
    //
    // formSubmitted = (hall) => {
    //     const formData = this.gatherFormData(hall);
    //     return axios.put('halls/' + this.props.match.params.id + '/', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': 'Token ' + localStorage.getItem('auth-token')
    //         }
    //     })
    //         .then(response => {
    //             const hall = response.data;
    //             console.log(hall);
    //             this.props.history.replace('/halls/' + hall.id);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             console.log(error.response);
    //         });
    // };

    render() {
        // const {hall} = this.state;
        // console.log(hall);
        return <div>
            <div>lorem</div>
           {/*{hall ? <PersonalForm onSubmit={this.formSubmitted} hall={hall}/> : null}*/}
        </div>
    }
}


export default PersonalEdit;