import React, { Component, PropTypes } from 'react';

import './style';

function Header(props) {
    let {title} = props;

    console.log(props, title)
    return (
        <header className="header">
            {title || 'Random Pick'}
        </header>
    );
}

Header.propTypes = {
    title: React.PropTypes.string
};

export default Header;