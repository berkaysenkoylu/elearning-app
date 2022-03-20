import React from 'react';

import classes from './MessageListItem.module.scss';
import { BACKEND_ORIGIN } from '../../../../../utility/apiUrl';

const MessageListItem = props => {
    let userData = props.userData;
    let messageData = props.lastMessageData;

    const getPostCreateTimeDifference = (time) => {
        let now = (new Date()).getTime();
        let difference = parseInt((now - time) / 3600000 * 60);
        let timeString = '';
        
        if(difference >= 60 && difference < 1440) {
            timeString += parseInt(difference / 60) + 'h';
        } else if(difference >= 1440) {
            timeString += parseInt(difference / 1440) + 'd';
        } else if(difference <= 0) {
            timeString = '<1m';
        } else {
            timeString = difference + 'm';
        }

        return timeString;
    }

    let messageIndex = messageData.messageText;
    let userImage = userData.avatarUrl || '';
    let messageListItemStyle = {};
    let userName = [userData.firstName, userData.lastName].join(' ');

    if (userImage && userImage !== '') {
        messageListItemStyle['backgroundImage'] = `url(${BACKEND_ORIGIN + '/' + userImage.replace(/\\/g, '/')})`;
    }

    return (
        <li className={classes.MessageListItem} onClick={props.clicked}>
            <figure className={classes.MessageListItem__Picture}>
                <div className={classes.MessageListItem__Picture__Img} style={messageListItemStyle}></div>
            </figure>

            <div className={classes.MessageListItem__Content}>
                <span className={classes.MessageListItem__Content__Username}>
                    {userName}
                </span>

                <span className={classes.MessageListItem__Content__Message}>
                    {messageIndex.length >= 19 ? messageIndex.slice(0, 17) + '...' : messageIndex}
                </span>
            </div>

            
            {props.unreadMessageCount > 0 ? <span className={classes.MessageListItem__UnreadCount}>{props.unreadMessageCount}</span> : null}
            

            <div className={classes.MessageListItem__Time}>
                {getPostCreateTimeDifference(messageData.time)}
            </div>
        </li>
    )
}

export default MessageListItem;