import React, { useState, useEffect } from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './Question.module.scss';
import RadioButton from '../../../UI/RadioButton/RadioButton';
import Button from '../../../UI/Button/Button';
import SuccessCheck from '../SuccessCheck/SuccessCheck';
import Modal from '../../../Modal/Modal';

const Question = (props) => {
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [showCaseModal, setShowCaseModal] = useState(false);

    let timeout;

    useEffect(() => {
        return () => {
            clearTimeout(timeout);
        }
    }, [timeout]);

    const onChoiceMarkedHandler = (index) => {
        setSelectedChoice(index)
    }

    const answerSelected = () => {
        props.onAnswerSelected(props.questionNumber, selectedChoice);
        setSelectedChoice(null);
    }

    const onCaseModalOpenedHandler = () => {
        timeout = setTimeout(() => {
            setShowCaseModal(true);
        }, 200);
    }

    const onCaseModalClosedHandler = () => {
        timeout = setTimeout(() => {
            setShowCaseModal(false);
        }, 200);
    }

    return (
        <div className={classes.Question}>
            <span className={classes.Question__Number}>
                {`Q${props.questionNumber}`}
            </span>

            <Modal
                show={showCaseModal}
                customStyle={{width: '100rem', height: '90rem'}}
                closed={onCaseModalClosedHandler}
                content={props.questionCase}
            />

            <div className={classes.Question__Text}>
                {props.questionText}

                { props.questionType === 'case study' ?
                    <button onClick={onCaseModalOpenedHandler}>
                        Senaryo

                        <svg className={classes.Question__Text__CaseIcon}>
                            <use xlinkHref={`${svg}#icon-redo2`}></use>
                        </svg>
                    </button> : null
                }
            </div>

            <div className={classes.Question__Choices}>
                {props.questionChoices.map((choice, index) => {
                    return <RadioButton 
                        key={`choice${index}`}
                        id={`choice${index}`}
                        label={choice.text}
                        name={`question${props.questionNumber}`}
                        selected={() => onChoiceMarkedHandler(index)}
                    />
                })}
            </div>

            <div className={classes.Question__Cta}>
                {props.answered ? <SuccessCheck isSuccess={props.success} /> : null}
                <Button btnType="BtnDanger" clicked={answerSelected} disabled={selectedChoice === null}>
                    <span className={classes.Question__Select}>
                        <span>
                            Select
                        </span>
                        <svg className={classes.Question__Select__Icon}>
                            <use xlinkHref={`${svg}#icon-checkmark`}></use>
                        </svg>
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default Question;