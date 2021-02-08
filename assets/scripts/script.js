const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);
const li = document.querySelectorAll(`li`);

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

//Добавляю к каждому элементу списка чекбокс
li.forEach((e) => {
    let checkBox = document.createElement(`input`);
    checkBox.type = "checkbox";
    checkBox.style.marginRight = "10px";

    checkBox.addEventListener("change", function (event) {
        e.style.textDecoration = event.target.checked ? "line-through" : "none";
        e.style.color = event.target.checked ? `grey` : `black`;
    });

    //Выделение чекбокса при нажатии на список
    e.addEventListener("click", function (event) {
        if (event.target.localName === "li") {
            checkBox.click();
        }
    });
    e.prepend(checkBox);
});

let buttonAdd = document.querySelector(".add-task");

buttonAdd.addEventListener("click", function (event) {
    let buttonAddTask = document.querySelector(".button__add-task");

    let target = event.target;

    if (buttons.lastElementChild.className !== "button__add-task") {
        addTasks(target);
        // if (ddTasks(target)) {
        //     console.log(target);
        // }
        let buttonSent = document.querySelector(".button-sent");
        let ul = document.querySelector(`ul`);
        let inputTask = document.querySelector(".input-task");

        inputTask.addEventListener("change", function (event) {
            let li = document.createElement(`li`);
            let input = document.createElement("input");

            input.type = "checkbox";
            input.style.marginRight = "10px";

            buttonSent.addEventListener("click", function (event) {
                li.innerText = inputTask.value;
                li.prepend(input);
                ul.appendChild(li);
                buttons.lastElementChild.remove("button__add-task");
            });

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

buttons.addEventListener(`click`, function (event) {
    let target = event.target;

    if (target.dataset.action === `hide`) {
        li.forEach((e) => {
            if (e.firstElementChild.checked !== true) {
                e.classList.add(`move`);
            }
        });
    } else if (target.dataset.action === `show`) {
        li.forEach((e) => {
            e.classList.remove(`move`);
        });
    }
});
// Добавление кнопки новой задачи
