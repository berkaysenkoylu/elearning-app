import React from 'react'

import classes from './Sidebar.module.scss';
import UserItem from './UserItem/UserItem';

const Sidebar = React.memo(props => {
    let lastMessageTimes = {};
    let userToUnreadMessagesMap = {};

    Object.keys(props.messages).forEach(userId => {
        let lastItem = (props.messages[userId] || []).slice(-1)[0] || {};

        userToUnreadMessagesMap[userId] = (props.messages[userId] || [])
            .filter(message => !message.isRead && message.receiver._id === props.currentUserId).length;
        
        lastMessageTimes[userId] = lastItem.time || 0;
    });

    let userList = props.userList.slice().sort((a, b) => {
        return lastMessageTimes[a._id] < lastMessageTimes[b._id];
    });

    return (
        <div className={classes.Sidebar}>
            {userList.map(user => {
                let lastMessage = ((props.messages || {})[user._id] || []).slice(-1)[0] || {};

                return <UserItem
                    key={user._id}
                    userData={{ id: user._id, username: user.firstName + ' ' + user.lastName, avatarUrl: user.avatarUrl }}
                    userSelected={() => props.onUserSelected(user._id)}
                    messageData={{
                        message: lastMessage.message || '',
                        time: lastMessage.time
                    }}
                    unreadMessageCount={userToUnreadMessagesMap[user._id] || 0}
                />
            })}
        </div>
    )
})

export default Sidebar;