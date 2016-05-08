import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';

import store from 'store/pickList';

import App from './app';
import Add from './add';
import Edit from './edit';
import Detail from './detail';
import NoMatch from './noMatch';


import Header from 'components/Header';
import Footer from 'components/Footer';
import List from 'components/List';

const routes = {
    path: '/',
    component: App,
    childRoutes: [
        {path: 'add', component: Add},
        {path: 'edit/:pickId', component: Edit},
        {path: 'detail/:pickId', component: Detail},
        {path: '*', component: NoMatch}
    ]
};

render((
    <Router history={browserHistory} routes={routes} />

),document.getElementById('wrap'));