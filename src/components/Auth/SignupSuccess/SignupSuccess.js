import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signupRedirect } from '../../../store/actions/index';
import classes from './SignupSuccess.module.scss';

const SignupSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signupRedirect());
    }, [dispatch]);

    return (
        <div className={classes.SignupSuccess}>
            <h2 className={classes.SignupSuccess__Header}>
                Signup Success!
            </h2>

            <div className={classes.SignupSuccess__Content}>
                Press <Link to="/auth">here</Link> to login!
            </div>
        </div>
    )
}

export default SignupSuccess;