import React from 'react';

const BtnDelete = (props) => {
    return (<button  type='button' 
                     className='btn-trash' 
                     onClick={props.onClicBtn}
                     name={props.valueBtn}>
            </button>
            )
};

export default BtnDelete;
