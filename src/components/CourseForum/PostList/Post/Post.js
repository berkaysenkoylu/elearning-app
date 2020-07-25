import React from 'react';

import classes from './Post.module.scss';

const Post = (props) => {
    const postData = props.postData;

    const getPostUpdateTimeDifference = (time) => {
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
        <tr className={classes.Post} onClick={props.postSelected}>
            <td className={classes.Post__Title}>
                {postData.title}
            </td>

            <td className={classes.Post__Author}>
                {postData.author.status !== 'admin' ? postData.author.firstName + ' ' + postData.author.lastName : postData.author.firstName}
            </td>

            <td className={classes.Post__Replies}>
                {postData.responses.length}
            </td>

            <td className={classes.Post__Views}>
                {postData.views}
            </td>

            <td className={classes.Post__Activity}>
                {getPostUpdateTimeDifference(postData.updatedAt)}
            </td>
        </tr>
    );
}

export default Post;