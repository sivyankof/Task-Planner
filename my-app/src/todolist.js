import React from 'react';

class TodoList extends React.Component {

    render() {
        return (
            <ul>
                {this.props.el.map((item) => (
                    <li key={item.id} className={item.color}>
                        {item.text}{' '}
                    </li>
                ))}
            </ul>
        );
    }
}

export default TodoList;
