import React from 'react';

import classes from './ListElement.module.scss';

const ListElement = props => {
    return (
        <li className={classes.ListElement}>
            {props.children}
        </li>
    )
}

export default ListElement;