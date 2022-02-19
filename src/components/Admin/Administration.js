import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import AdminHome from './AdminHome/AdminHome';
import AdminNavigation from './AdminNavigation/AdminNavigation';
import CourseManagement from './CourseManagement/CourseManagement';
import UserManagement from './UserManagement/UserManagement';
import classes from './Administration.module.scss';

const Administration = (props) => {
    let routes = (
		<Switch>
			<Route path={props.match.url + '/user-management'}  render={() => <UserManagement {...props} />} />
			<Route path={props.match.url + '/course-management'} render={() => <CourseManagement {...props} />} />
			<Route path={props.match.url} render={() => <AdminHome />} />
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

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps, null)(Administration);