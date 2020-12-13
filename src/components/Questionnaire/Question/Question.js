import React from 'react';

import classes from './Question.module.scss';
import Input from '../../UI/Input/Input';

const Question = (props) => {

    const onInputChanged = (event, questionNumber) => {
        console.log(questionNumber);
    }

    let content = null;

    switch(props.questionType) {
        case 'text':
            <Input
                elementType='input'
                elementConfig='text'
                label={props.text}
                value={props.value}
                touched={props.touched}
                isValid={props.valid}
                changed={(event) => onInputChanged(event, props.questionNumber)}
            />
            break;
        case 'number':
            break;
        case 'multiple-choice':
            break;
        case 'slider':
            break;
        case 'slider-combination':
            break;
        default:
            break;
    }

    return (
        <>
            {content}
        </>
    )
}

export default Question;