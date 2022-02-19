import React from 'react';

import classes from './InfoBox.module.scss';

const InfoBox = props => {
    return (
        <article className={classes.InfoBox}>
            <header className={classes.InfoBox__Header}>
                <h2>
                    {props.title}
                </h2>
            </header>

            <div className={classes.InfoBox__Body}>
                {props.children}
            </div>
        </article>
    )
}

export default InfoBox;