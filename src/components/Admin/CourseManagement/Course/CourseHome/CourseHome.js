import React from 'react';

import classes from './CourseHome.module.scss';
import Accordion from '../../../../UI/Accordion/Accordion';

const CourseHome = props => {
    
    const onSectionClickedHandler = (sectionName) => {
        props.history.push(props.match.url + `/${sectionName}`)
    }

    return (
        <section className={classes.CourseHome}>
            <header className={classes.CourseHome__Header}>
                <h1>Course Page</h1>
            </header>

            <Accordion label="Introduction">
                <div className={classes.CourseHome__Introduction}>
                    Introduction form control will be here
                    {/* <header className={classes.Course__Header}>
                        <h2>Introduction</h2>
                    </header> */}

                    {/* <Input /> */} &nbsp;
                </div>
            </Accordion>

            <div className={classes.CourseHome__SectionList}>
                <h2>Course Sections</h2>

                {/* TODO: Can we also use accordion here..? */}
                <ul className={classes.CourseHome__SectionList__List}>
                    <li onClick={() => onSectionClickedHandler('section1')}>
                        Section 1

                        <span>&nbsp;</span>
                    </li>

                    <li>Section 2</li>
                </ul>
            </div>
        </section>
    )
}

export default CourseHome;