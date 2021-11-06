import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import axiosAdmin from '../../../axiosUtility/axios-admin';
import AdminUserList from './AdminUserList/AdminUserList';
import CreateUser from './CreateUser/CreateUser';

const UserManagement = (props) => {
    const [userList, setUserList] = useState([]);
    const [userToEdit, setUserToEdit] = useState({});
    const history = useHistory();

    useEffect(() => {
        axiosAdmin.get('/user', {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(response => {
            setUserList(response.data.userList);
        });
    }, [props.token]);

    const onUserCreatedHandler = (userData) => {
        axiosAdmin.post(`/user`, userData, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(response => {
            const responseData = response.data || {};

            if (responseData.isCreated) {
                const newUserList = userList.concat(responseData.user);

                setUserList(newUserList);

                history.push(props.match.url + '/user-management');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const onUserEditedHandler = (editedUserData) => {
        axiosAdmin.put(`/user/${editedUserData._id}`, editedUserData, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(response => {
            if (response.data.isEdited) {
                const copiedUserList = userList.map(user => {
                    if (user._id === editedUserData._id) {
                        return {
                            ...response.data.newUserData
                        };
                    }

                    return user
                });

                setUserList(copiedUserList);

                history.push(props.match.url + '/user-management');
            }
        });
    }

    const onUserDeletedHandler = (userId) => {
        axiosAdmin.delete(`/user/${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(response => {
            const responseData = response.data || {};

            if (responseData.isDeleted || false) {
                const copiedUserList = userList.filter(user => user._id !== responseData.removedUserId);

                setUserList(copiedUserList);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const onUserEdit = (userToEdit) => {
        history.push(props.match.url + `/user-management/edit-user/${userToEdit._id}`)

        setUserToEdit(userToEdit);
    }

    let routes = (
		<Switch>
            <Route path={props.match.url + '/user-management/edit-user/:id'} render={() =>
                <CreateUser
                    savedUserData={userToEdit}
                    userEdited={onUserEditedHandler}
                />} />
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