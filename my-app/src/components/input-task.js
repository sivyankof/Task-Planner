import React from 'react';

const InputTask = ({ onChangeInput, inputValue, onKeyEnd }) => {
    return (
        <input
            type='text'
            placeholder='Введите новую задачу...'
            value={inputValue}
            onChange={onChangeInput}
            onKeyDown={onKeyEnd}
            className='inputTask'
        />
    );
};

export default InputTask;
