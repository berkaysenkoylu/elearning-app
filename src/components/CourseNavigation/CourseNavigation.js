import React from 'react';

import classes from './CourseNavigation.module.scss';
import CourseNavigationItem from './CourseNavigationItem/CourseNavigationItem';

const CourseNavigation = (props) => {
    let navigationItems = props.navItemList;

    let content = navigationItems.map((item, i) => {
        return (<CourseNavigationItem
                key={i}
                iconName={item.icon}
                active={item.active}
                clicked={() => props.navigationItemClicked(i)}
            >
            {item.name}
        </CourseNavigationItem>);
    });

    return (
        <div className={classes.CourseNavigation}>
            {content}
        </div>
    )
}

export default CourseNavigation;