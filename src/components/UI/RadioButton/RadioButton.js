import React, { useRef, useEffect } from 'react';

import classes from './RadioButton.module.scss';

const RadioButton = (props) => {
    let radioRef = useRef(null);

    useEffect(() => {
        radioRef.current.checked = false;
    }, [props.label]);

    return (
        <div className={classes.RadioGroup}>
            <input type="radio" className={classes.RadioButton__Input} id={props.id} name={props.name} ref={radioRef} />
            <label htmlFor={props.id} className={classes.RadioButton__Label} onClick={props.selected}>
                <span className={classes.RadioButton}></span>
                <span>{props.label}</span>
            </label>
        </div>
    )
}

export default RadioButton;