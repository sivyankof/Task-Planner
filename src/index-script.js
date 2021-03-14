import './styles/style.css';

// const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);
const inputTask = document.querySelector('.input-task');
// const li = lists.getElementsByTagName(`li`);

const priorityStore = [];
let storage = JSON.parse(localStorage.getItem('task'));

// кликаю по кнопке "добавление новой задачи"
document
    .querySelector('.add-task')
    .addEventListener('click', hideAndVisibleButtonTask);

function hideAndVisibleButtonTask() {
    let AddTask = document.querySelector('.add-task');

    inputTask.parentElement.style.visibility == 'hidden'
        ? ((inputTask.parentElement.style.visibility = 'visible'),
          inputTask.parentElement.classList.add('inputTaskLong'),
          AddTask.firstElementChild.classList.add('iconClosetransform'),
          inputTask.focus())
        : ((inputTask.parentElement.style.visibility = 'hidden'),
          inputTask.parentElement.classList.remove('inputTaskLong'),
          AddTask.firstElementChild.classList.remove('iconClosetransform'),
          (inputTask.value = ''));
}

// выбор приоритета и передача его инпутут

document
    .querySelector('.button__add-task')
    .addEventListener('click', prioritySelection);

let priorityName = '';
let priority = '';

function prioritySelection(e) {
    if (e.target.classList[1] != undefined) {
        priority = e.target.classList[1];
        priorityName = e.target.classList[0];
    }
}

// создает новую задачу через Enter
document.addEventListener('keydown', submitTask);

function submitTask(e) {
    let buttonAddTask = document.querySelector('.button__add-task');
    if (buttonAddTask.classList.contains('inputTaskLong')) {
        if (priority == '') {
            priority = 'priority-1';
            priorityName = 'low-priority';
        }
        if (e.key == 'Enter') {
            createTagsforTasksButton(priority, priorityName);
        }
        priority = '';
    }
}

//функция создающая теги Li в которых находится чекбокс, лейбл и баттон удаления таска
function createTagsforTasksButton(priority, priorityName) {
    //генерируем случайное имя для li

    var idRandomName = Math.random().toString(36).substr(2, 5);
    let namePriorityUl = document.getElementById(priorityName);

    if (inputTask.value.length == 0 || inputTask.value.trim() == 0) {
        inputTask.value = '';
        return;
    }

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
        localStorage.setItem('task', JSON.stringify(priorityStore));
    } else {
        storage.push({
            id: idRandomName,
            value: label.innerText,
            priority: priority,
            priorityName: priorityName,
            checked: false,
        });
        localStorage.setItem('task', JSON.stringify(storage));
    }
}

// скрытие и открытие стиска задач
document.addEventListener('click', hideShoweListsColums);

function hideShoweListsColums(e) {
    if (e.target.tagName === 'H3') {
        hideShow(e.target.parentElement.classList[0], e.target);
    }
}

function hideShow(name, target) {
    let li = document.getElementById(name).getElementsByTagName('li');

    if (target.dataset.action === `show`) {
        for (let e of li) {
            if (e.firstElementChild.checked !== true) {
                e.classList.add(`move`);
            }
        }

        target.dataset.action = `hide`;
    } else {
        for (let e of li) {
            e.classList.remove(`move`);
        }

        target.dataset.action = `show`;
    }
}

// при нажатии на li или checkbox текст перечеркивается и становиться серым. При нажатии на крестик, удаляет Li
lists.addEventListener('click', textColorCompleteAndClassClose);

function textColorCompleteAndClassClose(e) {
    let target = e.target;
    let idCheked = target.parentElement.firstElementChild.id;
    const storeIndex = storage.findIndex((el) => el.id == idCheked);

    if (target.checked == true) {
        target.setAttribute('checked', '');
        storage[storeIndex].checked = true;
    } else if (target.checked == false) {
        target.removeAttribute('checked');
        storage[storeIndex].checked = false;
    }

    if (target.className == 'close') {
        target.parentNode.remove();

        let idRemove = target.previousSibling.previousSibling.id;
        const storeIndex = storage.findIndex((el) => el.id == idRemove);

        storage.splice(storeIndex, 1);
    }

    localStorage.setItem('task', JSON.stringify(storage));
}

window.addEventListener('load', store);

function store() {
    if (storage !== null) {
        for (let a of storage) {
            createStoreTask(
                a.id,
                a.value,
                a.priority,
                a.priorityName,
                a.checked,
            );
        }
    }
}

function createStoreTask(id, value, priority, priorityName, checked) {
    let li = document.createElement(`li`);
    let namePriorityUl = document.getElementById(priorityName);

    let input = document.createElement('input');
    input.setAttribute('id', id);
    input.type = 'checkbox';

    if (checked === true) {
        input.setAttribute('checked', '');
    }

    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.classList.add(priority);
    label.innerText = value;

    let closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('close');

    li.prepend(input, label);
    li.append(closeButton);
    namePriorityUl.appendChild(li);
}
