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

    //При нажатии кнопку Hide - скрывает невыбранные элементы, при нажатии на Show - возвращает все элементы
    // if (target.dataset.action === `hide`) {
    //     li.forEach((e) => {
    //         if (e.firstElementChild.checked !== true) {
    //             e.classList.add(`stealth`);
    //         }
    //     });
    // } else {
    //     li.forEach((e) => {
    //         if (e.firstElementChild.checked !== true) {
    //             e.classList.remove(`stealth`);
    //         }
    //     });
    // }

    highlight(target);
    // showHideList(target);
});

//Функция меняет цвет кнопки в зависимости активна ли она или нет
function highlight(button) {
    if (selectedBtn) {
        selectedBtn.classList.remove("active");
    }
    selectedBtn = button;
    selectedBtn.classList.add("active");
}

//Функция открывает и закрывает список (первое задание)
// function showHideList(button) {
//     if (button === buttons.firstElementChild) {
//         lists.classList.add("show");
//         lists.classList.remove(`hide`);
//     }
// else {
//     lists.classList.add("hide");
//     lists.classList.remove(`show`);
// }
// }

//Добавляю к каждому элементу списка чекбокс
li.forEach((e) => {
    let checkBox = document.createElement(`input`);
    checkBox.type = "checkbox";

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

// Перемещает выбраннвый элемент в конец списка
// let ul = document.querySelector(`ul`);

// ul.addEventListener("click", function (event) {
//     if (event.target.checked === true) {
//         ul.append(event.target.parentElement);
//     }
// });

//Анимация через Class по сворачиванию списка. При клике на hide элементы (li) плавно перемещаются на
// нажатую кнопку hide

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
            (e.style.top = ``) && (e.style.left = ``);
        });
    }
});

//Анимация через JS по сворачиванию списка , при нажатии на hide элементы (li) перемещаются на
// нажатую кнопку Hide плавно

// buttons.addEventListener(`click`, function (event) {
//     let target = event.target;

//     if (target.dataset.action === `hide`) {
//         li.forEach((e) => {
//             if (e.firstElementChild.checked !== true) {
//                 let buttomHide = this.getBoundingClientRect();

//                 let listLI = {
//                     top:
//                         event.clientY -
//                         buttomHide.top -
//                         buttons.clientTop -
//                         e.clientHeight / 2 -
//                         150,
//                     left:
//                         event.clientX -
//                         buttomHide.left -
//                         buttons.clientLeft -
//                         e.clientWidth / 2 +
//                         200,
//                 };

//                 e.style.left = listLI.left + "px";
//                 e.style.top = listLI.top + "px";
//                 e.style.opacity = 0;
//                 setTimeout(() => {
//                     if (e.style.left == (listLI.left + `px`)) {
//                         e.style.display = `none`;
//                     }
//                 }, 1000);
//             }
//         });
//     } else if (target.dataset.action === `show`) {
//         li.forEach((e) => {
//             e.style.position = `relative`;
//             e.style.top = ``;
//             e.style.left = ``;
//             e.style.opacity = ``;
//             e.style.display = ``;
//         });
//     }
// });
