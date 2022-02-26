import React from 'react';

import classes from './MultipleChoiceQuestion.module.scss';
import RadioButton from '../../../UI/RadioButton/RadioButton';

const MultipleChoiceQuestion = (props) => {
    const { questionData } = props;

    return (
        <div className={classes.MultipleChoiceQuestion}>
            <div className={classes.MultipleChoiceQuestion__Text}>
                {questionData.text}
            </div>

            <div className={classes.MultipleChoiceQuestion__Choices}>
                {questionData.choices.map((choice, index) => {
                    return <RadioButton
                        id={'question' + questionData.questionNumber + '' + index}
                        key={'question' + questionData.questionNumber + '' + index}
                        name={'question' + questionData.questionNumber}
                        label={choice}
                        selected={() => props.answerSelected(index)}
                    />;
                })}
            </div>
        </div>
    )
}

export default MultipleChoiceQuestion;