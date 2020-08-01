import React, { useState } from 'react';

import classes from './Login.module.scss';
import Input from '../../UI/Input/Input';
import formValidation from '../../../utility/formValidation';

const Login = (props) => {
    const [formControls, setFormControls] = useState({
        email: {
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
        },
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
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    let overlayClassList = [classes.Login__Overlay];

    if (props.isSignupMode) {
        overlayClassList = [classes.Login__Overlay, classes.Login__Overlay__Active];
    }

    const inputChangedHandler = (event, formControl) => {
        const copiedFormControls = { ...formControls };

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
        setFormControls(copiedFormControls);
    }

    const onLoginFormSubmitHandler = (event) => {
        event.preventDefault();

        const loginForm = {
            email: formControls.email.value,
            password: formControls.password.value
        }

        if(formIsValid) {
            props.loginFormSubmit(loginForm);
        }
    }

    return (
        <div className={classes.Login}>
            <span className={overlayClassList.join(' ')}></span>

            <div className={classes.Login__Form}>
                <h2 className={classes.Login__Form__Header}>
                    Account Login
                </h2>

                <div className={classes.Login__Form__Fields}>
                    {Object.keys(formControls).map(formControl => {
                        return <Input
                            key={formControl}
                            elementType={formControls[formControl].elementType}
                            elementConfig={formControls[formControl].elementConfig}
                            label={formControls[formControl].label}
                            value={formControls[formControl].value}
                            touched={formControls[formControl].touched}
                            isValid={formControls[formControl].valid}
                            changed={(event) => inputChangedHandler(event, formControl)}
                        />
                    })}
                </div>

                <div className={classes.Login__Form__Cta}>
                    <span onClick={props.forgotPasswordClicked}>
                        Forgot your password?
                    </span>
                </div>

                <div className={classes.Login__Form__Cta}>
                    <button disabled={!formIsValid} onClick={onLoginFormSubmitHandler}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;