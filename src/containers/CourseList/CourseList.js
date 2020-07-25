import React, { useState, useEffect } from 'react';

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
        <section>
            <header>
                <h1>OUR COURSES</h1>
            </header>
        
            <div>
                { courseList.map(course => {
                    return <CourseListElement
                        key={course._id}
                        data={course}
                        onCourseClicked={() => onCourseClickedHandler(course._id)}
                    />
                }) }
            </div>
        </section>
    )
}

export default CourseList;