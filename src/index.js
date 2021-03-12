import './styles/style.css';

import hideAndVisibleButtonTask from "./hide-show-btn";
import {
   prioritySelection,
   submitTask
} from "./create-task";
import hideShoweListsColums from "./hide-show-lists";
import textColorCompleteAndClassClose from "./task-close"


const addTask = document.querySelector(".add-task");
const btnAddTask = document.querySelector(".button__add-task")
const lists = document.querySelector(`.list-container`);


addTask.addEventListener("click", hideAndVisibleButtonTask);

btnAddTask.addEventListener("click", prioritySelection);

document.addEventListener("keydown", submitTask);

document.addEventListener("click", hideShoweListsColums);

lists.addEventListener("click", textColorCompleteAndClassClose)
