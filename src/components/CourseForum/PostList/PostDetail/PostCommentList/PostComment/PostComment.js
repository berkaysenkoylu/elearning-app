import React from 'react';

import classes from './PostComment.module.scss';
import AuthorInfo from '../../AuthorInfo/AuthorInfo';

const PostComment = (props) => {
    const commentData = props.commentData;
    const authorData = commentData.author;

    console.log(commentData)

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

    let name = '';
    if (authorData.firstName.toLowerCase() === 'admin') {
        name = authorData.firstName;
    } else {
        name = authorData.firstName + ' ' + authorData.lastName;
    }

    return (
        <div className={classes.PostComment}>
            <div className={classes.PostComment__Content}>
                {commentData.index}
            </div>

            <div className={classes.PostComment__Footer}>
                <AuthorInfo
                    userName={name}
                    userImg={authorData.avatarUrl}
                />

                <span>{getPostCreateTimeDifference(commentData.updatedAt)}</span>
            </div>
        </div>
    )
}

export default PostComment;