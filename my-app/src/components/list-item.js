import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

    const history = useHistory();

    const [userId, setUserId] = useState('');

    //ПЕРВОНАЧАЛЬНАЯ ОТРИСОВКА
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('isAdmin'))) {
            axios
                .get('http://localhost:8080/users/userId', {
                    headers: { token: localStorage.getItem('token') },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setUserId(res.data);
                        getTasksRequest(res.data);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    if (err.response.status === 401) {
                        history.push('/login');
                    }
                });
        } else {
            const id = history.location.pathname.split('/')[2];
            setUserId(id);
            getTasksRequest(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTasksRequest = (userId) => {
        axios
            .get(`http://localhost:8080/tasks/${userId}`, {
                headers: { token: localStorage.getItem('token') },
            })
            .then((res) => {
                const newTasks = filterTasks(res.data, type);

                dispatch(addNewTasks(newTasks));
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 401) {
                    history.push('/login');
                }
            });
    };

    //ОТФИЛЬТРОВКА ПО ТИПУ ЗАДАЧЬ
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
                    .post(
                        `http://localhost:8080/tasks/${userId}`,
                        {
                            name: value,
                            checked: false,
                            type,
                        },
                        {
                            headers: { token: localStorage.getItem('token') },
                        },
                    )
                    .then((res) => {
                        console.log(res.status);
                        if (res.status === 200) {
                            console.log('res', res);

                            dispatch(
                                createTask({
                                    name: value,
                                    checked: false,
                                    id: res.data._id,
                                    type,
                                }),
                            );
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        if (err.response.status === 401) {
                            history.push('/login');
                        }
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
            .put(
                `http://localhost:8080/tasks/${userId}`,
                {
                    id,
                    name: name,
                    checked: !checked,
                    type,
                },
                {
                    headers: { token: localStorage.getItem('token') },
                },
            )
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
            .delete(`http://localhost:8080/tasks/${userId}/${id}`, {
                headers: { token: localStorage.getItem('token') },
            })
            .then((res) => {
                console.log('res', res);
                if (res.status === 204) {
                    dispatch(deletedTask({ name, type }));
                }
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 401) {
                    history.push('/login');
                }
            });
    };

    //РЕДАКТИРОВАНИЕ
    const onEditTask = (prevState, newState, id) => {
        const copy = { ...errMessage };

        if (dublicateChange(newState) === -1) {
            axios
                .put(
                    `http://localhost:8080/tasks/${userId}`,
                    {
                        id,
                        name: newState,
                        checked: false,
                        type,
                    },
                    {
                        headers: { token: localStorage.getItem('token') },
                    },
                )
                .then((res) => {
                    console.log('res', res);
                    dispatch(editTask({ prevState, newState, type }));
                })
                .catch((err) => {
                    console.error(err);
                    if (err.response.status === 401) {
                        history.push('/login');
                    }
                });
            copy[type] = false;
            setValueImput('');
        } else {
            copy[type] = true;
        }

        setErrMessage(copy);
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
                            <div className='form-checkbox'>
                                <input
                                    type='checkbox'
                                    id={el.name}
                                    className='checkmark'
                                    checked={el.checked}
                                    onChange={(event) =>
                                        handleCheckInput(
                                            event,
                                            el.name,
                                            el.id,
                                            el.checked,
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

                                {JSON.parse(localStorage.getItem('isAdmin')) && (
                                    <BtnDelete
                                        onChecked={el.checked}
                                        onClicBtn={(event) =>
                                            handleClickBtnDeleted(event, el.name, el.id)
                                        }
                                        valueBtn={el.name}
                                    />
                                )}
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
