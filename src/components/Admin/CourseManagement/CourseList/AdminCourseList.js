import React from 'react';

import classes from './AdminCourseList.module.scss';
import CourseCard from './CourseCard/CourseCard';

const AdminCourseList = (props) => {
    return (
        <section className={classes.AdminCourseList}>
            <header className={classes.AdminCourseList__Header}>
                <h1>Course List</h1>
            </header>

            <div className={classes.AdminCourseList__Body}>
                {(props.courseList || []).map(course => {
                    return <CourseCard
                        key={course._id}
                        data={course}
                        courseEdit={() => props.onCourseEdited(course)}
                        courseDelete={() => props.onCourseDeleted(course._id)}
                        coursePublish={() => props.onCoursePublished(course._id, !course.isPublished)}
                        courseNameClicked={() => props.onCourseNameClicked(course)}
                    />
                })}
            </div>
        </section>
    )
}

export default AdminCourseList;