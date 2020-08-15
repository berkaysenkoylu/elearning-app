import React from 'react';

import classes from './Loader.module.scss';

const Loader = (props) => {
    return (
        <div className={classes.Spinner}>
            <svg className={classes.Circular} viewBox="25 25 50 50">
                <circle className={classes.Stroke} cx="50" cy="50" r="20" fill="none" strokeWidth={props.strokeWidth} />
            </svg>
        </div>
    )
}

export default Loader;