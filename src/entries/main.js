import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import store from 'store/pickList';

// import App from './app';
import ListDetial from './list';
import Add from './add';
import Edit from './edit';
import Detail from './detail';
import NoMatch from './noMatch';

import Header from 'components/Header';
import Footer from 'components/Footer';
import List from 'components/List';

let App = React.createClass({
    render() {
        return (
            <div className="container">{this.props.children}</div>
        );
    }
});

const routes = {
    path: '/',
    component: App,
    indexRoute: {component: List},
    childRoutes: [
        {path: 'index', component: List},
        {path: 'add', component: Add},
        {path: 'edit/:type/:pickId', component: Edit},
        {path: 'detail/:type/:pickId', component: Detail},
        {path: '*', component: NoMatch}
    ]
};

render((
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
),document.getElementById('wrap'));