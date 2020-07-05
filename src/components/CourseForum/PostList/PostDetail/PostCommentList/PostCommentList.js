import React from 'react';

import classes from './PostCommentList.module.scss';
import PostComment from './PostComment/PostComment';

const PostCommentList = ({ commentList }) => {
    return (
        <div className={classes.PostCommentList}>
            {commentList.sort((c1, c2) => (new Date(c2.updatedAt)).getTime() - (new Date(c1.updatedAt).getTime())).map((comment, i) => {
                return <PostComment
                    key={i}
                    commentData={comment}
                />
            })}
        </div>
    )
}

export default PostCommentList;