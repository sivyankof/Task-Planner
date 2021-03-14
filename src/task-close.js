export function textColorCompleteAndClassClose(e) {
    let storage = JSON.parse(localStorage.getItem('task'));
    let target = e.target;

    let idCheked = target.parentElement.firstElementChild.id;
    let storeIndex = storage.findIndex((el) => el.id == idCheked);

    if (target.checked == true) {
        target.setAttribute('checked', '');
        storage[storeIndex].checked = true;
    } else if (target.checked == false) {
        target.removeAttribute('checked');
        storage[storeIndex].checked = false;
    }

    if (target.className == 'close') {
        target.parentNode.remove();

        let idRemove = target.previousSibling.previousSibling.id;
        const storeIndex = storage.findIndex((el) => el.id == idRemove);

        storage.splice(storeIndex, 1);
    }

    return localStorage.setItem('task', JSON.stringify(storage));
}
