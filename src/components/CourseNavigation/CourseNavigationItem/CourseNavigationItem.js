import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './CourseNavigationItem.module.scss';

const CourseNavigationItem = (props) => {
    let classList = [classes.CourseNavigationItem];

    if (props.active) {
        classList = [classes.CourseNavigationItem, classes.CourseNavigationItem__Active];
    } else {
        classList = [classes.CourseNavigationItem];
    }

    return (
        <div className={classList.join(' ')} onClick={props.clicked}>
            <svg className={classes.CourseNavigationItem__Icon}>
                <use xlinkHref={`${svg}#icon-${props.iconName}`}></use>
            </svg>

            <span className={classes.CourseNavigationItem__Text}>
                {props.children}
            </span>
        </div>
    )
}

export default CourseNavigationItem;