import React, { Component } from 'react';

import store from 'store/pickList';

import Header from 'components/Header';
import Footer from 'components/Footer';
import List from 'components/List';


class Edit extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <div>this is edit</div>
                <Footer />
            </div>
        );
    }
}

export default Edit;

