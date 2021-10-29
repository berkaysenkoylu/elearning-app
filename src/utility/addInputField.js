const INPUT_TEMPLATE = {
    elementType: '',
    elementConfig: {
        type: 'text',
        placeholder: ''
    },
    label: "",
    validation: {
        required: true
    },
    valid: false,
    touched: false,
    value: ''
};

const addInputField = (inputObj, newInputObj) => {
    const copiedInputObj = { ...inputObj };
    const { type, inputKey, placeholder, label, validation, touched, value, valid } = newInputObj;

    let newFormControl = { ...INPUT_TEMPLATE };
    let copiedConfig = { ...newFormControl.elementConfig };

    copiedConfig.placeholder = placeholder;
    newFormControl.elementType = type;
    newFormControl.elementConfig = copiedConfig;
    newFormControl.label = label;
    newFormControl.validation = validation;
    newFormControl.value = value || '';
    newFormControl.touched = touched || false;
    newFormControl.valid = valid || false;

    copiedInputObj[inputKey] = newFormControl;

    return {
        ...copiedInputObj
    };
}

export default addInputField;