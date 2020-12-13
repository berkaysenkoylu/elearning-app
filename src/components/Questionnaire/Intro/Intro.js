import React from 'react';

import classes from './Intro.module.scss';
import Button from '../../UI/Button/Button';

const Intro = (props) => {
    return (
        <section className={classes.Intro}>
            <header className={classes.Intro__Header}>
                <h1>
                    Temel Pediyatrik Deformite Eğitim Gereksinimleri Anketi
                </h1>

                <div>
                    Henüz bu anketi tamamlamadınız.
                </div>
            </header>
            
            <div className={classes.Intro__Cta}>
                <Button clicked={props.onQuestionnaireStarted}>
                    BAŞLA!
                </Button>
            </div>
        </section>
    )
}

export default Intro;