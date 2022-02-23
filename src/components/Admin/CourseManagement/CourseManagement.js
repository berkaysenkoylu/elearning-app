import React, { useState, useEffect  } from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';

import axiosAdmin from '../../../axiosUtility/axios-admin';
import Course from './Course/Course';
import CreateCourse from './CreateCourse/CreateCourse';
import AdminCourseList from './CourseList/AdminCourseList';
import CourseEnrollment from './CourseEnrollment/CourseEnrollment';

const CourseManagement = (props) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + props.token
        }
    };
    const [selectedCourse, setSelectedCourse] = useState({});
    const [courseToEdit, setCourseToEdit] = useState({});
    const [courseList, setCourseList] = useState([]);
    const [userList, setUserList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axiosAdmin.get('/course').then(response => {
            setCourseList(response.data.courseList);
        });

        axiosAdmin.get('/user', config).then(response => {
            setUserList(response.data.userList);
        });
        // eslint-disable-next-line
    }, []);

    const onCourseNameClickedHandler = (course) => {
        setSelectedCourse(course);

        history.push(props.match.url + `/course-management/${course._id}`);
    }

    const onCourseCreatedHandler = (courseData) => {
        // console.log(courseData)
        axiosAdmin.post(`/course`, courseData, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isAdded) {
                const newCourseList = courseList.concat(responseData.addedProduct);

                setCourseList(newCourseList);

                history.push(props.match.url + '/course-management');
            }
        });
    };

    const onCourseEditHandler = (courseToEdit) => {
        history.push(props.match.url + `/course-management/edit-course/${courseToEdit._id}`)

        setCourseToEdit(courseToEdit);
    }

    const onCourseEditedHandler = (newCourseData) => {
        axiosAdmin.put(`/course/${newCourseData._id}`, newCourseData, config).then(response => {
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

                history.push(props.match.url + '/course-management');
            }
        });
    }

    const onCourseDeletedHandler = (courseId) => {
        axiosAdmin.delete(`/course/${courseId}`, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isDeleted || false) {
                const copiedCourseList = courseList.filter(course => course._id !== responseData.removedItemId);

                setCourseList(copiedCourseList);
            }
        })
    }

    const onCoursePublishedHandler = (courseId, isPublished) => {
        axiosAdmin.put(`/course/publish/${courseId}`, { isPublished: isPublished }, config).then(response => {
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
        });
    }

    // TODO: FIX/CHANGE LATER
    const onCourseListUpdatedHandler = (newCourseData) => {
        const copiedCourseList = [...courseList].map(course => {
            if (course._id === newCourseData._id) {
                course = {...newCourseData};
            }

            return course;
        });

        // console.log(copiedCourseList)
        setCourseList(copiedCourseList);
        setSelectedCourse(newCourseData);
    }

    const onUserEnrollmentSubmittedHandler = (submittedUsers) => {
        axiosAdmin.put(`/course/${selectedCourse._id}/enroll-users`, { userList: submittedUsers }, config).then(response => {
            let responseData = response.data;

            if (responseData.areUsersEnrolled) {
                const copiedCourseList = courseList.map(course => {
                    if (course._id === selectedCourse._id) {
                        return {
                            ...responseData.newCourse
                        };
                    }

                    return course
                });

                setCourseList(copiedCourseList);

                history.push(props.match.url + '/course-management');
            }
        });
    }

    let routes = (
		<Switch>
            <Route path={props.match.url + '/course-management/:id/user-enrollment'} render={() =>
                <CourseEnrollment
                    userList={userList}
                    enrolledUsers={selectedCourse.enrolledUsers}
                    onUserEnrollmentSubmitted={onUserEnrollmentSubmittedHandler}
                />} />
            <Route path={props.match.url + '/course-management/edit-course/:id'} render={() =>
                <CreateCourse
                    savedCourseData={courseToEdit}
                    courseEdited={onCourseEditedHandler}
                />} />
            <Route path={props.match.url + '/course-management/create-course'} render={() =>
                <CreateCourse courseCreated={onCourseCreatedHandler} />} />
            <Route path={props.match.url + '/course-management/:id'} render={() =>
                <Course
                    token={props.token}
                    courseData={selectedCourse}
                    courseListUpdated={onCourseListUpdatedHandler}
                    courseActivityAdded={onCourseListUpdatedHandler}
                    courseActivityEdited={onCourseListUpdatedHandler}
                />} />
			<Route path={props.match.url  + '/course-management/'} render={() => <AdminCourseList
                courseList={courseList}
                onCourseNameClicked={onCourseNameClickedHandler}
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