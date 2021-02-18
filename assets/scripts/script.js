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

// кликаю по кнопке "добавление новой задачи"
let buttonAddTask = document
    .querySelector(".add-task")
    .addEventListener("click", function (e) {
        //если окошко с было скрыто, отображаем его, если открыто, то скрывает
        if (buttons.lastElementChild.style.visibility == "hidden") {
            buttons.lastElementChild.style.visibility = "visible";
            inputTask.focus();
        } else {
            buttons.lastElementChild.style.visibility = "hidden";
        }
        e.preventDefault();
    });

let inputTask = document.querySelector(".input-task");
let buttonSent = document.querySelector(".button-sent");

// реагирует на нажатие ПКМ
buttonSent.addEventListener("click", function (e) {
    let li = document.createElement(`li`);
    let input = document.createElement("input");
    let closeButton = document.createElement("button");
    let closeBlur = document.createElement("button");
    let label = document.createElement("label");

    //генерируем случайное имя для li
    var checkIdRandomName = Math.random().toString(36).substr(2, 5);
    input.setAttribute("id", checkIdRandomName);
    label.setAttribute("for", checkIdRandomName);

    // добавляем атрибуты
    input.type = "checkbox";
    closeButton.type = "button";
    closeBlur.type = "button";
    closeButton.classList.add("close");
    closeBlur.classList.add("closeBlur");

    // читаем значение и добавялем в ли
    label.innerText = inputTask.value;
    li.prepend(input, label);
    li.append(closeButton, closeBlur);
    ul.appendChild(li);
    inputTask.value = "";
    buttons.lastElementChild.style.visibility = "hidden";
});
inputTask.addEventListener("keydown", function (e) {

    if (e.key == "Enter") {
        let li = document.createElement(`li`);
        let input = document.createElement("input");
        let closeButton = document.createElement("button");
        let closeBlur = document.createElement("button");
        let label = document.createElement("label");

        //генерируем случайное имя для li
        var checkIdRandomName = Math.random().toString(36).substr(2, 5);
        input.setAttribute("id", checkIdRandomName);
        label.setAttribute("for", checkIdRandomName);

        // добавляем атрибуты
        input.type = "checkbox";
        closeButton.type = "button";
        closeBlur.type = "button";
        closeButton.classList.add("close");
        closeBlur.classList.add("closeBlur");

        // читаем значение и добавялем в ли
        label.innerText = inputTask.value;
        li.prepend(input, label);
        li.append(closeButton, closeBlur);
        ul.appendChild(li);
        inputTask.value = "";
        buttons.lastElementChild.style.visibility = "hidden";
    }
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
    } else if (target.dataset.action === `show`) {
        for (let e of li) {
            e.classList.remove(`move`);
        }
    }
});

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
