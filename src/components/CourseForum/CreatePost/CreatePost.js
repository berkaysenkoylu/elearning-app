import React, { useState } from 'react';

import classes from './CreatePost.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import checkValidity from '../../../utility/formValidation';

const CreatePost = (props) => {
    const [formControls, setFormControls] = useState({
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Title'
            },
            label: "Title",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        content: {
            elementType: 'textarea',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Post Content'
            },
            label: "Post Content",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const inputChangedHandler = (event, inputName) => {
        event.preventDefault();

        const copiedFormControls = { ...formControls };

        const copiedFormControl = { ...copiedFormControls[inputName] };

        copiedFormControl.value = event.target.value;

        // Check validity & mark it as touched
        let isValid = checkValidity(event.target.value, copiedFormControl.validation);
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        copiedFormControls[inputName] = copiedFormControl;

        let formIsValid = true;
        Object.keys(copiedFormControls).forEach(formControl => {
            formIsValid = formIsValid && copiedFormControls[formControl].valid;
        });

        setIsFormValid(formIsValid);
        setFormControls(copiedFormControls);
    }

    let formFields = Object.keys(formControls).map((formControl, i) => {
        return <Input
            key={i}
            elementType={formControls[formControl].elementType}
            elementConfig={formControls[formControl].elementConfig}
            label={formControls[formControl].label}
            value={formControls[formControl].value}
            touched={formControls[formControl].touched}
            isValid={formControls[formControl].valid}
            changed={(event) => inputChangedHandler(event, formControl)}
        />
    });

    return (
        <section className={classes.CreatePost}>
            <header className={classes.CreatePost__Header}>
                <h2>
                    Create a Post
                </h2>
            </header>

            <div className={classes.CreatePost__Body}>
                <div className={classes.CreatePost__Inputs}>
                    {formFields}
                </div>

                <div className={classes.CreatePost__Cta}>
                    <Button
                        btnType="BtnPrimary"
                        disabled={!isFormValid}>Create</Button>
                    <Button
                        btnType="BtnDanger"
                        clicked={props.createPostCancel}>Cancel</Button>
                </div>
            </div>
        </section>
    )
}

export default CreatePost;