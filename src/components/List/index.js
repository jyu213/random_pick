import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setDefaultList } from 'actions/pickList';
import ListItem from './listItem';
import OptionBtn from './OptionBtn';

import './style';

class List extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        let { userList, defaultList } = this.props;
        let list = (userList && userList.length > 0 ? userList : defaultList) || [];

        let NodeList = list.map((item) => {
            return (<ListItem data={item} key={item.title} />);
        });

        return (
            <div className="pickBox">
                <div className="pickList">
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
        // hello: (par) => {
            // dispatch(action(par));
        // }
    }
})(List);