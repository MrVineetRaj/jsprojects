import { renderLayout } from "./app.js";
import { modelContainer, customAlert, boardContainer } from "./domElements.js";
import { OrgServices } from "./management.js";
import {
  loadDataFromLocalStorage,
  loginMember,
  myOrg,
  syncToLocalStorage,
} from "./utility.js";

export const CustomAlert = (str) => {
  customAlert.innerText = str;
  customAlert.style.display = "inline-block";
  setTimeout(() => {
    customAlert.style.display = "none";
  }, 3000);
};

export const TaskItemInput = (boardId, isUpdating = false, itemId = "") => {
  const boardDetail = myOrg.getBoardDetail(boardId);
  let prevData = {};
  // // console.log(boardId);
  if (isUpdating) {
    console.log(myOrg.getTaskItemDetail(itemId));
    prevData = JSON.parse(JSON.stringify(myOrg.getTaskItemDetail(itemId)));
  }
  modelContainer.style.display = "flex";
  modelContainer.innerHTML = ` <form action="" class="input-form">
        <span class="close-form"><i class="fa-solid fa-xmark"></i></span>
        <legend><h1>Add Task to <span id="board-title">${
          boardDetail.boardTitle
        }</span></h1></legend>
        <span class="input-field">
          <input type="text" name="item-title" placeholder="UI fix" value="${
            prevData?.title || ""
          }"/>
          <label for="">Item Title</label>
        </span>

        <span class="input-field">
          <input
            type="text"
            placeholder="You have to change the alignment of the navbar"
            name="item-desc"
            value="${prevData?.description || ""}"
          />
          <label for="">Item Description </label>
        </span>

        <span class="input-field">
          <input type="text" placeholder="UI, Fix, Bug" 
            name="item-tags" 
            value="${prevData?.tags?.join(", ") || ""}"/>
          <label for="">Item Tags </label>
        </span>

        <span class="input-field">
          <input type="date"
            name="item-due-date"
            
            value="${new Date(prevData?.dueDate) || ""}"
            />
          <label for="">Due Date </label>
        </span>

        <span class="input-field">
          <select name="assignedTo" id="assigned-to-in-add-task" value=${
            prevData?.assignedTo
          }>
            <option value="">--Select a member--</option>
          </select>
          <label for="">Assign To</label>
        </span>

        <button>Submit</button>
      </form>`;

  let memberSelectInput = document.getElementById("assigned-to-in-add-task");
  memberSelectInput.innerHTML = "";

  let otherMemberOption = document.createElement("option");
  otherMemberOption.setAttribute("value", "");
  otherMemberOption.innerText = "--Select a member--";

  memberSelectInput.appendChild(otherMemberOption);

  myOrg.members?.forEach((member) => {
    otherMemberOption = document.createElement("option");
    otherMemberOption.setAttribute("value", member.id);
    otherMemberOption.innerText = member.name;
    memberSelectInput.appendChild(otherMemberOption);
  });

  document.querySelector(".close-form").addEventListener("click", () => {
    modelContainer.style.display = "none";
  });

  memberSelectInput.addEventListener("change", (e) => {
    // console.log(e.target.value);
  });

  document.querySelector(".input-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemTitle = formData.get("item-title");
    const itemDesc = formData.get("item-desc");
    const itemTags = formData.get("item-tags");
    const itemDueDate = formData.get("item-due-date");
    const assignedTo = formData.get("assignedTo");
    // console.log("Item Title", itemTitle);
    const currDate = new Date();
    let res = "";
    // console.log("board id", boardId);

    console.log(boardId, isUpdating, itemId, assignedTo);
    if (isUpdating) {
      res = myOrg.updateTaskItem(
        {
          id: itemId,
          boardId: boardId,
          title: itemTitle,
          description: itemDesc,
          assignedTo,
          assignedOn: prevData.assignedOn,
          dueDate: itemDueDate,
          tags: itemTags.split(","),
        },
        myOrg.getCurrMember()
      );
    } else {
      res = myOrg.addTaskItem(
        myOrg.getCurrMember(),
        boardId,
        itemTitle,
        itemDesc,
        assignedTo,
        currDate.getTime(),
        itemDueDate,
        itemTags.split(",")
      );
    }

    modelContainer.style.display = "none";
    renderLayout();
    CustomAlert(res);
  });
};

