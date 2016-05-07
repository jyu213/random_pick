import pickData from 'reducers/pickData';
import { createStore } from 'redux';

let store = createStore(pickData);

export default store;