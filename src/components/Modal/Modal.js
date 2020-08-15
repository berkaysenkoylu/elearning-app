import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.scss';
import Backdrop from '../UI/Backdrop/Backdrop';

const Modal = (props) => {
    const [modalClasses, setModalClasses] = useState([classes.ModalContainer]); // KEEP IT OR LEAVE IT

    useEffect(() => {
        setModalClasses([classes.ModalContainer]); // KEEP IT OR LEAVE IT
    }, [props.show]);

    const closeModalHandler = () => {
        props.closed();

        setModalClasses([classes.ModalContainer, classes.ModalContainer__Closed]); // KEEP IT OR LEAVE IT
    }

    return (
        ReactDOM.createPortal(
            props.show ? (
                <div className={modalClasses.join(' ')} style={props.customStyle}>
                    <Backdrop show={props.show} clicked={closeModalHandler} />
                    <div className={classes.Modal}>
                        {props.content ?
                        <div dangerouslySetInnerHTML={{__html: props.content}}></div> :
                        props.children}
                    </div>
                </div>) : null,
            document.getElementById('modal-root')
        )
    );
}  

export default Modal;