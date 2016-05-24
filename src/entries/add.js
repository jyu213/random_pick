import React, { Component } from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AddView from 'components/Add';

class Add extends Component {
    render() {
        let { params } = this.props;

        return (
            <div>
                <AddView params={params} />
            </div>
        );
    }
}

export default Add;

