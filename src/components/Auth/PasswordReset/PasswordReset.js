import React, { useState } from 'react';

import classes from './PasswordReset.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import formValidation from '../../../utility/formValidation';

const PasswordReset = () => {
    const [resetFormControls, setResetFormControls] = useState({
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            label: "Password",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            value: ''
        },
        passwordRepeat: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Verify Password'
            },
            label: "Verify Password",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [formValid, setFormValid] = useState(false);

    const inputChangedHandler = (event, inputName) => {
        const copiedFormControls = { ...resetFormControls };

        const copiedFormControl = { ...copiedFormControls[inputName] };

        copiedFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = formValidation(event.target.value, copiedFormControl.validation);
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        copiedFormControls[inputName] = copiedFormControl;

        // Set the validiity of the form
        let formIsValid = true;
        Object.keys(copiedFormControls).forEach(formControl => {
            formIsValid = formIsValid && copiedFormControls[formControl].valid;
        });
        formIsValid = formIsValid && copiedFormControls.password.value === copiedFormControls.passwordRepeat.value;

        setFormValid(formIsValid);
        setResetFormControls(copiedFormControls);
    }

    const passwordResetFormSubmitted = (event) => {
        event.preventDefault();

        const passwordResetForm = {
            password: resetFormControls.password.value,
            passwordVerify: resetFormControls.passwordRepeat.value
        };

        console.log(passwordResetForm);
        
        // props.resetFormSubmit(passwordResetForm, token);
    }

    let formInputs = Object.keys(resetFormControls).map(formControl => {
        return <Input 
            key={formControl}
            elementType={resetFormControls[formControl].elementType}
            elementConfig={resetFormControls[formControl].elementConfig}
            label={resetFormControls[formControl].label}
            value={resetFormControls[formControl].value}
            touched={resetFormControls[formControl].touched}
            isValid={resetFormControls[formControl].valid}
            changed={(event) => inputChangedHandler(event, formControl)}
        />;
    });

    return (
        <div className={classes.PasswordReset}>
            <h2 className={classes.PasswordReset__Header}>
                Enter your new password
            </h2>
            
            <form onSubmit={passwordResetFormSubmitted} className={classes.PasswordReset__Form}>
                {formInputs}
                <Button disabled={!formValid}>Reset</Button>
            </form>
        </div>
    )
}

export default PasswordReset;