import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './Chat.module.scss';
import axiosAuth from '../../axiosUtility/axios-auth';
import Sidebar from './Sidebar/Sidebar';
import ChatWindow from './ChatWindow/ChatWindow';
import * as actions from '../../store/actions/index';

const Chat = props => {
    const [availableUsers, setAvailableUsers] = useState([]);
    const [usersToMessageList, setUsersToMessageList] = useState({});
    const [selectedUser, setSelectedUser] = useState({});

    let params = useParams();

    useEffect(() => {
        let currUserId = props.userId;   

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
    }, [props.userMessages, props.userId, props.userSocket]);

    useEffect(() => {
        if (params.id) {
            let user = availableUsers.find(user => user._id === params.id) || {};

            setSelectedUser(user);
        }
    }, [params, availableUsers])

    const onUserSelectedHandler = (userId) => {
        setSelectedUser(availableUsers.find(user => user._id === userId));
    }

    const onMessageReadHandler = (data) => {
        if (props.userId !== data.receiver._id) {
            return;
        }

        let messageId = data._id;

        if (!data.isRead) {
            props.userSocket.emit('Message is read', {
                messageId: messageId
            });

            let newMessages = props.userMessages.map(message => {
                if (message._id === messageId) {
                    message.isRead = true;
                }

                return message;
            });

            props.updateMessages(newMessages);
        }
    }

    const onMessageSentHandler = (message) => {
        const messageData = {
            sender: props.userId,
            receiver: selectedUser._id,
            message: message,
            time: (new Date()).getTime()
        };

        props.userSocket.emit('private message', {
            to: selectedUser._id,
            messageData
        });

        let senderData = availableUsers.find(user => user._id === props.userId) || {};

        // This is for updating the user's messageList without resorting to using backend
        props.updateMessages([...props.userMessages, {
            ...messageData,
            _id: Math.random() * 1923,
            sender: {
                _id: props.userId,
                firstName: senderData.firstName,
                lastName: senderData.lastName,
                avatarUrl: senderData.avatarUrl
            },
            receiver: {
                _id: selectedUser._id,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                avatarUrl: selectedUser.avatarUrl
            }
        } ]);
    }

    return (
        <section className={classes.Chat}>
            <Sidebar
                messages={usersToMessageList}
                userList={availableUsers}
                onUserSelected={onUserSelectedHandler}
                currentUserId={props.userId}
                selectedUserId={selectedUser._id}
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
        userMessages: state.userMessages,
        userSocket: state.userSocket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateMessages: (messages) => dispatch(actions.updateMessages(messages))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);