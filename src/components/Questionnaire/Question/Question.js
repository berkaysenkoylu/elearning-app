import React, { useState, useEffect } from 'react';

// import classes from './Question.module.scss';
import Input from '../../UI/Input/Input';
import MultipleChoiceQuestion from './MultipleChoiceQuestion/MultipleChoiceQuestion';
import updateQuestionaireState from '../../../utility/updateQuestionaireState';
import checkValidity from '../../../utility/formValidation';

const Question = (props) => {
    const [questionConfig, setQuestionConfig] = useState({
        commonConfig: {
            questionNumber: 0,
            text: '',
            type: '',
            elementType: '',
            validation: {}
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
        let inputValue = event.target.value;
        let validationRules = ((questionConfig || {}).commonConfig ||{}).validation || {};
        let validity = checkValidity(inputValue, validationRules);
        let copiedQuestionState = { ...questionConfig };
        let copiedQuestionSpecificConfig = { ...copiedQuestionState.specificConfig };

        copiedQuestionSpecificConfig.value = inputValue;

        copiedQuestionState.specificConfig = copiedQuestionSpecificConfig;

        setIsValid(validity);
        setIsTouched(true);
        setQuestionConfig({...copiedQuestionState});
    }

    const onInputFocusLostHandler = () => {
        props.questionAnswerFinish({
            answer: ((questionConfig || {}).specificConfig ||{}).value || '',
            valid: isValid
        });
    }

    const onMultipleChoiceSelectedHandler = (index) => {
        console.log(index)
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
                focusLost={onInputFocusLostHandler}
            />;
            break;
        case 'multiple-choice':
            let questionData = {
                questionNumber: questionConfig.commonConfig.questionNumber,
                text: questionConfig.commonConfig.text,
                choices: questionConfig.specificConfig.choices
            }
            content = <MultipleChoiceQuestion
                questionData={questionData}
                answerSelected={onMultipleChoiceSelectedHandler}
            />;
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