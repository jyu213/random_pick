import React, { Component } from 'react';

import store from 'store/pickList';

import Header from 'components/Header';
import Footer from 'components/Footer';
import List from 'components/List';


class noMatch extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <div>this is noMatch</div>
                <Footer />
            </div>
        );
    }
}

export default noMatch;

