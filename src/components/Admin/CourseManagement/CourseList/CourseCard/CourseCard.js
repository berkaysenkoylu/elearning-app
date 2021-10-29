import React from 'react';

import svg from '../../../../../assets/images/sprite.svg';
import classes from './CourseCard.module.scss';
import ListElement from '../../../../UI/ListElement/ListElement';
import Button from '../../../../UI/Button/Button';

const CourseCard = (props) => {
    const courseData = props.data || {};
    const landingData = courseData.landing || {};
    const courseName = courseData.name || '';

    return (
        <div className={classes.CourseCard}>
            <span
                style={{backgroundImage: `url(${landingData.image || ''}`}}
                className={classes.CourseCard__ImgSection}
            ></span>

            <h5 className={classes.CourseCard__Name}>{courseName.length > 25 ? courseName.slice(0, 25) + '...' : courseName}</h5>
            
            <div className={classes.CourseCard__Body}>
                <h5>
                    <svg className={classes.CourseCard__Body__Icon}>
                        <use xlinkHref={`${svg}#icon-education`}></use>
                    </svg>
                    <span>
                        Faculty:
                    </span>
                </h5>

                <ul>
                    {(landingData.faculty || []).map((person, index) => {
                        return <ListElement key={index}>{[person.firstName, person.lastName].join(' ')}</ListElement>;
                    })}
                </ul>
            </div>

            <div className={classes.CourseCard__Cta}>
                <Button btnType='BtnPrimary' btnSize='BtnSmall' clicked={props.coursePublish}>{courseData.isPublished ? 'UnPublish' : 'Publish'}</Button>
                <Button btnType='BtnSecondary' btnSize='BtnSmall' clicked={props.courseEdit}>Edit</Button>
                <Button btnType='BtnDanger' btnSize='BtnSmall' clicked={props.courseDelete}>Delete</Button>
            </div>
        </div>
    );
}

export default CourseCard;