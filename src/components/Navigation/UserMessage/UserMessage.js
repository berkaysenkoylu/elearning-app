import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './UserMessage.module.scss';
import useComponentVisible from '../../../hooks/useComponentVisible';
import svg from '../../../assets/images/sprite.svg';
import MessagesList from './MessagesList/MessagesList';

const UserMessage = props => {
    const [inboxPrevRef, isComponentVisible, setIsComponentVisible] = useComponentVisible(false);
    const [inboxPrevHeight, setInboxPrevHeight] = useState(0);

    let timeout = useRef(null);
    
    useEffect(() => {
        timeout.current = setTimeout(() => {
            setInboxPrevHeight(inboxPrevRef.current.scrollHeight);
        }, 333);

        return () => {
            clearTimeout(timeout.current);
        }
    }, [inboxPrevRef]);

    useEffect(() => {
        let totalUnReadMessages = 0;
        let userToLastMessageMap = {};
        let userId = '';

        props.userMessages.forEach(message => {
            userId = message.sender._id !== props.userId ? message.sender._id : message.receiver._id;

            if (!Object.prototype.hasOwnProperty.call(userToLastMessageMap, userId)) {
                userToLastMessageMap[userId] = {
                    lastMessage: {},
                    unreadCount: 0
                };
            }

            let lastMessageData = userToLastMessageMap[userId] || {};
            let lastMessageOfUser = lastMessageData.lastMessage || {};

            if (message.time > (lastMessageOfUser.time || 0) && (message.receiver._id === userId || message.sender._id)) {
                userToLastMessageMap[userId] = {
                    lastMessage: message,
                    unreadCount: !message.isRead ? lastMessageData.unreadCount + 1 : lastMessageData.unreadCount
                };
            }

            
            !message.isRead && totalUnReadMessages++;
        });

        console.log(userToLastMessageMap)
        console.log(totalUnReadMessages)

    }, [props.userMessages, props.userId]);

    const toggleMenu = () => {
        setIsComponentVisible(prevState => !prevState);
    }

    const innerStyle = {
        height: `${isComponentVisible ? inboxPrevHeight : 0}px`
    };

    

    // TODO: Replace it later
    const messageList = [
        {
            id: 'ab1',
            messageText: 'Hey listen this is my first message.',
            author: {
                username: 'Alpaslan Senkoylu',
                userImg: '',
            },
            date: 1646575104446
        },
        {
            id: 'ab2',
            messageText: 'Hey listen this is my first message.',
            author: {
                username: 'Emre Acaroglu',
                userImg: '',
            },
            date: 1646575158035
        },
        {
            id: 'ab3',
            messageText: 'Hey listen this is my first message.',
            author: {
                username: 'Admin',
                userImg: 'assets/1646484580148own3.jpg',
            },
            date: 1646575195134
        },
        {
            id: 'ab4',
            messageText: 'Hey listen this is my first message.',
            author: {
                username: 'Admin',
                userImg: 'assets/1646484580148own3.jpg',
            },
            date: 1646575245134
        },
        {
            id: 'ab5',
            messageText: 'Hey listen this is my first message.',
            author: {
                username: 'Admin',
                userImg: 'assets/1646484580148own3.jpg',
            },
            date: 1646575245134
        }
    ];

    return (
        <li className={classes.UserMessage}>
            <svg className={classes.UserMessage__Icon} onClick={toggleMenu}>
                <use xlinkHref={`${svg}#icon-bubbles2`}></use>
            </svg>

            <div className={classes.UserMessage__InboxPreviewWrapper} ref={inboxPrevRef} style={innerStyle}>
                <div className={classes.UserMessage__InboxPreviewContent}>
                    <header>
                        <h2>Inbox</h2>
                    </header>

                    <MessagesList
                        list={messageList}
                    />

                    <footer>
                        <Link to='/my-inbox'>Go to inbox</Link>
                    </footer>
                </div>
            </div>
        </li>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        userMessages: state.userMessages
    };
};

export default connect(mapStateToProps, null)(UserMessage);