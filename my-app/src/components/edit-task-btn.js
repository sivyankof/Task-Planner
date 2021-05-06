import React, { useState, useEffect, useRef } from 'react';

const EditTask = ({ value, placeholderValue, newNameTask }) => {
    const [visibleClass, setVisibleClass] = useState(
        'edit-task-input edit-hidden',
    );
    const inputRef = useRef(null);

    const handleClickEdidBtn = (e) => {
        if (visibleClass === 'edit-task-input edit-hidden') {
            setVisibleClass('edit-task-input');
        } else {
            setVisibleClass('edit-task-input edit-hidden');
        }
    };

    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
            let prevState = placeholderValue;
            let newState = inputRef.current.value;

            newNameTask(prevState, newState);
        } else if (e.key === 'Escape') {
            inputRef.current.value = '';
            setVisibleClass('edit-task-input edit-hidden');
        }
    };

    useEffect(() => {
        if (!visibleClass.includes('edit-hidden')) {
            inputRef.current.focus();
        }
    }, [visibleClass]);

    useEffect(() => {
        setVisibleClass('edit-task-input edit-hidden');
    }, [placeholderValue]);

    return (
        <>
            <input
                ref={inputRef}
                type='text'
                className={visibleClass}
                placeholder={placeholderValue}
                onKeyUp={onKeyUp}></input>
            <button
                type='button'
                className='edit-btn-task'
                onClick={handleClickEdidBtn}
                value={value}></button>
        </>
    );
};

export default EditTask;
