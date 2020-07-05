import React, { useState, useEffect, useRef } from 'react';

import classes from './QuizContent.module.scss';
import Question from './Question/Question';
import ProgressBar from '../../ProgressBar/ProgressBar';

const QuizContent = (props) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [success, setSuccess] = useState(false);
    const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);

    let timeout;
    const questionAmount = props.questionAmount;
    const questionList = props.questions;
    let questionAnswerList = useRef([]);

    useEffect(() => {
        return () => {
            clearTimeout(timeout);
        }
    }, [timeout]);

    const onAnswerSelectedHandler = (answeredQuestionNumber, choiceIndex) => {
        let isCorrect = questionList[answeredQuestionNumber - 1].choices[choiceIndex].isCorrect;

        setSuccess(isCorrect);
        setIsQuestionAnswered(true);
        questionAnswerList.current.push(isCorrect);

        if(currentQuestion < questionAmount - 1) {
            // Next question
            timeout = setTimeout(() => {
                setCurrentQuestion(currentQuestion => currentQuestion + 1);
                setSuccess(false);
                setIsQuestionAnswered(false);
            }, 2000);
        } else {
            // Quiz is finished
            timeout = setTimeout(() => {
                props.onQuizEnd(questionAnswerList.current);
            }, 2000);
        }
    }

    return (
        <>
            <ProgressBar questionAmount={questionAmount} questionNumber={currentQuestion+1} />
            <section className={classes.QuizContent}>
                <Question
                    questionNumber={currentQuestion + 1}
                    questionText={questionList[currentQuestion].text}
                    questionChoices={questionList[currentQuestion].choices}
                    questionType={questionList[currentQuestion].type}
                    questionCase={questionList[currentQuestion].case || ''}
                    onAnswerSelected={onAnswerSelectedHandler}
                    success={success}
                    answered={isQuestionAnswered}
                />
            </section>
        </>
    )
}

export default QuizContent;