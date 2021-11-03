import React, { useState, useRef, useEffect } from 'react';

import classes from './Accordion.module.scss';

const Accordion = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [height, setHeight] = useState(0);

    const innerElementRef = useRef(null);
    let timeout = useRef(null);
    
    useEffect(() => {
        timeout.current = setTimeout(() => {
            setHeight(innerElementRef.current.scrollHeight);
        }, 333);

        return () => {
            clearTimeout(timeout.current);
        }
    }, []);

    const toggleAccordion = () => {
        setIsActive(prevState => !prevState);
    }

    const innerStyle = {
        height: `${isActive ? height : 0}px`
    };

    return (
        <div className={classes.Accordion} role='tabpanel' aria-expanded={isActive}>
            <button className={classes.Accordion__label} role='tab' onClick={toggleAccordion}>
                {props.label}

                <span className={classes.Accordion__label__border}></span>
            </button>

            <div className={classes.Accordion__inner}
                style={innerStyle}
                aria-hidden={!isActive}
                ref={innerElementRef}>
                <p className={classes.Accordion__content}>
                    {props.children}
                </p>
            </div>
        </div>
    )
}

export default Accordion;