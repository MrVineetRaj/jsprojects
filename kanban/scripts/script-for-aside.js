import { renderLayout } from "./app.js";
import { boardContainer, navOptionsContainer } from "./domElements.js";
import { boardWiseTaskCount, memberWiseBoardItems, myOrg } from "./utility.js";
import { sideBar, navControlBtn } from "./domElements.js";
import { AddNewMember } from "./components.js";

const renderAdminPanel = () => {
  boardContainer.innerHTML = "";
  document.getElementById("page-title").innerText = "Admin Panel";
  boardContainer.style.flexDirection = "column";
  boardContainer.innerHTML = `
        <div class="task-counters"></div>

        <div class="member-container-header">
          <h2>Org Members</h2>
          <button id="add-new-member">Add New Member</button>
        </div>
        <div class="members-container">
          <div class="member">
            <h3>UserName</h3>
            <p>Mbhibvitt546876</p>
            <small>role</small>
          </div>
          <div class="member">
            <h3>UserName</h3>
            <p>Mbhibvitt546876</p>
            <small>role</small>
          </div>
          <div class="member">
            <h3>UserName</h3>
            <p>Mbhibvitt546876</p>
            <small>role</small>
          </div>
          <div class="member">
            <h3>UserName</h3>
            <p>Mbhibvitt546876</p>
            <small>role</small>
          </div>
          <div class="member">
            <h3>UserName</h3>
            <p>Mbhibvitt546876</p>
            <small>role</small>
          </div>
          <div class="member">
            <h3>UserName</h3>
            <p>Mbhibvitt546876</p>
            <small>role</small>
          </div>
        </div>
  `;

  let taskCounters = document.querySelector(".task-counters");
  let memberContainer = document.querySelector(".members-container");
  taskCounters.innerHTML = "";
  myOrg.boards.forEach((board) => {
    let newTaskCounter = document.createElement("div");
    newTaskCounter.classList.add("task-counter");
    newTaskCounter.id = board.id;

    // console.log(board);

    newTaskCounter.innerHTML = `<div class="task-counter">
                                  <h1>${boardWiseTaskCount[board.id] || 0}</h1>
                                  <h5>${board.boardTitle}</h5>
                                </div>`;
    newTaskCounter.style.border = `5px solid ${board.themeColor}`;
    newTaskCounter.style.color = `${board.themeColor}`;
    taskCounters.appendChild(newTaskCounter);
  });

  memberContainer.innerHTML = "";

  myOrg.members.forEach((member) => {
    let memberBox = document.createElement("div");
    memberBox.classList.add("member");
    memberBox.setAttribute("member-id", member.id);

    memberBox.innerHTML = `
            <h3>${member.name}</h3>
            <p>id : ${member.id}</p>
            <small>${member.role}</small>
    `;

    memberContainer.appendChild(memberBox);
  });

  let addMemberBtn = document.getElementById("add-new-member");
  addMemberBtn.addEventListener("click", () => {
    AddNewMember();
  });
  // console.log(addMemberBtn);
};

const renderProfile = () => {
  boardContainer.innerHTML = "";
  document.getElementById("page-title").innerText = "Profile Page";
  boardContainer.style.flexDirection = "column";
  boardContainer.innerHTML = `
  <h3>${myOrg.getCurrMember().name}</h3>
        <p>id : ${myOrg.getCurrMember().id}</p>
        <p>Password : ${myOrg.getCurrMember().password}</p>

        <h2>My Tasks</h2>
        <div class="tasks-container">
          <div class="tasks">
            <small>From</small>
            <h3>Task Title</h3>
            <p>Task Description</p>
            <p>Due Date</p>
          </div>
        </div>
  `;

  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";
  console.log(memberWiseBoardItems[myOrg.getCurrMember().id]);
  memberWiseBoardItems[myOrg.getCurrMember().id].forEach((item) => {
    let newItemBox = document.createElement("div");
    newItemBox.classList.add("tasks");

    console.log(item.dueDate);
    newItemBox.innerHTML = `
     <small>From ${myOrg.getBoardDetail(item.boardId).boardTitle}</small>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p>${item.dueDate}</p>
    `;

    newItemBox.style.border = `5px solid ${
      myOrg.getBoardDetail(item.boardId).themeColor
    }`;
    tasksContainer.appendChild(newItemBox);
  });
};

const renderSideBar = () => {
  // console.log(navOptionsContainer);
  navOptionsContainer.innerHTML = "";
  let currMember = myOrg.getCurrMember();

  let kanbanBoardBtn = document.createElement("button");
  kanbanBoardBtn.classList.add("nav-option");
  kanbanBoardBtn.innerText = "Kanban Board";
  navOptionsContainer.appendChild(kanbanBoardBtn);
  kanbanBoardBtn.addEventListener("click", () => {
    boardContainer.innerHTML = "";
    document.getElementById("page-title").innerText = "Kanban Board";
    renderLayout();
  });

  let profileButton = document.createElement("button");
  profileButton.classList.add("nav-option");
  profileButton.innerText = "Profile";
  profileButton.addEventListener("click", () => {
    renderProfile();
  });

  navOptionsContainer.appendChild(profileButton);

  if (currMember.role === "super-admin") {
    let adminDashboardButton = document.createElement("button");
    adminDashboardButton.classList.add("nav-option");
    adminDashboardButton.innerText = "Admin Panel";
    navOptionsContainer.appendChild(adminDashboardButton);

    adminDashboardButton.addEventListener("click", () => {
      renderAdminPanel();
    });
  }

  let logoutBtn = document.createElement("button");
  logoutBtn.classList.add("nav-option");
  logoutBtn.id = "logout";
  logoutBtn.innerText = "Logout";
  navOptionsContainer.appendChild(logoutBtn);

  // <button class="nav-option" id="logout">
  //   Logout
  // </button>;
  // <button class="nav-option">Dashboard</button>;

  logoutBtn.addEventListener("click", () => {
    // console.log("Click");
    localStorage.removeItem("tracky_auth");
    renderSideBar();
    renderLayout();
  });
};

setTimeout(() => {
  renderSideBar();
}, 200);

navControlBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const openSideBarBtn = document.querySelector(".open-sidebar");
  const closeSideBarBtn = document.querySelector(".close-sidebar");

  if (openSideBarBtn.classList.contains("active")) {
    // console.log(navControlBtn);
    navControlBtn.style.transform = "rotate(180deg)";
    openSideBarBtn.classList.remove("active");
    closeSideBarBtn.classList.add("active");
    sideBar.style.left = "0px";
  } else {
    navControlBtn.style.transform = "rotate(-180deg)";
    openSideBarBtn.classList.add("active");
    closeSideBarBtn.classList.remove("active");
    sideBar.style.left = "-100%";
  }
  // transform: rotate(90deg);
});

sideBar.addEventListener("click", (e) => {
  e.stopPropagation();
});

export { renderSideBar, renderAdminPanel, renderProfile };
