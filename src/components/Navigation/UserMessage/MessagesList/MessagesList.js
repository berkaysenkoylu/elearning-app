import React from 'react';

import classes from './MessagesList.module.scss';
import MessageListItem from './MessageListItem/MessageListItem';

const MessagesList = props => {
    return (
        <ul className={classes.MessagesList}>
            {props.list.map(message => {
                return <MessageListItem
                    key={message.id}
                    author={message.author}
                    messageText={message.messageText}
                    date={message.date}
                />
            })}
        </ul>
    );
}

export default MessagesList;