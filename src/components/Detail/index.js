import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from 'components/Header';
import Footer from 'components/Footer';
import DetailView from './detail';

import './style';

class Detail extends Component {
    render() {
        let props = this.props;
        let currentId = props.params.topicId;
        let list = props.topicList;

        // 取当前 ITEM 信息
        let currentItem;
        list.forEach((item) => {
            if (item.id === currentId) {
                currentItem = item;
            }
        });

        if (!currentItem) {
            return (
                <div className="empty">没有该主题诶，返回<Link to="/">主页</Link>重新试试？</div>
            );
        }
        return (
            <div>
                <Header title={currentItem.title} />
                <DetailView id={currentId} params={currentItem} />
                <Footer />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        topicList: state.topicList
    };
})(Detail);
