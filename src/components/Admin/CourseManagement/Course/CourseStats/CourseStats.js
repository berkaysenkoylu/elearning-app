import React, { useState } from 'react';

import classes from './CourseStats.module.scss';
import MiniButton from '../../../../UI/MiniButton/MiniButton';
import QuizStats from './QuizStats/QuizStats';

const CourseStats = () => {
    const [statPaginationData, setStatPaginationData] = useState([{
            isActive: true,
            label: 'Quiz'
        }, {
            isActive: false,
            label: 'Questionnaire'
        }]
    );

    const onPaginationClickedHandler = (index) => {
        setStatPaginationData(prevState => {
            return prevState.map((prevButtonData, i) => {
                if (index === i) {
                    prevButtonData.isActive = true;
                } else {
                    prevButtonData.isActive = false;
                }

                return prevButtonData;
            });
        });
    }

    return (
        <section className={classes.CourseStats}>
            <header className={classes.CourseStats__Header}>
                {statPaginationData.map((button, index) => {
                    return (
                        <MiniButton key={button.label} isActive={button.isActive} clicked={() => onPaginationClickedHandler(index)}>
                            {button.label}
                        </MiniButton>
                    );
                })}
            </header>

            <div>
                <QuizStats />
            </div>
        </section>
    );
}

export default CourseStats;