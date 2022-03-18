import React from 'react';

import classes from './UserItem.module.scss';

const UserItem = props => {
    const userData = props.userData;
    const lastMessageData = props.messageData || {};

    let pictureStyle = {};

    if (userData.avatarUrl && userData.avatarUrl !== '') {
        pictureStyle['backgroundImage'] = `url(${userData.avatarUrl})`;
    }

    let message = lastMessageData.message || '-';

    return (
        <div className={classes.UserItem} onClick={props.userSelected}>
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