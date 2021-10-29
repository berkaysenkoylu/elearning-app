import React, { useState, useEffect } from 'react';

import classes from './CourseList.module.scss';
import Loader from '../../components/Loader/Loader';
import axiosCourse from '../../axiosUtility/axios-course';
import CourseListElement from './CourseListElement/CourseListElement';

const CourseList = (props) => {
    const [courseList, setCourseList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axiosCourse.get('').then(response => {
            setCourseList(response.data.courseList.filter(course => course.isPublished));
            setIsLoading(false);
        })
    }, []);

    const onCourseClickedHandler = (id) => {
        props.history.push(props.match.url + '/' + id)
    }

    let pageContent = (
        <span className={classes.CourseList__Loader}>
            <Loader strokeWidth={4} />
        </span>
    );

    if (!isLoading) {
        pageContent = (
            <>
                <header className={classes.CourseList__Header}>
                    <h1>OUR COURSES</h1>
                </header>
            
                <div className={classes.CourseList__Content}>
                    { courseList.map((course, i) => {
                        return <CourseListElement
                            key={course._id}
                            data={course}
                            index={i}
                            selectCourseListElement={() => onCourseClickedHandler(course._id)}
                        />;
                    }) }
                </div>
            </>
        );
    }

    return (
        <section className={classes.CourseList}>
            {pageContent}
        </section>
    )
}

export default CourseList;