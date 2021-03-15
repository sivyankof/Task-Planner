let idElement;
let priorityName = '';
let priority = '';


let editTask = document.querySelector(".edit-task")
let container = document.querySelector(".containet-btn-edit")

export function openEditTask(e) {
   let target = e.target;

   if (target.tagName === "LABEL") {
      container.style.visibility = "visible"

      editTask.value = target.textContent
      idElement = target.previousElementSibling.id;
      priorityName = target.parentNode.parentNode.id
      priority = target.className

   }
}

export function editTaskAdd(e) {
   let idTask = document.getElementById(idElement);

   if (e.key == 'Enter') {
      if (container.style.visibility == "visible") {

         idTask.nextElementSibling.textContent = editTask.value;

         crateEditTask(priority, priorityName, idTask.nextElementSibling.textContent, idElement)

         idTask.parentNode.remove()
         container.style.visibility = "hidden";
      }
   }
}

export function priorityEdit(e) {
   let target = e.target;

   priorityName = target.classList[0]
   priority = target.classList[1]
}


function crateEditTask(priority, priorityName, value, id) {
   let namePriorityUl = document.getElementById(priorityName);
   let storage = JSON.parse(localStorage.getItem('task'));

   if (value.length == 0 || value.trim() == 0) {
      return value = '';
   }

   let li = document.createElement(`li`);

   let input = document.createElement('input');
   input.setAttribute('id', id);
   input.type = 'checkbox';

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
   value = '';

   storage.push({
      id: id,
      value: label.innerText,
      priority: priority,
      priorityName: priorityName,
      checked: false,
   });

   let storeIndex = storage.findIndex((el) => el.id == idElement);
   storage.splice(storeIndex, 1);

   return localStorage.setItem('task', JSON.stringify(storage));
}