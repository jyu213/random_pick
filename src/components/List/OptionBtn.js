import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function OptionsBtn(props) {
    return (
        <div className="option-btn">
            <Link to="/add" className="option-btn__item">新增</Link>
        </div>
    );
}

export default OptionsBtn;