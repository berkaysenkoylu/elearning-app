import React from 'react';

import classes from './Toolbar.module.scss';
// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <NavigationItems isAuth={props.isAuth} status={props.userStatus} />
        </header>
    );
}

export default Toolbar;;