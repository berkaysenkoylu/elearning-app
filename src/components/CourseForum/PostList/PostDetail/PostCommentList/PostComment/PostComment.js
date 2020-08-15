import React from 'react';

import classes from './PostComment.module.scss';

const PostComment = (props) => {
    const commentData = props.commentData;

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

    return (
        <div className={classes.PostComment}>
            <div className={classes.PostComment__Header}>
                <span>{commentData.author.firstName + ' ' + commentData.author.lastName}</span>
                <span>{getPostCreateTimeDifference(commentData.updatedAt)}</span>
            </div>

            <div className={classes.PostComment__Content}>
                {commentData.index}
            </div>
        </div>
    )
}

export default PostComment;