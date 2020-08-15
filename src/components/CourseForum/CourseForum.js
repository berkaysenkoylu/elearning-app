import React, { useState, useEffect } from 'react';

import classes from './CourseForum.module.scss';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import PostDetail from './PostList/PostDetail/PostDetail';
import Button from '../UI/Button/Button';
import Paginator from '../Paginator/Paginator';

const CourseForum = (props) => {
    // const [courseForumData, setCourseForumData] = useState({});
    const [paginationState, setPaginationState] = useState({
        perPage: 3,
        pageCount: 2,
        currentPage: 0,
        hasNextPage: true,
        hasPrevPage: false,
        startIndex: 0,
        endIndex: 0
    });
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isPostEditMode, setIsPostEditMode] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);

    // const forumData = require('../../assets/course_forum_poc.json');
    // const forumPostList = (forumData || {}).postList || [];
    const forumPostList = props.forumData.posts || [];

    // console.log(props.forumData)

    // useEffect(() => {
    //     console.log(props.forumData);

    //     setCourseForumData(props.forumData);
    // }, [props.forumData]);

    useEffect(() => {
        // Initial state
        setPaginationState({
            perPage: 3,
            pageCount: Math.floor((forumPostList.length / 3)) + ((forumPostList.length % 3 === 0) ? 0 : 1),
            currentPage: 0,
            hasNextPage: 3 * 1 < forumPostList.length,
            hasPrevPage: false,
            startIndex: 0,
            endIndex: 3
        });
    }, [forumPostList.length]);
    
    const onPaginationChangeHandler = (paginationData) => {
        // console.log(paginationData); // TODO REMOVE
        
        let currentPage = paginationData.currentPage;
        let hasNextPage = paginationData.perPage * (paginationData.currentPage + 1) < forumPostList.length;
        let hasPrevPage = paginationData.currentPage > 0;
        let startIndex = paginationData.currentPage * paginationData.perPage;
        let endIndex = startIndex + paginationData.perPage >= forumPostList.length ? forumPostList.length : startIndex + paginationData.perPage;

        setPaginationState(prevState => {
            return {
                ...prevState,
                currentPage,
                hasPrevPage,
                hasNextPage,
                startIndex,
                endIndex
            }
        })
    }

    const onPostSelectedHandler = (postId) => {
        let selectedPost = forumPostList.find(post => post._id === postId);

        setSelectedPost(selectedPost);
        setShowPostDetail(true);
    }

    const onBackButtonPressedHandler = () => {
        setSelectedPost(null);
        setShowPostDetail(false);
    }

    const onCreatePostPressedHandler = () => {
        setPostToEdit(null);
        setIsPostEditMode(false);
        props.toggleCreatePostMode(true);
    }

    const onCreatePostCancelledHandler = () => {
        props.toggleCreatePostMode(false);
    }

    const onCreatePostHandler = (data) => {
        props.forumPostCreated(data);
    }

    const onEditPostHandler = (data) => {
        props.forumPostEdited({ ...data, postId: postToEdit._id });
    }

    const onPostDeleted = (postId) => {
        props.onPostDeleted(postId);

        setSelectedPost(null);
        setShowPostDetail(false);
    }

    const onPostEdit = (postId) => {
        let editPost = forumPostList.find(post => post._id === postId);

        // TODO: I may have to change this
        if (typeof editPost !== 'undefined') {
            setSelectedPost(null);
            setShowPostDetail(false);
            setPostToEdit(editPost);
            setIsPostEditMode(true);
            props.toggleCreatePostMode(true);
        }
    }

    let pageContent = !showPostDetail ? (<>
        {!props.createPostMode ? <>
            <PostList
                postList={forumPostList.slice(paginationState.startIndex, paginationState.endIndex)}
                onPostSelected={onPostSelectedHandler}
            />

            <div className={classes.CourseForum__Cta}>
                <Button clicked={onCreatePostPressedHandler}>Create a Post</Button>

                <Paginator 
                    itemPerPage={[3, 5, 10]}
                    maxItemCount={forumPostList.length}
                    pagination={onPaginationChangeHandler}
                    currentPage={paginationState.currentPage}
                    hasNextPage={paginationState.hasNextPage}
                    hasPrevPage={paginationState.hasPrevPage}
                />
            </div>
        </> : <CreatePost 
            createPost={onCreatePostHandler}
            createPostCancel={onCreatePostCancelledHandler}
            isEditMode={isPostEditMode}
            editFormFields={postToEdit}
            editPost={onEditPostHandler}
        />}
        </>) : 
        <PostDetail
            postData={selectedPost}
            onBackButtonPressed={onBackButtonPressedHandler}
            postDeleted={onPostDeleted}
            postEdited={onPostEdit}
        />;

    return (
        <section className={classes.CourseForum}>
            {pageContent}
        </section>
    )
}

export default CourseForum;