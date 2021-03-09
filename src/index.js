import './styles/style.css';

const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);
const li = document.getElementsByTagName(`li`);
let ul = document.querySelector(`ul`);

let selectedBtn;

// При клики на кнопку срабатывает таргет и меняеться цвет кнопки и открывается список
buttons.addEventListener(`click`, function (event) {
    let target = event.target;

    if (target.dataset.action == "show") {
        target.classList.remove("active");
        target.nextElementSibling.classList.add("active");
    }

    if (target.dataset.action == "hide") {
        target.classList.remove("active");
        target.previousElementSibling.classList.add("active");
    }
});

// кликаю по кнопке "добавление новой задачи"
let AddTask = document
    .querySelector(".add-task")
    .addEventListener("click", hideAndVisiblebuttonTask);

function hideAndVisiblebuttonTask(e) {
    //если окошко с было скрыто, отображаем его, если открыто, то скрывает
    buttons.lastElementChild.style.visibility == "hidden"
        ? ((buttons.lastElementChild.style.visibility = "visible"),
          inputTask.focus())
        : (buttons.lastElementChild.style.visibility = "hidden");
}

//выбор приоритета и передача его инпутут
let buttonAddTask = document
    .querySelector(".button__add-task")
    .addEventListener("click", function (e) {
        if (e.target.classList[1] != undefined) {
            priority = e.target.classList[1];
            priorityName = e.target.classList[0];
        }
    });

let priorityName = "";
let priority = "";

let inputTask = document.querySelector(".input-task");
let buttonSent = document.querySelector(".button-sent");

// реагирует на нажатие ПКМ
buttonSent.addEventListener("click", function (e) {
    if (priority == "") {
        priority = "priority-1";
        priorityName = "low-priority";
    }
    createTagsforTasksButton(priority, priorityName);
    priority = "";
});

inputTask.addEventListener("keydown", function (e) {
    if (priority == "") {
        priority = "priority-1";
        priorityName = "low-priority";
    }
    if (e.key == "Enter") {
        createTagsforTasksButton(priority, priorityName);
    }
    priority = "";
});

//функция создающая теги ли в которых находится чекбокс, лейбл и баттон удаления таска
function createTagsforTasksButton(elem, name) {
    let li = document.createElement(`li`);
    let input = document.createElement("input");
    let closeButton = document.createElement("button");
    let label = document.createElement("label");
    let p = document.createElement("p");

    //генерируем случайное имя для li
    var checkIdRandomName = Math.random().toString(36).substr(2, 5);
    input.setAttribute("id", checkIdRandomName);
    label.setAttribute("for", checkIdRandomName);

    // добавляем атрибуты
    input.type = "checkbox";
    closeButton.type = "button";
    closeButton.classList.add("close");

    let namePriorityUl = document.getElementById(name);

    label.classList.add(elem);

    // читаем значение и добавялем в ли
    p.innerText = inputTask.value;
    label.prepend(p);
    li.prepend(input, label);
    li.append(closeButton);
    namePriorityUl.appendChild(li);
    inputTask.value = "";
    buttons.lastElementChild.style.visibility = "hidden";


    localStorage.setItem("lowTask",lowPriority[1].innerHTML );
    localStorage.setItem("mediumTask",mediumPriority[1].innerHTML );
    localStorage.setItem("hightTask",highPriority[1].innerHTML );
}

//Анимация через Class по сворачиванию списка. При клике на hide элементы (li) плавно перемещаются на в лево
//(добавляя класс move)

buttons.addEventListener(`click`, addAndRemoveClass);

function addAndRemoveClass(event) {
    let target = event.target;

    if (target.dataset.action === `hide`) {
        for (let e of li) {
            if (e.firstElementChild.checked !== true) {
                e.classList.add(`move`);
            }
        }
    } else if (target.dataset.action === `show`) {
        for (let e of li) {
            e.classList.remove(`move`);
        }
    }
}

// при нажатии на li или checkbox текст перечеркивается и становиться серым
lists.addEventListener("click", function (e) {
    let target = e.target;
    target.checked
        ? target.setAttribute("checked", "")
        : target.removeAttribute("checked");
});

//при нажатии на крестик удаляет ли
lists.addEventListener("click", function (e) {
    if (e.target.className == "close") {
        e.target.parentNode.remove();

        localStorage.setItem("lowTask",lowPriority[1].innerHTML );
        localStorage.setItem("mediumTask",mediumPriority[1].innerHTML );
        localStorage.setItem("hightTask",highPriority[1].innerHTML );
    }
});


const lowPriority = lists.getElementsByClassName("low-priority");
const mediumPriority = lists.getElementsByClassName("medium-priority");
const highPriority = lists.getElementsByClassName("high-priority");



// //извлекаю задачи из локал
window.addEventListener("load", function () {
    lowPriority[1].innerHTML = localStorage.getItem("lowTask");
    mediumPriority[1].innerHTML = localStorage.getItem("mediumTask");
    highPriority[1].innerHTML = localStorage.getItem("hightTask");
});
