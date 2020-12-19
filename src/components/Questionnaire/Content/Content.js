import React, { useState, useEffect } from 'react';

import classes from './Content.module.scss';
import Button from '../../UI/Button/Button';
import Question from '../Question/Question';

const Content = (props) => {
    const [questionnaireQuestions, setQuestionnaireQuestions] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setQuestionnaireQuestions(props.questions);
    }, [props.questions]);

    let pageContent = questionnaireQuestions.map((question, i) => {
        return <Question
            key={i}
            data={question}
        />;
    });

    return (
        <>
            <section className={classes.Content}>
                {pageContent}
            </section>

            <div className={classes.Content__Cta}>
                <Button disabled={!isFormValid}>Gönder</Button>
            </div>
        </>
    )
}

export default Content;