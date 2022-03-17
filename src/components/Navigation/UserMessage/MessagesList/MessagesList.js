import React from 'react';

import classes from './MessagesList.module.scss';
import MessageListItem from './MessageListItem/MessageListItem';

const MessagesList = props => {
    let messages = props.list;

    let content = Object.keys(messages).map(userId => {
        let messageData = (messages[userId] || {}).lastMessage;
        let selectedUser = messageData.sender._id === userId ? messageData.sender : messageData.receiver;

        return <MessageListItem
            key={userId}
            userData={selectedUser}
            lastMessageData={{
                messageText: messageData.message,
                time: messageData.time
            }}
            unreadMessageCount={(messages[userId] || {}).unreadCount}
        />
    });


    return (
        <ul className={classes.MessagesList}>
            {content}
        </ul>
    );
}

export default MessagesList;

/*
messageData={{
    message: lastMessage.message || '',
    time: lastMessage.time
}}
unreadMessageCount={userToUnreadMessagesMap[user._id] || 0}

*/