export const TaskItemDisplay = (itemId) => {
  modelContainer.style.display = "flex";

  // // console.log(myOrg);
  let taskItemDetail = myOrg.getTaskItemDetail(itemId);
  let boardItemDetail = myOrg.getBoardDetail(taskItemDetail.boardId);
  // // console.log(taskItemDetail);

  modelContainer.innerHTML = `
    <div class="task-display">
      <span class="status">${boardItemDetail.boardTitle}</span>
      <legend><h3>${taskItemDetail.title}</h3></legend>
      <p><b>Assigned to</b> <br />${
        myOrg.getOneMember(taskItemDetail.assignedTo).name
      }</p>
      <div class="controls">
        <span class="edit-form"><i class="fa-solid fa-edit"></i></span>
        <span class="close-form"><i class="fa-solid fa-xmark"></i></span>
      </div>
      <p>
        <b>Description</b> <br />${taskItemDetail.description}
      </p>
      <p><b>Assigned On</b> ${taskItemDetail.assignedOn}</p>
      <p><b>Due Date</b> ${taskItemDetail.dueDate}</p>
    </div>
  `;

  document.querySelector(".status").style.background =
    boardItemDetail.themeColor;

  document.querySelector(".close-form").addEventListener("click", () => {
    modelContainer.style.display = "none";
  });
  document.querySelector(".edit-form").addEventListener("click", () => {
    // console.log(taskItemDetail.boardId);
    TaskItemInput(taskItemDetail.boardId, true, itemId);
  });
};

export const LoginForm = () => {
  modelContainer.style.display = "flex";
  modelContainer.style.background = "black";
  modelContainer.innerHTML = `
    <form action="" class="login-form">
        <legend>
          <h3>Login Form</h3>
        </legend>
        <span class="close-form"><i class="fa-solid fa-xmark"></i></span>
        <span class="input-field">
          <input type="text" placeholder="O51534..." name="org-id" />
          <label for="">Organization Id</label>
        </span>
        <span class="input-field">
          <input type="text" placeholder="M51534..." name="user-id" />
          <label for="">User Id</label>
        </span>
        <span class="input-field">
          <input type="password" placeholder="" name="password" />
          <label for="">Password</label>
        </span>
        <p style="text-align: center">
          Not a user <span class="signup-form-opener">sign up</span> here
        </p>
        <button>Submit</button>
      </form>
   `;

  document.querySelector(".login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    loginMember;
    let formData = new FormData(e.target);

    let orgId = formData.get("org-id");
    let memberId = formData.get("user-id");
    let password = formData.get("password");

    const res = loginMember(orgId, memberId, password);

    if (!res) {
      return;
    }

    modelContainer.style.background = "rgb(0,0,0,0.3)";
    modelContainer.style.display = "none";
    renderLayout();
  });

  document
    .querySelector(".signup-form-opener")
    .addEventListener("click", () => {
      // modelContainer.style.display = "none";
      // // console.log("Hello login form");
      // modelContainer.innerHTML = "";
      SignupForm();
    });
};

export const SignupForm = () => {
  modelContainer.style.display = "flex";
  modelContainer.style.background = "black";

  modelContainer.innerHTML = `
      <form action="" class="signup-form">
        <legend>
          <h3>Sign Up Form</h3>
        </legend>
        <span class="input-field">
          <input type="text" placeholder="Tracky" name="org-name" required/>
          <label for="">Organization Name</label>
        </span>
        <span class="input-field">
          <input type="text" placeholder="Vineet Raj" name="super-admin" required/>
          <label for="">Super Admin Name</label>
        </span>
        <span class="input-field">
          <input type="password" placeholder="" name="password" required/>
          <label for="">Password</label>
        </span>
        <p style="text-align: center">
          Already a user <span class="login-form-opener">login</span> here
        </p>
        <div id="login-cred" style="display:none">
          <h4>Login Info</h4>
          <p id="orgId"></p>
          <p id="memberId"></p>
        <span class="btn" id="sign-up-continue">Continue</span>
        </div>
        <button id="sign-up-button">Submit</button>
      </form>
  `;

  document.querySelector(".signup-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const orgName = formData.get("org-name");
    const superAdmin = formData.get("super-admin");
    const password = formData.get("password");
    const currTime = new Date().getTime();

    const newOrgObject = {
      id: `O${currTime}`,
      orgName,
      members: [
        {
          id: `M${currTime}`,
          name: superAdmin,
          password: password,
          role: "super-admin",
        },
      ],
      boards: [],
      boardItems: [],
    };

    let authObj = {
      orgId: newOrgObject.id,
      memberId: `M${currTime}`,
      timestamp: currTime,
    };

    syncToLocalStorage(authObj, "tracky_auth");
    syncToLocalStorage(newOrgObject, `tracky_${newOrgObject.id}`);

    document.getElementById("sign-up-button").style.display = "none";
    document.getElementById("login-cred").style.display = "inline-block";
    document.getElementById("orgId").innerText = newOrgObject.id;
    document.getElementById("memberId").innerText = `M${currTime}`;
  });

  document.getElementById("sign-up-continue").addEventListener("click", () => {
    modelContainer.style.background = "rgb(0,0,0,0.3)";
    modelContainer.style.display = "none";
    renderLayout();
  });
};

