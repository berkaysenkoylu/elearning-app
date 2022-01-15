import React, { useState } from 'react';

import classes from './CreateQuiz.module.scss';
import Input from '../../../../../UI/Input/Input';
import Menu from '../../../../../UI/Menu/Menu';
import Button from '../../../../../UI/Button/Button';
import formValidation from '../../../../../../utility/formValidation';

const QUESTION_TYPES = ['multiple-choice', 'case study'];

const CreateQuiz = () => {
    const [quizFormControls, setQuizFormControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Quiz Name'
            },
            label: "Quiz Name",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const onMenuItemClickedHandler = item => {
        console.log(item);
    }

    const inputChangedHandler = (event, formControl) => {
        const copiedFormControls = { ...quizFormControls };

        const copiedFormControl = { ...copiedFormControls[formControl] };

        copiedFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = formValidation(event.target.value, copiedFormControl.validation);
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        copiedFormControls[formControl] = copiedFormControl;

        // Set the validiity of the form
        let formValid = true;
        Object.keys(copiedFormControls).forEach(formCtrl => {
            formValid = formValid && copiedFormControls[formCtrl].valid;
        });

        setFormIsValid(formValid);
        setQuizFormControls(copiedFormControls);
    }

    const onQuizCreatedHandler = () => {
        console.log('HEY')
    }

    return (
        <section className={classes.CreateQuiz}>
            <header className={classes.CreateQuiz__Header}>
                <h1>Create a quiz</h1>

                <Input
                    elementType={quizFormControls.name.elementType}
                    elementConfig={quizFormControls.name.elementConfig}
                    label={quizFormControls.name.label}
                    value={quizFormControls.name.value}
                    touched={quizFormControls.name.touched}
                    isValid={quizFormControls.name.valid}
                    changed={(event) => inputChangedHandler(event, 'name')}
                />
            </header>

            <div className={classes.CreateQuiz__Body}>
                <div className={classes.CreateQuiz__Body__FormField}>
                    CONTENT WILL BE HERE
                </div>

                <div className={classes.CreateQuiz__Body__Menu}>
                    <Menu
                        items={QUESTION_TYPES}
                        menuItemClicked={onMenuItemClickedHandler} />
                </div>
            </div>

            <div className={classes.CreateQuiz__Cta}>
                <Button
                    disabled={!formIsValid}
                    clicked={onQuizCreatedHandler}>Create</Button>
            </div>
        </section>
    )
}

export default CreateQuiz;