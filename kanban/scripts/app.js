import {
  CreateNewBoard,
  CustomAlert,
  LoginForm,
  TaskItemDisplay,
  TaskItemInput,
} from "./components.js";
import {
  userNameDisplay,
  orgNameDisplay,
  boardContainer,
  customAlert,
} from "./domElements.js";
import {
  renderAdminPanel,
  renderProfile,
  renderSideBar,
} from "./script-for-aside.js";
import {
  automaticLogin,
  boardWiseTaskCount,
  loadDataFromLocalStorage,
  myOrg,
} from "./utility.js";

export function renderLayout() {
  document.getElementById("page-title").innerText = "Kanban Board";
  boardContainer.style.flexDirection = "row";
  // loading data from localstorage
  let authDetail = automaticLogin();
  // // console.log(authDetail);
  if (!authDetail) {
    LoginForm();
    return;
  }
  loadDataFromLocalStorage(authDetail.orgId, authDetail.memberId);

  let currMember = myOrg?.getCurrMember();

  orgNameDisplay.innerText = myOrg?.orgName || "Org. Name";
  userNameDisplay.innerText = currMember.name || "User Name";
  document.getElementById("user-avatar").innerText = currMember.name
    .split(" ")
    .map((item) => {
      return item[0];
    })
    .join("");
  // // console.log("currMember", currMember);

  let boardsForDisplay = {};

  myOrg.boards?.forEach((item) => {
    boardsForDisplay[item.id] = {
      ...item,
      items: [],
    };
  });

  myOrg?.boardItems?.forEach((item) => {
    boardsForDisplay[item.boardId]?.items?.push(item);
  });

  boardContainer.innerHTML = "";
  // boardContainer
  for (let boardId in boardsForDisplay) {
    let newBoard = document.createElement("div");
    newBoard.classList.add("board");
    newBoard.id = boardId;
    newBoard.style.borderTop = `5px solid ${boardsForDisplay[boardId].themeColor}`;
    let topDiv = document.createElement("div");
    topDiv.classList.add("top");
    newBoard.appendChild(topDiv);

    let boardControls = document.createElement("div");
    boardControls.classList.add("board-control");
    boardControls.innerHTML = `
      <i class="fa-solid fa-edit edit-board" board-id=${boardId}></i>
      <i class="fa-solid fa-trash delete-board" board-id=${boardId}></i>
    `;

    newBoard.appendChild(boardControls);

    let boardHeader = document.createElement("h3");
    boardContainer.classList.add("board-header");
    boardHeader.innerText = boardsForDisplay[boardId].boardTitle;
    boardHeader.style.color = `${boardsForDisplay[boardId].themeColor}`;
    let boardItemCountContainer = document.createElement("span");
    boardItemCountContainer.innerText = boardWiseTaskCount[boardId] || 0;
    boardItemCountContainer.style.background =
      boardsForDisplay[boardId].themeColor;
    boardItemCountContainer.classList.add("item-counter-kanban");
    boardHeader.appendChild(boardItemCountContainer);

    topDiv.appendChild(boardHeader);

    let itemsContainer = document.createElement("div");
    itemsContainer.classList.add("items");

    boardsForDisplay[boardId]?.items?.forEach((item) => {
      let newItem = document.createElement("p");
      newItem.classList.add("item");
      newItem.innerText = item.title;
      newItem.draggable = true;
      newItem.id = item.id;
      itemsContainer.appendChild(newItem);

      newItem.addEventListener("click", () => {
        // // console.log(item.title, item.id);
        TaskItemDisplay(item.id);
      });
    });

    topDiv.appendChild(itemsContainer);

    let addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add-item");
    addTaskButton.setAttribute("board-id", boardId);
    addTaskButton.innerText = "Add Task";
    addTaskButton.style.color = boardsForDisplay[boardId].themeColor;
    addTaskButton.style.border = `2px dashed ${boardsForDisplay[boardId].themeColor}`;
    newBoard.appendChild(addTaskButton);
    boardContainer.appendChild(newBoard);
  }

  document.querySelectorAll(".delete-board").forEach((board) => {
    board.addEventListener("click", () => {
      let boardId = board.getAttribute("board-id");
      // console.log("boardId", myOrg.getCurrMember());
      let res = myOrg.removeBoard(boardId, myOrg.getCurrMember());
      CustomAlert(res);
    });
  });

  document.querySelectorAll(".edit-board").forEach((board) => {
    let boardId = board.getAttribute("board-id");
    board.addEventListener("click", () => {
      CreateNewBoard(true, boardId);
    });
  });

  let addNewBoardWalaBoard = document.createElement("div");
  addNewBoardWalaBoard.classList.add("board");
  addNewBoardWalaBoard.classList.add("add-board");
  addNewBoardWalaBoard.innerText = "+";

  addNewBoardWalaBoard.addEventListener("click", () => {
    CreateNewBoard();
  });

  boardContainer.appendChild(addNewBoardWalaBoard);

  document.querySelectorAll(".add-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      let boardId = btn.getAttribute("board-id");
      // // console.log(boardId);
      renderLayout();
      TaskItemInput(boardId);
    });
  });

  // implementing drag-and drop to move items from board to other

  let itemOnBoardId = ""; // storing itemId
  let onItem = ""; //storing itemId
  let prevBoardForItem = "";

  document.querySelectorAll(".item")?.forEach((item) => {
    item.addEventListener("dragstart", () => {
      console.log("assigned to", myOrg.getTaskItemDetail(item.id).assignedTo);
      console.log("currMember ", myOrg.getCurrMember().id);
      if (
        myOrg.getCurrMember().role === "employee" &&
        myOrg.getTaskItemDetail(item.id).assignedTo !== myOrg.getCurrMember().id
      ) {
        CustomAlert("You can only drag tasks that are assigned to you");
      }

      item.classList.add("flying");
      prevBoardForItem = myOrg.getTaskItemDetail(item.id).boardTid;
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("flying");
      const taskItemObj = myOrg.getTaskItemDetail(item.id);

      console.log(
        myOrg
          .getBoardDetail(itemOnBoardId)
          .access.some((access) => access === myOrg.getCurrMember().role)
      );

      console.log(
        myOrg.getBoardDetail(itemOnBoardId).access,
        myOrg.getCurrMember().role
      );
      if (
        !myOrg
          .getBoardDetail(itemOnBoardId)
          .access.some((access) => access === myOrg.getCurrMember().role)
      ) {
        CustomAlert("You can not drag here");
        return;
      }
      const res = myOrg.updateTaskItem(
        { ...taskItemObj, boardId: itemOnBoardId },
        myOrg.getCurrMember(),
        true,
        onItem
      );
      CustomAlert(res);
    });
    item.addEventListener("dragover", () => {
      onItem = item.id;
      // console.log(onItem);
    });
  });

  document.querySelectorAll(".board").forEach((board, index) => {
    board.addEventListener("dragover", () => {
      if (board.id.startsWith("B174")) {
        itemOnBoardId = board.id;
      }
      // document
      //   .querySelectorAll(".items")
      //   [index].appendChild(document.querySelector(".flying"));
    });
  });
  renderSideBar();
}

renderLayout();
// renderAdminPanel();
// renderProfile();