export const CreateNewBoard = () => {
  modelContainer.style.display = "flex";

  modelContainer.innerHTML = `
      <form action="" class="new-board-form">
        <span class="close-form"><i class="fa-solid fa-xmark"></i></span>
        <legend>
          <h3>New board details</h3>
        </legend>
        <span class="input-field">
          <input type="text" name="board-title" placeholder="In Progress..." />
          <label for="">Board Title</label>
        </span>
        <span class="input-field">
          <textarea
            type="text"
            name="board-desc"
            placeholder="List of tasks that are in progress..."
          ></textarea>
          <label for="">Board Description</label>
        </span>
        <span class="input-field-flex">
          <input type="checkbox" name="access-control"/>
          <label for="">Allow users to edit !</label>
        </span>
        
        <div class="color-options">
          <div class="option" id="red"></div>
          <div class="option" id="orange"></div>
          <div class="option" id="purple"></div>
          <div class="option chosen" id="blue"></div>
          <div class="option" id="green"></div>
        </div>
        <button>Create</button>
      </form>
  `;
  let chosenColor = "blue";
  let chosenColorIndex = 3;

  document.querySelector(".new-board-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let boardTitle = formData.get("board-title");
    let boardDesc = formData.get("board-desc");
    let accessControlInput = formData.get("access-control");
    let themeColor = chosenColor;
    let orgId = myOrg.orgId;

    let accessGivenTo = ["super-admin", "admin"];
    if (accessControlInput === "on") {
      accessGivenTo.push("user");
    }

    // // console.log(accessControl);
    let storedOrgDetails = JSON.parse(localStorage.getItem(`tracky_${orgId}`));

    // let { boards, ...restData } = storedOrgDetails;
    let boards = storedOrgDetails?.boards || [];
    const currTime = new Date().getTime();
    let updatedBoard = [
      ...JSON.parse(JSON.stringify(boards)),
      {
        id: `B${currTime}`,
        boardTitle: boardTitle,
        boardDesc,
        access: accessGivenTo,
        themeColor: themeColor,
      },
    ];

    syncToLocalStorage(
      { ...storedOrgDetails, boards: updatedBoard },
      `tracky_${myOrg.orgId}`
    );

    modelContainer.style.display = "none";
    renderLayout();
  });

  document.querySelector(".close-form").addEventListener("click", () => {
    modelContainer.style.display = "none";
  });
  let allOptions = document.querySelectorAll(".option");

  allOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      allOptions[chosenColorIndex].classList.remove("chosen");
      chosenColor = option.id;
      chosenColorIndex = index;

      option.classList.add("chosen");
    });
  });
};

export const AddNewMember = () => {
  modelContainer.style.display = "flex";

  modelContainer.innerHTML = `
  <form action="" class="add-new-member-form">
        <legend>
          <h3>Add New Member</h3>
        </legend>
        <span class="close-form"><i class="fa-solid fa-xmark"></i></span>
        <span class="input-field">
          <input type="text" placeholder="Amit" name="member-name" />
          <label for="">Member name</label>
        </span>
        <span class="input-field">
          <input type="password" name="passowrd" />
          <label for="">Password</label>
        </span>
        <span class="input-field">
          <select name="member-role" id="">
            <option value="">--Select Role--</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
          <label for="">Member Role</label>
        </span>
        <button>Add Member</button>
      </form>
  `;

  document
    .querySelector(".add-new-member-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      let formData = new FormData(e.target);

      let memberName = formData.get("member-name");
      let password = formData.get("password");
      let role = formData.get("member-role");

      let res = myOrg.addNewMember(memberName, role, password);
      CustomAlert(res);
      modelContainer.style.display = "none";
    });

  document.querySelector(".close-form").addEventListener("click", () => {
    modelContainer.style.display = "none";
  });
};

// AddNewMember();
