import React, { useState, useEffect } from 'react';
import { Route, Switch} from 'react-router-dom';

import axiosAdmin from '../../../axiosUtility/axios-admin';
import AdminUserList from './AdminUserList/AdminUserList';

const CONFIG = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
};

const UserManagement = (props) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axiosAdmin.get('/user', CONFIG).then(response => {
            setUserList(response.data.userList);
        });
    }, []);

    let routes = (
		<Switch>
            <Route path={props.match.url + '/edit-user/:id'} render={() => <div>EDIT USER</div>} />
            <Route path={props.match.url + '/create-user'} render={() => <div>CREATE USER</div>} />
			<Route path={props.match.url} render={() => <AdminUserList userList={userList} />} />
		</Switch>
	);

    return (
        routes
    )
}

export default UserManagement;