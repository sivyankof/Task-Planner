export function hideShoweListsColums(e) {
    if (e.target.tagName === 'H3') {
        hideShow(e.target.parentElement.classList[0], e.target);
    }
}

export function hideShow(name, target) {
    let li = document.getElementById(name).getElementsByTagName('li');

    if (target.dataset.action === `show`) {
        for (let e of li) {
            if (e.firstElementChild.checked !== true) {
                e.classList.add(`move`);
            }
        }

        target.dataset.action = `hide`;
    } else {
        for (let e of li) {
            e.classList.remove(`move`);
        }

        target.dataset.action = `show`;
    }
}
