import React, { Component } from 'react';

import Detail from './detail';

class Edit extends Component {
    render() {
        let { params } = this.props;

        return (<Detail params={params} />);
    }
}

export default Edit;

