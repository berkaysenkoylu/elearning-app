import React from 'react';

import classes from './AdminUserList.module.scss';
import Accordion from '../../../UI/Accordion/Accordion';
import AdminUserCard from './AdminUserCard/AdminUserCard';

// TODO: ADD MORE FIELD AND CUSTOM DESIGN
const AdminUserList = props => {
    return (
        <div className={classes.AdminUserList}>
            <header className={classes.AdminUserList__Header}>
                <h1>User List</h1>
            </header>

            <section>
                {(props.userList || []).map(user => {
                    return (
                        <Accordion 
                            key={user._id}
                            label={[user.firstName, user.lastName].join(' ')}>
                            <AdminUserCard
                                email={user.email}
                                status={user.status}
                                userEdit={() => props.userEdited(user)}
                                userDelete={() => props.userDeleted(user._id)}
                            />
                        </Accordion>
                    )
                })}
            </section>
        </div>
    )
}

export default AdminUserList;