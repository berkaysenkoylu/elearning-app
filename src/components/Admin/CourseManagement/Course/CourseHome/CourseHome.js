import React, { useState } from 'react';

import formValidation from '../../../../../utility/formValidation';
import classes from './CourseHome.module.scss';
import SectionItem from './SectionItem/SectionItem';
import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';
import Accordion from '../../../../UI/Accordion/Accordion';
import CourseInfo from '../../../../CourseInfo/CourseInfo';

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

    const courseData = props.courseData || {};
    
    const onSubSectionAddedHandler = (sectionId) => {
        console.log(sectionId)
        props.history.push(props.match.url + `/${sectionId}/create-subsection`)
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
        </section>
    )
}

export default CourseHome;