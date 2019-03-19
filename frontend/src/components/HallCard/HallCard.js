import React from 'react';
import {NavLink} from "react-router-dom";

const HallCard = props => {
    const {name} = props.hall;
    return <div className="card mt-3 text-center btn-light">
            <NavLink to={name}>{name}</NavLink>
    </div>
};


export default HallCard;