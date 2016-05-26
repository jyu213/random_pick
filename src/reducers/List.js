import { combineReducers } from 'redux';
import {
    UPDATE_TOPIC_LIST
} from 'actions/List';

function topicList(state = {}, action) {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_TOPIC_LIST:
            return {
                ...state,
                topicList: payload
            };
        default:
            return state;
    }
}

export default topicList;