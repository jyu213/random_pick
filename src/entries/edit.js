import React, { Component } from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AddView from 'components/Add';

class Edit extends Component {
    render() {
        let { params } = this.props;

        return (
            <AddView params={params} />
        );
    }
}

export default Edit;