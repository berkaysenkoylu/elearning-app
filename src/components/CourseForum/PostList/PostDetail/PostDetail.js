import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './PostDetail.module.scss';
import Button from '../../../UI/Button/Button';
import PostCommentList from './PostCommentList/PostCommentList';
import CreatePostComment from '../PostDetail/PostCommentList/PostComment/CreatePostComment/CreatePostComment';

const PostDetail = (props) => {
    const [isPostComment, setIsPostComment] = useState(false);
    const [postData, setPostData] = useState({});

    useEffect(() => {
        setPostData(props.postData);
    }, [props.postData]);

    let timeout;

    useEffect(() => {
        return () => {
            clearTimeout(timeout);
        }
    }, [timeout]);

    const getPostCreateTimeDifference = (time) => {
        let now = (new Date()).getTime();
        let updateTime = (new Date(time)).getTime();
        let difference = parseInt((now - updateTime) / 3600000 * 60);
        let timeString = '';
        
        if(difference >= 60 && difference < 1440) {
            timeString += parseInt(difference / 60) + 'h';
        } else if(difference >= 1440) {
            timeString += parseInt(difference / 1440) + 'd';
        } else if(difference <= 0) {
            timeString = '<1m';
        } else {
            timeString = difference + 'm';
        }

        return timeString;
    }

    const formatPostCreatedDate = (time) => {
        let date = new Date(time);
        
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
    }

    const togglePostComment = (bool) => {
        timeout = setTimeout(() => {
            setIsPostComment(bool);
        }, 200);
    }

    const formSubmittedHandler = (data) => {
        const formData = {
            postId: props.postData._id,
            ...data
        };

        props.postCommentSubmit(formData);
        togglePostComment(false);
    }

    let pageContent = null;
    if (Object.prototype.hasOwnProperty.call(postData, '_id')) {
        pageContent = (
            <section className={classes.PostDetailContainer}>
                {isPostComment ? <CreatePostComment
                    postCommentEnabled={isPostComment}
                    cancelPostComment={togglePostComment}
                    formSubmitted={formSubmittedHandler}
                /> : null}

                <div className={classes.PostDetail}>
                    <div className={classes.PostDetail__Header}>
                        <div className={classes.PostDetail__Header__Title}>
                            <h2>
                                {props.postData.title}
                            </h2>
                            <span>
                                {props.postData.author.status !== 'admin' ? props.postData.author.firstName + ' ' + props.postData.author.lastName : props.postData.author.firstName}
                            </span>
                        </div>

                        <div className={classes.PostDetail__Header__TimeContainer}>
                            <span className={classes.PostDetail__Header__TimeContainer__Time}>
                                {getPostCreateTimeDifference(props.postData.createdAt)}
                            </span>

                            <span className={classes.PostDetail__Header__TimeContainer__Tooltip}>
                                {formatPostCreatedDate(props.postData.createdAt)}
                            </span>
                        </div>
                    </div>

                    <div className={classes.PostDetail__Body}>
                        {props.postData.content}
                    </div>

                    <div className={classes.PostDetail__Cta}>
                        { props.userId === props.postData.author._id ? <>
                            <Button
                                btnType='BtnDanger'
                                btnSize='BtnSmall'
                                clicked={() => props.postDeleted(props.postData._id)}>Delete</Button>
                            <Button
                                btnType='BtnSecondary'
                                btnSize='BtnSmall'
                                clicked={() => props.postEdited(props.postData._id)}>Edit</Button>
                        </> : null }
                        
                        <Button
                            btnType='BtnPrimary'
                            btnSize='BtnSmall'
                            clicked={() => togglePostComment(true)}>Reply</Button>
                    </div>
                </div>

                <div className={classes.PostComments}>
                    <h1>Comments</h1>

                    {props.postData.responses.length > 0 ?
                        <PostCommentList commentList={props.postData.responses} /> :
                        <span className={classes.PostComments__NoCom}>No comments posted yet!</span>}
                </div>

                <div className={classes.PostDetailContainer__Cta}>
                    <Button
                        btnType='BtnDanger'
                        btnSize='BtnSmall'
                        clicked={props.onBackButtonPressed}>Back</Button>
                </div>
            </section>
        );
    }

    return (
        <>
            {pageContent}
        </>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps, null)(PostDetail);