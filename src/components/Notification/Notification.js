import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

// import sound from '../../assets/sounds/message-notification.wav';
import classes from './Notification.module.scss';

const Notification = props => {
    const [notificationClasses, setNotificationClasses] = useState([classes.Notification]);

    let timeout = useRef(null);
    let sound = require(`../../assets/sounds/${props.soundFileName}`);

    useEffect(() => {
        setNotificationClasses([classes.Notification, classes.Notification__Open]);

        timeout.current = setTimeout(() => {
            setNotificationClasses([classes.Notification, classes.Notification__Closed]);

            props.closed();
        }, 2000);

        return () => {
            clearTimeout(timeout.current);
        }
    }, [props]);

    const closeModalHandler = () => {
        props.closed();

        setNotificationClasses([classes.Notification, classes.Notification__Closed]);
    }

    return ReactDOM.createPortal(
        <div className={notificationClasses.join(' ')}>
            <audio autoPlay src={sound} />
            <div className={classes.Notification__Body}>
                {props.message}
            </div>
            
            <span className={classes.Notification__CloseButton} onClick={closeModalHandler}>&nbsp;</span>
        </div>,
        document.getElementById('modal-root')
    );
}

export default Notification;