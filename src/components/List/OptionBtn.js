import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class OptionsBtn extends Component{
    render() {
        return (
            <div className="option-btn">
                <Link to="/add" className="option-btn__item">add</Link>
            </div>
        );
    }
}

OptionsBtn.propTypes = {
};

export default connect((state) => {
    return {};
})(OptionsBtn);