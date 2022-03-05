import React from 'react';

import classes from './AuthorInfo.module.scss';
import { BACKEND_ORIGIN } from '../../../../../utility/apiUrl';

const AuthorInfo = props => {

    let imgUrl = (props.userImg || '').replace(/\\/g, '/');
    let avatarStyle = {};

    if (imgUrl && imgUrl !== '') {
        avatarStyle['backgroundImage'] = `url(${BACKEND_ORIGIN + '/' + imgUrl})`;
    }

    return (
        <div className={classes.AuthorInfo}>
            <div className={classes.AuthorInfo__Avatar}>
                <div className={classes.AuthorInfo__Avatar__Picture} style={avatarStyle}></div>
            </div>

            <div className={classes.AuthorInfo__Name}>{props.userName}</div>
        </div>
    )
}

export default AuthorInfo;