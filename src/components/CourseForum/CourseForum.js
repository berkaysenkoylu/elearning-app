import React, { useState, useEffect } from 'react';

import classes from './CourseForum.module.scss';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostList/PostList';
import PostDetail from './PostList/PostDetail/PostDetail';
import Button from '../UI/Button/Button';
import Paginator from '../Paginator/Paginator';

const CourseForum = () => {
    const [paginationState, setPaginationState] = useState({
        perPage: 3,
        pageCount: 2,
        currentPage: 0,
        hasNextPage: true,
        hasPrevPage: false,
        startIndex: 0,
        endIndex: 0
    });
    const [createPostMode, setCreatePostMode] = useState(false);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const forumData = require('../../assets/course_forum_poc.json');
    const forumPostList = (forumData || {}).postList || [];

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
        let selectedPost = forumPostList.find(post => post.id === postId);

        setSelectedPost(selectedPost);
        setShowPostDetail(true);
    }

    const onBackButtonPressedHandler = () => {
        setSelectedPost(null);
        setShowPostDetail(false);
    }

    const onCreatePostPressedHandler = () => {
        setCreatePostMode(true);
    }

    const onCreatePostCancelledHandler = () => {
        setCreatePostMode(false);
    }

    let pageContent = !showPostDetail ? (<>
        {!createPostMode ? <>
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
            createPostCancel={onCreatePostCancelledHandler}
        />}
        </>) : 
        <PostDetail
            postData={selectedPost}
            onBackButtonPressed={onBackButtonPressedHandler}
        />;

    return (
        <section className={classes.CourseForum}>
            {pageContent}
        </section>
    )
}

export default CourseForum;