import React, { Component, PropTypes } from 'react';

function ListItem(props) {
    let { title, items } = props.data;

    let list = items.map((item) => {
        return (
            <div className="pick-list__desc" key={ item.name }>
                <p>{ item.name }</p>
                <p>{ item.value }</p>
            </div>
        );
    });

    return (
        <section className="pick-list__item">
            <h3>{title}</h3>
            { list }
        </section>
    );
}

export default ListItem;