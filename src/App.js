import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Authentication from './containers/Authentication/Authentication';
import CourseContainer from './containers/CourseContainer/CourseContainer';
import Logout from './components/Auth/Logout/Logout';

import * as actions from './store/actions/index';

const App = (props) => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.authCheckState());
	}, [dispatch]);

	let routes = (
		<Switch>
			<Route path='/logout' component={Logout} />
			<Route path='/auth' component={Authentication} />
			<Route path='/contact' render={() => <div>CONTACT COMPONENT</div>} />
			<Route path='/about' render={() => <div>ABOUT COMPONENT</div>} />
			<Route path='/courses' component={CourseContainer} />
			<Route path='/' exact render={() => <div>HOME COMPONENT</div>} />
			<Redirect to='/' />
		</Switch>
	)

	return (
		<Layout>
			{routes}
		</Layout>
	);
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.isAuth
	};
};

export default connect(mapStateToProps, null)(App);