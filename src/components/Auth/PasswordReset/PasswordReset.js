import React, { useState } from 'react';

import classes from './PasswordReset.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import formValidation from '../../../utility/formValidation';

const PasswordReset = (props) => {
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

    let token = props.location.pathname.split('/').slice(-1).join('');

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
            passwordVerify: resetFormControls.passwordRepeat.value,
            token: token
        };
        
        props.resetFormSubmit(passwordResetForm);
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

    let pageContent = null;
    if(props.loading) {
        pageContent = 'LOADING...';
    } else if(props.path === '/') {
        pageContent = <p className={classes.ResetedPasswordHeader}>Successfully changed your password</p>;
    } else {
        pageContent = (
            <>
                <h2 className={classes.PasswordReset__Header}>
                    Enter your new password
                </h2>
                
                <form onSubmit={passwordResetFormSubmitted} className={classes.PasswordReset__Form}>
                    {formInputs}
                    <Button disabled={!formValid}>Reset</Button>
                </form>
            </>
        )
    }

    return (
        <div className={classes.PasswordReset}>
            {pageContent}
        </div>
    )
}

export default PasswordReset;