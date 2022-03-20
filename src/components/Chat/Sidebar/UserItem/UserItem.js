import React from 'react';

import { BACKEND_ORIGIN } from '../../../../utility/apiUrl';
import classes from './UserItem.module.scss';

const UserItem = props => {
    const userData = props.userData;
    const lastMessageData = props.messageData || {};

    let pictureStyle = {};

    let userImage = userData.avatarUrl;

    if (userImage && userImage !== '') {
        pictureStyle['backgroundImage'] = `url(${BACKEND_ORIGIN + '/' + userImage.replace(/\\/g, '/')})`;
        
    }

    let message = lastMessageData.message || '-';
    let classList = [classes.UserItem];

    if (props.isSelected) {
        classList = [classes.UserItem, classes.UserItem__Selected];
    }

    return (
        <div className={classList.join(' ')} onClick={props.userSelected}>
            <figure className={classes.UserItem__PictureContainer}>
                <div style={pictureStyle}></div>
            </figure>

            <div className={classes.UserItem__Info}>
                <div>{userData.username}</div>
                <div>{message.length > 17 ? message.slice(0, 17) + '...' : message}</div>
            </div>

            <div className={classes.UserItem__Time}>
                {lastMessageData.time ? (new Date(lastMessageData.time)).toLocaleTimeString().split(':').slice(0, 2).join(':') : null}
            </div>

            {props.unreadMessageCount > 0 ? <span className={classes.UserItem__UnreadCount}>{props.unreadMessageCount}</span> : null}
        </div>
    );
}

export default UserItem;