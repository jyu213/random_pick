import React, { Component } from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import DetailView from 'components/Detail';

class Detail extends Component {
    render() {
        let { params } = this.props;

        return (
            <div className="container">
                <Header title={params.title} />
                <DetailView params={params} />
                <Footer />
            </div>
        );
    }
}

export default Detail;

