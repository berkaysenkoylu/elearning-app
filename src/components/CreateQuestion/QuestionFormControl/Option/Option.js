import React from 'react';;

const Option = props => {
    return (
        <div>
            <input
                type="text"
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}
                // onBlur={onInputFocusLost}
                // onFocus={onInputFocused}
            />
            
            <input
                type="radio"
                name={props.optionName}
                id={props.optionName}
            />
        </div>
    );
};

export default Option;;