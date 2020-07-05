import React, { Component } from 'react';

import classes from './Toolbar.module.scss';
// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

class Toolbar extends Component {
    state = {

    }

    render() {
        return (
            <header className={classes.Toolbar}>
                <NavigationItems isAuth={this.props.isAuth} status={this.props.userStatus} />
            </header>
        );
    }
}

export default Toolbar;