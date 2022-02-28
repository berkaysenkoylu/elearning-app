import React, { useState, useEffect, useRef } from 'react';

import classes from './AccountItem.module.scss';
import useComponentVisible from '../../../hooks/useComponentVisible';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const AccountItem = props => {
    const [ menuRef, isComponentVisible, setIsComponentVisible ] = useComponentVisible(false);

    // const [menuOpen, setMenuOpen] = useState(false);


    const [menuHeight, setMenuHeight] = useState(0);

    // const menuRef = useRef();
    let timeout = useRef(null);
    
    useEffect(() => {
        timeout.current = setTimeout(() => {
            setMenuHeight(menuRef.current.scrollHeight);
        }, 333);

        return () => {
            clearTimeout(timeout.current);
        }
    }, [menuRef]);

    const toggleMenu = () => {
        // console.log(isComponentVisible)


        setIsComponentVisible(prevState => !prevState);
    }

    const innerStyle = {
        height: `${isComponentVisible ? menuHeight : 0}px`
    };

    return (
        <div className={classes.AccountItem}>
            <figure className={classes.AccountItem__Profile} onClick={toggleMenu}>
                <div className={classes.AccountItem__Profile__Picture}></div>
            </figure>

            <div className={classes.AccountItem__Menu} ref={menuRef} style={innerStyle}>
                <NavigationItem exact to="/my-account">My Account</NavigationItem>
                <NavigationItem exact to="/logout">Logout</NavigationItem>
            </div>
        </div>
    );
}

export default AccountItem;