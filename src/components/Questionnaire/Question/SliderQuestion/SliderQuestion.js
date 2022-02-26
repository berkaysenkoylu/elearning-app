import React from 'react';

import classes from './SliderQuestion.module.scss';

const SliderQuestion = props => {
    return (
        <div className={classes.SliderQuestion}>
            <div className={classes.SliderQuestion__Text}>
                {props.sliderLabel}
            </div>

            <div className={classes.SliderQuestion__Slider}>
                <input
                    className={classes.SliderQuestion__Slider__Input}
                    type="range"
                    min={props.sliderRange[0] || 0}
                    max={props.sliderRange[1] || 100}
                    step={props.sliderStep || 5}
                    value={props.value}
                    onMouseUp={props.focusLost}
                    onChange={props.sliderChanged}
                />
                <span className={classes.SliderQuestion__Slider__Input__Value}>{props.value}</span>
            </div>
        </div>
    );
}

export default SliderQuestion;