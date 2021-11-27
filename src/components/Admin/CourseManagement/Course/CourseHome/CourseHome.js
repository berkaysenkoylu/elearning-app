import React from 'react';

import classes from './CourseHome.module.scss';
import Button from '../../../../UI/Button/Button';
import Accordion from '../../../../UI/Accordion/Accordion';
import CourseInfo from '../../../../CourseInfo/CourseInfo';

const CourseHome = props => {
    const courseData = props.courseData || {};
    
    const onSectionClickedHandler = (sectionName) => {
        props.history.push(props.match.url + `/${sectionName}`)
    }

    const onSectionCreateHandler = () => {
        props.history.push(props.match.url + `/create-section`)
    }

    return (
        <section className={classes.CourseHome}>
            <header className={classes.CourseHome__Header}>
                <h1>{courseData.name || ''}</h1>
            </header>

            <CourseInfo landingData={courseData.landing || {}} />

            <Accordion label="Sections">
                <ul className={classes.CourseHome__SectionList__List}>
                    <li onClick={() => onSectionClickedHandler('section1')}>
                        Section 1

                        <span>&nbsp;</span>
                    </li>

                    <li>Section 2</li>
                </ul>

                <div className={classes.CourseHome__SectionList__Cta}>
                    <Button btnType='BtnPrimary' btnSize='BtnSmall' clicked={onSectionCreateHandler}>Create</Button>
                </div>
            </Accordion>
        </section>
    )
}

export default CourseHome;