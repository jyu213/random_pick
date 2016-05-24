import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { addTitlePick, updateTitlePick, addItemPick, deleteItemPick, updateItemPick } from 'actions/pickList';

import idMaker from 'utils/idMaker';
import { maxBy, find } from 'lodash';

import './style';

class Add extends Component {
    constructor(props) {
        super(props);

        let { title, item } = props;
        let list = item.items || [];

        this.state = {
            titleText: title,
            newItemText: '',
            itemStates: list.map((item) => ({
                name: item.name,
                id: item.value,
                editState: false
            }))
        };
    }

    render() {
        let { pickId, type, title, item, addItem } = this.props;
        let list = item.items || [];
        let { titleText, newItemText, itemStates } = this.state;
        let nodeList = list.map((item, index) => {
            let data = itemStates[index],
                itemState = data.editState,
                name = data.name;
            return (
                <dd className="add-box__item" key={item.value}>
                    {itemState ?
                        <input
                            type="text"
                            value={name}
                            onChange={this.editItemChangeHandle.bind(this, index)}
                            onBlur={this.editItemBlurHandle.bind(this, index)}
                        />
                         :
                        <span onClick={this.editItemToggleHandle.bind(this, index, true)}>{item.name}</span>
                    }

                    <a href="javascript:;" onClick={this.deleteItemHandle.bind(this, item.value)}>delete</a>
                </dd>
            );
        });

        return (
            <div>
                <dl className="add-box">
                    <dt className="add-box__header">
                        <label>
                            填写标题:
                        </label>
                        <input
                            type="text"
                            value={titleText}
                            onBlur={this.titleBlurHandle.bind(this)}
                            onChange={this.titleChangeHandle.bind(this)}
                        />
                    </dt>
                    {nodeList.length > 0 ? nodeList : null}
                    { titleText !== '' &&
                        <dd className="add-box__item add-box__item_options">
                            <input
                                type="text"
                                value={newItemText}
                                onChange={this.itemChangeHandle.bind(this)}
                            />
                            <a href="javascript:;" onClick={this.addItemHandle.bind(this)}>add item</a>
                        </dd>
                    }
                </dl>
                <div className="option-btn">
                    <Link to="/" className="option-btn__item">back</Link>
                </div>
            </div>
        );
    }

    titleBlurHandle(event) {
        let value = event.currentTarget.value.trim();

        this.props.updateTitlePick(value, this.props.pickId);
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
            { pickId, addItem, item } = this.props;
        let list = item.items || [];
        let maxItem = maxBy(list, (item) => {return item.value}) || {};
        let idx =  maxItem.value ? maxItem.value * 1 : 0;

        if (newItemText !== '') {
            addItem(pickId, newItemText, idx + 1);
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
        let { pickId, updateItem } = this.props;

        updateItem(pickId, name, id);
    }
    deleteItemHandle(value) {
        let { pickId, deleteItem } = this.props;
        deleteItem(pickId, value);
    }
}

export default connect((state, props) => {
    let params = props.params || {},
        type = params.type || '',
        pickId = params.pickId || '';

    let list = type !== '0' ? state.userList : state.defaultList;

    let itemDetail = find(list, (item) => {
        return item.id === pickId;
    }) || [];
    let title = itemDetail.title || '';

    return {
        pickId: pickId,
        type: type,
        item: itemDetail,
        title: title
    };
}, (dispatch) => {
    return {
        updateTitlePick: (value, pickId) => {
            // 修改
            if (pickId !== '') {
                dispatch(updateTitlePick(value, pickId));
            } else {
                let newPickId = idMaker(value);
                dispatch(addTitlePick(value, newPickId));
                browserHistory.replace(`/edit/1/${newPickId}`);
            }
        },
        updateItem: (pickId, name, id) => {
            dispatch(updateItemPick(pickId, name, id));
        },
        addItem: (pickId, name, id) => {
            dispatch(addItemPick(pickId, name, id));
        },
        deleteItem: (pickId, id) => {
            dispatch(deleteItemPick(pickId, id));
        }
    };
})(Add);
