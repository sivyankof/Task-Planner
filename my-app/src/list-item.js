import React, { Fragment, useState } from 'react';
import InputTask from './input-task';
import BtnDelete from './delete-btn';

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
            }
        });

        setTasks([...tasksArr]);
    };

    return (
        <Fragment>
            <section className={props.className}>
                <h3>{props.name}</h3>
                <ul>
                    {tasksArr.map((el, i) => {
                        return (
                            <li key={i}>
                                <div>
                                    <input type='checkbox' id={el} name={el} />
                                    <label key={i} htmlFor={el}>
                                        {el}
                                    </label>
                                </div>
                                <BtnDelete onClicBtn={handleClickBtnDeleted} valueBtn={el} />
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
        </Fragment>
    );
};

export default ItemList;
