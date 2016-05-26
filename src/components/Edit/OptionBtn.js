import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function OptionsBtn(props) {
    return (
        <div className="option-btn">
            <Link to="/" className="option-btn__item">返回</Link>
        </div>
    );
}

export default OptionsBtn;
