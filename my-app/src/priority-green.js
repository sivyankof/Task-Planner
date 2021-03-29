import React from 'react';
import TodoList from './todolist';

class PriorityGreen extends TodoList {
    constructor(props) {
        super(props);
        this.state = {color: 'green', items: 'qwe'};
        console.log(props);
    }

    render() {
        return <TodoList items={this.state.items} className={this.state.color} />;
    }
}

export default PriorityGreen;
