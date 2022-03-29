import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';

// import classes from './Course.module.scss';
import axiosAdmin from '../../../../axiosUtility/axios-admin';
import CourseHome from './CourseHome/CourseHome';
import CreateSubSection from './CreateSubSection/CreateSubSection';
import CreateQuiz from '../Course/CourseActivities/CreateQuiz/CreateQuiz';
import CreateQuestionnaire from './CourseActivities/CreateQuestionnaire/CreateQuestionnaire';

// TODO: Instead of using state management here, move all the logic to its parent component
const Course = props => {
    const [subSectionToEdit, setSubSectionToEdit] = useState({});
    const config = {
        headers: {
            'Authorization': 'Bearer ' + props.token
        }
    };
    const history = useHistory();

    const timeout = useRef();

    // useEffect(() => {
    //     setCourseData(props.courseData);
    // }, [props.courseData]);

    useEffect(() => {
        timeout.current = null;
        return () => {
            clearTimeout(timeout.current);
        }
    }, [])

    const onSectionAddedHandler = (sectionName) => {
        axiosAdmin.post(`/section`, {
            courseId: props.courseData._id,
            name: sectionName
        }, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isSectionAdded) {
                props.courseListUpdated(responseData.newCourseData);
            }
        });
    }

    const onSectionDeletedHandler = (sectionId) => {
        axiosAdmin.delete(`/section/${sectionId}`, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isSectionDeleted) {
                // props.courseListUpdated(responseData.newCourseData);
                let copiedCourseData = { ...props.courseData };
                let deletedSectionId = (responseData.result || {})._id || '';
                let copiedCourseSections = [ ...copiedCourseData.sections ];
                let newSections =  copiedCourseSections.filter(section => section._id !== deletedSectionId);

                copiedCourseData.sections = [...newSections];

                props.courseListUpdated(copiedCourseData);
            }
        });
    }

    const courseSectionDataChangedHandler = (newSectionData) => {
        let copiedCourseData = { ...props.courseData };

        let copiedCourseSections = [ ...copiedCourseData.sections ];
        let newSections =  copiedCourseSections.map(section => {
            if (section._id === newSectionData._id) {
                section = {...newSectionData};
            }

            return section;
        });

        copiedCourseData.sections = [...newSections];

        return copiedCourseData;
    }

    const onSubsectionDeletedHandler = (subsectionId) => {
        axiosAdmin.delete(`/section/subsection/${subsectionId}`, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isSubSectionDeleted) {
                props.courseListUpdated(courseSectionDataChangedHandler(responseData.newSectionData));
            }
        });
    }

    const onSubsectionEdit = (data) => {
        const subSectionToEdit = ((props.courseData.sections.find(section => section._id === data.section) ||
            {}).subsections || []).find(subsection => subsection._id === data.subsection) || {};

        setSubSectionToEdit(subSectionToEdit);

        history.push(props.match.url + `/${data.section}/edit-subsection/${data.subsection}`);
    }

    const onSubSectionEditedHandler = (data) => {
        axiosAdmin.put(`/section/subsection/${data.subsection}`, data, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isSubSectionEdited) {
                props.courseListUpdated(courseSectionDataChangedHandler(responseData.newSectionData));

                props.history.push(props.match.url + `/course-management/${props.courseData._id}`);
            }
        });
    }

    const onSubSectionCreatedHandler = (data) => {
        axiosAdmin.post(`/section/${data.section}/add-subsection`, {
            ...data
        }, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isSubSectionAdded) {
                // let newSectionData = responseData.newSectionData;

                props.courseListUpdated(courseSectionDataChangedHandler(responseData.newSectionData))

                // let copiedCourseData = { ...props.courseData };

                // let copiedCourseSections = [ ...copiedCourseData.sections ];
                // let newSections =  copiedCourseSections.map(section => {
                //     if (section._id === newSectionData._id) {
                //         section = {...newSectionData};
                //     }

                //     return section;
                // });

                // copiedCourseData.sections = [...newSections];

                // props.courseListUpdated(copiedCourseData)

                // setCourseData(copiedCourseData);

                props.history.push(props.match.url + `/course-management/${props.courseData._id}`);
            }
        });
    }

    const onCourseActivityCreatedHandler = (activityType, data) => {
        let requestUrl = '';

        switch (activityType) {
            case 'quiz':
                requestUrl = '/quiz';
                break;
            case 'questionnaire':
                requestUrl = '/questionnaire';
                break;
            default:
                break;
        }

        let courseId = props.courseData._id;

        if (typeof data.append !== 'undefined') {
            data.append('courseId', courseId);
        } else {
            data['courseId'] = courseId;
        }

        axiosAdmin.post(requestUrl, data, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isAdded) {
                props.courseActivityAdded(responseData.newCourseData);

                props.history.push(props.match.url + `/course-management/${props.courseData._id}`);
            }
        }).catch(error => {
            console.log(error)
        });
    }

    const onCourseActivityEditedHandler = (activityType, data) => {
        let requestUrl = '';

        // console.log(data.get('quizId'))

        switch (activityType) {
            case 'quiz':
                requestUrl = '/quiz/' + data.get('quizId');
                break;
            case 'questionnaire':
                requestUrl = '/questionnaire/' + data.get('questionnaireId');
                break;
            default:
                break;
        }

        axiosAdmin.put(requestUrl, data, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isEdited) {
                props.courseActivityEdited(responseData.newCourseData);

                props.history.push(props.match.url + `/course-management/${props.courseData._id}`);
            }
        }).catch(error => {
            console.log(error)
        });
    }

    const onCourseActivityDeletedHandler = (activityType, id) => {
        let requestUrl = '';

        switch (activityType) {
            case 'quiz':
                requestUrl = '/quiz/' + id;
                break;
            case 'questionnaire':
                requestUrl = '/questionnaire/' + id;
                break;
            default:
                break;
        }

        axiosAdmin.delete(requestUrl, config).then(response => {
            const responseData = response.data || {};

            if (responseData.isDeleted) {
                props.courseListUpdated(responseData.newCourseData);
            }
        }).catch(error => {
            console.log(error)
        });
    }

    const routes = (
        <Switch>
            <Route path={props.match.url + '/edit-questionnaire/:questionnaireId'} render={() => <CreateQuestionnaire
                currentQuestionnaireData={(props.courseData || {}).questionnaire || {}}
                onQuestionnaireEdited={(questionnaireData) => onCourseActivityEditedHandler('questionnaire', questionnaireData)}
            />} />
            <Route path={props.match.url + '/create-questionnaire'} render={() => <CreateQuestionnaire
                currentQuestionnaireData={undefined}
                onQuestionnaireCreated={(questionnaireData) => onCourseActivityCreatedHandler('questionnaire', questionnaireData) }
            />} />
            <Route path={props.match.url + '/edit-quiz/:quizId'} render={() => <CreateQuiz
                currentQuizData={(props.courseData || {}).quiz || {}}
                onQuizEdited={(quizData) => onCourseActivityEditedHandler('quiz', quizData)} />} />
            <Route path={props.match.url + '/create-quiz'} render={() => <CreateQuiz
                currentQuizData={undefined}
                onQuizCreated={(quizData) => onCourseActivityCreatedHandler('quiz', quizData) } />} />
            <Route path={props.match.url + '/:sectionId/edit-subsection/:subsectionId'} render={() => <CreateSubSection
                savedSubSectionData={subSectionToEdit}
                editedSubSection={onSubSectionEditedHandler} />}
            />
            <Route path={props.match.url + '/:sectionId/create-subsection'} render={() => <CreateSubSection
                sectionList={props.courseData.sections}
                createdSubSection={onSubSectionCreatedHandler} />}
            />
            {/* <Route path={props.match.url + '/:sectionName'} render={() => <span>Section Management</span>} /> */}
            <Route path={props.match.url + '/'} render={() => <CourseHome
                sectionAdded={onSectionAddedHandler}
                deletedSection={onSectionDeletedHandler}
                deletedSubsection={onSubsectionDeletedHandler}
                editedSubsection={onSubsectionEdit}
                courseData={props.courseData}
                courseActivityDeleted={onCourseActivityDeletedHandler}
                {...props} />}
            />
		</Switch>
    )

    return (
        routes
    )
}

export default withRouter(Course);