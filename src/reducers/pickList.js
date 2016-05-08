import { combineReducers } from 'redux';
import {
    ADD_DEFAULT_LIST
} from 'actions/pickList';

function pickList(state = {}, action) {
    const {type, payload} = action;

    switch (type) {
        case ADD_DEFAULT_LIST:
            return {
                ...state,
                defaultList: payload
            };
        default:
            return state;
    }
}

export default pickList;