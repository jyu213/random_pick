import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ListItem from './listItem';
import OptionBtn from './OptionBtn';

import './style';

class List extends Component {
    render() {
        let { topicList } = this.props;
        let list = topicList || [];

        let NodeList = list.map((item) => {
            return (<ListItem data={item} key={item.id} />);
        });

        return (
            <div className="topic-box">
                <div className="topic-list">
                    { NodeList }
                </div>
                <OptionBtn />
            </div>
        );
    }
};

export default connect((state) => {
    return {
        topicList: state.topicList
    };
})(List);