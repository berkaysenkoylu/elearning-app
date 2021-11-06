import { useState, useEffect } from 'react';

/*
    A valid password should include the following:
    - at least 8 characters, at most 16 characters long
    - at least 1 uppercase character
    - at least 1 numeric character
    - at least 1 non-alpha numeric character like: `! @ # $ % ^ &`
*/

const usePasswordValidation = password => {
    const [validLength, setValidLength] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);

    useEffect(() => {
        // Length validation
        setValidLength(password.length >= 8 && password.length <= 16);

        // Number validation
        setHasNumber(/\d/g.test(password)); 

        // Uppercase validation
        setUpperCase(/[A-Z]/g.test(password));

        // Special character validation
        setSpecialChar(/[!@#$%^&*]/g.test(password));
    }, [password]);

    return [validLength, hasNumber, upperCase, specialChar];
}

export default usePasswordValidation;