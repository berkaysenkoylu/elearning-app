import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import classes from './AccountItem.module.scss';
import { BACKEND_ORIGIN } from '../../../utility/apiUrl';
import useComponentVisible from '../../../hooks/useComponentVisible';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const AccountItem = props => {
    const [ menuRef, isComponentVisible, setIsComponentVisible ] = useComponentVisible(false);
    const [menuHeight, setMenuHeight] = useState(0);

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
        setIsComponentVisible(prevState => !prevState);
    }

    const innerStyle = {
        height: `${isComponentVisible ? menuHeight : 0}px`
    };

    let profilePictureStyle = {};

    if (props.userImage) {
        profilePictureStyle['backgroundImage'] = `url(${BACKEND_ORIGIN + '/' + props.userImage.replace(/\\/g, '/')})`;
    }

    return (
        <div className={classes.AccountItem}>
            <figure className={classes.AccountItem__Profile} onClick={toggleMenu}>
                <div className={classes.AccountItem__Profile__Picture} style={profilePictureStyle}></div>
            </figure>

            <div className={classes.AccountItem__Menu} ref={menuRef} style={innerStyle}>
                <NavigationItem exact to="/my-account">My Account</NavigationItem>
                <NavigationItem exact to="/logout">Logout</NavigationItem>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userImage: state.userImage
    }
}

export default connect(mapStateToProps, null)(AccountItem);