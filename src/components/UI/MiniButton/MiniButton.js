import React from 'react';

import classes from './MiniButton.module.scss';

const MiniButton = props => {
    let classList = [classes.MiniButton];

    if (props.isActive) {
        classList = [classes.MiniButton, classes.MiniButton__Active];
    }

    return (
        <span className={classList.join(' ')} onClick={props.clicked}>
            {props.children}
        </span>
    );
}

export default MiniButton;