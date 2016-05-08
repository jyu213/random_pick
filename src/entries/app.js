import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from 'store/pickList';

import Header from 'components/Header';
import Footer from 'components/Footer';
import List from 'components/List';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="container">
                    <Header />
                    {this.props.children}
                    <Footer />
                </div>
            </Provider>
        );
    }
}

export default App;

