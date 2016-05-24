import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import idMaker from 'utils/idMaker';
import defaultListValue from 'data/defaultList';
import { setDefaultList } from 'actions/pickList';
import ListItem from './listItem';
import OptionBtn from './OptionBtn';

import './style';

class List extends Component {
    constructor(props) {
        super(props);

        // 默认列表注入
        if (!localStorage.getItem('defaultList')) {
            let defaultListJson;
            defaultListValue.map((item) => {
                item.id = idMaker(item.title);
                return item;
            });
            defaultListJson = JSON.stringify(defaultListValue);
            localStorage.setItem('defaultList', defaultListJson);
        }
    }

    render() {
        let { userList, defaultList } = this.props;
        let type = userList && userList.length > 0 ? 1 : 0;
        let list = (type ? userList : defaultList) || [];

        let NodeList = list.map((item) => {
            return (<ListItem data={item} type={type} key={item.title} />);
        });

        return (
            <div className="pick-box">
                <div className="pick-list">
                    { NodeList }
                </div>
                <OptionBtn />
            </div>
        );
    }
};

export default connect((state) => {
    return {
        userList: state.userList,
        defaultList: state.defaultList
    };
}, (dispatch) => {
    return {
    }
})(List);