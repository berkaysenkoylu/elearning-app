import React from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './QuestionResult.module.scss';

const QuestionResult = (props) => {
    let iconName = props.isCorrect ? 'checkmark-outline' : 'close-outline';
    let classColor = props.isCorrect ? classes.QuestionResult__Icon__Correct : classes.QuestionResult__Icon__Incorrect;

    return (
        <div className={classes.QuestionResult}>
            <span className={classes.QuestionResult__QuestionNumber}>
                {props.questionNumber}
            </span>
            <svg className={[classes.QuestionResult__Icon, classColor].join(' ')}>
                <use xlinkHref={`${svg}#icon-${iconName}`}></use>
            </svg>
        </div>
    )
}

export default QuestionResult;