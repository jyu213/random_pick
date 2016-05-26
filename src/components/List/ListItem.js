import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

function ListItem(props) {
    let { id, title, items } = props.data;

    // let list = items.map((item) => {
    //     return (
    //         <div className="topic-list__desc" key={ item.value }>
    //             <p>{ item.name }</p>
    //             <p>{ item.value }</p>
    //         </div>
    //     );
    // });

    return (
        <section className="topic-list__item">
            <Link to={`/detail/${id}`} className="topic-list__link">{title}</Link>
        </section>
    );
}

export default ListItem;