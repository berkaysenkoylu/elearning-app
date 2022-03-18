import React, { useEffect } from 'react';

import classes from './ChatMessage.module.scss';
import { BACKEND_ORIGIN } from '../../../../utility/apiUrl';
import useVisibility from '../../../../hooks/useVisibility';
import useCurrentTab from '../../../../hooks/useCurrentTab';

const ChatMessage = props => {
    const [isVisible, elementRef] = useVisibility(20, props.windowRef);
    const isCurrentTab = useCurrentTab(!document.hidden);

    const messageData = props.messageData;

    let senderAvatar = messageData.sender.avatarUrl;
    let pictureStyle = {};

    useEffect(() => {
        if (isCurrentTab && isVisible) {
            props.messageIsRead(messageData);
        }
    }, [isVisible, isCurrentTab, messageData, props]);

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

    if (senderAvatar && senderAvatar !== '') {
        pictureStyle['backgroundImage'] = `url(${BACKEND_ORIGIN + '/' + senderAvatar.replace(/\\/g, '/')})`;
    }

    let isFlipped = props.currentUserId === messageData.sender._id || false;

    return (
        <div className={classes.ChatMessage} style={isFlipped ? { 'transform': 'matrix(-1, 0, 0, 1, 0, 0)' } : {}} ref={elementRef}>
            <div className={classes.ChatMessage__Body}>
                <figure className={classes.ChatMessage__Body__UserPictureContainer}>
                    <div style={pictureStyle}></div>
                </figure>

                <div className={classes.ChatMessage__Body__Message} style={isFlipped ? { 'transform': 'matrix(-1, 0, 0, 1, 0, 0)' } : {}}>
                    {messageData.message}
                </div>
            </div>

            <div
                className={classes.ChatMessage__Message__Time}
                style={isFlipped ? { 'transform': 'matrix(-1, 0, 0, 1, 0, 0)', 'textAlign':' right'} : {}}
                >
                {getPostCreateTimeDifference(messageData.time)}
            </div>
        </div>
    );
}

export default ChatMessage;