import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './CourseSubSection.module.scss';
import Button from '../../UI/Button/Button';
import CourseSubSectionSidebar from '../CourseSubSectionSidebar/CourseSubSectionSidebar';

const CourseSubSection = (props) => {
    let subSectionData = props.subSectionData;
    // console.log(subSectionData)
    // console.log(((subSectionData || {}).content || [])[props.subSectionPageIndex] || 'END');

    return (
        <section className={classes.CourseSubSection}>
            <CourseSubSectionSidebar
                subSectionNavigationData={props.subSectionSideBarData}
                newSubSectionSelected={props.onNewSubSectionSelected}
            />

            <div className={classes.CourseSubSection__Content}>
                <header className={classes.CourseSubSection__Content__Header}>
                    <h1>{subSectionData.name}</h1>
                </header>

                <div dangerouslySetInnerHTML={{__html: ((subSectionData || {}).content || [])[props.subSectionPageIndex].index}}></div>

                <div className={classes.CourseSubSection__Content__Cta}>
                    <Button clicked={props.onBackClicked}>
                        <svg className={classes.CourseSubSection__ButtonIcon}>
                            <use xlinkHref={`${svg}#icon-arrow-thick-left`}></use>
                        </svg>
                    </Button>
                    
                    {props.showNext ? <Button clicked={props.onNextClicked}>
                        <svg className={classes.CourseSubSection__ButtonIcon}>
                            <use xlinkHref={`${svg}#icon-arrow-thick-right`}></use>
                        </svg>
                    </Button> : null}
                </div>
            </div>
        </section>
    );
}

export default CourseSubSection;