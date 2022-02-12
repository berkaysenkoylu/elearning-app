import React, { useState, useEffect } from 'react';

import classes from './QuestionFormControl.module.scss';
import addInputField from '../../../utility/addInputField';
import Input from '../../UI/Input/Input';
import Option from './Option/Option';

const QuestionFormControl = props => {
    const [formControls, setFormControls] = useState({
        question: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'Question Text'
            },
            label: 'Question Text',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        config: {

        }
    });

    useEffect(() => {
        let copiedFormCtrls = { ...formControls };
        let copiedConfig = { ...copiedFormCtrls.config };

        switch (props.questionType) {
            case 'multiple-choice':
                copiedConfig.type = 'multiple-choice';
                break;
            case 'case study':
                copiedConfig.type = 'case study';

                copiedConfig.case = {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Case'
                    },
                    label: 'Case',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    value: ''
                };
                break;
            default:
                console.log('Unknown question type!');
                break;
        }

        copiedConfig.choices = {};

        let minChoiceNumber = 4;

        for (let i = 1; i <= minChoiceNumber; i++) {
            copiedConfig.choices = addInputField(copiedConfig.choices, {
                type: 'input',
                inputKey: `option${i}`,
                placeholder: `Option ${i}`,
                label: `Option ${i}`,
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                value: ''
            });
        }

        copiedFormCtrls.config = copiedConfig;

        console.log(copiedFormCtrls)

        setFormControls(copiedFormCtrls);
        // eslint-disable-next-line
    }, [props.questionType]);

    let options = (formControls.config || {}).choices || {};
    // let questionOptions = Object.keys(options).map(option => {
    //    // TODO: Create a component out of it.
    //     return <Input
    //         elementType={options[option].elementType}
    //         elementConfig={options[option].elementConfig}
    //         label={options[option].label}
    //         value={options[option].value}
    //         touched={options[option].touched}
    //         isValid={options[option].valid} />;
    // });

    return (
        <div className={classes.QuestionFormControl}>
            <div className={classes.QuestionFormControl__Text}>
                Question Text
            </div>

            <ul className={classes.QuestionFormControl}>
                <Option
                    elementConfig={
                        {type: 'text',
                        placeholder: 'Case'}
                    }
                    optionName='Q1'
                    optionId='Q1'
                />

                <Option
                    elementConfig={
                        {type: 'text',
                        placeholder: 'Case'}
                    }
                    optionName='Q1'
                    optionId='Q1'
                />
            </ul>

            <footer className={classes.QuestionFormControl__Cta}>
                CTA
            </footer>
        </div>
    );
};

export default QuestionFormControl;