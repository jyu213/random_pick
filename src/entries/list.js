import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'store/pickList';

import Header from 'components/Header';
import Footer from 'components/Footer';
import List from 'components/List';


class ListDetail extends Component {
    render() {
        return (
            <List />
        );
    }
}

export default ListDetail;

