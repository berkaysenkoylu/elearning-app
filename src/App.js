import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import Administration from './components/Admin/Administration';
import Account from './components/Account/Account';
import Chat from './components/Chat/Chat';
import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Authentication from './containers/Authentication/Authentication';
import CourseContainer from './containers/CourseContainer/CourseContainer';
import Logout from './components/Auth/Logout/Logout';

import * as actions from './store/actions/index';

const App = (props) => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.authCheckState());
	}, [dispatch]);

    useEffect(() => {
        if (props.userSocket) {
            let messages = [...props.userMessages];

            props.userSocket.on('private message', messageData => {
                messages.push(messageData.data);
    
                props.updateMessages(messages);
            });
    
            props.userSocket.on('message sent', messageData => {
                if (messageData.from === props.userId) {
                    messages.push(messageData.data);
    
                    props.updateMessages(messages);
                }
            });
        }
        // eslint-disable-next-line
    }, [props.userSocket, props.userMessages, props.userId]);

	let routes = (
		<Switch>
			<Route path='/logout' component={Logout} />
            {props.isAuthenticated ? <Route path='/my-inbox' component={Chat} /> : null}
            {props.isAuthenticated ? <Route path='/my-account' component={Account} /> : null}
			<Route path='/auth' component={Authentication} />
			<Route path='/contact' render={() => <div>CONTACT COMPONENT</div>} />
			<Route path='/about' render={() => <div>ABOUT COMPONENT</div>} />
			<Route path='/courses' component={CourseContainer} />
            {props.userStatus === 'admin' ? <Route path='/administration' component={Administration} /> : null}
			<Route path='/' exact component={Home} />
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
        userId: state.userId,
		isAuthenticated: state.isAuth,
        userStatus: state.userStatus,
        userSocket: state.userSocket,
        userMessages: state.userMessages
	};
};

const mapDispatchToProps = dispatch => {
    return {
        updateMessages: (messages) => dispatch(actions.updateMessages(messages))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);