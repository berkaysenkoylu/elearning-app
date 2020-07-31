import React, { useState } from 'react';

// import Input from '../../UI/Input/Input';

const RequestPasswordReset = (props) => {
    const [email, setEmail] = useState({
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
    });

    return (
        <div>
            REQUEST PASSWORD
        </div>
    )
}

export default RequestPasswordReset;