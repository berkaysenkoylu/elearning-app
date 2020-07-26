import React from 'react';

import classes from './CourseListElement.module.scss';
import svg from '../../../assets/images/sprite.svg';

const CourseListElement = (props) => {
    let colors_light = ['rgba(255, 87, 129, 0.15)', 'rgba(255, 185, 0, 0.15)', 'rgba(41, 152, 255, 0.15)'];
    let colors_dark = ['rgba(186, 38, 93, 0.3)', 'rgba(206, 98, 40, 0.3)', 'rgba(86, 67, 250, 0.3)'];

    let image = require('../../../assets/images/spine.jpg');
    let style = {
        backgroundImage: `linear-gradient(to bottom, ${colors_light[props.index % 3]}, ${colors_dark[props.index % 3]}), url(${image})`
    }

    let courseData = props.data;

    return (
        <div className={classes.CourseListElement}>
            <div className={[classes.CourseListElement__Side, classes.CourseListElement__Side__Front].join(' ')}>
                <div className={classes.CourseListElement__Picture} style={style}>
                    &nbsp;
                </div>
                <div className={classes.CourseListElement__Content}>
                    <h4 className={[classes.CourseListElement__Heading, classes[`CourseListElement__Heading__${props.index % 3 + 1}`]].join(' ')}>
                        {courseData.name}
                    </h4>
                    <div className={classes.CourseListElement__Description}>
                        <h2>Faculty</h2>
                        <ul className={classes.CourseListElement__Description__FacultyList}>
                            {courseData.landing.faculty.map(faculty => {
                                return <li key={faculty._id} className={[classes.CourseListElement__Description__FacultyList__Item, classes[`CourseListElement__Description__FacultyList__Item__${props.index % 3 + 1}`]].join(' ')}>
                                    {`Prof. Dr. ${faculty.firstName + ' ' + faculty.lastName}`}
                                </li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={[classes.CourseListElement__Side, classes.CourseListElement__Side__Back, classes[`CourseListElement__Side__Back__${props.index % 3 + 1}`]].join(' ')}>
                <div className={classes.CourseListElement__Cta}>
                    <button className={classes.CourseListElement__Cta__Link} onClick={props.selectCourseListElement}>
                        <svg className={classes.CourseListElement__Cta__Link__Icon}>
                            <use xlinkHref={`${svg}#icon-info`}></use>
                        </svg>
                        <span className={classes.CourseListElement__Cta__Link__Text} onClick={props.clicked}>
                            More Info
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseListElement;