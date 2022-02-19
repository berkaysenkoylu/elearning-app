import React, { useState, useEffect } from 'react';

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
            'selected': true,
            'alreadyExists': typeof props.courseData.quiz !== 'undefined'
        },
        'questionnaire': {
            'label': 'Questionnaire',
            'createLink': '/create-questionnaire',
            'selected': false,
            'alreadyExists': typeof props.courseData.questionnaire !== 'undefined'
        }
    });

    useEffect(() => {
        let copiedCourseActivities = { ...courseActivities };
        let copiedQuizData = copiedCourseActivities.quiz;
        let copiedQuestionnaireData = copiedCourseActivities.questionnaire;

        copiedQuizData.alreadyExists = typeof props.courseData.quiz !== 'undefined';
        copiedQuestionnaireData.alreadyExists = typeof props.courseData.questionnaire !== 'undefined';

        copiedCourseActivities.quiz = { ...copiedQuizData };
        copiedCourseActivities.questionnaire = { ...copiedQuestionnaireData };

        setCourseActivities(copiedCourseActivities);
        // eslint-disable-next-line
    }, [props.courseData])

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

    const onCourseActivityEdit = (activityName, activityId) => {
        // console.log(`The activity: ${activityName} with the id: ${activityId} is gonna be edited.`)

        props.history.push(props.match.url + `/edit-${activityName}/${activityId}`);
    }

    const onCourseActivityDelete = (activityName, activityId) => {
        props.courseActivityDeleted(activityName, activityId);
    }

    const onUserEnroll = () => {
        props.history.push(props.match.url + '/user-enrollment');
    }

    let courseActivityContent = (
        <span>No course activity has been added yet!</span>
    );

    if (typeof courseData.quiz !== 'undefined' || typeof courseData.questionnaire !== 'undefined') {
        courseActivityContent = (
            <ul className={classes.CourseHome__Activities__List}>
                { typeof courseData.quiz !== 'undefined' ?
                    <li>
                        {courseData.quiz.name}

                        <button onClick={() => onCourseActivityEdit('quiz', courseData.quiz._id)}>Edit</button>
                        <button onClick={() => onCourseActivityDelete('quiz', courseData.quiz._id)}>Delete</button>
                    </li> : null }
                
                { typeof courseData.questionnaire !== 'undefined' ?
                    <li>
                        {courseData.questionnaire.name}

                        <button>Edit</button>
                        <button>Delete</button>
                    </li> : null }
            </ul>
        )
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
                    {courseActivityContent}

                    <div className={classes.CourseHome__Activities__Cta}>
                        <Select data={courseActivities} selectChanged={onSelectChangedHandler} />

                        <Button
                            btnType='BtnPrimary'
                            btnSize='BtnSmall'
                            clicked={onActivityAdd}>Add</Button>
                    </div>
                </div>
            </Accordion>

            <Accordion label="User Enrollment">
                <div className={classes.CourseHome__UserEnrollment}>
                    {`There are currently ${courseData.enrolledUsers.length} users in this course.`}

                    <div className={classes.CourseHome__UserEnrollment__Cta}>
                        <Button
                            btnType='BtnPrimary'
                            btnSize='BtnSmall'
                            clicked={onUserEnroll}>Enroll Users</Button>
                    </div>
                </div>
            </Accordion>
        </section>
    )
}

export default CourseHome;