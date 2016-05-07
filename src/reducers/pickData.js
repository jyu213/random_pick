import { combineReducers } from 'redux';
import { TEST } from 'actions/pick';

function pickData(state = {}, action) {
    const {type} = action;

    switch (type) {
        case TEST:
            return state;
        default:
            return state;
    }
}

export default pickData;