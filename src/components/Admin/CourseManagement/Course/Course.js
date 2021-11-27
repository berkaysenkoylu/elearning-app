import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';

// import classes from './Course.module.scss';
import CourseHome from './CourseHome/CourseHome';
import CreateSection from './CreateSection/CreateSection';

const Course = props => {

    const routes = (
        <Switch>
            <Route path={props.match.url + '/create-section'} render={() => <CreateSection />} />
            <Route path={props.match.url + '/:sectionName'} render={() => <span>Section Management</span>} />
            <Route path={props.match.url + '/'} render={() => <CourseHome {...props} />} />
		</Switch>
    )

    return (
        routes
    )
}

export default withRouter(Course);