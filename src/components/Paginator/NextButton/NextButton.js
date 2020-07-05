import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './NextButton.module.scss';

const PrevButton = (props) => {
    return (
        <button className={classes.NextButton} disabled={props.disabled} onClick={props.clicked}>
            <svg className={classes.ArrowIcon}>
                <use xlinkHref={`${svg}#icon-cheveron-right`}></use>
            </svg>
        </button>
    )
}

export default PrevButton;