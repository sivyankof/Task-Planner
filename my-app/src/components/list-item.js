import React, { useEffect, useState } from 'react';
import InputTask from './input-task';
import BtnDelete from './delete-btn';
import EditTask from './edit-task-btn';

const ItemList = (props) => {
    const [valueImput, setValueImput] = useState('');
    const [tasksArr, setTasks] = useState([]);

    const handleChange = (event) => {
        setValueImput(event.target.value);
    };

    const handleKeyDawn = (event) => {
        if (event.key === 'Enter') {
            if (valueImput.trim().length !== 0) {
                if (tasksArr.findIndex((el) => el.name === valueImput) === -1) {
                    const tasksArrCopy = [...tasksArr];

                    tasksArrCopy.push({ name: valueImput, checked: false });

                    setTasks(tasksArrCopy);
                    setValueImput('');
                } else {
                    setValueImput('');
                    return;
                }
            }
        }
    };

    const onNewNameTask = (prevState, newState) => {
        const tasksArrCopy = [...tasksArr];

        tasksArrCopy.forEach((el, i) => {
            if (el.name === prevState) {
                tasksArrCopy[i].name = newState;
                return setTasks(tasksArrCopy);
            }
        });
    };

    const onChekedInput = (event) => {
        let check = event.target.checked;

        const tasksArrCopy = [...tasksArr];

        let index = tasksArrCopy.findIndex((el, i) => {
            return el.name === event.target.name;
        });

        tasksArrCopy[index].checked = check;
        console.log(tasksArrCopy);
        return setTasks(tasksArrCopy);
    };

    const handleClickBtnDeleted = (event) => {
        let target = event.target;

        const tasksArrCopy = [...tasksArr];

        let index = tasksArrCopy.findIndex((el, i) => {
            return el.name === target.name;
        });

        tasksArrCopy.splice(index, 1);
        console.log(tasksArrCopy);
        setTasks(tasksArrCopy);
    };

    return (
        <section className={props.className}>
            <h2>{props.name}</h2>
            <ul>
                {tasksArr.map((el, i) => {
                    return (
                        <li key={i}>
                            <div>
                                <input
                                    type='checkbox'
                                    id={el.name}
                                    name={el.name}
                                    onChange={onChekedInput}
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
                                    onClicBtn={handleClickBtnDeleted}
                                    valueBtn={el.name}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
            <InputTask
                inputValue={valueImput}
                onChangeInput={handleChange}
                onKeyEnd={handleKeyDawn}
            />
        </section>
    );
};

export default ItemList;
