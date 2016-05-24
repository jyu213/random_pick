import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

function ListItem(props) {
    let { id, title, items } = props.data,
        type = props.type;

    let list = items.map((item) => {
        return (
            <div className="pick-list__desc" key={ item.value }>
                <p>{ item.name }</p>
                <p>{ item.value }</p>
            </div>
        );
    });

    return (
        <section className="pick-list__item">
            <h3><Link to={`/detail/${type}/${id}`}>{title}</Link></h3>
            { list }
        </section>
    );
}

export default ListItem;