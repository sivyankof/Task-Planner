import { priorityStore, storage } from './store';

const inputTask = document.querySelector('.input-task');

let priorityName = '';
let priority = '';

export function prioritySelection(e) {
    if (e.target.classList[1] != undefined) {
        priority = e.target.classList[1];
        priorityName = e.target.classList[0];
    }
}

export function submitTask(e) {
    let buttonAddTask = document.querySelector('.button__add-task');
    if (buttonAddTask.classList.contains('inputTaskLong')) {
        if (priority == '') {
            priority = 'priority-1';
            priorityName = 'low-priority';
        }
        if (e.key == 'Enter') {
            if (duplicateTask(inputTask.value) == false) {
                const alertWarning = document.querySelector('.alert-warning');

                alertWarning.style.visibility = 'visible';

                const warning = () => {
                    alertWarning.style.visibility = 'hidden';
                };

                setTimeout(warning, 2000);
                inputTask.value = '';
                return;
            } else {
                createTagsforTasksButton(priority, priorityName);
            }
        }
        priority = '';
    }
}

function createTagsforTasksButton(priority, priorityName) {
    var idRandomName = Math.random().toString(36).substr(2, 5);
    let namePriorityUl = document.getElementById(priorityName);

    let li = document.createElement(`li`);

    let input = document.createElement('input');
    input.setAttribute('id', idRandomName);
    input.type = 'checkbox';

    let label = document.createElement('label');
    label.setAttribute('for', idRandomName);
    label.classList.add(priority);
    label.innerText = inputTask.value;

    let closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('close');
    closeButton.style.visibility = 'hidden';

    li.prepend(input, label);
    li.append(closeButton);
    namePriorityUl.appendChild(li);
    inputTask.value = '';

    if (storage == null) {
        priorityStore.push({
            id: idRandomName,
            value: label.innerText,
            priority: priority,
            priorityName: priorityName,
            checked: false,
        });
        return localStorage.setItem('task', JSON.stringify(priorityStore));
    } else {
        storage.push({
            id: idRandomName,
            value: label.innerText,
            priority: priority,
            priorityName: priorityName,
            checked: false,
        });
        return localStorage.setItem('task', JSON.stringify(storage));
    }
}

function duplicateTask(value) {
    if (localStorage.length >= 1) {
        let storage = JSON.parse(localStorage.getItem('task'));

        if (inputTask.value.length == 0 || inputTask.value.trim() == 0) {
            return (inputTask.value = '');
        }

        let storeDuplicate = storage.findIndex(
            (el) => el.value.trim() == value.trim(),
        );

        if (storeDuplicate >= 0) {
            return false;
        }
    }
}
