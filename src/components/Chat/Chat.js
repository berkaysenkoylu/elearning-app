import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Chat.module.scss';
import axiosAuth from '../../axiosUtility/axios-auth';
import Sidebar from './Sidebar/Sidebar';
import ChatWindow from './ChatWindow/ChatWindow';

const Chat = props => {
    const [availableUsers, setAvailableUsers] = useState([]);

    useEffect(() => {
        console.log(props.userMessages)

        axiosAuth.get('').then(fetchedUsers => {
            setAvailableUsers(fetchedUsers.data.users);
        }).catch(error => {
            console.log(error);
        });
    }, [props.userMessages]);

    return (
        <section className={classes.Chat}>
            <Sidebar />

            <ChatWindow
                messageSent={(message) => props.messageSent(message)}
            />
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