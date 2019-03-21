import React from 'react';
import {NavLink} from "react-router-dom";

const HallCard = props => {
    const {id, name} = props.hall;
    return <div className="card mt-3 text-center btn-light" id={id}>
        <NavLink to={'/halls/' + id} className="card-text m-4 h2">{name}</NavLink>
    </div>
};

export default HallCard;