import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    const [requestSent, setRequestSent] = useState(false);

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

        props.emailFormSubmit(email.value);
        setRequestSent(true);
    }

    let pageContent = null;
    if(props.loading) {
        pageContent = 'LOADING...';
    } else {
        if (props.reqSuccessfull && requestSent) {
            pageContent = (
                <>
                    <h2 className={classes.RequestPasswordReset__Header}>
                        We sent you an e-mail!
                    </h2>
                    <p>Check your e-mail and follow the instructions.</p>
                    <div className={classes.RequestPasswordReset__Cta}>
                        <Link to="/" className={classes.RequestPasswordReset__Link}>Home</Link>
                    </div>
                </>
            );
        } else {
            pageContent = (
                <>
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
                </>
            );
        }
    }

    return (
        <div className={classes.RequestPasswordReset}>
            {pageContent}
        </div>
    )
}

export default RequestPasswordReset;