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

const reducer = (state=initialState, action) => {
    switch(action.type) {
        default:
            break;
    }

    return state;
}

export default reducer;