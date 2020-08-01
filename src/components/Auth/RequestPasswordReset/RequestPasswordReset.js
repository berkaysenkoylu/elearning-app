import React, { useState } from 'react';

import classes from './RequestPasswordReset.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import formValidation from '../../../utility/formValidation';

const RequestPasswordReset = (props) => {
    const [email, setEmail] = useState({
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'E-mail'
        },
        label: "E-mail",
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false,
        value: ''
    });

    const inputChangedHandler = (event) => {
        const copiedEmailFormControl = { ...email };

        copiedEmailFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = formValidation(event.target.value, copiedEmailFormControl.validation);
        copiedEmailFormControl.valid = isValid;
        copiedEmailFormControl.touched = true;

        setEmail(copiedEmailFormControl);
    }

    const resetFormSubmitted = (event) => {
        event.preventDefault();

        // props.emailFormSubmit(email.value);
        // setRequestSent(true);
    }

    return (
        <div className={classes.RequestPasswordReset}>
            <h2 className={classes.RequestPasswordReset__Header}>
                Reset Password
            </h2>

            <form onSubmit={resetFormSubmitted} className={classes.RequestPasswordReset__Body}>
                <Input
                    elementType={email.elementType}
                    elementConfig={email.elementConfig}
                    label={email.label}
                    value={email.value}
                    touched={email.touched}
                    isValid={email.valid}
                    changed={inputChangedHandler}
                />

                <Button disabled={!email.valid}>Continue</Button>
            </form>
        </div>
    )
}

export default RequestPasswordReset;