import pickList from 'reducers/pickList';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { setDefaultList } from 'actions/pickList';
import defaultListValue from '../data/defaultList';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'dev') {
    middlewares.push(createLogger());
}

let listStore = createStore(pickList, applyMiddleware(...middlewares));

listStore.dispatch(setDefaultList(defaultListValue));
// listStore.dispatch();

export default listStore;