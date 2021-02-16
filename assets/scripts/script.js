const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);
const li = document.getElementsByTagName(`li`);
let ul = document.querySelector(`ul`);
let body = document.querySelector(`body`);

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

// Добавление кнопки новой задачи
let buttonAdd = document
    .querySelector(".add-task")
    .addEventListener("click", function (event) {
        let target = event.target;

        // если только нажата кнопка "добавить задачу"
        if (buttons.lastElementChild.className !== "button__add-task") {
            addTasks(target);

            let buttonSent = document.querySelector(".button-sent");
            let inputTask = document.querySelector(".input-task");

            //добавляю событие на кнопку
            inputTask.addEventListener("change", function (event) {
                let li = document.createElement(`li`);
                let input = document.createElement("input");
                let closeButton = document.createElement("button");
                let closeBlur = document.createElement("button");

                input.type = "checkbox";
                input.style.marginRight = "10px";
                closeButton.type = "button";
                closeBlur.type = "button";

                closeButton.classList.add("close");
                closeBlur.classList.add("closeBlur");

                // реагирует на нажатие ПКМ
                buttonSent.addEventListener("click", function () {
                    li.innerText = inputTask.value;
                    li.prepend(input);
                    li.append(closeButton);
                    li.append(closeBlur);

                    ul.appendChild(li);
                    buttons.lastElementChild.remove("button__add-task");
                });

                // реагирует на нажатие Enter
                inputTask.addEventListener("keyup", function (event) {
                    if (event.key == "Enter") {
                        li.innerText = inputTask.value;
                        li.prepend(input);
                        li.append(closeButton);
                        li.append(closeBlur);
                        ul.appendChild(li);
                        buttons.lastElementChild.remove("button__add-task");
                    }
                });
            });
        } else {
            buttons.lastElementChild.remove("button__add-task");
        }
    });

// функция которая созданет модальное окно добавления задачи
function addTasks(button) {
    if (button.value === "add") {
        let divAddTask = document.createElement("div");
        let inputNewTaskText = document.createElement("input");
        let buttonSentTask = document.createElement("button");

        divAddTask.classList.add("button__add-task");
        inputNewTaskText.classList.add("input-task");
        inputNewTaskText.type = "text";
        inputNewTaskText.placeholder = "Введите новую задачу";

        buttonSentTask.classList.add("button-sent");
        buttonSentTask.type = "button";

        buttons.append(divAddTask);
        divAddTask.prepend(inputNewTaskText);
        divAddTask.append(buttonSentTask);
    }
}

//Анимация через Class по сворачиванию списка. При клике на hide элементы (li) плавно перемещаются на в лево
//(добавляя класс move)

buttons.addEventListener(`click`, function (event) {
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
});

// при нажатии на li или checkbox текст перечеркивается и становиться серым
lists.addEventListener("click", function (e) {
    let target = e.target;
    // только при нажатии  на текст li
    if (target.tagName == "LI") {
        target.firstElementChild.checked
            ? ((target.firstElementChild.checked = false),
              target.firstElementChild.setAttribute("checked", false),
              target.classList.remove("taskSelected"))
            : ((target.firstElementChild.checked = true),
              target.firstElementChild.setAttribute("checked", true),
              target.classList.add("taskSelected"));
    }
    //только при нажатии на чекбокс
    if (target.tagName == "INPUT") {
        target.checked
            ? (target.parentNode.classList.add("taskSelected"),
              target.setAttribute("checked", true))
            : (target.parentNode.classList.remove("taskSelected"),
              target.setAttribute("checked", false));
    }
});
//при нажатии на крестик удаляет ли
lists.addEventListener("click", function (e) {
    if (e.target.className == "close") {
        e.target.parentNode.remove();
    }
});

// Наюблюдаем за изменением блока UL, для помещения актуальной инфо в local
// Конфигурация observer (за какими изменениями наблюдать)
const config = {
    attributes: true,
    childList: true,
    subtree: true,
};

// Функция обратного вызова при срабатывании мутации
const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            //если был измененн тип, то добавляем его в локал
            localStorage.setItem("tasks", ul.innerHTML);
        } else if (mutation.type === "attributes") {
            //если был измененн атрибут, то добавляем его в локал
            localStorage.setItem("tasks", ul.innerHTML);
        }
    }
};

// Создаем экземпляр наблюдателя с указанной функцией обратного вызова
const observer = new MutationObserver(callback);

// Начинаем наблюдение за настроенными изменениями целевого элемента
observer.observe(lists, config);

//извлекаю задачи из локал
window.addEventListener("load", function () {
    ul.innerHTML = localStorage.getItem("tasks");
});
