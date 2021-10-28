import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import axiosAdmin from '../../../axiosUtility/axios-admin';
import CreateCourse from './CreateCourse/CreateCourse';
import AdminCourseList from './CourseList/AdminCourseList';

const CourseManagement = (props) => {
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        axiosAdmin.get('/course').then(response => {
            setCourseList(response.data.courseList);
        })
    }, []);

    const onCourseCreatedHandler = (courseData) => {
        console.log(courseData)
    };

    let routes = (
		<Switch>
            {/* <Route path={props.match.url + '/edit-course/:id'} render={() => <CreateCourse />} /> */}
			<Route path={props.match.url + '/create-course'} render={() => <CreateCourse courseCreated={onCourseCreatedHandler} />} />
			<Route path={props.match.url} render={() => <AdminCourseList courseList={courseList} />} />
		</Switch>
	);

    return (
        <>
            {routes}
        </>
    )
}

export default CourseManagement;