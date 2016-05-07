import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import store from 'store/pickStore';

import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';

ReactDom.render((
    <Provider store={store}>
        <div class="container">
            <Header />
            <Content />
            <Footer />
        </div>
    </Provider>
),
    document.getElementById('wrap')
);