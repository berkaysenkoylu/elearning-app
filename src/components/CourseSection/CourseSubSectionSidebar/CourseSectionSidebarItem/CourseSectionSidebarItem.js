import React from 'react';

import classes from './CourseSectionSidebarItem.module.scss';
import svg from '../../../../assets/images/sprite.svg';

const CourseSectionSidebarItem = props => {
    let data = props.data;
    let listContent = data.contentTitleArr.map((subsubsection, index) => {
        return <li key={subsubsection}>
            <span onClick={() => {props.onSubSubSectionClicked(index)}}>{subsubsection}</span>

            {props.currentActive === index && props.isSectionActive ?
                <svg className={classes.CourseSectionSidebarItem__List__Icon}>
                    <use xlinkHref={`${svg}#icon-arrow-thick-left`}></use>
                </svg> : null}
        </li>;
    });

    return (
        <div className={classes.CourseSectionSidebarItem}>
            <div className={classes.CourseSectionSidebarItem__Main} style={props.isSectionActive ? {'fontWeight': '700'} : {}}>
                {data.name}
            </div>

            <ul className={classes.CourseSectionSidebarItem__List}>
                {listContent}
            </ul>
        </div>
    );
}

export default CourseSectionSidebarItem;