const changeInputObjectValue = (actualObject, keyName, newData) => {
    const copiedObject = { ...actualObject };
    const copiedObjectElement = { 
        ...copiedObject[keyName],
        ...newData
    };

    copiedObject[keyName] = copiedObjectElement;

    return { ...copiedObject };
}

export default changeInputObjectValue;