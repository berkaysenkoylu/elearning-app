import React, { useRef } from 'react';

import classes from './Select.module.scss';

const Select = props => {
    let data = props.data;
    let selectRef = useRef(null);

    const onSelectOptionChanged = () => {
        props.selectChanged(selectRef.current.value)
    }

    let content = Object.keys(data).map(option => {
        return !data[option].alreadyExists ? <option key={option} value={data[option].label}>{data[option].label}</option> : null
    });

    return (
        <div className={classes.Select}>
            <select onChange={onSelectOptionChanged} ref={selectRef}>
                {content}
            </select>
        </div>
    )
}

export default Select;