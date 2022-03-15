import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import classes from './UserMessage.module.scss';
import useComponentVisible from '../../../hooks/useComponentVisible';
import svg from '../../../assets/images/sprite.svg';
import MessagesList from './MessagesList/MessagesList';

const UserMessage = () => {
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

export default UserMessage;