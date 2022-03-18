import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import classes from './Chat.module.scss';
import axiosAuth from '../../axiosUtility/axios-auth';
import Sidebar from './Sidebar/Sidebar';
import ChatWindow from './ChatWindow/ChatWindow';
import io from 'socket.io-client';

const Chat = props => {
    const [availableUsers, setAvailableUsers] = useState([]);
    const [usersToMessageList, setUsersToMessageList] = useState({});
    const [selectedUser, setSelectedUser] = useState({});

    let socket = useRef(null);

    useEffect(() => {
        let currUserId = props.userId;

        socket.current = io('http://localhost:8000', { auth: { userId: currUserId } });

        axiosAuth.get('').then(fetchedUsers => {
            let filteredUsers = fetchedUsers.data.users.filter(user => user._id !== currUserId);
            setAvailableUsers(filteredUsers);

            let messageList = props.userMessages;
            let messageToReceiverMap = {};

            filteredUsers.forEach(user => {
                messageToReceiverMap[user._id] = [];
            });

            Object.keys(messageToReceiverMap).forEach(userId => {
                messageToReceiverMap[userId] = messageList.filter(message => {
                    return (message.receiver._id === userId && message.sender._id === currUserId) ||
                        (message.sender._id === userId && message.receiver._id === currUserId);
                });
            });

            setUsersToMessageList(messageToReceiverMap);
            // console.log(messageToReceiverMap)
        }).catch(error => {
            console.log(error);
        });
    }, [props.userMessages, props.userId]);

    const onUserSelectedHandler = (userId) => {
        setSelectedUser(availableUsers.find(user => user._id === userId));
    }

    const onMessageReadHandler = (data) => {
        if (props.userId !== data.receiver._id) {
            return;
        }

        let messageId = data._id;

        if (!data.isRead) {
            // DO STUFF

            console.log(data);
        }
    }

    const onMessageSentHandler = (message) => {
        const messageData = {
            sender: props.userId,
            receiver: selectedUser._id,
            message: message,
            time: (new Date()).getTime()
        };

        console.log(messageData)
    }

    return (
        <section className={classes.Chat}>
            <Sidebar
                messages={usersToMessageList}
                userList={availableUsers}
                onUserSelected={onUserSelectedHandler}
                currentUserId={props.userId}
            />

            {selectedUser._id && selectedUser._id !== '' ? <ChatWindow
                messageSent={onMessageSentHandler}
                messageList={usersToMessageList[selectedUser._id] || []}
                userId={props.userId}
                messageRead={onMessageReadHandler}
            /> : null}
        </section>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        userMessages: state.userMessages
    };
};

export default connect(mapStateToProps, null)(Chat);