import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import CourseList from '../CourseList/CourseList';
import Course from '../Course/Course';

class CourseContainer extends Component {
    render() {
        return (
            <Switch>
                <Route path={this.props.match.url + '/:id'} component={Course} />
                <Route path={this.props.match.url + '/'} component={CourseList} />
                <Redirect to={this.props.match.url + '/'} />
            </Switch>
        )
    }
}

export default CourseContainer;