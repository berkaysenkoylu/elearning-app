import React from 'react';

import AdminNavigationItem from './AdminNavigationItem/AdminNavigationItem';
import AdminNavigationDropdown from './AdminNavigationDropdown/AdminNavigationDropdown';
import classes from './AdminNavigationItems.module.scss';

const AdminNavigationItems = props => {
    // let routes = (
    //     <>
    //         <AdminNavigationItem exact to="/">Home</AdminNavigationItem>
    //         <AdminNavigationItem exact to="/courses">Courses</AdminNavigationItem>
    //         <AdminNavigationItem exact to="/about">About us</AdminNavigationItem>
    //         <AdminNavigationItem exact to="/contact">Contact</AdminNavigationItem>
    //     </>
    // );

    let content = props.navItems.map(navItem => {
        return navItem.type === 'Dropdown' ? <AdminNavigationDropdown
            key={navItem.name}
            label={navItem.name}
            dropdownItems={navItem.submenus}
            {...props} /> : <AdminNavigationItem
                key={navItem.name}
                to={navItem.path}
                exact={navItem.isExact}>{navItem.name}</AdminNavigationItem>;
    });

    return (
        <div className={classes.AdminNavigationItems}>
            {content}
        </div>
    )
}

export default AdminNavigationItems;