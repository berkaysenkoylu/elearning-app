import React, { useState, useEffect } from 'react';

// import classes from './Question.module.scss';
import Input from '../../UI/Input/Input';
import updateQuestionaireState from '../../../utility/updateQuestionaireState';

const Question = (props) => {
    const [questionConfig, setQuestionConfig] = useState({
        commonConfig: {
            questionNumber: 0,
            text: '',
            type: '',
            elementType: '',
            required: true
        },
        specificConfig: {
            value: '',
            choices: [],
            sliderStep: 10,
            subText: []
        }
    });
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setQuestionConfig({...updateQuestionaireState(props.data)});
    }, [props.data]);

    const onInputChanged = (event) => {
        console.log(event.target.value);
    }

    let content = null;

    switch(questionConfig.commonConfig.type || '') {
        case 'text':
        case 'number':
            content = <Input
                elementType={questionConfig.commonConfig.elementType}
                elementConfig={{
                    type: 'text',
                    placeholder: questionConfig.commonConfig.text
                }}
                label={questionConfig.commonConfig.text}
                value={questionConfig.specificConfig.value}
                touched={isTouched}
                isValid={isValid}
                changed={(event) => onInputChanged(event)}
            />;
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