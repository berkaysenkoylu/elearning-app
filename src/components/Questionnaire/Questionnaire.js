import React, { useState } from 'react';

import classes from './Questionnaire.module.scss';
import Intro from './Intro/Intro';
import Finish from './Finish/Finish';
import Content from './Content/Content';
import Button from '../UI/Button/Button';

const Questionnaire = (props) => {
    const [isAtQuestionnaireIntro, setIsAtQuestionnaireIntro] = useState(true);
    const [questionnaireFinished, setQuestionnaireFinished]  = useState(false);

    // TODO: CHANGE
    const content = require('../../assets/questionnaire_poc.json');
    const questionnaireQuestions = ((((content || {}).questionnaires || [])[0] || {}).questions || []).map(question => {
        return {
            valid: question.type === 'text' || question.type === 'multiple-choice' ? false : true,
            ...question
        };
    });
    // ~

    const onQuestionnaireStartedHandler = () => {
        setIsAtQuestionnaireIntro(false);
    }

    const onQuestionnaireSubmittedHandler = (data) => {
        console.log(data)

        setQuestionnaireFinished(true);
    }

    let pageContent = <Intro onQuestionnaireStarted={onQuestionnaireStartedHandler} />;

    if (!isAtQuestionnaireIntro) {
        pageContent = <Content
            questions={questionnaireQuestions}
            questionnaireSubmitted={onQuestionnaireSubmittedHandler} />;
    }

    if (questionnaireFinished) {
        pageContent = <Finish />;
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

            {pageContent}
        </div>
    );
}

export default Questionnaire;