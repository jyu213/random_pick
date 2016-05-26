import topicList from 'reducers/List';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { initTopicList } from 'actions/List';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'dev') {
    middlewares.push(createLogger());
}

let listStore = createStore(topicList, applyMiddleware(...middlewares));

listStore.dispatch(initTopicList());

export default listStore;