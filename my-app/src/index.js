import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

import TodoList from './todolist';
// import PriorityGreen from './priority-green';


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '', color: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    render() {
        return (
            <div className='forma'>
                <h1>Список дел</h1>
                {/* <PriorityGreen items={this.state.items} el={this.state.color}/> */}
                <TodoList el={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='new-todo'>Что нужно сделать?</label>
                    <br />
                    <br />
                    <input
                        id='new-todo'
                        onChange={this.handleChange}
                        value={this.state.text}
                        autoComplete='off'
                    />
                    <br />
                    <br />
                    <select id='important' onChange={this.changeColor}>
                        <option value='none'>none</option>
                        <option value='green'>green</option>
                        <option value='yelow'>yelow</option>
                        <option value='red'>red</option>
                    </select>
                    <button>Добавить #{this.state.items.length + 1}</button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }
    changeColor(e) {
        this.setState({ color: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0 || this.state.color === '') {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now(),
            color: this.state.color,
        };
        this.setState((state) => ({
            items: state.items.concat(newItem),
            text: '',
            color: '',
        }));
    }
}

// export default TodoApp;

ReactDOM.render(<TodoApp />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
