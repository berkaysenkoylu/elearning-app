import React, { useState, useEffect, useRef } from 'react';

import classes from './PasswordFeedback.module.scss';

/*
    A valid password should include the following:
    - at least 8 characters, at most 16 characters long
    - at least 1 uppercase character
    - at least 1 numeric character
    - at least 1 non-alpha numeric character like: `! @ # $ % ^ &`
*/

const PasswordFeedback = (props) => {
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

    const innerStyle = {
        visibility: `${visible}`,
        top: `-${height}px`,
        right: `-${width / 3}px`
    };

    return (
        <div className={classes.PasswordFeedback} ref={ref} style={innerStyle} id='PasswordFeedback'>
            <div>
                <span>True</span> | <span>at least 8 characters, at most 16 characters long</span>
            </div>

            <div>
                <span>True</span> | <span>at least 1 uppercase character</span>
            </div>

            <div>
                <span>True</span> | <span>at least 1 numeric character</span>
            </div>

            <div>
                <span>True</span> | <span>at least 1 non-alpha numeric character like: ! @ # $ % ^ &</span>
            </div>
        </div>
    )
}

export default PasswordFeedback;