import "./styles/style.css";

// const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);
const inputTask = document.querySelector(".input-task");
// const li = lists.getElementsByTagName(`li`);

// элементы для создание хранения в локале
const lowPriority = lists.getElementsByClassName("low-priority");
const mediumPriority = lists.getElementsByClassName("medium-priority");
const highPriority = lists.getElementsByClassName("high-priority");

// let buttonSent = document.querySelector(".button-sent");

// кликаю по кнопке "добавление новой задачи"
document
    .querySelector(".add-task")
    .addEventListener("click", hideAndVisibleButtonTask);

function hideAndVisibleButtonTask() {
    let AddTask = document.querySelector(".add-task");

    inputTask.parentElement.style.visibility == "hidden" ?
        ((inputTask.parentElement.style.visibility = "visible"),
            inputTask.parentElement.classList.add("inputTaskLong"),
            AddTask.firstElementChild.classList.add("iconClosetransform"),
            inputTask.focus()) :
        ((inputTask.parentElement.style.visibility = "hidden"),
            inputTask.parentElement.classList.remove("inputTaskLong"),
            AddTask.firstElementChild.classList.remove("iconClosetransform"),
            inputTask.value = "");
}

// выбор приоритета и передача его инпутут
document
    .querySelector(".button__add-task")
    .addEventListener("click", prioritySelection)

function prioritySelection(e) {
    if (e.target.classList[1] != undefined) {
        priority = e.target.classList[1];
        priorityName = e.target.classList[0];
    }
};

let priorityName = "";
let priority = "";

// создает новую задачу через Enter
document.addEventListener("keydown", submitTask)

function submitTask(e) {
    let buttonAddTask = document.querySelector(".button__add-task");
    if (buttonAddTask.classList.contains("inputTaskLong")) {
        if (priority == "") {
            priority = "priority-1";
            priorityName = "low-priority";
        }
        if (e.key == "Enter") {
            createTagsforTasksButton(priority, priorityName);
        }
        priority = "";
    }
};

//функция создающая теги Li в которых находится чекбокс, лейбл и баттон удаления таска
function createTagsforTasksButton(priority, priorityName) {

    //генерируем случайное имя для li
    var idRandomName = Math.random().toString(36).substr(2, 5);
    let namePriorityUl = document.getElementById(priorityName);

    if (inputTask.value.length == 0 || inputTask.value.trim() == 0) {
        inputTask.value = "";
        return;
    }

    let li = document.createElement(`li`);

    let input = document.createElement("input");
    input.setAttribute("id", idRandomName);
    input.type = "checkbox";

    let label = document.createElement("label");
    label.setAttribute("for", idRandomName);
    label.classList.add(priority);

    let p = document.createElement("p");
    p.innerText = inputTask.value;

    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("close");


    label.prepend(p);
    li.prepend(input, label);
    li.append(closeButton);
    namePriorityUl.appendChild(li)

    inputTask.value = "";

    store(lowPriority, mediumPriority, highPriority)
}

// скрытие и открытие стиска задач
document.addEventListener("click", hideShoweListsColums);

function hideShoweListsColums(e) {

    if (e.target.tagName === "H3") {
        hideShow(e.target.parentElement.classList[0], e.target);
    }
}

function hideShow(name, target) {

    let li = document.getElementById(name).getElementsByTagName("li");

    if (target.dataset.action === `show`) {
        for (let e of li) {
            if (e.firstElementChild.checked !== true) {
                e.classList.add(`move`);
            }
        }
        target.dataset.action = `hide`;
    } else if (target.dataset.action === `hide`) {
        for (let e of li) {
            e.classList.remove(`move`);
        }

        target.dataset.action = `show`;
    }
}

// при нажатии на li или checkbox текст перечеркивается и становиться серым. При нажатии на крестик, удаляет Li  
lists.addEventListener("click", textColorCompleteAndClassClose)


function textColorCompleteAndClassClose(e) {
    let target = e.target;
    target.checked ?
        target.setAttribute("checked", "") :
        target.removeAttribute("checked");

    if (e.target.className == "close") {
        e.target.parentNode.remove();

        store(lowPriority, mediumPriority, highPriority)
    }
};


// //извлекаю задачи из локал
window.addEventListener("load", store(lowPriority, mediumPriority, highPriority))

function store() {
    lowPriority[1].innerHTML = localStorage.getItem("lowTask");
    mediumPriority[1].innerHTML = localStorage.getItem("mediumTask");
    highPriority[1].innerHTML = localStorage.getItem("hightTask");
};