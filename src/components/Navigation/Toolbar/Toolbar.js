import React from 'react';

import classes from './Toolbar.module.scss';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <nav className={classes.ToolbarWrapper}>
            <div className={classes.Toolbar}>
                <Logo />

                <div className={classes.Toolbar__Main}>
                    <NavigationItems isAuth={props.isAuth} status={props.userStatus} />
                </div>
            </div>
        </nav>
    );
}

export default Toolbar;