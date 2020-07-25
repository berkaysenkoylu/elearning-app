import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import CourseContainer from './containers/CourseContainer/CourseContainer';

const App = (props) => {

	let routes = (
		<Switch>
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

export default App;