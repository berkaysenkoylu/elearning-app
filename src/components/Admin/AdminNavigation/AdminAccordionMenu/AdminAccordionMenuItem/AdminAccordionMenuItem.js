import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './AdminAccordionMenuItem.module.scss';
import svg from '../../../../../assets/images/sprite.svg';

const AdminAccordionMenuItem = props => {
    let data = props.data;

    // TODO: Include the react router

    return (
        <li className={classes.AdminAccordionMenuItem}>
            <svg className={classes.AdminAccordionMenuItem__Icon}>
                <use xlinkHref={`${svg}#icon-${data.icon}`}></use>
            </svg>

            <span className={classes.AdminAccordionMenuItem__Label}>
                <NavLink
                    to={data.path}
                    className={classes.AdminAccordionMenuItem__Link}
                    activeClassName={classes.AdminAccordionMenuItem__ActiveLink}
                    exact={data.isExact}
                >{data.name}</NavLink>
            </span>
        </li>
    );
}

export default AdminAccordionMenuItem;