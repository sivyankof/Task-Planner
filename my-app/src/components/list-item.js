import React, { useState } from 'react';
import InputTask from './input-task';
import BtnDelete from './delete-btn';
import EditTask from './edit-task-btn';

const ItemList = (props) => {
    const [valueImput, setValueImput] = useState('');
    const [tasksArr, setTasks] = useState([]);

    const handleChange = (e) => {
        setValueImput(e.target.value);
    };

    const handleKeyDawn = (e) => {
        if (e.key === 'Enter') {
            if (valueImput.trim().length !== 0) {
                setTasks(tasksArr.concat(valueImput));
                setValueImput('');
            } else {
                setValueImput('');
                return;
            }
        }
    };
    const handleClickBtnDeleted = (e) => {
        let target = e.target;

        tasksArr.forEach((el, i) => {
            if (el === target.name) {
                tasksArr.splice(i, 1);
                setTasks([...tasksArr]);
            }
        });
    };

    const NewNameTask = (e) => {
        if (e.key === 'Enter') {
            let prevState = e.target.placeholder;
            let newState = e.target.value;

            tasksArr.forEach((el, i) => {
                if (el === prevState) {
                    tasksArr.splice(i, 1, newState);
                    setTasks([...tasksArr]);
                }
            });
            return 1111;
        }
    };

    return (
        <section className={props.className}>
            <h2>{props.name}</h2>
            <ul>
                {tasksArr.map((el, i) => {
                    return (
                        <li key={i}>
                            <div>
                                <input type='checkbox' id={el} name={el} />
                                <label htmlFor={el}>{el}</label>
                            </div>
                            <div>
                                <EditTask
                                    value={el}
                                    placeholderValue={el}
                                    onClickKey={NewNameTask}
                                />
                                <BtnDelete onClicBtn={handleClickBtnDeleted} valueBtn={el} />
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
