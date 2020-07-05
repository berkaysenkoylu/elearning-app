import React from 'react';

import classes from './ProgressBar.module.scss';

const ProgressBar = (props) => {

    let progress = {
        width: `${props.questionNumber * (100 / props.questionAmount)}%`,
        borderTopRightRadius: props.questionNumber === props.questionAmount ? '5px' : '0px',
        borderBottomRightRadius: props.questionNumber === props.questionAmount ? '5px' : '0px'
    };

    return (
        <div className={classes.ProgressBar}>
            <div className={classes.ProgressBar__Background}></div>
            <div className={classes.ProgressBar__Foreground} style={progress}></div>
        </div>
    )
}

export default ProgressBar;