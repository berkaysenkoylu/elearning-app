import React, { useState } from 'react';

import PasswordFeedback from '../../PasswordFeedback/PasswordFeedback';
import classes from './Input.module.scss';

const Input = (props) => {
    const [passwordFeebackVisible, setPasswordFeedbackVisible] = useState(false);

    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = '';

    if (!props.isValid && props.touched) {
        inputClasses.push(classes.Invalid);
        if(props.value !== ''){
            validationError = 'Please enter a valid value';
        }
        else {
            validationError = 'This field is required';
        }
    }

    const onInputFocused = (event) => {
        if (event.target.type === 'password') {
            setPasswordFeedbackVisible(true)
        }
    }

    const onInputFocusLost = (event) => {
        if (event.target.type === 'password') {
            setPasswordFeedbackVisible(false)
        }
    }

    switch(props.elementType) {
        case 'input':
            inputElement = (<input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}
                onBlur={onInputFocusLost}
                onFocus={onInputFocused}
            />);
            break;
        case 'textarea':
            inputClasses.push(classes.TextArea)
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}
            />;
            break;
        case 'select':
            inputElement =  <select 
                className={classes.SelectElement} 
                value={props.value} 
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
            </select>
            break;
        default:
            break;
    }

    let labelClassList = [classes.InputElement__Label];

    if (props.labelColor === 'white') {
        labelClassList = [classes.InputElement__Label, classes.InputElement__Label__White];
    }
    
    return (
        <div className={classes.Input}>
            <p className={classes.ValidationError}>{validationError}</p>
            {inputElement}
            <label className={labelClassList.join(' ')}>{props.label}</label>
            {props.isPassword && passwordFeebackVisible ? <PasswordFeedback validation={props.passwordValidationMap} /> : null}
        </div>
    )
}

export default Input;