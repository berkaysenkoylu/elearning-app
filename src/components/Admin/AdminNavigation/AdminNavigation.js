import React from 'react';

import classes from './AdminNavigation.module.scss';
import AdminAccordionMenu from './AdminAccordionMenu/AdminAccordionMenu';
import { dashboardData } from '../../../assets/admin_dashborad_data';

const AdminNavigation = () => {
    return (
        <nav className={classes.AdminNavigation}>
            {dashboardData.map((dashboardItem, index) => {
                return <AdminAccordionMenu
                    key={index}
                    label={dashboardItem.name}
                    subItems={dashboardItem.subMenuItems}
                />;
            })}
        </nav>
    )
}

export default AdminNavigation;