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

//цикл проходит по li и выставляет чебоксы

for (let e of li) {
    let checkBox = document.createElement(`input`);
    checkBox.type = "checkbox";
    checkBox.style.marginRight = "10px";

    e.prepend(checkBox);
}

// Добавление кнопки новой задачи
let buttonAdd = document.querySelector(".add-task");

buttonAdd.addEventListener("click", function (event) {
    let target = event.target;

    if (buttons.lastElementChild.className !== "button__add-task") {
        addTasks(target);

        let buttonSent = document.querySelector(".button-sent");
        let ul = document.querySelector(`ul`);
        let inputTask = document.querySelector(".input-task");

        inputTask.addEventListener("change", function (event) {
            let li = document.createElement(`li`);
            let input = document.createElement("input");

            input.type = "checkbox";
            input.style.marginRight = "10px";

            // реагирует на нажатие ПКМ
            buttonSent.addEventListener("click", function (event) {
                li.innerText = inputTask.value;
                li.prepend(input);
                ul.appendChild(li);
                buttons.lastElementChild.remove("button__add-task");
            });

            // реагирует на нажатие Enter
            inputTask.addEventListener("keyup", function (event) {
                if (event.key == "Enter") {
                    // console.log(event.keyCode)
                    li.innerText = inputTask.value;
                    li.prepend(input);
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
        let div = document.createElement("div");
        let input = document.createElement("input");
        let buttonSent = document.createElement("button");

        div.classList.add("button__add-task");
        input.classList.add("input-task");
        input.type = "text";
        input.placeholder = "Введите новую задачу";

        buttonSent.classList.add("button-sent");
        buttonSent.type = "button";

        buttons.append(div);
        div.prepend(input);
        div.append(buttonSent);
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
              (target.style.textDecoration = "none"))
            : ((target.firstElementChild.checked = true),
              (target.style.textDecoration = "line-through"));

        target.style.color = target.firstElementChild.checked
            ? `grey`
            : `black`;
    }

    target.checked
        ? (target.parentNode.style.textDecoration = "line-through")
        : (target.parentNode.style.textDecoration = "none");
});
