import React from 'react';

import classes from './Chat.module.scss';
import Sidebar from './Sidebar/Sidebar';
import ChatWindow from './ChatWindow/ChatWindow';

const Chat = props => {
    return (
        <section className={classes.Chat}>
            <Sidebar />

            <ChatWindow
                messageSent={(message) => props.messageSent(message)}
            />
        </section>
    );
}

export default Chat;