import React, { useState, useEffect } from 'react';

import classes from './CourseList.module.scss';
import axiosCourse from '../../axiosUtility/axios-course';
import CourseListElement from './CourseListElement/CourseListElement';

const CourseList = (props) => {
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        axiosCourse.get('').then(response => {
            setCourseList(response.data.courseList);
        })
    }, []);

    const onCourseClickedHandler = (id) => {
        props.history.push(props.match.url + '/' + id)
    }

    return (
        <section className={classes.CourseList}>
            <header className={classes.CourseList__Header}>
                <h1>OUR COURSES</h1>
            </header>
        
            <div className={classes.CourseList__Content}>
                { courseList.map((course, i) => {
                    return <CourseListElement
                        key={course._id}
                        data={course}
                        index={i}
                        clicked={() => onCourseClickedHandler(course._id)}
                    />;
                }) }
            </div>
        </section>
    )
}

export default CourseList;