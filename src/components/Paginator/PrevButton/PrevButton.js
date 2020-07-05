import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './PrevButton.module.scss';

const PrevButton = (props) => {
    return (
        <button className={classes.PrevButton} disabled={props.disabled} onClick={props.clicked}>
            <svg className={classes.ArrowIcon}>
                <use xlinkHref={`${svg}#icon-cheveron-left`}></use>
            </svg>
        </button>
    )
}

export default PrevButton;