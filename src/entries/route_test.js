import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import store from 'store/pickList';


let App = React.createClass({
    render() {
        return (
            <div>
                <Link to="/add">as</Link>
                {this.props.children}
            </div>
        );
    }
});
let Add = React.createClass({
    render() {
        return (
            <p>this is add fn</p>
        );
    }
});
let Edit = React.createClass({
    render() {
        return (
            <p>edit</p>
        );
    }
});
let NoMatch = React.createClass({
    render() {
        return (<p>nomatch</p>)
    }
})

const routes = {
    path: '/',
    component: App,
    childRoutes: [
        {path: 'add', component: Add},
        {path: 'edit/:pickId', component: Edit},
        {path: '*', component: NoMatch}
    ]
};

render((
    <Router history={browserHistory} routes={routes} />

),document.getElementById('wrap'));