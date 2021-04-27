import React, { useState } from 'react';
import { connect } from 'react-redux';

import InputTask from './input-task';
import BtnDelete from './delete-btn';
import EditTask from './edit-task-btn';
import { createTask, toggleTodo, deletedTask, editTask } from '../redux/actions/taskActions';

const ItemList = ({
    type,
    name,
    className,
    createTask,
    tasks,
    toggleTodo,
    deletedTask,
    editTask,
}) => {
    const [valueImput, setValueImput] = useState('');
    const [errMessage, setErrMessage] = useState({
        priorityLow: '',
        priorityMiddle: '',
        priorityHigh: '',
    });

    const handleChange = (event) => {
        setValueImput(event.target.value);
    };

    const handleKeyDawn = (event) => {
        let value = valueImput.trim();
        if (event.key === 'Enter') {
            if (value.length !== 0) {
                if (tasks[type].findIndex((el) => el.name === value) !== -1) {
                    const copy = { ...errMessage };
                    copy[type] = true;

                    setErrMessage(copy);
                } else {
                    createTask({ name: value, checked: false, type });

                    const copy = { ...errMessage };
                    copy[type] = false;

                    setErrMessage(copy);

                    setValueImput('');
                }
            } else {
                setValueImput('');
                return;
            }
        }
    };

    const onNewNameTask = (prevState, newState) => {
        editTask({ prevState, newState, type });
    };

    const handleCheckInput = (event, name) => {
        toggleTodo({ name, type });
    };

    const handleClickBtnDeleted = (event, name) => {
        deletedTask({ name, type });
    };

    return (
        <section className={className} type={type}>
            <h2>{name}</h2>
            <ul>
                {tasks[type].map((el, i) => {
                    return (
                        <li key={i}>
                            <div className='form-checkbox'>
                                <input
                                    type='checkbox'
                                    id={el.name}
                                    className='checkmark'
                                    checked={el.checked}
                                    onChange={(event) => handleCheckInput(event, el.name)}
                                />
                                <label htmlFor={el.name}>{el.name}</label>
                            </div>
                            <div>
                                <EditTask
                                    value={el.name}
                                    placeholderValue={el.name}
                                    newNameTask={onNewNameTask}
                                />
                                <BtnDelete
                                    onChecked={el.checked}
                                    onClicBtn={(event) => handleClickBtnDeleted(event, el.name)}
                                    valueBtn={el.name}
                                />
                            </div>
                        </li>
                    );
                })}
                {errMessage[type] && <span>Задание с таким именем уже существует!</span>}
            </ul>
            <InputTask
                inputValue={valueImput}
                onChangeInput={handleChange}
                onKeyEnd={handleKeyDawn}
            />
        </section>
    );
};

const mapStateToProps = (state) => {
    return { tasks: state.taskReducer };
};

export default connect(mapStateToProps, { createTask, toggleTodo, deletedTask, editTask })(
    ItemList,
);
