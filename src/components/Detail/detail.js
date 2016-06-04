import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { deleteSingleList } from 'actions/List';
import { find, isEmpty } from 'lodash';

import OptionBtn from './OptionBtn';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** @type {Object} 随机选中结果状态值 */
            item: null
        };
    }
    /**
     * @TODO: random loading..
     */
    render() {
        let selectItem = this.state.item;
        let { items, topicId, deleteTopic } = this.props;
        let nodeList = items.map((item) => {
            return (
                <dd key={item.value}>{item.name}</dd>
            );
        });

        return (
            <div className="detail-box">
                <div className="detail-options">
                    <p className="detail-options__text">
                        { !isEmpty(selectItem) && `选中的结果为： ${selectItem.name}` }
                    </p>
                    <p className="detail-options__option">
                        <a
                            className="detail-options__btn"
                            href="javascript:;"
                            onClick={this.randomHandle.bind(this)}
                        >Random~</a>
                    </p>
                </div>
                <dl className="detail-list">
                    <dt>随机选项为：</dt>
                    {nodeList}
                </dl>
                <OptionBtn id={topicId} deleteTopic={deleteTopic} />
            </div>
        );
    }

    /**
     * 随机结果展示
     */
    randomHandle() {
        let items = this.props.items,
            len = items.length,
            stateObj;

        if (len > 0) {
            // @REVIEW: http://pinggod.com/2016/Math-random/
            let randomNumber = Math.floor(Math.random() * len);
            stateObj = items[randomNumber];
        } else {
            stateObj = {
                name: '你还没有添加选项',
                value: -1
            };
        }
        this.setState({
            item: stateObj
        });
    }
};

export default connect((state, props) => {
    let { id, items } = props.params;

    return {
        topicId: id,
        items: items
    };
}, (dispatch) => {
    return {
        deleteTopic: (id) => {
            dispatch(deleteSingleList(id));
            // @TODO?? 该逻辑是否放在这里?
            browserHistory.push('/');
        }
    }
})(Detail);
