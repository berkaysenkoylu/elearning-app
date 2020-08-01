import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    isAuth: false,
    userId: null,
    userEmail: null,
    userStatus: null,
    redirectPath: null
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
                userStatus: null
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
                userStatus: action.status
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
                userStatus: null
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
                userStatus: null
            });
        default:
            break;
    }

    return state;
}

export default reducer;