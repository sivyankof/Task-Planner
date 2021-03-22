let idElement;
let priorityName = '';
let priority = '';

const editTask = document.querySelector('.edit-task');
const container = document.querySelector('.containet-btn-edit');
const buttonAddTask = document.querySelector('.button__add-task');

export function openEditTask(e) {
    let target = e.target;

    if (target.tagName === 'LABEL') {
        if (target.parentNode.firstChild.checked == true) {
            return;
        }

        container.style.visibility = 'visible';

        if (buttonAddTask.classList.contains('inputTaskLong')) {
            buttonAddTask.classList.remove('inputTaskLong');
            buttonAddTask.style.visibility = 'hidden';
        }

        editTask.value = target.textContent;
        idElement = target.previousElementSibling.id;
        priorityName = target.parentNode.parentNode.id;
        priority = target.className;
    }
}

export function editTaskAdd(e) {
    let idTask = document.getElementById(idElement);

    if (e.key == 'Enter') {
        if (container.style.visibility == 'visible') {
            if (duplicateTask(editTask.value) == false) {
                editTask.value = '';
                container.style.visibility = 'hidden';

                const alertWarning = document.querySelector('.alert-warning');

                alertWarning.style.visibility = 'visible';

                function warning() {
                    alertWarning.style.visibility = 'hidden';
                }

                setTimeout(warning, 2000);

                return;
            } else {
                idTask.nextElementSibling.textContent = editTask.value;
                crateEditTask(
                    priority,
                    priorityName,
                    idTask.nextElementSibling.textContent,
                    idElement,
                );

                idTask.parentNode.remove();
                container.style.visibility = 'hidden';
            }
        }
    } else if (e.key == 'Escape') {
        idTask.nextElementSibling.textContent = editTask.value;
        crateEditTask(
            priority,
            priorityName,
            idTask.nextElementSibling.textContent,
            idElement,
        );
        idTask.parentNode.remove();
        container.style.visibility = 'hidden';
    }
}

export function priorityEdit(e) {
    let target = e.target;

    priorityName = target.classList[0];
    priority = target.classList[1];
}

function crateEditTask(priority, priorityName, value, id) {
    let namePriorityUl = document.getElementById(priorityName);
    const storage = JSON.parse(localStorage.getItem('task'));

    if (value.length == 0 || value.trim() == 0) {
        return (value = '');
    }

    let li = document.createElement(`li`);

    let input = document.createElement('input');
    input.setAttribute('id', id);
    input.type = 'checkbox';

    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.classList.add(priority);
    label.innerText = value;

    let closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('close');
    closeButton.style.visibility = 'hidden';

    li.prepend(input, label);
    li.append(closeButton);
    namePriorityUl.appendChild(li);
    value = '';

    storage.push({
        id: id,
        value: label.innerText,
        priority: priority,
        priorityName: priorityName,
        checked: false,
    });

    let storeIndex = storage.findIndex((el) => el.id == idElement);
    storage.splice(storeIndex, 1);

    return localStorage.setItem('task', JSON.stringify(storage));
}

function duplicateTask(value) {
    if (localStorage.length >= 1) {
        let storage = JSON.parse(localStorage.getItem('task'));

        let storeDuplicate = storage.findIndex((el) => el.value == value);

        if (storeDuplicate >= 0) {
            return false;
        }
    }
}
