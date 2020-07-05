import React from 'react';

import classes from './QuizIntro.module.scss';
import Button from '../../UI/Button/Button';

const QuizIntro = (props) => {
    return (
        <section className={classes.QuizIntro}>
            <header className={classes.QuizIntro__Header}>
                <h1>
                    {props.quizTitle}
                </h1>

                <div>
                    Henüz bu quizi tamamlamadınız.
                </div>
            </header>
            
            <div className={classes.QuizIntro__Cta}>
                <Button clicked={props.onQuizStarted}>
                    BAŞLA!
                </Button>
            </div>
        </section>
    );
}

export default QuizIntro;