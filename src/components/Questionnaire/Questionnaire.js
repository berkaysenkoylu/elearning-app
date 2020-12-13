import React, { useState } from 'react';

import classes from './Questionnaire.module.scss';
import Intro from './Intro/Intro';
import Content from './Content/Content';
import Button from '../UI/Button/Button';

const Questionnaire = (props) => {
    const [isAtQuestionnaireIntro, setIsAtQuestionnaireIntro] = useState(true);

    // TODO: CHANGE
    const content = require('../../assets/questionnaire_poc.json');
    const questionnaireQuestions = (((content || {}).questionnaires || [])[0] || {}).questions || [];
    // ~

    const onQuestionnaireStartedHandler = () => {
        setIsAtQuestionnaireIntro(false);
    }

    return (
        <div className={classes.Questionnaire}>
            <div className={classes.Questionnaire__Exit}>
                <Button btnType="BtnDanger" clicked={props.onQuestionnaireExited}>
                    <span>
                        &nbsp;
                    </span>
                </Button>
            </div>

            {isAtQuestionnaireIntro ? <Intro
                onQuestionnaireStarted={onQuestionnaireStartedHandler}
                /> : <Content
                    questions={questionnaireQuestions} />
            }
        </div>
    );
}

export default Questionnaire;