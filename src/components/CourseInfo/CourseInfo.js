import React from 'react';

import classes from './CourseInfo.module.scss';

const CourseInfo = (props) => {
    return (
        <div className={classes.CourseInfo}>
            <div className={classes.CourseInfo__Image}>
                <img src={props.landingData.image} alt="Landing Page Img" />
            </div>

            <div className={classes.CourseInfo__Body}>
                <div className={classes.CourseInfo__Info}>
                    <h2>
                        Course Info
                    </h2>
                    {props.landingData.info}
                </div>

                <div className={classes.CourseInfo__Faculty}>
                    <h2>
                        Faculty
                    </h2>

                    <ul>
                        {(props.landingData.faculty || []).map((faculty, i) => {
                            return <li key={i}>{`Prof. Dr. ${faculty.firstName} ${faculty.lastName}`}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CourseInfo;