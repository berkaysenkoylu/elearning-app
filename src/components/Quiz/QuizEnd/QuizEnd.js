import React from 'react';

import classes from './QuizEnd.module.scss';
import QuestionResult from './QuestionResult/QuestionResult';

const QuizEnd = (props) => {
    const answers = props.answers || [];

    let visualResult = answers.map((answer, i) => {
        return (
            <QuestionResult
                key={i}
                isCorrect={answer}
                questionNumber={i + 1}
            />
        )
    });

    return (
        <section className={classes.QuizEnd}>
            <header className={classes.QuizEnd__Header}>
                <h1>
                    Quiz Sonucu
                </h1>
            </header>

            <div className={classes.QuizEnd__Content}>
                <div className={classes.QuizEnd__Content__Text}>
                    Quizi tamamladınız.
                </div>

                <div className={classes.QuizEnd__Content__Visual}>
                    {visualResult}
                </div>
            </div>

            
        </section>
    )
}

export default QuizEnd;