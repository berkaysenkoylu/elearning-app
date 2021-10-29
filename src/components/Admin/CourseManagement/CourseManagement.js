import React, { useState, useEffect  } from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';

import axiosAdmin from '../../../axiosUtility/axios-admin';
import CreateCourse from './CreateCourse/CreateCourse';
import AdminCourseList from './CourseList/AdminCourseList';

const CONFIG = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
};

const CourseManagement = (props) => {
    const [courseToEdit, setCourseToEdit] = useState({});
    const [courseList, setCourseList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axiosAdmin.get('/course').then(response => {
            setCourseList(response.data.courseList);
        });
    }, []);

    const onCourseCreatedHandler = (courseData) => {
        axiosAdmin.post(`/course`, courseData, CONFIG).then(response => {
            const responseData = response.data || {};

            if (responseData.isAdded) {
                const newCourseList = courseList.concat(responseData.addedProduct);

                setCourseList(newCourseList);

                history.push(props.match.url);
            }
        });
    };

    const onCourseEditHandler = (courseToEdit) => {
        history.push(props.match.url + `/edit-course/${courseToEdit._id}`)

        setCourseToEdit(courseToEdit);
    }

    const onCourseEditedHandler = (newCourseData) => {
        axiosAdmin.put(`/course/${newCourseData._id}`, newCourseData, CONFIG).then(response => {
            if (response.data.isEdited) {
                const copiedCourseList = courseList.map(course => {
                    if (course._id === newCourseData._id) {
                        return {
                            ...response.data.newCourse
                        };
                    }

                    return course
                });

                setCourseList(copiedCourseList);

                history.push(props.match.url);
            }
        });
    }

    const onCourseDeletedHandler = (courseId) => {
        axiosAdmin.delete(`/course/${courseId}`, CONFIG).then(response => {
            const responseData = response.data || {};

            if (responseData.isDeleted || false) {
                const copiedCourseList = courseList.filter(course => course._id !== responseData.removedItemId);

                setCourseList(copiedCourseList);
            }
        })
    }

    const onCoursePublishedHandler = (courseId, isPublished) => {
        axiosAdmin.put(`/course/publish/${courseId}`, { isPublished: isPublished }, CONFIG).then(response => {
            const responseData = response.data || {};

            if (responseData.success || false) {
                const copiedCourseList = courseList.map(course => {
                    if (course._id === courseId) {
                        return {
                            ...course,
                            isPublished: responseData.isPublished
                        };
                    }

                    return course;
                });

                setCourseList(copiedCourseList);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    let routes = (
		<Switch>
            <Route path={props.match.url + '/edit-course/:id'} render={() =>
                <CreateCourse
                    savedCourseData={courseToEdit}
                    courseEdited={onCourseEditedHandler}
                />} />
			<Route path={props.match.url + '/create-course'} render={() => <CreateCourse courseCreated={onCourseCreatedHandler} />} />
			<Route path={props.match.url} render={() => <AdminCourseList
                courseList={courseList}
                onCourseEdited={onCourseEditHandler}
                onCourseDeleted={onCourseDeletedHandler}
                onCoursePublished={onCoursePublishedHandler}
                />} />
		</Switch>
	);

    return (
        <>
            {routes}
        </>
    )
}

export default CourseManagement;