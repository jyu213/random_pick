import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { addTopicTitle, updateTopicTitle, addTopicItem, deleteTopicItem, updateTopicItem } from 'actions/List';

import OptionBtn from './OptionBtn';

import idMaker from 'utils/idMaker';
import { maxBy, find } from 'lodash';

import './style';

class Add extends Component {
    constructor(props) {
        super(props);

        let { title, items } = props;

        this.state = {
            /** @type {String} 主题 title */
            titleText: title,
            /** @type {String} 主题新子项目文本 */
            newItemText: '',
            /** @type {Object} 主题子项目是否编辑状态 */
            itemStates: items.map((item) => ({
                name: item.name,
                id: item.value,
                editState: false
            }))
        };
    }

    render() {
        let { topicId, title, items, addItem } = this.props;
        let { titleText, newItemText, itemStates } = this.state;
        let nodeList = items.map((item, index) => {
            let data = itemStates[index],
                itemState = data.editState,
                name = data.name;
            return (
                <dd className="add-box__item" key={item.value}>
                    { itemState ?
                        <input
                            className="form-input"
                            type="text"
                            value={name}
                            onChange={this.editItemChangeHandle.bind(this, index)}
                            onBlur={this.editItemBlurHandle.bind(this, index)}
                        />
                         :
                        <span className="add-box__text" onClick={this.editItemToggleHandle.bind(this, index, true)}>{item.name}</span>
                    }

                    { itemState ? null :
                        <a href="javascript:;"
                            className="btn btn-blue"
                            onClick={this.editItemToggleHandle.bind(this, index, true)}
                        >编辑</a> }
                    <a
                        href="javascript:;"
                        className="btn btn-blue"
                        onClick={this.deleteItemHandle.bind(this, item.value)}
                    >删除</a>
                </dd>
            );
        });

        return (
            <div>
                <dl className="add-box">
                    <dt className="add-box__header">
                        <label>
                            填写项目标题:
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            value={titleText}
                            onBlur={this.titleBlurHandle.bind(this)}
                            onChange={this.titleChangeHandle.bind(this)}
                        />
                    </dt>
                    <p className="add-box__list-info">列表选项内容：</p>
                    {nodeList.length > 0 ? nodeList : null}
                    { titleText !== '' &&
                        <dd className="add-box__item add-box__item_options">
                            <input
                                className="form-input"
                                type="text"
                                placeholder="add new item"
                                value={newItemText}
                                onChange={this.itemChangeHandle.bind(this)}
                            />
                            <a href="javascript:;" className="btn btn-blue" onClick={this.addItemHandle.bind(this)}>添加新选项</a>
                        </dd>
                    }
                </dl>
                <OptionBtn />
            </div>
        );
    }

    titleBlurHandle(event) {
        let value = event.currentTarget.value.trim();

        this.props.updateTopicTitle(value, this.props.topicId);
    }
    titleChangeHandle(event) {
        let value = event.currentTarget.value;

        this.setState({
            titleText: value
        });
    }
    itemChangeHandle(event) {
        let value = event.currentTarget.value;

        this.setState({
            newItemText: value
        });
    }
    addItemHandle() {
        let { titleText, newItemText, itemStates } = this.state,
            { topicId, addItem, items } = this.props;
        let maxItem = maxBy(items, (item) => {return item.value}) || {};
        let idx =  maxItem.value ? maxItem.value * 1 : 0;

        if (newItemText !== '') {
            addItem(topicId, newItemText, idx + 1);
            this.setState({
                newItemText: '',
                itemStates: [
                    ...itemStates,
                    {
                        id: idx + 1,
                        name: newItemText,
                        editState: false
                    }
                ]
            });
        }
    }
    editItemChangeHandle(index, event) {
        let state = this.state,
            value = event.currentTarget.value;

        this.setState({
            itemStates: [
                ...state.itemStates.slice(0, index),
                Object.assign({}, state.itemStates[index], {
                    name: value
                }),
                ...state.itemStates.slice(index + 1)
            ]
        });
    }
    editItemBlurHandle(index, event) {
        let id = this.state.itemStates[index].id,
            name = event.currentTarget.value;

        this.editItemToggleHandle(index);
        this.updateItemHandle(name, id);
    }
    editItemToggleHandle(index, flag = false) {
        let state = this.state;

        this.setState({
            itemStates: [
                ...state.itemStates.slice(0, index),
                Object.assign({}, state.itemStates[index], {
                    editState: flag
                }),
                ...state.itemStates.slice(index + 1)
            ]
        });
    }
    updateItemHandle(name, id) {
        let { topicId, updateItem } = this.props;
        updateItem(topicId, name, id);
    }
    deleteItemHandle(value) {
        let { topicId, deleteItem } = this.props;
        deleteItem(topicId, value);
    }
}

export default connect((state, props) => {
    let params = props.params || {},
        topicId = params.topicId || '';
    let list = state.topicList;
    let itemDetail = find(list, (item) => {
        return item.id === topicId;
    }) || [];
    let title = itemDetail.title || '';

    return {
        title: title,
        topicId: topicId,
        items: itemDetail.items || []
    };
}, (dispatch) => {
    return {
        updateTopicTitle: (title, topicId) => {
            // 修改
            if (topicId !== '') {
                dispatch(updateTopicTitle(title, topicId));
            } else {
                let newTopicId = idMaker(title);
                dispatch(addTopicTitle(title, newTopicId));
                browserHistory.replace(`/edit/${newTopicId}`);
            }
        },
        updateItem: (topicId, name, id) => {
            dispatch(updateTopicItem(topicId, name, id));
        },
        addItem: (topicId, name, id) => {
            dispatch(addTopicItem(topicId, name, id));
        },
        deleteItem: (topicId, id) => {
            dispatch(deleteTopicItem(topicId, id));
        }
    };
})(Add);
