import React, { useState, useEffect, useRef } from 'react';

import classes from './ChatWindow.module.scss';
// import ChatMessage from './ChatMessage/ChatMessage';

const ChatWindow = props => {
    const [inputValue, setInputValue] = useState('');

    const onInputValueChanged = (event) => {
        setInputValue(event.target.value);
    }

    const sendMessage = () => {
        props.messageSent(inputValue);

        setInputValue('');
    }

    return (
        <section className={classes.ChatWindow}>
            <div className={classes.ChatWindow__Messages}>
                
            </div>

            <div className={classes.ChatWindow__Cta}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={onInputValueChanged}
                />

                <button onClick={sendMessage}>SEND</button>
            </div>
        </section>
    );
}

export default ChatWindow;