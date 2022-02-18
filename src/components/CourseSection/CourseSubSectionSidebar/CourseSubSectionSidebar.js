import React from 'react';

import classes from './CourseSubSectionSidebar.module.scss';
import CourseSectionSidebarItem from './CourseSectionSidebarItem/CourseSectionSidebarItem';

const CourseSubSectionSidebar = props => {
    let contentData = props.subSectionNavigationData;

    console.log(contentData)

    const onSubSubSectionClickedHandler = (subsubSectionIndex, activeSubSectionIndex) => {
        props.newSubSectionSelected([activeSubSectionIndex, subsubSectionIndex]);
    }

    let content = contentData.subSectionMap.map((section, index) => {
        return <CourseSectionSidebarItem
            key={section.id}
            data={section}
            isSectionActive={contentData.subSectionIndex === index}
            currentActive={contentData.subSectionPageIndex}
            onSubSubSectionClicked={(subsubSectionIndex) => onSubSubSectionClickedHandler(subsubSectionIndex, index)}
        />;
    });

    return (
        <div className={classes.CourseSubSectionSidebar}>
            {content}
        </div>
    );
}

export default CourseSubSectionSidebar;