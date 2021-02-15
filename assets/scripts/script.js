const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);
const li = document.getElementsByTagName(`li`);

let body = document.querySelector(`body`);

let selectedBtn;

// При клики на кнопку срабатывает таргет и меняеться цвет кнопки и открывается список
buttons.addEventListener(`click`, function (event) {
    let target = event.target;

    if (target.tagName != "BUTTON") {
        return;
    }

    highlight(target);
});

//Функция меняет цвет кнопки в зависимости активна ли она или нет
function highlight(button) {
    if (selectedBtn) {
        selectedBtn.classList.remove("active");
    }
    selectedBtn = button;
    selectedBtn.classList.add("active");
}

// Добавление кнопки новой задачи
let buttonAdd = document
    .querySelector(".add-task")
    .addEventListener("click", function (event) {
        let target = event.target;

        // если только нажата кнопка "добавить задачу"
        if (buttons.lastElementChild.className !== "button__add-task") {
            addTasks(target);

            let buttonSent = document.querySelector(".button-sent");
            let ul = document.querySelector(`ul`);
            let inputTask = document.querySelector(".input-task");

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
                buttonSent.addEventListener("click", function (event) {
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

//сохраняем список в локале
lists.addEventListener("DOMSubtreeModified", function () {
    let ul = document.querySelector("ul");

    localStorage.setItem("tasks", ul.innerHTML);
});

window.addEventListener("load", function () {
    let ul = document.querySelector("ul");

    ul.innerHTML = localStorage.getItem("tasks");
});

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
        // );
    } else if (target.dataset.action === `show`) {
        for (let e of li) {
            e.classList.remove(`move`);
        }
    }
});

// при нажатии на li или checkbox текст перечеркивается и становиться серым
lists.addEventListener("click", function (e) {
    let target = e.target;

    if (target.tagName == "LI") {
        target.firstElementChild.checked
            ? ((target.firstElementChild.checked = false),
              target.firstElementChild.setAttribute("checked", false),
              (target.style.textDecoration = "none"))
            : ((target.firstElementChild.checked = true),
              target.firstElementChild.setAttribute("checked", true),
              (target.style.textDecoration = "line-through"));

        target.style.color = target.firstElementChild.checked
            ? `grey`
            : `black`;
    }

    target.checked
        ? ((target.parentNode.style.textDecoration = "line-through"),
          target.firstElementChild.setAttribute("checked", true))
        : ((target.parentNode.style.textDecoration = "none"),
          target.firstElementChild.setAttribute("checked", false));
});

lists.addEventListener("click", function (e) {
    if (e.target.className == "close") {
        e.target.parentNode.remove();
    }
});
