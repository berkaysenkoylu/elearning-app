import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminNavigation from './AdminNavigation/AdminNavigation';
import CourseManagement from './CourseManagement/CourseManagement';
import UserManagement from './UserManagement/UserManagement';
import classes from './Administration.module.scss';

const Administration = (props) => {
    let routes = (
		<Switch>
			<Route path={props.match.url + '/user-management'} component={UserManagement} />
			<Route path={props.match.url + '/course-management'} component={CourseManagement} />
			<Route path={props.match.url} render={() => <div>ADMIN HOME COMPONENT</div>} />
			{/* <Redirect to='/' /> */}
		</Switch>
	);

    return (
        <section className={classes.Administration}>
            <AdminNavigation { ...props } />

            {routes}
        </section>
    );
};

export default Administration;