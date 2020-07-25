import React from 'react';

import classes from './PostDetail.module.scss';
import Button from '../../../UI/Button/Button';
import PostCommentList from './PostCommentList/PostCommentList';

const PostDetail = (props) => {
    const postData = props.postData;

    // console.log(postData);

    return (
        <section className={classes.PostDetailContainer}>
            <div className={classes.PostDetail}>
                <div className={classes.PostDetail__Header}>
                    <div className={classes.PostDetail__Header__Title}>
                        <h2>
                            {postData.title}
                        </h2>
                        <span>
                            {postData.author.status !== 'admin' ? postData.author.firstName + ' ' + postData.author.lastName : postData.author.firstName}
                        </span>
                    </div>

                    <div className={classes.PostDetail__Header__Time}>
                        {postData.updatedAt}
                    </div>
                </div>

                <div className={classes.PostDetail__Body}>
                    {postData.content}
                </div>

                <div className={classes.PostDetail__Cta}>
                    <Button
                        btnType='BtnDanger'
                        btnSize='BtnSmall'>Delete</Button>
                    <Button
                        btnType='BtnSecondary'
                        btnSize='BtnSmall'>Edit</Button>
                    <Button
                        btnType='BtnPrimary'
                        btnSize='BtnSmall'>Reply</Button>
                </div>
            </div>

            <div className={classes.PostComments}>
                <h1>Comments</h1>

                {postData.responses.length > 0 ?
                    <PostCommentList commentList={postData.responses} /> :
                    <span className={classes.PostComments__NoCom}>No comments posted yet!</span>}
            </div>

            <div className={classes.PostDetailContainer__Cta}>
                <Button
                    btnType='BtnDanger'
                    btnSize='BtnSmall'
                    clicked={props.onBackButtonPressed}>Back</Button>
            </div>
        </section>
    )
}

export default PostDetail;