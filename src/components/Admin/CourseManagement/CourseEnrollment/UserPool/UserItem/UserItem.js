import React from 'react';

import classes from './UserItem.module.scss';

const UserItem = props => {
    return (
        <li 
            className={!props.userData.isSelected ? classes.UserItem : [classes.UserItem, classes.UserItem__Active].join(' ')}
            onClick={props.userSelect}>
            {props.userData.name}
        </li>
    );
}

export default UserItem;