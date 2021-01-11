const buttons = document.querySelector(".buttons-container");
const lists = document.querySelector(`.list-container`);

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
    if (button == buttons.firstElementChild) {
        lists.classList.add("show");
        lists.classList.remove(`hide`);
    } else {
        lists.classList.add("hide");
        lists.classList.remove(`show`);
    }
}

//Добавляю к каждому элементу списка чекбокс
let li = document.querySelectorAll(`li`);

li.forEach((e) => {
    let checkBox = document.createElement(`input`);
    checkBox.type = "checkbox";
    e.prepend(checkBox);
});

