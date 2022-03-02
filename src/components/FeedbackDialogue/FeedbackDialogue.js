import React from 'react';
import ReactDOM from 'react-dom';

import classes from './FeedbackDialogue.module.scss';
import Backdrop from '../UI/Backdrop/Backdrop';

const FeedbackDialogue = (props) => {
    let classList = [classes.FeedbackDialogue__Button];

    if (props.isError) {
        classList = [classes.FeedbackDialogue__Button, classes.FeedbackDialogue__Button__Error];
    } else {
        classList = [classes.FeedbackDialogue__Button, classes.FeedbackDialogue__Button__Success];
    }

    return (
        ReactDOM.createPortal(
            props.show ? (
                <div className={classes.FeedbackDialogueContainer}>
                    <Backdrop show={props.show} />
                    <div className={classes.FeedbackDialogue}>
                        <p>{props.feedbackMessage || 'Something went wrong'}</p>
                        <div>
                            <button
                                className={classList.join(' ')}
                                onClick={props.closed}>Close</button>
                        </div>
                    </div>
                </div>) : null,
            document.getElementById('error-root')
        )
    );
}  

export default FeedbackDialogue;