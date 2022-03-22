import * as actionTypes from '../actions/actionTypes';
import { BACKEND_ORIGIN } from '../../utility/apiUrl';
import io from 'socket.io-client';

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    isAuth: false,
    userId: null,
    userImage: null,
    userStatus: null,
    redirectPath: null,
    successfullSignup: false,
    userMessages: [],
    userSocket: null
};

// Utility function for state management
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_START:
            return updateObject(state, {
                isLoading: true,
                error: null,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: null,
                userStatus: null,
                userImage: null,
                userMessages: [],
                userSocket: null
            });
        case actionTypes.LOGIN_SUCCESS:
            let socket = io(BACKEND_ORIGIN, { auth: { userId: action.userId } });
            return updateObject(state, {
                isLoading: false,
                error: null,
                token: action.token,
                isAuth: true,
                userId: action.userId,
                redirectPath: action.path,
                userStatus: action.status,
                userImage: action.userImage,
                userMessages: action.userMessages,
                userSocket: socket
            });
        case actionTypes.LOGIN_FAIL:
            return updateObject(state, {
                isLoading: false,
                error: action.error,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: null,
                userStatus: null,
                userImage: null,
                userMessages: [],
                userSocket: null
            });
        case actionTypes.LOGOUT:
            typeof (state.userSocket || {}).disconnect === 'function' && state.userSocket.disconnect();

            return updateObject(state, {
                isLoading: false,
                error: null,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: null,
                userStatus: null,
                userImage: null,
                userMessages: [],
                userSocket: null
            });
        case actionTypes.SIGNUP_START:
            return updateObject(state, {
                isLoading: true,
                error: null,
                redirectPath: null
            });
        case actionTypes.SIGNUP_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                error: null,
                redirectPath: action.path,
                successfullSignup: true
            });
        case actionTypes.SIGNUP_FAIL:
            return updateObject(state, {
                isLoading: false,
                error: action.error,
                redirectPath: null,
                successfullSignup: false
            });
        case actionTypes.SIGNUP_REDIRECT:
            return updateObject(state, {
                isLoading: false,
                error: null,
                redirectPath: null,
                successfullSignup: false
            });
        case actionTypes.PASSWORD_RESET_REQUEST_START:
            return updateObject(state, {
                isLoading: true,
                error: null,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: null
            });
        case actionTypes.PASSWORD_RESET_REQUEST_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                error: null,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: action.path
            });
        case actionTypes.PASSWORD_RESET_REQUEST_FAIL:
            return updateObject(state, {
                isLoading: false,
                error: action.error,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: action.path
            });
        case actionTypes.PASSWORD_RESET_START:
            return updateObject(state, {
                isLoading: true,
                error: null,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: null
            });
        case actionTypes.PASSWORD_RESET_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                error: null,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: action.path
            });
        case actionTypes.PASSWORD_RESET_FAIL:
            return updateObject(state, {
                isLoading: false,
                error: action.error,
                token: null,
                isAuth: false,
                userId: null,
                redirectPath: action.path
            });
        case actionTypes.AVATAR_CHANGE:
            return updateObject(state, {
                userImage: action.newUrl
            });
        // case actionTypes.MESSAGE_FETCH_SUCCESS:
        //     return updateObject(state, {
        //         error: null,
        //         userMessages: action.messages
        //     });
        // case actionTypes.MESSAGE_FETCH_FAIL:
        //     return updateObject(state, {
        //         userMessages: [],
        //         error: action.error
        //     });
        case actionTypes.UPDATE_MESSAGES:
            return updateObject(state, {
                userMessages: action.messages
            });
        default:
            break;
    }

    return state;
}

export default reducer;