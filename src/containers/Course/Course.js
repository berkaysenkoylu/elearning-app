import React, { Component, Fragment } from 'react';

import classes from './Course.module.scss';
import axiosCourse from '../../axiosUtility/axios-course';
import axiosForum from '../../axiosUtility/axios-forum';
import axiosPost from '../../axiosUtility/axios-post';
import CourseNavigation from '../../components/CourseNavigation/CourseNavigation';
import CourseInfo from '../../components/CourseInfo/CourseInfo';
import CourseForum from '../../components/CourseForum/CourseForum';
import CourseMenu from '../../components/CourseMenu/CourseMenu';
import CourseSection from '../../components/CourseSection/CourseSection';
import Quiz from '../../components/Quiz/QuizContainer';

class Course extends Component {
    state = {
        courseNavItems: [{
            name: 'Info',
            icon: 'library',
            active: true
        },
        {
            name: 'Course',
            icon: 'education',
            active: false
        },
        {
            name: 'Forums',
            icon: 'bubbles2',
            active: false
        }],
        courseData: {},
        courseForum: {},
        currentWeek: 0,
        sectionIndex: 0,
        currentPage: 0,
        isOnMainMenu: true,
        isOnQuizMode: false,
        isOnCreatePostMode: false
    }

    componentDidMount() {
        axiosCourse.get('/' + this.props.match.params.id).then(response => {
            return response.data.course;
        }).then(fetchedCourse => {
            this.setState({
                courseData: fetchedCourse
            });

            return axiosForum.get('/course/' + fetchedCourse._id);
        }).then(forumResp => {
            // console.log(forumResp.data.forum)

            this.setState({
                courseForum: forumResp.data.forum
            });
        }).catch(error => {
            console.log(error);

            this.props.history.push('/courses');
        });

        // TODO: REMOVE
        // const content = require('../../assets/course_poc.json');

        // this.setState({
        //     courseData: content
        // });
    }

    onNavigationItemClickedHandler = (index) => {
        let copiedCourseNavItems = [...this.state.courseNavItems];

        let modifiedCourseNavItems = copiedCourseNavItems.map((item, i) => {
            return {
                ...item,
                active: i === index
            };
        });

        this.setState(prevState => {
            return {
                ...prevState,
                courseNavItems: modifiedCourseNavItems
            }
        });
    }

    onQuizModeActivatedHandler = () => {
        this.setState({
            isOnMainMenu: false,
            isOnQuizMode: true
        });
    }

    onQuizExitedHandler = () => {
        this.setState({
            isOnMainMenu: true,
            isOnQuizMode: false
        });
    }

    onSectionSelectedHandler = (index) => {
        this.setState({
            isOnMainMenu: false
        });
    }

    onBackToMainMenuHandler = () => {
        this.setState({
            isOnMainMenu: true
        });
    }

    onCreatePostModeToggledHandler = (bool) => {
        this.setState({
            isOnCreatePostMode: bool
        });
    }

    onForumPostCreatedHandler = (data) => {
        let formData = {
            ...data,
            forumId: this.state.courseForum._id
        };

        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }

        console.log(formData);

        // this.setState({
        //     isOnCreatePostMode: false
        // });

        axiosPost.post('', formData, config).then(result => {
            console.log(result);

            return axiosForum.get('/course/' + this.state.courseData._id);
        }).then(newForumResponse => {
            this.setState({
                courseForum: newForumResponse.data.forum,
                isOnCreatePostMode: false
            });
        });
    }

    render() {
        let courseLandingData = (this.state.courseData || {}).landing || {};
        let activeNavigation = (this.state.courseNavItems.find(item => item.active) || {}).name;
        let section = ((this.state.courseData || {}).weeks || [])[this.state.sectionIndex] || {};
        let courseName = (this.state.courseData || {}).name;
        let courseQuiz = (this.state.courseData || {}).quiz;
        let courseIntro = (this.state.courseData || {}).introduction;
        let pageContent = null;
        
        switch(activeNavigation) {
            case 'Info':
                pageContent = <CourseInfo landingData={courseLandingData} />;
                break;
            case 'Course':
                pageContent = (
                    <div className={classes.Course}>
                        {this.state.isOnMainMenu ?
                            <CourseMenu
                                courseIntro={courseIntro}
                                onSectionSelect={this.onSectionSelectedHandler}
                                courseQuiz={courseQuiz._id}
                                onQuizModeActivated={this.onQuizModeActivatedHandler}
                            />
                        : !this.state.isOnQuizMode ?
                            <CourseSection
                                onBackToMainMenu={this.onBackToMainMenuHandler}
                                sectionData={section}
                            /> :
                            <Quiz
                                // quizId={courseQuiz}
                                quizData={courseQuiz}
                                onQuizExited={this.onQuizExitedHandler} />
                        }
                    </div>
                );
                break;
            case 'Forums':
                pageContent = <CourseForum 
                    createPostMode={this.state.isOnCreatePostMode}
                    toggleCreatePostMode={this.onCreatePostModeToggledHandler}
                    forumData={this.state.courseForum}
                    forumPostCreated={this.onForumPostCreatedHandler}
                />;
                break;
            default:
                break;
        }

        return (
            <Fragment>
                <h1 className={classes.Course__Title}>
                    {courseName}
                </h1>

                <CourseNavigation
                    navItemList={this.state.courseNavItems}
                    navigationItemClicked={this.onNavigationItemClickedHandler}
                />

                {pageContent}
            </Fragment>
        )
    }
}

export default Course;