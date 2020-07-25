import React from 'react';

import classes from './PostComment.module.scss';

const PostComment = (props) => {
    const commentData = props.commentData;

    return (
        <div className={classes.PostComment}>
            <div className={classes.PostComment__Header}>
                <span>{commentData.author.firstName + ' ' + commentData.author.lastName}</span>
                <span>{commentData.updatedAt}</span>
            </div>

            <div className={classes.PostComment__Content}>
                {commentData.index}
            </div>
        </div>
    )
}

export default PostComment;