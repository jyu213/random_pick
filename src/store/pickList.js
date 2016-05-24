import pickList from 'reducers/pickList';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { getDefaultList, getUserList, updateUserList } from 'actions/pickList';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'dev') {
    middlewares.push(createLogger());
}

let listStore = createStore(pickList, applyMiddleware(...middlewares));

listStore.dispatch(getDefaultList());
listStore.dispatch(getUserList());

// var unSubscribe = listStore.subscribe(function(){
//     console.log('dispatch!!!')
// })

export default listStore;