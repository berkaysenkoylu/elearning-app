import React, { Component, Fragment } from 'react';

import classes from './Course.module.scss';
import CourseNavigation from '../../components/CourseNavigation/CourseNavigation';
import CourseInfo from '../../components/CourseInfo/CourseInfo';
import CourseForum from '../../components/CourseForum/CourseForum';
import CourseMenu from '../../components/CourseMenu/CourseMenu';
import CourseSection from '../../components/CourseSection/CourseSection';
import Quiz from '../../components/Quiz/QuizContainer';

// POC
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
        courseContent: {},
        currentWeek: 0,
        sectionIndex: 0,
        currentPage: 0,
        isOnMainMenu: true,
        isOnQuizMode: false
    }

    componentDidMount() {
        const content = require('../../assets/course_poc.json');

        this.setState({
            courseData: content
        });
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

    render() {
        let activeNavigation = (this.state.courseNavItems.find(item => item.active) || {}).name;
        let section = ((this.state.courseData || {}).weeks || [])[this.state.sectionIndex] || {};
        let courseName = (this.state.courseData || {}).name;
        let courseQuiz = (this.state.courseData || {}).quiz;
        let courseIntro = (this.state.courseData || {}).introduction;
        let pageContent = null;
        
        switch(activeNavigation) {
            case 'Info':
                pageContent = <CourseInfo />;
                break;
            case 'Course':
                pageContent = (
                    <div className={classes.Course}>
                        {this.state.isOnMainMenu ?
                            <CourseMenu
                                courseIntro={courseIntro}
                                onSectionSelect={this.onSectionSelectedHandler}
                                courseQuiz={courseQuiz}
                                onQuizModeActivated={this.onQuizModeActivatedHandler}
                            />
                        : !this.state.isOnQuizMode ?
                            <CourseSection
                                onBackToMainMenu={this.onBackToMainMenuHandler}
                                sectionData={section}
                            /> :
                            <Quiz
                                quizId={courseQuiz}
                                onQuizExited={this.onQuizExitedHandler} />
                        }
                    </div>
                );
                break;
            case 'Forums':
                pageContent = <CourseForum />;
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