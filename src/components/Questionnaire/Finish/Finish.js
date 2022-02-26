import React from 'react';
import Lottie from 'react-lottie';

import classes from './Finish.module.scss';

const Finish = () => {
    const animationData = require('../../../assets/anim/success_check.json');
    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <section className={classes.Finish}>
            <header>
                <h2>Thank you!</h2>
            </header>

            <Lottie 
                options={defaultOptions}
                height={window.innerWidth > 800 ? 150 : 100}
                width={window.innerWidth > 800 ? 150 : 100}
            />
        </section>
    );
}

export default Finish;