import React, { Fragment } from 'react';
import ItemList from '../../components/list-item';

export const TaskPage = () => {
    return (
        <Fragment>
            <header>
                <h1>Планировщик задач</h1>
            </header>
            <main className='item-tasks'>
                <ItemList className='priority-low' type='priorityLow' name='Не важная задача' />
                <ItemList className='priority-middle' type='priorityMiddle' name='Важная задача' />
                <ItemList className='priority-high' type='priorityHigh' name='Очень важная задача' />
            </main>
        </Fragment>
    );
};

