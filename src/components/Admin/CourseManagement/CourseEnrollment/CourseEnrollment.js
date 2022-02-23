import React, { useState, useEffect } from 'react';

import classes from './CourseEnrollment.module.scss';
import UserPool from './UserPool/UserPool';
import Button from '../../../UI/Button/Button';

const CourseEnrollment = props => {
    const [enrolledUsers, setEnrolledUsers] = useState(props.enrolledUsers.map(user => {
        return {
            _id: user._id,
            name: user.firstName + ' ' + user.lastName,
            isSelected: false
        }
    }));
    const [nonEnrolledUsers, setNonEnrolledUsers] = useState([]);

    useEffect(() => {
        let idArr = props.enrolledUsers.map(user => user._id);

        const modifiedUserList = props.userList
            .filter(user => user.status !== 'admin' && idArr.indexOf(user._id) === -1)
            .map(user => {
                return {
                    _id: user._id,
                    name: user.firstName + ' ' + user.lastName,
                    isSelected: false
                };
            });

        setNonEnrolledUsers(modifiedUserList)
    }, [props.userList, props.enrolledUsers]);

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

    const onUserEnrollmentSubmit = () => {
        props.onUserEnrollmentSubmitted(enrolledUsers.map(enrolledUser => enrolledUser._id));
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

            <div className={classes.CourseEnrollment__Cta}>
                <Button
                    btnType="BtnPrimary"
                    clicked={onUserEnrollmentSubmit}>Submit</Button>
            </div>
        </section>
    );
}

export default CourseEnrollment;