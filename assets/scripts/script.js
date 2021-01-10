let buttons = document.querySelector(".buttons-container");
let lists = document.querySelector(`.list-container`);

let selectedBtn;

buttons.addEventListener(`click`, function (event) {
    let target = event.target;

    if (target.tagName != "BUTTON") {
        return;
    }

    highlight(target);

    showHideList(target);
});

function highlight(button) {
    if (selectedBtn) {
        selectedBtn.classList.remove("active");
    }
    selectedBtn = button;
    selectedBtn.classList.add("active");
}

function showHideList(button) {
    if (button == buttons.firstElementChild) {
        lists.classList.add("show");
        lists.classList.remove(`hide`);
    } else {
        lists.classList.add("hide");
        lists.classList.remove(`show`);
    }
}
