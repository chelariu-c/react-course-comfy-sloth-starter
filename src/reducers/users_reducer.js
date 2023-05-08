import {
    GET_USERS_BEGIN,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS,
    GET_USER_BEGIN,
    GET_USER_ERROR,
    GET_USER_SUCCESS,
} from "../actions";

const users_reducer = (state, action) => {
    if (action.type === GET_USER_BEGIN) {
        return {
            ...state,
            single_user_loading: true,
            single_user_error: false,
        };
    }

    if (action.type === GET_USER_SUCCESS) {
        return {
            ...state,
            single_user_loading: false,
            single_user: action.payload,
        };
    }
    if (action.type === GET_USER_ERROR) {
        return {
            ...state,
            single_user_loading: false,
            single_user_error: true,
        };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
};

export default users_reducer;
