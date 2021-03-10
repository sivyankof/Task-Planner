import "./styles/style.css";

const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);
const li = document.getElementsByTagName(`li`);

// элементы для создание хранения в локале
const lowPriority = lists.getElementsByClassName("low-priority");
const mediumPriority = lists.getElementsByClassName("medium-priority");
const highPriority = lists.getElementsByClassName("high-priority");

let inputTask = document.querySelector(".input-task");
// let buttonSent = document.querySelector(".button-sent");

// кликаю по кнопке "добавление новой задачи"
let AddTask = document
    .querySelector(".add-task")
    .addEventListener("click", hideAndVisiblebuttonTask);

function hideAndVisiblebuttonTask(e) {
    let AddTask = document.querySelector(".add-task");

    inputTask.parentElement.style.visibility == "hidden"
        ? ((inputTask.parentElement.style.visibility = "visible"),
          inputTask.parentElement.classList.add("inputTaskLong"),
          AddTask.firstElementChild.classList.add("iconClosetransform"),
          inputTask.focus())
        : ((inputTask.parentElement.style.visibility = "hidden"),
          inputTask.parentElement.classList.remove("inputTaskLong"),
          AddTask.firstElementChild.classList.remove("iconClosetransform"),
          inputTask.value = "");
}

// выбор приоритета и передача его инпутут
document
    .querySelector(".button__add-task")
    .addEventListener("click", function (e) {
        if (e.target.classList[1] != undefined) {
            priority = e.target.classList[1];
            priorityName = e.target.classList[0];
        }
    });

let priorityName = "";
let priority = "";

// // создает новую задачу через клик
// buttonSent.addEventListener("click", function (e) {
//     if (priority == "") {
//         priority = "priority-1";
//         priorityName = "low-priority";
//     }
//     createTagsforTasksButton(priority, priorityName);
//     priority = "";
// });
// создает новую задачу через Enter
document.addEventListener("keydown", function (e) {
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
});

//функция создающая теги ли в которых находится чекбокс, лейбл и баттон удаления таска
function createTagsforTasksButton(elem, name) {
    if (inputTask.value.length == 0 || inputTask.value.trim() == 0) {
        inputTask.value = "";
        return;
    }

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

    localStorage.setItem("lowTask", lowPriority[1].innerHTML);
    localStorage.setItem("mediumTask", mediumPriority[1].innerHTML);
    localStorage.setItem("hightTask", highPriority[1].innerHTML);
}

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

        localStorage.setItem("lowTask", lowPriority[1].innerHTML);
        localStorage.setItem("mediumTask", mediumPriority[1].innerHTML);
        localStorage.setItem("hightTask", highPriority[1].innerHTML);
    }
});

// //извлекаю задачи из локал
window.addEventListener("load", function () {
    lowPriority[1].innerHTML = localStorage.getItem("lowTask");
    mediumPriority[1].innerHTML = localStorage.getItem("mediumTask");
    highPriority[1].innerHTML = localStorage.getItem("hightTask");
});

// const daltaTime = 3;
// const steps = 100;
// const $searchInput = document.querySelector(".search-input");
// const $tasklist = document.getElementById("task-list");

// document.addEventListener("click", onSearchBtnClick);

// function onSearchBtnClick(e) {
//     // console.log(e.target)
//     if (e.target.classList.contains("search-btn")) {
//         // console.log("!!!!");

//         let increment = 1;
//         let startWidth = 50;
//         let startLeft = 0;

//         if (e.target.classList.contains("active")) {
//             increment = -1;
//             startWidth = 300;
//             startLeft = 300;

//             e.target.classList.remove("active");
//             e.target.firstElementChild.style = "";
//         } else {
//             e.target.classList.add("active");
//             e.target.firstElementChild.style.transform = "rotate(45deg)";
//         }

//         btnToggle(e.target, increment, startLeft);
//         inputToggle(e.target.previousElementSibling, increment, startWidth);

//         e.target.previousElementSibling.focus();
//     }

//     if (e.target.classList.contains("btn-trash")) {
//         // console.log(e.target);
//         e.target.parentElement.remove();
//     }

//     if (e.target.classList.contains("task-list-item")) {
//         e.target.classList.toggle("complete");
//     }
// }

// function inputToggle($input, increment, startWidth, styleName, start, end) {
//     let counter = 0;
//     let width = startWidth;
//     increment = (increment * (300 - 50)) / steps;

//     inputStep();

//     function inputStep() {
//         if (counter < steps) {
//             $input.style.width = `${width}px`;
//             width += increment;
//             counter++;
//             setTimeout(inputStep, daltaTime);
//         }
//     }
// }

// function btnToggle($btn, increment, startLeft) {
//     let counter = 0;
//     let leftPosition = startLeft;
//     increment = (increment * (300 - 0)) / steps;

//     btnStep();

//     function btnStep() {
//         if (counter < steps) {
//             $btn.style.left = `${leftPosition}px`;
//             leftPosition += increment;
//             counter++;
//             setTimeout(btnStep, daltaTime);
//         }
//     }
// }
