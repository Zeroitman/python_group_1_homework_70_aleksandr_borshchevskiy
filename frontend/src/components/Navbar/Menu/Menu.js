import React, {Fragment} from 'react'
import MenuItem from "./MenuItem/MenuItem";


const Menu = () => {
    return <Fragment>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <MenuItem to="/">Фильмы</MenuItem>
                <MenuItem to="/movies/add">Добавить фильм</MenuItem>
            </ul>
        </div>
    </Fragment>
};


export default Menu