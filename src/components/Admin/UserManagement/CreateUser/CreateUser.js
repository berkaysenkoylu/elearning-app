import React, { useState } from 'react';

import usePasswordValidation from '../../../../hooks/usePasswordValidation';
import classes from './CreateUser.module.scss';
import formValidation from '../../../../utility/formValidation';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';

const CreateUser = React.memo(props => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [userDataFormControls, setUserDataFormControls] = useState({
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
                placeholder: 'Password',
                autoComplete: 'new-password'
            },
            label: "Password",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        status: {
            elementType: 'select',
            elementConfig: {
                options: [{
                    value: 'user',
                    displayValue: 'User'
                }, {
                    value: 'teacher',
                    displayValue: 'Teacher'
                }]
            },
            label: "Status",
            validation: {
                required: true
            },
            valid: true,
            touched: false,
            value: 'user'
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [validLength, hasNumber, upperCase, specialChar] = usePasswordValidation(userDataFormControls.password.value);

    const inputChangedHandler = (event, formControl) => {
        const copiedUserDataFormControls = { ...userDataFormControls };

        const copiedFormControl = { ...copiedUserDataFormControls[formControl] };

        copiedFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = formValidation(event.target.value, copiedFormControl.validation);
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        copiedUserDataFormControls[formControl] = copiedFormControl;

        // Set the validiity of the form
        let formValid = true;
        Object.keys(copiedUserDataFormControls).forEach(formCtrl => {
            formValid = formValid && copiedUserDataFormControls[formCtrl].valid;
        });

        setFormIsValid(formValid);
        setUserDataFormControls(copiedUserDataFormControls);
    }

    const onUserCreatedHandler = () => {
        let userData = {};

        if (!isEditMode) {
            userData = {
                firstName: (userDataFormControls.firstName || {}).value || '',
                lastName: (userDataFormControls.lastName || {}).value || '',
                email: (userDataFormControls.email || {}).value || '',
                password: (userDataFormControls.password || {}).value || '',
                status: (userDataFormControls.status || {}).value || '',
            };

            props.userCreated(userData);
        } else {
            // TODO: Add edit mode logic later
        }
    };

    let formContent = Object.keys(userDataFormControls).map(formControl => {        
        return <Input
            key={formControl}
            elementType={userDataFormControls[formControl].elementType}
            elementConfig={userDataFormControls[formControl].elementConfig}
            label={userDataFormControls[formControl].label}
            value={userDataFormControls[formControl].value}
            touched={userDataFormControls[formControl].touched}
            isValid={userDataFormControls[formControl].valid}
            changed={(event) => inputChangedHandler(event, formControl)}
            isPassword={formControl === 'password'}
            passwordValidationMap={{validLength, hasNumber, upperCase, specialChar}}
        />;
    });

    return (
        <section className={classes.CreateUser}>
            <header className={classes.CreateUser__Header}>
                <h1>{!isEditMode ? 'Create a user' : 'Edit the user'}</h1>
            </header>

            <div className={classes.CreateUser__Form}>
                {formContent}
            </div>
            
            <Button
                btnType='BtnSecondary'
                disabled={!formIsValid}
                clicked={onUserCreatedHandler}>{!isEditMode ? 'Create' : 'Edit'}</Button>
        </section>
    );
});

export default CreateUser;