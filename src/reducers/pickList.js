import { combineReducers } from 'redux';
import {
    ADD_DEFAULT_LIST,
    UPDATE_USER_LIST
} from 'actions/pickList';

function pickList(state = {}, action) {
    const {type, payload} = action;

    switch (type) {
        case ADD_DEFAULT_LIST:
            return {
                ...state,
                defaultList: payload
            };
        case UPDATE_USER_LIST:
            return {
                ...state,
                userList: payload
            };
        default:
            return state;
    }
}

export default pickList;