import React from 'react';

import classes from './MessageListItem.module.scss';
import { BACKEND_ORIGIN } from '../../../../../utility/apiUrl';

const MessageListItem = props => {
    let author = props.author;

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

    let messageIndex = props.messageText;
    let userImage = author.userImg || '';
    let messageListItemStyle = {};

    if (userImage && userImage !== '') {
        messageListItemStyle['backgroundImage'] = `url(${BACKEND_ORIGIN + '/' + userImage.replace(/\\/g, '/')})`;
    }

    return (
        <li className={classes.MessageListItem}>
           <figure className={classes.MessageListItem__Picture}>
                <div className={classes.MessageListItem__Picture__Img} style={messageListItemStyle}></div>
            </figure>

            <div className={classes.MessageListItem__Content}>
                <span className={classes.MessageListItem__Content__Username}>
                    {author.username}
                </span>

                <span className={classes.MessageListItem__Content__Message}>
                    {messageIndex.length >= 19 ? messageIndex.slice(0, 17) + '...' : messageIndex}
                </span>
            </div>

            <div className={classes.MessageListItem__Time}>
                {getPostCreateTimeDifference(props.date)}
            </div>
        </li>
    )
}

export default MessageListItem;