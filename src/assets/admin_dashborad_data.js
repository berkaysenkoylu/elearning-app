export const dashboardData = [
    {
        name: 'Dashboard',
        subMenuItems: [
            {
                name: 'Administration',
                icon: 'home',
                path: '/administration',
                isExact: true
            }, {
                name: 'Analytics',
                icon: 'stats-dots',
                path: '/analytics',
                isExact: true
            }, {
                name: 'Sales',
                icon: 'stats-bars',
                path: '/sales',
                isExact: true
            }
        ]
    }, {
        name: 'Courses',
        subMenuItems: [
            {
                name: 'Management',
                icon: 'folder-open',
                path: '/administration/course-management',
                isExact: true
            }, {
                name: 'Create',
                icon: 'folder-plus',
                path: '/administration/course-management/create-course',
                isExact: true
            }
        ]
    }, {
        name: 'Users',
        subMenuItems: [
            {
                name: 'Management',
                icon: 'users',
                path: '/administration/user-management',
                isExact: true
            }, {
                name: 'Create',
                icon: 'user-plus',
                path: '/administration/user-management/create-user',
                isExact: true
            }
        ]
    }
]