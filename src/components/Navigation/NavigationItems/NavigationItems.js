import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import AccountItem from '../AccountItem/AccountItem';
import UserMessage from '../UserMessage/UserMessage';

const NavigationItems = (props) => {
    let navList = (
        <>
            <NavigationItem exact to="/">Home</NavigationItem>
            <NavigationItem exact to="/courses">Courses</NavigationItem>
            <NavigationItem exact to="/about">About us</NavigationItem>
            <NavigationItem exact to="/contact">Contact</NavigationItem>
            { props.status === 'admin' ?
                <NavigationItem exact to="/administration">Administration</NavigationItem> :
                null
            }
        </>
    );

    return (
        <nav className={classes.Navigation}>
            <ul className={classes.Navigation__Items}>
                {navList}
            </ul>

            <ul className={classes.Navigation__Auth}>
                { props.isAuth ?
                    <>
                        <UserMessage />
                        <AccountItem />
                    </> : <NavigationItem exact to="/auth">Sign in</NavigationItem>
                }
            </ul>
        </nav>
    )
}

export default NavigationItems;