import './styles/style.css';

import hideAndVisibleButtonTask from './hide-show-btn';
import { prioritySelection, submitTask } from './create-task';
import { hideShoweListsColums } from './hide-show-lists';
import { textColorCompleteAndClassClose } from './task-close';
import { store } from './store';
import { openEditTask, editTaskAdd, priorityEdit } from './edit-task';

const addTask = document.querySelector('.add-task');
const btnAddTask = document.querySelector('.button__add-task');
const lists = document.querySelector(`.list-container`);
const priortyBtnEdit = document.querySelector(
    '.containet-btn-edit .cotainer__button_task',
);

addTask.addEventListener('click', hideAndVisibleButtonTask);

btnAddTask.addEventListener('click', prioritySelection);

document.addEventListener('keydown', submitTask);

document.addEventListener('click', hideShoweListsColums);

lists.addEventListener('click', textColorCompleteAndClassClose);

lists.addEventListener('dblclick', openEditTask);

document.addEventListener('keydown', editTaskAdd);

priortyBtnEdit.addEventListener('click', priorityEdit);

window.addEventListener('load', store);
