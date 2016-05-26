import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import store from 'store/List';

import Header from 'components/Header';
import Footer from 'components/Footer';
import List from 'components/List';
import Detail from 'components/Detail';
import Edit from 'components/Edit';
import NoMatch from 'components/NoMatch';

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
        {path: 'views', component: List},
        {path: 'add', component: Edit},
        {path: 'edit/:topicId', component: Edit},
        {path: 'detail/:topicId', component: Detail},
        {path: '*', component: NoMatch}
    ]
};

render((
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
), document.getElementById('wrap'));