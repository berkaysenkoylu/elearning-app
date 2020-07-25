import React, { useState } from 'react';

import classes from './QuizContainer.module.scss';
import Button from '../UI/Button/Button';
import QuizIntro from './QuizIntro/QuizIntro';
import QuizEnd from './QuizEnd/QuizEnd';
import QuizContent from './QuizContent/QuizContent';

const QuizContainer = (props) => {
    const [isAtQuizIntro, setIsAtQuizIntro] = useState(true);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [quizResultData, setQuizResultData] = useState([]);

    // const content = require('../../assets/quiz_poc.json');
    const quizData = {
        ...props.quizData,
        numberOfQuestions: props.quizData.questions.length
    };

    const onQuizStartedHandler = () => {
        setIsAtQuizIntro(false);
    }

    const onQuizFinishedHandler = (quizReport) => {
        setQuizResultData(quizReport);

        setIsQuizFinished(true);
    }

    return (
        <div className={classes.Quiz}>
            <div className={classes.Quiz__Exit}>
                <Button btnType="BtnDanger" clicked={props.onQuizExited}>
                    <span>
                        &nbsp;
                    </span>
                </Button>
            </div>

            {isAtQuizIntro ?
                <QuizIntro
                    onQuizStarted={onQuizStartedHandler}
                    quizTitle={(quizData || {}).name || ''}
                /> :
                !isQuizFinished ? <QuizContent
                    questionAmount={(quizData || {}).numberOfQuestions || 0}
                    questions={(quizData || {}).questions || []}
                    onQuizEnd={onQuizFinishedHandler}
                /> : <QuizEnd answers={quizResultData} />
            }
        </div>
    )
}

export default QuizContainer;