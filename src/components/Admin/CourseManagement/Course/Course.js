import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';

// import classes from './Course.module.scss';
import axiosAdmin from '../../../../axiosUtility/axios-admin';
import CourseHome from './CourseHome/CourseHome';
import CreateSubSection from './CreateSubSection/CreateSubSection';

// TODO: Instead of using state management here, move all the logic to its parent component
const Course = props => {
    const [courseData, setCourseData] = useState({});
    const config = {
        headers: {
            'Authorization': 'Bearer ' + props.token
        }
    };

    useEffect(() => {
        setCourseData(props.courseData);
    }, [props.courseData]);

    const onSectionAddedHandler = (sectionName) => {
        axiosAdmin.post(`/section`, {
            courseId: props.courseData._id,
            name: sectionName
        }, config).then(response => {
            const responseData = response.data || {};

            console.log(responseData)

        //     if (responseData.isAdded) {
        //         const newCourseList = courseList.concat(responseData.addedProduct);

        //         setCourseList(newCourseList);

        //         // history.push(props.match.url + '/course-management');
        //     }
        });
    }

    const onSubSectionCreatedHandler = (data) => {
        console.log(data)

        // props.history.push(props.match.url + `/course-management/${courseData._id}`);
        // axiosAdmin.post(`/section/${data.section}/add-subsection`, {
        //     ...data
        // }, config).then(response => {
        //     const responseData = response.data || {};

        //     if (responseData.isSubSectionAdded) {
        //         const newCourseList = courseList.concat(responseData.addedProduct);

        //         setCourseList(newCourseList);

        //         // history.push(props.match.url + '/course-management');
        //     }
        // });
    }

    const routes = (
        <Switch>
            <Route path={props.match.url + '/:sectionId/create-subsection'} render={() => <CreateSubSection
                sectionList={courseData.sections}
                createdSubSection={onSubSectionCreatedHandler} />}
            />
            {/* <Route path={props.match.url + '/:sectionName'} render={() => <span>Section Management</span>} /> */}
            <Route path={props.match.url + '/'} render={() => <CourseHome
                sectionAdded={onSectionAddedHandler}
                courseData={courseData}
                {...props} />}
            />
		</Switch>
    )

    return (
        routes
    )
}

export default withRouter(Course);