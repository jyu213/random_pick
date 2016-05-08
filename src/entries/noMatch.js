import React, { Component } from 'react';
import { Link } from 'react-router';

import store from 'store/pickList';

import Header from 'components/Header';
import Footer from 'components/Footer';
import List from 'components/List';


class noMatch extends Component {
    render() {
        return (
            <div>
                this is noMatch
                <Link to="/">返回首页</Link>
                <Link to="/add">list</Link>
            </div>
        );
    }
}

export default noMatch;

