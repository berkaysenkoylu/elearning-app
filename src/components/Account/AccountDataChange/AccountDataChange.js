import React, { useState, useEffect, useCallback } from 'react';

import classes from './AccountDataChange.module.scss';
import changeInputObjectValue from '../../../utility/changeInputObjectValue';
import formValidation from '../../../utility/formValidation';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const AccountDataChange = props => {
    const [accountDataFormControls, setAccountDataFormControls] = useState({
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First Name'
            },
            label: 'First Name',
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
            label: 'Last Name',
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
            label: 'E-mail',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        dateOfBirth: {
            elementType: 'input',
            elementConfig: {
                type: 'date',
                placeholder: 'Date of Birth'
            },
            label: 'Date of Birth',
            validation: {},
            valid: true,
            touched: false,
            value: ''
        },
        gender: {
            elementType: 'select',
            elementConfig: {
                options: [{
                    value: 'male',
                    displayValue: 'Male'
                }, {
                    value: 'female',
                    displayValue: 'Female'
                }, {
                    value: 'I don\'t want to disclose',
                    displayValue: 'I don\'t want to disclose'
                }]
            },
            label: "Gender",
            validation: {},
            valid: true,
            touched: false,
            value: 'male'
        },
    });
    const [formValid, setFormValid] = useState(false);

    const populateFormFields = useCallback(() => {
        let savedUserData = props.userData || {};

        let copiedFormControls = {...accountDataFormControls};

        Object.keys(savedUserData).filter(dataKey => Object.keys(accountDataFormControls).indexOf(dataKey) !== -1).forEach(key => {
            copiedFormControls = changeInputObjectValue(copiedFormControls, key, {
                value: savedUserData[key],
                touched: true,
                valid: true
            });
        });

        setAccountDataFormControls({...copiedFormControls});
        setFormValid(true);
        // eslint-disable-next-line
    }, [props.userData]);

    useEffect(() => {
        populateFormFields();
    }, [populateFormFields]);

    const inputChangedHandler = (event, formControl) => {
        // console.log(`The input: ${formControl} and the value is: ${event.target.value}`);

        const copiedAccountDataFormControls = { ...accountDataFormControls };
        const copiedFormControl = { ...copiedAccountDataFormControls[formControl] };

        copiedFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = formControl !== 'dateOfBirth' ? formValidation(event.target.value, copiedFormControl.validation) : true;
        
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        copiedAccountDataFormControls[formControl] = copiedFormControl;

        // Set the validiity of the form
        let formValid = true;
        Object.keys(copiedAccountDataFormControls).forEach(formCtrl => {
            formValid = formValid && copiedAccountDataFormControls[formCtrl].valid;
        });

        setFormValid(formValid);
        setAccountDataFormControls(copiedAccountDataFormControls);
    }

    const onAccountDataChanged = () => {
        let data = {};

        Object.keys(accountDataFormControls).forEach(accountData => {
            data[accountData] = accountDataFormControls[accountData].value;
        });

        props.accountDataChange(data);
    }

    let formContent = Object.keys(accountDataFormControls).map(formControl => {
        return <Input
            key={formControl}
            elementType={accountDataFormControls[formControl].elementType}
            elementConfig={accountDataFormControls[formControl].elementConfig}
            label={accountDataFormControls[formControl].label}
            value={accountDataFormControls[formControl].value}
            touched={accountDataFormControls[formControl].touched}
            isValid={accountDataFormControls[formControl].valid}
            changed={(event) => inputChangedHandler(event, formControl)}
            isPassword={false}
        />;
    });

    return (
        <div className={classes.AccountDataChange}>
            <header className={classes.AccountDataChange__Header}>
                <h2>Edit account data</h2>
            </header>

            <div className={classes.AccountDataChange__Form}>
                {formContent}

                <div className={classes.AccountDataChange__Form__Warning}>
                    Error Message
                </div>
            </div>

            <div className={classes.AccountDataChange__Cta}>
                <Button
                    disabled={!formValid}
                    clicked={onAccountDataChanged}>
                    Save</Button>
            </div>
        </div>
    );
}

export default AccountDataChange;