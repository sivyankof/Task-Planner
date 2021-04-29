import React, { useState } from "react";
import { connect } from "react-redux";

import InputTask from "./input-task";
import BtnDelete from "./delete-btn";
import EditTask from "./edit-task-btn";
import {
    createTask,
    toggleTodo,
    deletedTask,
    editTask,
} from "../redux/actions/taskActions";

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
    const [valueImput, setValueImput] = useState("");
    const [errMessage, setErrMessage] = useState({
        priorityLow: "",
        priorityMiddle: "",
        priorityHigh: "",
    });

    const handleChange = (event) => {
        setValueImput(event.target.value);
        if (event.target.value.length === 0) {
            const copy = { ...errMessage };
            copy[type] = false;
            setErrMessage(copy);
        }
    };

    const handleKeyDawn = (event) => {
        let value = valueImput.trim();
        const copy = { ...errMessage };

        if (event.key === "Enter" && value.length !== 0) {
            if (dublicateChange(value) === -1) {
                createTask({ name: value, checked: false, type });

                copy[type] = false;
                setValueImput("");
            } else {
                copy[type] = true;
            }

            setErrMessage(copy);
        }
    };

    const onNewNameTask = (prevState, newState) => {
        if (dublicateChange(newState) === -1) {
            editTask({ prevState, newState, type });
        } else {
            const copy = { ...errMessage };
            copy[type] = true;
            setErrMessage(copy);
        }
    };

    const handleCheckInput = (event, name) => {
        toggleTodo({ name, type });
    };

    const handleClickBtnDeleted = (event, name) => {
        deletedTask({ name, type });
    };

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
                                        handleCheckInput(event, el.name)
                                    }
                                />
                                <label htmlFor={el.name}>{el.name}</label>
                            </div>
                            <div>
                                {el.checked !== true && (
                                    <EditTask
                                        value={el.name}
                                        placeholderValue={el.name}
                                        newNameTask={onNewNameTask}
                                    />
                                )}
                                <BtnDelete
                                    onChecked={el.checked}
                                    onClicBtn={(event) =>
                                        handleClickBtnDeleted(event, el.name)
                                    }
                                    valueBtn={el.name}
                                />
                            </div>
                        </li>
                    );
                })}
                {errMessage[type] && (
                    <span>Задание с таким именем уже существует!</span>
                )}
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

export default connect(mapStateToProps, {
    createTask,
    toggleTodo,
    deletedTask,
    editTask,
})(ItemList);
