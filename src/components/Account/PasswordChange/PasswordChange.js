import React, { useState } from 'react';

import classes from './PasswordChange.module.scss';
import usePasswordValidation from '../../../hooks/usePasswordValidation';
import formValidation from '../../../utility/formValidation';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const PasswordChange = props => {
    const [passwordChangeFormControls, setPasswordChangeFormControls] = useState({
        oldPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Old Password',
                autoComplete: 'new-password'
            },
            label: "Old Password",
            validation: {
                required: true,
                minLength: 8,
                maxLength: 16,
                containsNumeric: true,
                containsSpecial: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        newPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'New Password',
                autoComplete: 'new-password'
            },
            label: "New Password",
            validation: {
                required: true,
                minLength: 8,
                maxLength: 16,
                containsNumeric: true,
                containsSpecial: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        newPasswordAgain: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'New Password Again',
                autoComplete: 'new-password'
            },
            label: "New Password Again",
            validation: {
                required: true,
                minLength: 8,
                maxLength: 16,
                containsNumeric: true,
                containsSpecial: true
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [validLength, hasNumber, upperCase, specialChar] = usePasswordValidation(passwordChangeFormControls.newPassword.value);
    const [_validLength, _hasNumber, _upperCase, _specialChar] = usePasswordValidation(passwordChangeFormControls.newPasswordAgain.value);
    const [formIsValid, setFormIsValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const inputChangedHandler = (event, formControl) => {
        const copiedPasswordChangeFormControls = { ...passwordChangeFormControls };
        const copiedFormControl = { ...copiedPasswordChangeFormControls[formControl] };

        copiedFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = formValidation(event.target.value, copiedFormControl.validation);
        
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        copiedPasswordChangeFormControls[formControl] = copiedFormControl;

        // Set the validiity of the form
        let formValid = true;
        Object.keys(copiedPasswordChangeFormControls).forEach(formCtrl => {
            formValid = formValid && copiedPasswordChangeFormControls[formCtrl].valid;
        });

        setFormIsValid(formValid);
        setPasswordChangeFormControls(copiedPasswordChangeFormControls);

        // Check if the passwords match
        setPasswordsMatch(copiedPasswordChangeFormControls.newPassword.value ===
            copiedPasswordChangeFormControls.newPasswordAgain.value)
    }

    const onPasswordChanged = () => {
        let data = {};

        Object.keys(passwordChangeFormControls).forEach(passwordData => {
            data[passwordData] = passwordChangeFormControls[passwordData].value;
        });

        props.passwordChange(data);
    }

    let formContent = Object.keys(passwordChangeFormControls).map(formControl => {
        return <Input
            key={formControl}
            elementType={passwordChangeFormControls[formControl].elementType}
            elementConfig={passwordChangeFormControls[formControl].elementConfig}
            label={passwordChangeFormControls[formControl].label}
            value={passwordChangeFormControls[formControl].value}
            touched={passwordChangeFormControls[formControl].touched}
            isValid={passwordChangeFormControls[formControl].valid}
            changed={(event) => inputChangedHandler(event, formControl)}
            isPassword={formControl === 'newPassword' || formControl === 'newPasswordAgain'}
            passwordValidationMap={formControl === 'newPassword' ?
                {validLength, hasNumber, upperCase, specialChar} :
                {validLength: _validLength, hasNumber: _hasNumber, upperCase: _upperCase, specialChar: _specialChar}}
        />;
    });

    let showMatchWarning = !passwordsMatch &&
        passwordChangeFormControls.newPassword.touched &&
        passwordChangeFormControls.newPasswordAgain.touched;

    return (
        <div className={classes.PasswordChange}>
            <header className={classes.PasswordChange__Header}>
                <h2>Change your password</h2>
            </header>

            <div className={classes.PasswordChange__Form}>
                {formContent}

                {showMatchWarning ? <div className={classes.PasswordChange__Form__Warning}>
                    New passwords should match!
                </div> : null}
            </div>

            <div className={classes.PasswordChange__Cta}>
                <Button
                    disabled={!(formIsValid && passwordsMatch)}
                    clicked={onPasswordChanged}
                >Save</Button>
            </div>
        </div>
    );
}

export default PasswordChange;