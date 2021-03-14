export let storage = JSON.parse(localStorage.getItem('task'));
export const priorityStore = [];

export function store() {
    if (storage !== null) {
        for (let a of storage) {
            createStoreTask(
                a.id,
                a.value,
                a.priority,
                a.priorityName,
                a.checked,
            );
        }
    }
}

function createStoreTask(id, value, priority, priorityName, checked) {
    let li = document.createElement(`li`);
    let namePriorityUl = document.getElementById(priorityName);

    let input = document.createElement('input');
    input.setAttribute('id', id);
    input.type = 'checkbox';

    if (checked === true) {
        input.setAttribute('checked', '');
    }

    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.classList.add(priority);
    label.innerText = value;

    let closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('close');

    li.prepend(input, label);
    li.append(closeButton);
    namePriorityUl.appendChild(li);
}
