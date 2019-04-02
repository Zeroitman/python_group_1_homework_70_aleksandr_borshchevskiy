import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import {loadHalls} from "../../store/actions/hall-list";
import {connect} from "react-redux";


class HallsList extends Component {
    componentDidMount() {
        this.props.loadHalls();
    };

    render() {
        // if (this.props.halls) {
            return <Fragment>
                <div className='row'>
                    {this.props.halls.map(hall => {
                        return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3' key={hall.id}>
                            <div className="card mt-3 text-center btn-light">
                                <NavLink to={'/halls/' + hall.id} className="card-text m-4 h2">{hall.name}</NavLink>
                            </div>
                        </div>
                    })}
                </div>
            </Fragment>
        // }
        // else return null;
    }
}

const mapStateToProps = (state) => state.hallList;
const mapDispatchToProps = (dispatch) => ({
    loadHalls: () => dispatch(loadHalls())
});

export default connect(mapStateToProps, mapDispatchToProps)(HallsList);



