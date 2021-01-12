const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);
const li = document.querySelectorAll(`li`);

let selectedBtn;

// При клики на кнопку срабатывает таргет и меняеться цвет кнопки и открывается список
buttons.addEventListener(`click`, function (event) {
    let target = event.target;

    if (target.tagName != "BUTTON") {
        return;
    }
    highlight(target);
    showHideList(target);
});

//Функция меняет цвет кнопки в зависимости активна ли она или нет
function highlight(button) {
    if (selectedBtn) {
        selectedBtn.classList.remove("active");
    }
    selectedBtn = button;
    selectedBtn.classList.add("active");
}

//Функция открывает и закрывает список
function showHideList(button) {
    if (button === buttons.firstElementChild) {
        lists.classList.add("show");
        lists.classList.remove(`hide`);
    } else {
        lists.classList.add("hide");
        lists.classList.remove(`show`);
    }
}

//Добавляю к каждому элементу списка чекбокс
li.forEach((e) => {
    let checkBox = document.createElement(`input`);
    checkBox.type = "checkbox";

    checkBox.addEventListener("change", function (event) {
        e.style.textDecoration = event.target.checked ? "line-through" : "none";
    });

    //Выделение чекбокса при нажатии на список
    e.addEventListener("click", function (event) {
        if (event.target.localName === "li") {
            checkBox.click();
        }
    });
    e.prepend(checkBox);
});

// let spisoc = document.getElementsByTagName(`li`);
// console.log(li)
let ul = document.querySelector(`ul`);

ul.addEventListener("click", function (event) {
    if (event.target.checked === true) {
        ul.append(event.target.parentElement);
    } 
    // else {
    //  Если снять чекбокс, добавляет обратно элемент в начало списка
    //     ul.prepend(event.target.parentElement);
    // }
});
