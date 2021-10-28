import React from 'react';

import classes from './AdminNavigation.module.scss';
import AdminNavigationItems from './AdminNavigationItems/AdminNavigationItems';

const ADMIN_NAVIGATION_ITEMS = [
    {
        name: 'Admin Home',
        type: 'Link',
        path: '/administration',
        isExact: true
    },
    {
        name: 'Courses',
        type: 'Dropdown',
        submenus: [
            {
                name: 'Management',
                path: '/course-management',
                isExact: true
            },
            {
                name: 'Create a course',
                path: '/course-management/create-course',
                isExact: true
            },
            // {
            //     name: 'Enrollment',
            //     path: '/course-management/enrollment',
            //     isExact: true
            // }
        ]
    },
    {
        name: 'Users',
        type: 'Dropdown',
        submenus: [
            {
                name: 'Management',
                path: '/user-management',
                isExact: true
            },
            {
                name: 'Create a user',
                path: '/user-management/create-user',
                isExact: true
            }
        ]
    }
];

const AdminNavigation = props => {
    return (
        <nav className={classes.AdminNavigation}>
            <AdminNavigationItems navItems={ADMIN_NAVIGATION_ITEMS} { ...props }></AdminNavigationItems>
        </nav>
    )
}

export default AdminNavigation;