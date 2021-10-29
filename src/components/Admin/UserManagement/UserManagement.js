import React from 'react';
import { Route, Switch} from 'react-router-dom';

import AdminUserList from './AdminUserList/AdminUserList';

const UserManagement = (props) => {
    let routes = (
		<Switch>
            <Route path={props.match.url + '/edit-user/:id'} render={() => <div>EDIT USER</div>} />
            <Route path={props.match.url + '/create-user'} render={() => <div>CREATE USER</div>} />
			<Route path={props.match.url} render={() => <AdminUserList />} />
		</Switch>
	);

    return (
        routes
    )
}

export default UserManagement;