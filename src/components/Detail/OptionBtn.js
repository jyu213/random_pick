import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function OptionsBtn(props) {
    let { id, deleteTopic } = props;

    return (
        <div className="option-btn">
            <Link to="/" className="option-btn__item">返回</Link>
            <Link to={`/edit/${id}`} className="option-btn__item">编辑</Link>
            <a
                href="javascript:;"
                className="option-btn__item"
                onClick={deleteTopic.bind(this, id)}
            >删除</a>
        </div>
    );
}

export default OptionsBtn;