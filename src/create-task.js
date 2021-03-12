const inputTask = document.querySelector(".input-task");


let priorityName = "";
let priority = "";

export function prioritySelection(e) {
   if (e.target.classList[1] != undefined) {
      priority = e.target.classList[1];
      priorityName = e.target.classList[0];
   }
};

export function submitTask(e) {
   let buttonAddTask = document.querySelector(".button__add-task");
   if (buttonAddTask.classList.contains("inputTaskLong")) {
      if (priority == "") {
         priority = "priority-1";
         priorityName = "low-priority";
      }
      if (e.key == "Enter") {
         createTagsforTasksButton(priority, priorityName);
      }
      priority = "";
   }
};

function createTagsforTasksButton(priority, priorityName) {

   var idRandomName = Math.random().toString(36).substr(2, 5);
   let namePriorityUl = document.getElementById(priorityName);

   if (inputTask.value.length == 0 || inputTask.value.trim() == 0) {
      inputTask.value = "";
      return;
   }

   let li = document.createElement(`li`);

   let input = document.createElement("input");
   input.setAttribute("id", idRandomName);
   input.type = "checkbox";

   let label = document.createElement("label");
   label.setAttribute("for", idRandomName);
   label.classList.add(priority);

   let p = document.createElement("p");
   p.innerText = inputTask.value;

   let closeButton = document.createElement("button");
   closeButton.type = "button";
   closeButton.classList.add("close");


   label.prepend(p);
   li.prepend(input, label);
   li.append(closeButton);
   namePriorityUl.appendChild(li)

   inputTask.value = "";

}