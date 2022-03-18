import React, { useState, useEffect, useRef } from 'react';

import classes from './ChatWindow.module.scss';
import ChatMessage from './ChatMessage/ChatMessage';

const ChatWindow = props => {
    const [inputValue, setInputValue] = useState('');

    let chatWindowRef = useRef(null);
    let chatWindowTargetRef = useRef(null);

    const scrollToBottom = () => {
        // chatWindowTargetRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {
        scrollToBottom()
    }, [props.messageList]);

    const onInputValueChanged = (event) => {
        setInputValue(event.target.value);
    }

    const sendMessage = () => {
        props.messageSent(inputValue);

        setInputValue('');
    }

    return (
        <section className={classes.ChatWindow}>
            <div className={classes.ChatWindow__Messages} ref={chatWindowRef}>
                {props.messageList.length > 0 ? props.messageList.map(message => {
                    return <ChatMessage
                        key={message._id}
                        currentUserId={props.userId}
                        messageData={message}
                        windowRef={chatWindowRef}
                        messageIsRead={props.messageRead}
                    />
                }) : null}
                <div ref={chatWindowTargetRef} />
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