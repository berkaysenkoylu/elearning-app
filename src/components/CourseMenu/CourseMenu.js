import React, { Fragment } from 'react';

import classes from './CourseMenu.module.scss';
import Button from '../UI/Button/Button';

const CourseMenu = (props) => {
    return (
        <Fragment>
            <div className={classes.CourseMenu__Intro} dangerouslySetInnerHTML={{__html: props.courseIntro}}></div>

            <div className={classes.CourseMenu__Misc}>
                {typeof props.courseQuiz !== 'undefined' ?
                    <Button clicked={props.onQuizModeActivated}>Quiz</Button> : null}
            </div>

            <div className={classes.CourseMenu__Cta}>
                <Button clicked={() => props.onSectionSelect(0)}>1. Hafta</Button>
                <Button disabled={true}>2. Hafta</Button>
                <Button disabled={true}>3. Hafta</Button>
            </div>
        </Fragment>
    );
}

export default CourseMenu;