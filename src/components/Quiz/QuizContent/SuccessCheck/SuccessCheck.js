import React from 'react';
import Lottie from 'react-lottie';

import classes from './SuccessCheck.module.scss';

const SuccessCheck = (props) => {

    const animationData = require(`../../../../assets/anim/${ props.isSuccess ? 'success_check.json' : 'failure_cross.json' }`);
    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={classes.SuccessCheck}>
            <Lottie 
                options={defaultOptions}
                height={window.innerWidth > 800 ? 150 : 100}
                width={window.innerWidth > 800 ? 150 : 100}
            />
        </div>
    )
}

export default SuccessCheck;