import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    let navList = (
        <>
            <NavigationItem exact to="/">Home</NavigationItem>
            <NavigationItem exact to="/courses">Courses</NavigationItem>
            <NavigationItem exact to="/about">About us</NavigationItem>
            <NavigationItem exact to="/contact">Contact</NavigationItem>
            <NavigationItem exact to="/auth">Sign in</NavigationItem>
        </>
    );

    return (
        <nav className={classes.Navigation}>
            <ul className={classes.NavigationItems}>
                {navList}
            </ul>
        </nav>
    )
}

export default NavigationItems;