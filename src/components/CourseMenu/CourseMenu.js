import React, { Fragment } from 'react';

import classes from './CourseMenu.module.scss';
import Button from '../UI/Button/Button';

const CourseMenu = (props) => {

    const onActivityEnabled = (type) => {
        props.onCourseActivityEnabled(type);
    }

    console.log(props.courseSections)

    return (
        <Fragment>
            <div className={classes.CourseMenu__Intro} dangerouslySetInnerHTML={{__html: props.courseIntro}}></div>

            <div className={classes.CourseMenu__Misc}>
                {typeof props.courseQuiz !== 'undefined' ?
                    <Button clicked={() => onActivityEnabled('quiz')}>Quiz</Button> : null}
                <Button clicked={() => onActivityEnabled('questionnaire')}>Questionnaire</Button>
            </div>

            <div className={classes.CourseMenu__Cta}>
                {
                    props.courseSections.map((courseSection, index) => {
                        return <Button key={courseSection._id} clicked={() => props.onSectionSelect(index)}>{courseSection.name}</Button>
                    })
                }


                {/* <Button clicked={() => props.onSectionSelect(0)}>1. Hafta</Button>
                <Button disabled={true}>2. Hafta</Button>
                <Button disabled={true}>3. Hafta</Button> */}
            </div>
        </Fragment>
    );
}

export default CourseMenu;