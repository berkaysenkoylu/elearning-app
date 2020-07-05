import React from 'react';

import Post from './Post/Post';
import classes from './PostList.module.scss';

const PostList = (props) => {
    const postList = props.postList;

    let postContent = postList.map((post) => {
        return <Post
            key={post.id}
            postData={post}
            postSelected={() => props.onPostSelected(post.id)}
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