import React from 'react';

import Post from './Post/Post';
import classes from './PostList.module.scss';

const PostList = (props) => {
    const postList = props.postList;

    if (postList.length === 0) {
        return <div>There is no forum post yet!</div>
    }

    let postContent = postList.map((post) => {
        return <Post
            key={post._id}
            postData={post}
            postSelected={() => props.onPostSelected(post._id)}
        />
    });

    return (
        <table className={classes.PostList}>
            <thead>
                <tr className={classes.PostList__Header}>
                    <th>Topic</th>
                    <th>Author</th>
                    <th>Replies</th>
                    <th>Views</th>
                    <th>Activity</th>
                </tr>
            </thead>
            <tbody>
                {postContent}
            </tbody>
        </table>
    )
}

export default PostList;