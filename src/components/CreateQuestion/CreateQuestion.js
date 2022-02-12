import React from 'react';

import classes from './CreateQuestion.module.scss';
import QuestionFormControl from './QuestionFormControl/QuestionFormControl';

const CreateQuestion = props => {
    let questionData = props.config;

    return (
        <section className={classes.CreateQuestion}>
            <header className={classes.CreateQuestion__Header}>
               {`Question Number #${questionData.questionNumber || ''}`}
            </header>

            <div className={classes.CreateQuestion__Body}>
                <QuestionFormControl questionType={questionData.type || ''} />
            </div>
        </section>
    );
};

export default CreateQuestion;