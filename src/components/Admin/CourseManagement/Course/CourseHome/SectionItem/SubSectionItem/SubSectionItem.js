import React from 'react';

import classes from './SubSectionItem.module.scss';

const SubSectionItem = props => {
    return (
        <li className={classes.SubSectionItem}>
            <span className={classes.SubSectionItem__Name}>{props.name}</span>

            <span className={classes.SubSectionItem__Cta}>
                <button>Edit</button>

                <button>Delete</button>
            </span>
        </li>
    )
}

export default SubSectionItem;