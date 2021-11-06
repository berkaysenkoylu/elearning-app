import React, { useState, useEffect } from 'react';
import { Route, Switch} from 'react-router-dom';

import axiosAdmin from '../../../axiosUtility/axios-admin';
import AdminUserList from './AdminUserList/AdminUserList';
import CreateUser from './CreateUser/CreateUser';

const UserManagement = (props) => {
    const [userList, setUserList] = useState([]);
    const config = {
        headers: {
            'Authorization': 'Bearer ' + props.token
        }
    };

    useEffect(() => {
        axiosAdmin.get('/user', config).then(response => {
            setUserList(response.data.userList);
        });
    }, [config]);

    const onUserCreatedHandler = (userData) => {
        console.log(userData)
    }

    const onUserEdit = (userId) => {
        console.log(userId)
    }

    const onUserDeletedHandler = (userId) => {
        console.log(userId)
    }

    let routes = (
		<Switch>
            <Route path={props.match.url + '/user-management/edit-user/:id'} render={() => <div>EDIT USER</div>} />
            <Route path={props.match.url + '/user-management/create-user'} render={() => <CreateUser 
                userCreated={onUserCreatedHandler}/>} />
			<Route path={props.match.url} render={() => <AdminUserList
                userList={userList}
                userEdited={onUserEdit}
                userDeleted={onUserDeletedHandler} />} />
		</Switch>
	);

    return (
        routes
    );
}

export default UserManagement;