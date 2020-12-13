import React, { useState, useEffect } from 'react';

import classes from './Content.module.scss';
import Button from '../../UI/Button/Button';

const Content = (props) => {
    const [questionnaireQuestions, setQuestionnaireQuestions] = useState([]);

    useEffect(() => {
        setQuestionnaireQuestions(props.questions);
    }, [props.questions]);

    return (
        <>
            <section className={classes.Content}>
                Questionnaire Content
            </section>

            <div className={classes.Content__Cta}>
                <Button>Gönder</Button>
            </div>
        </>
    )
}

export default Content;