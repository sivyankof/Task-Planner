const inputTask = document.querySelector(".input-task");
let AddTask = document.querySelector(".add-task");

export default function hideAndVisibleButtonTask() {

    // let AddTask = document.querySelector(".add-task");

    inputTask.parentElement.style.visibility == "hidden" ?
        ((inputTask.parentElement.style.visibility = "visible"),
            inputTask.parentElement.classList.add("inputTaskLong"),
            AddTask.firstElementChild.classList.add("iconClosetransform"),
            inputTask.focus()) :
        ((inputTask.parentElement.style.visibility = "hidden"),
            inputTask.parentElement.classList.remove("inputTaskLong"),
            AddTask.firstElementChild.classList.remove("iconClosetransform"),
            inputTask.value = "");
}