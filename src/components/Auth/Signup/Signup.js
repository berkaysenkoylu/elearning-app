import React, { useState } from 'react';

import classes from './Signup.module.scss';
import Input from '../../UI/Input/Input';
import formValidation from '../../../utility/formValidation';

const Signup = (props) => {
    const [formControls, setFormControls] = useState({
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First Name'
            },
            label: "First Name",
            validation: {
                required: true,
                isEnglishOnly: true,
                minLength: 3
            },
            valid: false,
            touched: false,
            value: ''
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            label: "Last Name",
            validation: {
                required: true,
                isEnglishOnly: true,
                minLength: 3
            },
            valid: false,
            touched: false,
            value: ''
        },
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

    let classList = [classes.Signup];

    if (props.isSignupMode) {
        classList = [classes.Signup, classes.Signup__Active];
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

    const onSignupFormSubmitHandler = (event) => {
        event.preventDefault();

        const signupForm = {
            firstName: formControls.firstName.value,
            lastName: formControls.lastName.value,
            email: formControls.email.value,
            password: formControls.password.value
        }

        // TODO
        // if(formIsValid) {
        //     props.signupFormSubmit(signupForm);
        // }
        
        console.log(signupForm)
    }

    const resetForm = () => {
        const copiedFormControls = { ...formControls };
        let copiedFormControl;

        Object.keys(copiedFormControls).forEach(formControl => {
            copiedFormControl = { ...copiedFormControls[formControl] };

            copiedFormControl.valid = false;
            copiedFormControl.touched = false;
            copiedFormControl.value = '';

            copiedFormControls[formControl] = copiedFormControl;
        });

        setFormControls(copiedFormControls);
        setFormIsValid(false);
    }

    const onSignupOpened = (event) => {
        resetForm();

        props.closeSignupPanel(event, false);
    }

    return (
        <div className={classList.join(' ')} onClick={(event) => props.openSignupPanel(event, true)}>
            <span className={classes.Signup__Close} onClick={(event) => onSignupOpened(event)}></span>
            
            <div className={classes.Signup__Form}>
                <h2 className={classes.Signup__Form__Header}>
                    Create Account
                </h2>

                <div className={classes.Signup__Form__Fields}>
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
                            labelColor='white'
                        />
                    })}
                </div>

                <div className={classes.Signup__Form__Cta}>
                    <button disabled={!formIsValid} onClick={onSignupFormSubmitHandler}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;