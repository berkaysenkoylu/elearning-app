import React, { useState, useEffect } from 'react';

import classes from './Question.module.scss';
import Input from '../../UI/Input/Input';
import MultipleChoiceQuestion from './MultipleChoiceQuestion/MultipleChoiceQuestion';
import SliderQuestion from './SliderQuestion/SliderQuestion';
import SliderCombinationQuestion from './SliderCombinationQuestion/SliderCombinationQuestion';
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
            sliderRange: [],
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
        let copiedQuestionState = { ...questionConfig };
        let copiedQuestionSpecificConfig = { ...copiedQuestionState.specificConfig };
        let copiedChoices = [...copiedQuestionSpecificConfig.choices];
        let selectedChoice = copiedChoices[index];

        if (copiedQuestionSpecificConfig.value === selectedChoice) {
            return;
        }

        let validationRules = ((questionConfig || {}).commonConfig ||{}).validation || {};
        let validity = checkValidity(selectedChoice, validationRules);

        copiedQuestionSpecificConfig.value = selectedChoice;

        copiedQuestionState.specificConfig = copiedQuestionSpecificConfig;

        setIsValid(validity);
        setIsTouched(true);
        setQuestionConfig({...copiedQuestionState});
        
        props.questionAnswerFinish({
            answer: selectedChoice,
            valid: validity
        });
    }

    const onSliderCombinationValueChangedHandler = (sliderCombData) => {
        let copiedQuestionState = { ...questionConfig };
        let copiedQuestionSpecificConfig = { ...copiedQuestionState.specificConfig };

        let newSubSliderValues = copiedQuestionSpecificConfig.value.map((subSliderValue, index) => {
            if (sliderCombData.sliderIndex === index) {
                subSliderValue.value = sliderCombData.value;
            }

            return subSliderValue;
        });

        copiedQuestionSpecificConfig.value = newSubSliderValues;
        copiedQuestionState.specificConfig = copiedQuestionSpecificConfig;

        setQuestionConfig({...copiedQuestionState});

        props.questionAnswerFinish({
            newSubSliderData: newSubSliderValues
        });
    }

    let content = null;
    let questionData = {};

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
            questionData = {
                questionNumber: questionConfig.commonConfig.questionNumber,
                text: questionConfig.commonConfig.text,
                choices: questionConfig.specificConfig.choices
            };
            content = <MultipleChoiceQuestion
                questionData={questionData}
                answerSelected={(answerIndex) => onMultipleChoiceSelectedHandler(answerIndex, questionData.questionNumber)}
            />;
            break;
        case 'slider':
            content = <SliderQuestion
                sliderLabel={questionConfig.commonConfig.text}
                sliderRange={questionConfig.specificConfig.sliderRange}
                sliderStep={questionConfig.specificConfig.sliderStep}
                value={questionConfig.specificConfig.value}
                focusLost={onInputFocusLostHandler}
                sliderChanged={(event) => onInputChanged(event)}
            />;
            break;
        case 'slider-combination':
            questionData = {
                questionNumber: questionConfig.commonConfig.questionNumber,
                text: questionConfig.commonConfig.text,
                subSliders: questionConfig.specificConfig.subSliders
            };

            content = <SliderCombinationQuestion
                questionData={questionData}
                sliderConfig={{
                    range: questionConfig.specificConfig.sliderRange,
                    step: questionConfig.specificConfig.sliderStep
                }}
                sliderCombinationValueChanged={onSliderCombinationValueChangedHandler}
            />;
            break;
        default:
            break;
    }

    return (
        <div className={classes.QuestionWrapper}>
            {content}
        </div>
    );
}

export default Question;