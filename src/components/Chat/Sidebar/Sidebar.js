import React from 'react'

import classes from './Sidebar.module.scss';
// import UserItem from './UserItem/UserItem';

const Sidebar = React.memo(props => {
    return (
        <div className={classes.Sidebar}>
            THIS IS THE SIDEBAR
        </div>
    )
})

export default Sidebar;