import React, { useState } from 'react';

import classes from './CourseEnrollment.module.scss';
import UserPool from './UserPool/UserPool';

const CourseEnrollment = () => {
    const [enrolledUsers, setEnrolledUsers] = useState([]);
    const [nonEnrolledUsers, setNonEnrolledUsers] = useState([{
        _id: '1',
        name: 'John Doe',
        isSelected: false
    }, {
        _id: '2',
        name: 'Jane Doe',
        isSelected: false
    }, {
        _id: '3',
        name: 'Leroy Jenkins',
        isSelected: false
    }]);

    const onUserSelectedHandler = (action, userId) => {
        let copiedList = {};

        switch(action) {
            case 'enrol':
                copiedList = [...nonEnrolledUsers].map(item => {
                    if (item._id === userId) {
                        item.isSelected = !item.isSelected;
                    }

                    return item;
                });

                setNonEnrolledUsers(copiedList);
                break;
            case 'expel':
                copiedList = [...enrolledUsers].map(item => {
                    if (item._id === userId) {
                        item.isSelected = !item.isSelected;
                    }

                    return item;
                });

                setEnrolledUsers(copiedList);
                break;
            default:
                console.log('Check your enrollment action!');
                break;
        }
    }

    const onUserEnrollmentChangedHandler = (action) => {
        let copiedEnrolledUsers = [...enrolledUsers];
        let copiedNonEnrolledUsers = [...nonEnrolledUsers];

        if (action === 'enrol') {
            copiedNonEnrolledUsers.filter(user => user.isSelected).forEach(user => {
                copiedEnrolledUsers.push({
                    ...user,
                    isSelected: false
                });
            });
    
            copiedNonEnrolledUsers = copiedNonEnrolledUsers.filter(user => !user.isSelected);
        } else {
            copiedEnrolledUsers.filter(user => user.isSelected).forEach(user => {
                copiedNonEnrolledUsers.push({
                    ...user,
                    isSelected: false
                });
            });

            copiedEnrolledUsers = copiedEnrolledUsers.filter(user => !user.isSelected);
        }

        setNonEnrolledUsers(copiedNonEnrolledUsers);
        setEnrolledUsers(copiedEnrolledUsers);
    }

    return (
        <section className={classes.CourseEnrollment}>
            <header className={classes.CourseEnrollment__Header}>
                <h2>Enroll users to the course</h2>
            </header>

            <div className={classes.CourseEnrollment__Body}>
                <UserPool
                    title="Enrolled Users"
                    userList={enrolledUsers}
                    userSelected={(userId) => onUserSelectedHandler('expel', userId)}
                />

                <div className={classes.CourseEnrollment__Body__Cta}>
                    <button onClick={() => onUserEnrollmentChangedHandler('enrol')}>{'<<<<'}</button>

                    <button onClick={() => onUserEnrollmentChangedHandler('expel')}>{'>>>>'}</button>
                </div>

                <UserPool
                    title="Non Enrolled Users"
                    userList={nonEnrolledUsers}
                    userSelected={(userId) => onUserSelectedHandler('enrol', userId)}
                />
            </div>
        </section>
    );
}

export default CourseEnrollment;