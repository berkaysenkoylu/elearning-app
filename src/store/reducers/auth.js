import * as actionTypes from '../actions/actionTypes';

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
    userMessages: []
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
                username: null,
                redirectPath: null,
                userStatus: null,
                userImage: null,
                userMessages: []
            });
        case actionTypes.LOGIN_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                error: null,
                token: action.token,
                isAuth: true,
                userId: action.userId,
                username: action.username,
                redirectPath: action.path,
                userStatus: action.status,
                userImage: action.userImage
            });
        case actionTypes.LOGIN_FAIL:
            return updateObject(state, {
                isLoading: false,
                error: action.error,
                token: null,
                isAuth: false,
                userId: null,
                username: null,
                redirectPath: null,
                userStatus: null,
                userImage: null,
                userMessages: []
            });
        case actionTypes.LOGOUT:
            return updateObject(state, {
                isLoading: false,
                error: null,
                token: null,
                isAuth: false,
                userId: null,
                username: null,
                redirectPath: null,
                userStatus: null,
                userImage: null,
                userMessages: []
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
        case actionTypes.MESSAGE_FETCH_SUCCESS:
            return updateObject(state, {
                error: null,
                userMessages: action.messages
            });
        case actionTypes.MESSAGE_FETCH_FAIL:
            return updateObject(state, {
                userMessages: [],
                error: action.error
            });
        default:
            break;
    }

    return state;
}

export default reducer;