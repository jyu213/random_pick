import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import { deleteSingleList } from 'actions/pickList';
import { find, isEmpty } from 'lodash';

import './style';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** @type {Object} 随机选中状态值 */
            item: null
        };
    }
    render() {
        let selectItem = this.state.item;
        let {item, pickId, type, deletePick} = this.props;

        let nodeList = item.items.map((item) => {
            return (
                <li key={item.value}>{item.name}</li>
            );
        });

        return (
            <div className="detail-box">
                <div className="detail-options">
                    <p>{ !isEmpty(selectItem) && `选中的结果为： ${selectItem.name}` }</p>
                    <a
                        href="javascript:;"
                        onClick={this.randomHandle.bind(this)}
                    >Random~</a>
                </div>
                <ul className="detail-list">
                    {nodeList}
                </ul>
                <div className="option-btn">
                    <Link to="/" className="option-btn__item">back</Link>
                    { type !== '0' && <Link to={`/edit/${type}/${pickId}`} className="option-btn__item">edit</Link> }
                    { type !== '0' && <a
                        href="javascript:;"
                        className="option-btn__item"
                        onClick={deletePick.bind(this, pickId)}
                    >delete</a> }
                </div>
            </div>
        );
    }

    /**
     * 随机结果展示
     */
    randomHandle() {
        let list = this.props.item.items,
            len = list.length;
        if (len > 0) {
            let randomNumber = Math.floor(Math.random() * len);
            this.setState({
                item: list[randomNumber]
            });
        } else {
            console.log('你还没有添加选项');
        }
    }
};

export default connect((state, props) => {
    let { type, pickId, title } = props.params;
    let list = type !== '0' ? state.userList : state.defaultList;
    let itemDetail = find(list, (item) => {
        return item.id === pickId;
    });

    return {
        title: title,
        pickId: pickId,
        type: type,
        item: itemDetail
    };
}, (dispatch) => {
    return {
        deletePick: (id) => {
            dispatch(deleteSingleList(id));
            browserHistory.push('/');
        }
    }
})(Detail);