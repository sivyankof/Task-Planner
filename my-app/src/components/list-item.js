import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import InputTask from './input-task';
import BtnDelete from './delete-btn';
import EditTask from './edit-task-btn';
import {
    createTask,
    toggleTodo,
    deletedTask,
    editTask,
    addNewTasks,
} from '../redux/actions/taskActions';

export const ItemList = ({ type, name, className }) => {
    const [valueImput, setValueImput] = useState('');

    const [errMessage, setErrMessage] = useState({
        priorityLow: '',
        priorityMiddle: '',
        priorityHigh: '',
    });

    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.taskReducer);

    // ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА ТАСКОВ
    useEffect(() => {
        axios
            .get('http://localhost:8080/tasks')
            .then((res) => {
                
                const newTasks = filterTasks(res.data, type);

                dispatch(addNewTasks(newTasks));
            })
            .catch((err) => {
                console.error('err', err);
            });// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterTasks = (tasks, type) => {
        return tasks.filter((task) => task.type === type);
    };

    const handleChange = (event) => {

        setValueImput(event.target.value);
        
        if (event.target.value.length === 0) {

            const copy = { ...errMessage };
            
            copy[type] = false;

            setErrMessage(copy);
        }
    };

    //ДОБАВЛЕНИЕ ЗАДАЧИ
    const handleKeyDawn = (event) => {
        let value = valueImput.trim();
        const copy = { ...errMessage };

        if (event.key === 'Enter' && value.length !== 0) {
            if (dublicateChange(value) === -1) {
                axios
                    .post('http://localhost:8080/tasks', {
                        name: value,
                        checked: false,
                        type,
                    })

                    .then((res) => {
                        console.log('res', res);

                        dispatch(createTask({ name: value, checked: false, type }));
                    })
                    .catch((err) => {
                        console.error('err', err);
                    });

                copy[type] = false;
                setValueImput('');
            } else {
                copy[type] = true;
            }

            setErrMessage(copy);
        }
    };

    // TOOGLE
    const handleCheckInput = (event, name, id, checked) => {
        axios
            .put(`http://localhost:8080/tasks/${id}`, {
                name: name,
                checked: !checked,
                type,
            })
            .then((res) => {
                console.log('res', res);
                dispatch(toggleTodo({ name, type }));
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    //УДАЛЕНИЕ
    const handleClickBtnDeleted = (event, name, id) => {
        console.log(`задача ${name} удалена`);

        axios
            .delete(`http://localhost:8080/tasks/${id}`)
            .then((res) => {
                console.log('res', res);

                dispatch(deletedTask({ name, type }));
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    //РЕДАКТИРОВАНИЕ
    const onEditTask = (prevState, newState, id) => {
        if (dublicateChange(newState) === -1) {
            axios
                .put(`http://localhost:8080/tasks/${id}`, {
                    name: newState,
                    checked: false,
                    type,
                })
                .then((res) => {
                    console.log('res', res);

                    dispatch(editTask({ prevState, newState, type }));
                })
                .catch((err) => {
                    console.error('err', err);
                });
        }
    };

    //ПРОВЕРКА НА ДУБЛИКАТ
    const dublicateChange = (value) => {
        let dublicateArr = []
            .concat(tasks.priorityLow, tasks.priorityMiddle, tasks.priorityHigh)
            .findIndex((el) => el.name === value);
        return dublicateArr;
    };

    return (
        <section className={className} type={type}>
            <h2>{name}</h2>
            <ul>
                {tasks[type].map((el, i) => {
                    return (
                        <li key={i}>
                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    id={el.name}
                                    className="checkmark"
                                    checked={el.checked}
                                    onChange={(event) =>
                                        handleCheckInput(
                                            event,
                                            el.name,
                                            el.id,
                                            el.checked
                                        )
                                    }
                                />
                                <label htmlFor={el.name}>{el.name}</label>
                            </div>
                            <div>
                                {el.checked !== true && (
                                    <EditTask
                                        id={el.id}
                                        value={el.name}
                                        placeholderValue={el.name}
                                        editTask={onEditTask}
                                    />
                                )}
                                <BtnDelete
                                    onChecked={el.checked}
                                    onClicBtn={(event) =>
                                        handleClickBtnDeleted(event, el.name, el.id)
                                    }
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
