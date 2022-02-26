import React, { useState, useEffect } from 'react';

import classes from './Content.module.scss';
import Button from '../../UI/Button/Button';
import Question from '../Question/Question';

const Content = (props) => {
    const [questionnaireQuestions, setQuestionnaireQuestions] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setQuestionnaireQuestions(props.questions);
    }, [props.questions]);

    // TODO: fix
    const onQuestionFinishedHandler = (index, answerData) => {
        // console.log(`Question #${index}: ${answerData.answer} and its validity status: ${answerData.valid}`);

        // console.log(questionnaireQuestions[index])

        let copiedQuestionArr = [...questionnaireQuestions];
        let copiedQuestionData = { ...copiedQuestionArr[index] };
        let questionElementType = copiedQuestionData.type || '';

        switch (questionElementType) {
            case 'text':
            case 'multiple-choice':
            case 'slider':
                copiedQuestionData.value = answerData.answer;
                copiedQuestionData.valid = answerData.valid;
                break;
            case 'slider-combination':
                copiedQuestionData.value = answerData.newSubSliderData;
                break;
            default:
                throw new Error('There is no such type of an element!');
        }

        copiedQuestionArr[index] = copiedQuestionData;

        setQuestionnaireQuestions(copiedQuestionArr);

        let isValid = true;

        copiedQuestionArr.forEach(answeredQuestion => {
            isValid = isValid && answeredQuestion.valid;
        });

        setIsFormValid(isValid);
    }

    const onQuestionnaireSubmitted = () => {
        let questionnaireData = {
            userId: '',
            questionnaireId: '',
            data: questionnaireQuestions.map(question => {
                return {
                    questionNo: question.questionNumber,
                    type: question.type,
                    answer: question.value
                }
            })
        }
        props.questionnaireSubmitted(questionnaireData)
    }

    let pageContent = questionnaireQuestions.map((question, i) => {
        return <Question
            key={i}
            data={question}
            questionAnswerFinish={(answer) => onQuestionFinishedHandler(i, answer)}
        />;
    });

    return (
        <>
            <section className={classes.ContentWrapper}>
                <div className={classes.Content}>
                    {pageContent}
                </div>
            </section>

            <div className={classes.Content__Cta}>
                <Button
                    disabled={!isFormValid}
                    clicked={onQuestionnaireSubmitted}
                >Submit</Button>
            </div>
        </>
    )
}

export default Content;