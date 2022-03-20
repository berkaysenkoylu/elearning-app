import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './UserMessage.module.scss';
import useComponentVisible from '../../../hooks/useComponentVisible';
import svg from '../../../assets/images/sprite.svg';
import MessagesList from './MessagesList/MessagesList';

const UserMessage = props => {
    const [inboxPrevRef, isComponentVisible, setIsComponentVisible] = useComponentVisible(false);
    const [inboxPrevHeight, setInboxPrevHeight] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [totalUnreadMessageCount, setTotalUnreadMessageCount] = useState();

    let history = useHistory();
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
        let messageList = props.userMessages.slice().sort((a, b) => b.time > a.time)

        messageList.forEach(message => {
            userId = message.sender._id !== props.userId ? message.sender._id : message.receiver._id;

            if (!Object.prototype.hasOwnProperty.call(userToLastMessageMap, userId)) {
                userToLastMessageMap[userId] = {
                    lastMessage: {},
                    unreadCount: 0
                };
            }

            let lastMessageData = userToLastMessageMap[userId];
            let lastMessageOfUser = lastMessageData.lastMessage || {};

            if (message.time > (lastMessageOfUser.time || 0) && (message.receiver._id === userId || message.sender._id === userId)) {
                userToLastMessageMap[userId] = {
                    lastMessage: message
                };
            }

            userToLastMessageMap[userId].unreadCount = !message.isRead && message.sender._id !== props.userId ?
                lastMessageData.unreadCount + 1 : lastMessageData.unreadCount;

            !message.isRead && message.sender._id !== props.userId && totalUnReadMessages++;
        });

        setMessageList(userToLastMessageMap);
        setTotalUnreadMessageCount(totalUnReadMessages);

        if (totalUnReadMessages > 0) {
            // window.alert('New Message');
        }

    }, [props.userMessages, props.userId]);

    const toggleMenu = () => {
        setIsComponentVisible(prevState => !prevState);
    }

    const onUserMessageItemClickedHandler = () => {
        history.push(`/my-inbox`);

        toggleMenu();
    }

    const innerStyle = {
        height: `${isComponentVisible ? inboxPrevHeight : 0}px`
    };

    return (
        <li className={classes.UserMessage}>
            <svg className={classes.UserMessage__Icon} onClick={toggleMenu}>
                <use xlinkHref={`${svg}#icon-bubbles2`}></use>
            </svg>

            {totalUnreadMessageCount > 0 ? <span className={classes.UserMessage__UnreadCount}>{totalUnreadMessageCount}</span> : null}

            <div className={classes.UserMessage__InboxPreviewWrapper} ref={inboxPrevRef} style={innerStyle}>
                <div className={classes.UserMessage__InboxPreviewContent}>
                    <header>
                        <h2>Inbox</h2>
                    </header>

                    <MessagesList
                        list={messageList}
                        userMessageItemClicked={onUserMessageItemClickedHandler}
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