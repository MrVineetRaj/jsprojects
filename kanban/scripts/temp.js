const addItemButton = document.getElementById("add-item-btn");
const boards = document.querySelectorAll(".board");
const itemsCols = document.querySelectorAll(".items");
let taskItems = document.querySelectorAll(".item");
let cardPickedFrom = -1;
let cardDroppedIn = -1;
let taskItemPicked = -1;

// // console.log(itemsCols);
let kanbanBoardContent = {};
addItemButton.addEventListener("click", () => {
  let newTask = prompt("Enter new task");
  let newTaskCard = document.createElement("p");

  newTaskCard.innerText = newTask;
  newTaskCard.draggable = true;
  newTaskCard.classList.add("item");

  itemsCols[2].appendChild(newTaskCard);
  taskItems = document.querySelectorAll(".item");
});

boards.forEach((col, idx) => {
  col.addEventListener("dragover", () => {
    cardDroppedIn = idx;
  });
});

taskItems.forEach((task, idx) => {
  task.addEventListener("dragstart", () => {
    // // console.log(idx);
    task.classList.add("flying");
  });

  task.addEventListener("dragend", () => {
    let flyingTask = document.querySelector(".flying");
    itemsCols[cardDroppedIn].appendChild(flyingTask);
    task.classList.remove("flying");
  });
});
