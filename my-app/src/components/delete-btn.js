import React from 'react';

const BtnDelete = ({ onClicBtn, valueBtn, onChecked }) => {
    let classBtn;
    if (onChecked === false) {
        classBtn = 'btn-trash edit-hidden';
    } else {
        classBtn = 'btn-trash';
    }


    return <button type='button' className={classBtn} onClick={onClicBtn} name={valueBtn}></button>;
};

export default BtnDelete;
