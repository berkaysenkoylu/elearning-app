import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './FeedbackCondition.module.scss';

const FeedbackCondition = (props) => {
    return (
        <div className={classes.FeedbackCondition}>
            <svg className={classes.FeedbackCondition__Icon} style={{fill: props.isTrue ? 'green' : 'red'}}>
                <use xlinkHref={`${svg}#icon-${props.isTrue ? 'checkmark1' : 'cross'}`}></use>
            </svg>
            <span>{props.children}</span>
        </div>
    )
}

export default FeedbackCondition;