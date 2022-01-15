import React, { useState } from 'react';

import formValidation from '../../../../../utility/formValidation';
import classes from './CourseHome.module.scss';
import SectionItem from './SectionItem/SectionItem';
import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';
import Accordion from '../../../../UI/Accordion/Accordion';
import CourseInfo from '../../../../CourseInfo/CourseInfo';
import Select from '../../../../UI/Select/Select';

const CourseHome = props => {
    const [sectionNameFormCtrl, setSectionNameFormCtrl] = useState({
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Section Name'
        },
        label: "Section Name",
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        value: ''
    });
    const [courseActivities, setCourseActivities] = useState({
        'quiz': {
            'label': 'Quiz',
            'createLink': '/create-quiz',
            'selected': true
        },
        'questionnaire': {
            'label': 'Questionnaire',
            'createLink': '/create-questionnaire',
            'selected': false
        }
    })

    const courseData = props.courseData || {};
    
    const onSubSectionAddedHandler = (sectionId) => {
        props.history.push(props.match.url + `/${sectionId}/create-subsection`);
    }

    const inputChangedHandler = (event) => {
        const copiedFormControl = { ...sectionNameFormCtrl };

        copiedFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = formValidation(event.target.value, copiedFormControl.validation);
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        setSectionNameFormCtrl(copiedFormControl);
    }

    const onSectionAddHandler = () => {
        props.sectionAdded(sectionNameFormCtrl.value);
    }

    const onSelectChangedHandler = (label) => {
        const copiedCourseActivities = {...courseActivities};
        const keys = Object.keys(copiedCourseActivities);

        for (let i = 0; i < keys.length; i++) {
            let copiedActivity = {...copiedCourseActivities[keys[i]]};

            copiedActivity.selected = copiedActivity.label === label;

            copiedCourseActivities[keys[i]] = {...copiedActivity};
        }

        setCourseActivities(copiedCourseActivities);
    }

    const onActivityAdd = () => {
        let link = (Object.values(courseActivities).find(item => item.selected) || {}).createLink || '';

        props.history.push(props.match.url + link);
    }

    return (
        <section className={classes.CourseHome}>
            <header className={classes.CourseHome__Header}>
                <h1>{courseData.name || ''}</h1>
            </header>

            <CourseInfo landingData={courseData.landing || {}} />

            <Accordion label="Sections">
                <ul className={classes.CourseHome__SectionList__List}>
                    {courseData.sections.map(section => {
                        return <SectionItem
                            key={section._id}
                            sectionData={section}
                            subsectionAdded={onSubSectionAddedHandler}
                            subsectionDeleted={props.deletedSubsection}
                            subsectionEdited={props.editedSubsection}
                            sectionDeleted={props.deletedSection}
                        />;
                    })}
                </ul>

                <div className={classes.CourseHome__SectionList__Cta}>
                    <Input
                        elementType={sectionNameFormCtrl.elementType}
                        elementConfig={sectionNameFormCtrl.elementConfig}
                        label={sectionNameFormCtrl.label}
                        value={sectionNameFormCtrl.value}
                        touched={sectionNameFormCtrl.touched}
                        isValid={sectionNameFormCtrl.valid}
                        changed={(event) => inputChangedHandler(event)}
                    />

                    <Button
                        btnType='BtnPrimary'
                        btnSize='BtnSmall'
                        disabled={!sectionNameFormCtrl.valid}
                        clicked={onSectionAddHandler}>Add</Button>
                </div>
            </Accordion>

            <Accordion label="Course Activities">
                <div className={classes.CourseHome__Activities}>
                    <ul className={classes.CourseHome__Activities__List}>
                        <li>Quiz #1 - EDIT | DELETE</li>
                        <li>Questionnaire - EDIT | DELETE</li>
                    </ul>

                    <div className={classes.CourseHome__Activities__Cta}>
                        <Select data={courseActivities} selectChanged={onSelectChangedHandler} />

                        <Button
                            btnType='BtnPrimary'
                            btnSize='BtnSmall'
                            clicked={onActivityAdd}>Add</Button>
                    </div>
                </div>
                

                
            </Accordion>
        </section>
    )
}

export default CourseHome;