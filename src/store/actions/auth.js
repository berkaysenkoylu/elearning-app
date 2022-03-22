import * as actionTypes from './actionTypes';
import axiosAuth from '../../axiosUtility/axios-auth';
// import axiosMessage from '../../axiosUtility/axios-message';

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

        if(token === null) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationTime'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');

                const response = await axiosAuth.get(`/${userId}`);
                const userData = response.data.user;

                dispatch(loginSuccess({
                    token: token,
                    userId: userId,
                    userImage: userData.avatarUrl,
                    status: userData.status,
                    messages: userData.messages
                }));
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

export const loginSuccess = ({ token, userId, userImage, status, messages }) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        userId: userId,
        userImage: userImage,
        path: '/',
        status: status,
        userMessages: messages
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
            const responseData = response.data.userData;
            const expirationTime = new Date(new Date().getTime() + responseData.expiresIn * 1000);

            localStorage.setItem("userId", responseData.userId);
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("expirationTime", expirationTime);

            dispatch(loginSuccess({
                token: responseData.token,
                userId: responseData.userId,
                userImage: responseData.userImage,
                status: responseData.status,
                messages: responseData.messages
            }));
            dispatch(authTimeout(+responseData.expiresIn));
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

export const changeAvatar = (newAvatarUrl) => {
    return {
        type: actionTypes.AVATAR_CHANGE,
        newUrl: newAvatarUrl
    };
}

// USER MESSAGES
// export const getMessageSuccess = (messageList) => {
//     return {
//         type: actionTypes.MESSAGE_FETCH_SUCCESS,
//         messages: messageList
//     };
// }

// export const getMessageFail = (error) => {
//     return {
//         type: actionTypes.MESSAGE_FETCH_FAIL,
//         error: error
//     };
// }

// export const getMessages = (userId, userToken) => {
//     return dispatch => {
//         let config = {
//             headers: {
//                 Authorization: 'Bearer ' + userToken
//             }
//         };

//         axiosMessage.get('/' + userId, config).then(response => {
//             dispatch(getMessageSuccess(response.data.messageList));
//         }).catch(error => {
//             dispatch(getMessageFail(error.response.data.message));
//         });
//     }
// }

export const updateMessages = (newMessages) => {
    return {
        type: actionTypes.UPDATE_MESSAGES,
        messages: newMessages
    }
}