import React from 'react';

import classes from './UserPool.module.scss';
import UserItem from './UserItem/UserItem';

const UserPool = props => {
    return (
        <div className={classes.UserPool}>
            <h2>{props.title}</h2>

            <ul className={classes.UserPool__Body}>
                {props.userList.map(user => {
                    return <UserItem
                        key={user._id}
                        userData={user}
                        userSelect={() => props.userSelected(user._id)}
                    />;
                })}
            </ul>
        </div>
    );
}

export default UserPool;