import React, { useState, useEffect, useRef } from 'react';

import classes from './PasswordFeedback.module.scss';
import FeedbackCondition from './FeedbackCondition/FeedbackCondition';

/*
    A valid password should include the following:
    - at least 8 characters, at most 16 characters long
    - at least 1 uppercase character
    - at least 1 numeric character
    - at least 1 non-alpha numeric character like: `! @ # $ % ^ &`
*/

const PasswordFeedback = (props) => {
    const [validationMap, setValidationMap] = useState({
        validLength: {
            label: 'at least 8 characters, at most 16 characters long',
            value: false
        }, upperCase: {
            label: 'at least 1 uppercase character',
            value: false
        }, hasNumber: {
            label: 'at least 1 numeric character',
            value: false
        }, specialChar: {
            label: 'at least 1 of the following: ! @ # $ % ^ & *',
            value: false
        }
    });
    const [visible, setVisible] = useState('hidden');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);
    const timerRef = useRef(null);
    
    useEffect(() => {
        setHeight(ref.current.scrollHeight);
        setWidth(ref.current.scrollWidth);

        timerRef.current = setTimeout(() => {
            setVisible('visible')
        }, 200);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    useEffect(() => {
        const copiedValidationMap = {...validationMap};
        let copiedValidationCondition;

        Object.keys(props.validation || {}).forEach(condition => {
            copiedValidationCondition = { ...copiedValidationMap[condition] };

            copiedValidationCondition.value = (props.validation || {})[condition] || false;
            copiedValidationMap[condition] = copiedValidationCondition;
        });

        setValidationMap(copiedValidationMap);
        // eslint-disable-next-line
    }, [props.validation]);

    const innerStyle = {
        visibility: `${visible}`,
        top: `-${height}px`,
        right: `-${width / 3}px`
    };

    return (
        <div className={classes.PasswordFeedback} ref={ref} style={innerStyle} id='PasswordFeedback'>
            {Object.keys(validationMap).map(condition => {
                return <FeedbackCondition
                    key={condition}
                    isTrue={validationMap[condition].value || false}
                >{validationMap[condition].label || ''}</FeedbackCondition>;
            })}
        </div>
    );
}

export default PasswordFeedback;