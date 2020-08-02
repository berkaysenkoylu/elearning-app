import * as actionTypes from './actionTypes';
import axiosAuth from '../../axiosUtility/axios-auth';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        path: '/auth/signup-success'
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

export const signupRedirect = () => {
    return {
        type: actionTypes.SIGNUP_REDIRECT
    };
};

export const signup = (userData) => {
    return dispatch => {
        dispatch(signupStart());

        axiosAuth.post('/signup', userData).then(response => {
            dispatch(signupSuccess());
        }).catch(error => {
            dispatch(signupFail(error.response.data.message));
        });
    };
};

export const authTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const authCheckState = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if(token === null){
            dispatch(logout());
        }
        else 
        {
            const expirationDate = new Date(localStorage.getItem('expirationTime'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');

                const response = await axiosAuth.get(`/${userId}`);
                const status = response.data.user.status;
                const email = response.data.user.email;

                dispatch(loginSuccess(token, userId, email, status));
                dispatch(authTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    }
};

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
}

export const loginSuccess = (token, userId, email, status) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        userId: userId,
        email: email,
        path: '/',
        status: status
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const login = (userData) => {
    return dispatch => {
        dispatch(loginStart());

        axiosAuth.post('/login', userData).then(response => {
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);

            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("expirationTime", expirationTime);

            dispatch(loginSuccess(response.data.token, response.data.userId, response.data.email, response.data.status));
            dispatch(authTimeout(+response.data.expiresIn));
        }).catch(error => {
            dispatch(loginFail(error.response.data.message));
        })
    }
}

export const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    return {
        type: actionTypes.LOGOUT
    }
}

export const passwordResetRequestStart = () => {
    return {
        type: actionTypes.PASSWORD_RESET_REQUEST_START
    };
};

export const passwordResetRequestSuccess = () => {
    return {
        type: actionTypes.PASSWORD_RESET_REQUEST_SUCCESS,
        path: '/'
    };
};

export const passwordResetRequestFail = (error) => {
    return {
        type: actionTypes.PASSWORD_RESET_REQUEST_FAIL,
        error: error,
        path: '/auth/reset-password'
    };
};

export const passwordResetRequest = (email) => {
    return dispatch => {
        dispatch(passwordResetRequestStart());

        axiosAuth.post('/password-reset-request', { email }).then(result => {
            dispatch(passwordResetRequestSuccess());
        }).catch(error => {
            dispatch(passwordResetRequestFail(error.response.data.message));
        });
    };
};


// TODO
export const resetPasswordStart = () => {
    return {
        type: actionTypes.PASSWORD_RESET_START
    };
};

export const resetPasswordSuccess = () => {
    return {
        type: actionTypes.PASSWORD_RESET_SUCCESS,
        path: '/'
    };
}

export const resetPasswordFail = (error) => {
    return {
        type: actionTypes.PASSWORD_RESET_FAIL,
        error: error,
        path: '/auth/reset-password'
    };
}

export const resetPassword = (formData) => {
    return dispatch => {
        dispatch(resetPasswordStart());

        const data = {
            password: formData.password,
            token: formData.token
        };

        axiosAuth.put('/password-reset', data).then(response => {
            dispatch(resetPasswordSuccess());
        }).catch(error => {
            dispatch(resetPasswordFail(error.response.data.message));
        });
    }
}