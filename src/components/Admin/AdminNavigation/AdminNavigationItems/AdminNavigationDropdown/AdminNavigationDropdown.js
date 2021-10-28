import React, { useState } from 'react';

import classes from './AdminNavigationDropdown.module.scss';
import AdminNavigationItem from '../AdminNavigationItem/AdminNavigationItem';

const AdminNavigationDropdown = props => {
    const [classList, setClassList] = useState([classes.AdminNavigationDropdown__Menu]);

    const onMenuToggled = () => {
        if (classList.length > 1) {
            setClassList(prevState => prevState.slice(0, -1));
        } else {
            setClassList(prevState => prevState.concat(classes.AdminNavigationDropdown__Menu__Opened));
        }
    }

    return (
        <div className={classes.AdminNavigationDropdown}>
            <header onClick={onMenuToggled}>{props.label}</header>

            <ul className={classList.join(' ')}>
                {props.dropdownItems.map((dropDownItem, index) => {
                    return <AdminNavigationItem
                        key={dropDownItem.name + index}
                        to={props.match.url + dropDownItem.path}
                        exact={dropDownItem.isExact}>{dropDownItem.name}</AdminNavigationItem>
                })}
            </ul>
        </div>
    )
}

export default AdminNavigationDropdown;