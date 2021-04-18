import React, { useState, useEffect, useRef } from 'react';

const EditTask = ({ value, placeholderValue, onClickKey }) => {
    const [visibleClass, setVisibleClass] = useState('edit-task-input edit-hidden');
    const inputRef = useRef(null);

    const handleClickEdidBtn = (e) => {
        if (visibleClass === 'edit-task-input edit-hidden') {
            setVisibleClass('edit-task-input');

            inputRef.current.focus();
        } else {
            setVisibleClass('edit-task-input edit-hidden');
        }
    };

    useEffect(() => {
        setVisibleClass('edit-task-input edit-hidden');
    }, [placeholderValue]);

    return (
        <>
            <input
                ref={inputRef}
                autoFocus
                type='text'
                className={visibleClass}
                placeholder={placeholderValue}
                onKeyUp={onClickKey}></input>
            <button
                type='button'
                className='edit-btn-task'
                onClick={handleClickEdidBtn}
                value={value}></button>
        </>
    );
};

export default EditTask;
