import React, { Component } from 'react';
import { Link } from 'react-router';

function NoMatch() {
    let style = {
        textAlign: 'center'
    };

    return (
        <div>
            <p className="empty">无匹配项目</p>
            <div style={style}>
                <Link className="btn btn-blue" to="/">返回首页</Link>
                <Link className="btn btn-blue" to="/add">list</Link>
            </div>
        </div>
    );
}

export default NoMatch;
