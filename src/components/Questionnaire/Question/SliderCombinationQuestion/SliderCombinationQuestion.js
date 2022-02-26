import React from 'react';

import classes from './SliderCombinationQuestion.module.scss';
import SliderQuestion from '../SliderQuestion/SliderQuestion';

const SliderCombinationQuestion = props => {
    const data = props.questionData;

    const subSliderChanged = (event, qNumber, i) => {
        // console.log('SLIDER COMBINATION');
        // console.log(`The question number: ${qNumber}, slider number: ${i}, slider value: ${event.target.value}`);
        props.sliderCombinationValueChanged({
            questionNumber: qNumber,
            sliderIndex: i,
            value: event.target.value
        });
    }

    let content = data.subSliders.map((subSlider, index) => {
        return <SliderQuestion
            key={'question' + data.questionNumber + '' + index}
            sliderLabel={subSlider.text}
            sliderRange={props.sliderConfig.range}
            sliderStep={props.sliderConfig.step}
            value={subSlider.value}
            sliderChanged={(event) => subSliderChanged(event, data.questionNumber, index)}
        />;
    });

    return (
        <div className={classes.SliderCombinationQuestion}>
            <div className={classes.SliderCombinationQuestion__Text}>
                {data.text}
            </div>

            <div className={classes.SliderCombinationQuestion__SubSliders}>
                {content}
            </div>
        </div>
    );
}

export default SliderCombinationQuestion;