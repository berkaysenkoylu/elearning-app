import React, { Component, Fragment } from 'react';

import classes from './Course.module.scss';
import Loader from '../../components/Loader/Loader';
import axiosCourse from '../../axiosUtility/axios-course';
import axiosForum from '../../axiosUtility/axios-forum';
import axiosPost from '../../axiosUtility/axios-post';
import CourseNavigation from '../../components/CourseNavigation/CourseNavigation';
import CourseInfo from '../../components/CourseInfo/CourseInfo';
import CourseForum from '../../components/CourseForum/CourseForum';
import CourseMenu from '../../components/CourseMenu/CourseMenu';
import CourseSection from '../../components/CourseSection/CourseSection';
import Quiz from '../../components/Quiz/QuizContainer';
import Questionnaire from '../../components/Questionnaire/Questionnaire';

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
        isLoading: false,
        courseData: {},
        courseForum: {},
        currentWeek: 0,
        sectionIndex: 0,
        currentPage: 0,
        isOnMainMenu: true,
        isOnQuizMode: false,
        isOnCreatePostMode: false,
        isOnQuestionnaireMode: false
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        axiosCourse.get('/' + this.props.match.params.id).then(response => {
            this.setState({
                isLoading: false
            });
            return response.data.course;
        }).then(fetchedCourse => {
            this.setState({
                courseData: fetchedCourse
            });

            return axiosForum.get('/course/' + fetchedCourse._id);
        }).then(forumResp => {
            this.setState({
                courseForum: forumResp.data.forum
            });
        }).catch(error => {
            console.log(error);

            this.props.history.push('/courses');
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

    onCourseActivityEnabledHandler = (type) => {
        switch(type) {
            case 'quiz':
                this.setState({
                    isOnMainMenu: false,
                    isOnQuizMode: true
                });
                break;
            case 'questionnaire':
                this.setState({
                    isOnMainMenu: false,
                    isOnQuestionnaireMode: true
                });
                break;
            default:
                break;
        }
    }

    onCourseActivityExitedHandler = () => {
        this.setState({
            isOnMainMenu: true,
            isOnQuizMode: false,
            isOnQuestionnaireMode: false
        });
    }

    onSectionSelectedHandler = (index) => {
        this.setState({
            isOnMainMenu: false,
            sectionIndex: index
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
        };

        axiosPost.post('', formData, config).then(result => {
            console.log(result); // TODO: remove

            return axiosForum.get('/course/' + this.state.courseData._id);
        }).then(newForumResponse => {
            this.setState({
                courseForum: newForumResponse.data.forum,
                isOnCreatePostMode: false
            });
        });
    }

    onForumPostEditedHandler = (data) => {
        const formData = {
            title: data.title,
            content: data.content
        };

        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        axiosPost.put(`/${data.postId}`, formData, config).then(result => {
            console.log(result); // TODO: remove

            return axiosForum.get('/course/' + this.state.courseData._id);
        }).then(newForumResponse => {
            this.setState({
                courseForum: newForumResponse.data.forum,
                isOnCreatePostMode: false
            });
        }).catch(error => {
            console.log(error);
        });
    }

    onForumPostDeletedHandler = (postId) => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        axiosPost.delete(`/${postId}`, config).then(result => {
            console.log(result);

            const copiedCourseForum = { ...this.state.courseForum };

            let copiedCourseForumPosts = copiedCourseForum.posts.filter(post => post._id !== postId);

            copiedCourseForum.posts = [...copiedCourseForumPosts];

            this.setState(prevState => {
                return {
                    ...prevState,
                    courseForum: copiedCourseForum
                }
            });
        }).catch(error => {
            console.log(error.response.data.message);
        });        
    }

    onForumPostRespondedHandler = (formData) => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        axiosPost.put(`/respond/${formData.postId}`, { index: formData.index }, config).then(response => {
            return axiosForum.get('/course/' + this.state.courseData._id);
        }).then(newForumResponse => {
            this.setState({
                courseForum: newForumResponse.data.forum
            });
        }).catch(error => {
            // TODO:: A Better error feedback should be implemented
            console.log(error.response.data.message);
        })
    }

    render() {
        let sections = (this.state.courseData || {}).sections || [];
        let courseLandingData = (this.state.courseData || {}).landing || {};
        let activeNavigation = (this.state.courseNavItems.find(item => item.active) || {}).name;
        let section = sections[this.state.sectionIndex] || {};
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
                                courseSections={sections}
                                onSectionSelect={this.onSectionSelectedHandler}
                                courseQuiz={courseQuiz._id}
                                onCourseActivityEnabled={this.onCourseActivityEnabledHandler}
                            />
                        : !this.state.isOnQuizMode ?
                            !this.state.isOnQuestionnaireMode ?
                                <CourseSection
                                    onBackToMainMenu={this.onBackToMainMenuHandler}
                                    sectionData={section}
                                /> :
                                <Questionnaire
                                    onQuestionnaireExited={this.onCourseActivityExitedHandler}
                                    />
                            :
                            <Quiz
                                quizData={courseQuiz}
                                onQuizExited={this.onCourseActivityExitedHandler} />
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
                    forumPostEdited={this.onForumPostEditedHandler}
                    onPostDeleted={this.onForumPostDeletedHandler}
                    postCommentSubmitted={this.onForumPostRespondedHandler}
                />;
                break;
            default:
                break;
        }

        let coursePageContent = (
            <span className={classes.Course__Loader}>
                <Loader strokeWidth={4} />
            </span>
        );

        if (!this.state.isLoading) {
            coursePageContent = (
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
            );
        }

        return (
            <>
                {coursePageContent}
            </>
        );
    }
}

export default Course;