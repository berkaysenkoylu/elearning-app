import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './AdminNavigationItem.module.scss';

const AdminNavigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                className={classes.Link}
                activeClassName={classes.ActiveLink}
                exact={props.exact}
                to={props.to}>{props.children}</NavLink>
        </li>
    )
}

export default AdminNavigationItem;