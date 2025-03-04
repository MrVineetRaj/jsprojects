const taskForm = document.querySelector(".task-form");
const taskList = document.querySelector(".task-list");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
let taskItems = document.querySelectorAll(".task-item");
let markCompletedCheckboxes = document.querySelectorAll(".mark-completed");
let tasks = [];
let noOfCompletedTasks = 0;

function renderTask(task) {
  let newTaskItem = document.createElement("li");
  newTaskItem.classList.add("task-item");

  if (task.isCompleted) {
    newTaskItem.classList.add("completed");
    noOfCompletedTasks++;
  }
  newTaskItem.innerHTML = `
                            <input type="checkbox" id="mark-completed-task-${
                              tasks.length - 1
                            }" ${task.isCompleted && "checked"}/>
                            <p class="task-text " class>
                            ${task.desc}
                            </p>
                            <button class="delete-button" id="delete-task-${
                              tasks.length - 1
                            }-button">X</button>
                            `;

  countCompletedTasks();
  taskList.appendChild(newTaskItem);
  totalTasks.innerText = `Total tasks: ${tasks.length}`;
  markCompletedCheckboxes = document.querySelectorAll(".mark-completed");
  taskItems = document.querySelectorAll(".task-item");

  document
    .getElementById(`mark-completed-task-${tasks.length - 1}`)
    .addEventListener("click", (e) => {
      let index = e.target.id.split("-")[3];
      if (tasks[index].isCompleted) {
        taskItems[index].classList.remove("completed");
        tasks[index].isCompleted = false;
      } else {
        taskItems[index].classList.add("completed");
        tasks[index].isCompleted = true;
      }
      syncTasksToLocalStorage();
    });
  document
    .getElementById(`delete-task-${tasks.length - 1}-button`)
    .addEventListener("click", (e) => {
      let index = e.target.id.split("-")[2];
      console.log(tasks);
      tasks = tasks.filter((task) => {
        return task.desc !== tasks[index].desc;
      });
      console.log(tasks);
      taskItems[index].remove();
      syncTasksToLocalStorage();
    });
}

function loadTasks() {
  let previousTasks =
    JSON.parse(localStorage.getItem("js-project-tasks")) || [];
  previousTasks.forEach((task) => {
    tasks.push(task);
    renderTask(task);
  });
}

function syncTasksToLocalStorage() {
  countCompletedTasks();
  localStorage.setItem("js-project-tasks", JSON.stringify(tasks));
}

function countCompletedTasks() {
  noOfCompletedTasks = 0;
  tasks.forEach((task) => {
    if (task.isCompleted) {
      noOfCompletedTasks++;
    }
  });
  completedTasks.innerText = `Completed: ${noOfCompletedTasks}`;
}

function markCompleted(index) {
  taskItems[index].classList.add("completed");
  tasks[index].isCompleted = true;
  syncTasksToLocalStorage();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target[0].value == "") {
    alert("None");
    return;
  }

  let newTask = {
    desc: e.target[0].value,
    isCompleted: false,
  };

  e.target[0].value = "";
  tasks.unshift(newTask);
  renderTask(newTask);
  syncTasksToLocalStorage();
});

loadTasks();
