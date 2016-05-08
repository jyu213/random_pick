import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addPickAction, editPickAction } from 'actions/pickList';

class OptionsBtn extends Component{
    render() {
        let { addPick, editPick } = this.props;

        return (
            <div className="option-btn">
                <a
                    href="javascript:;"
                    className="option-btn__item"
                    onClick={addPick}
                >add</a>
                <a
                    href="javascript:;"
                    className="option-btn__item"
                    onClick={editPick}
                >edit</a>
            </div>
        );
    }
}

OptionsBtn.propTypes = {
    addPick: PropTypes.func,
    editPick: PropTypes.func
};

export default connect((state) => {
    return {};
}, (dispatch) => {
    return {
        addPick: () => {
            dispatch(addPickAction);
        },
        editPick: () => {
            dispatch(editPickAction);
        }
    }
})(OptionsBtn);