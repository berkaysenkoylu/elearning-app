import React from 'react';

const CourseListElement = (props) => {
    let courseData = props.data;

    return (
        <div onClick={props.onCourseClicked}>
            {courseData.name}
        </div>
    )
}

export default CourseListElement;