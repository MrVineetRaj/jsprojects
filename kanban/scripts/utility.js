import { CustomAlert } from "./components.js";
import { organizations } from "./constants.js";
import {
  userNameDisplay,
  orgNameDisplay,
  boardContainer,
} from "./domElements.js";

import { OrgServices } from "./management.js";
let myOrg = null;
let boardWiseTaskCount = {};
let memberWiseBoardItems = {};

function loadDataFromLocalStorage(orgId = "O1", memberId = "M1") {
  const orgObj = JSON.parse(localStorage.getItem(`tracky_${orgId}`));
  myOrg = new OrgServices(orgObj, memberId);
  for (let key in boardWiseTaskCount) {
    boardWiseTaskCount[key] = 0;
  }
  for (let key in memberWiseBoardItems) {
    memberWiseBoardItems[key] = 0;
  }

  myOrg.boardItems.forEach((item) => {
    boardWiseTaskCount[item.boardId] =
      boardWiseTaskCount[item.boardId] + 1 || 1;
  });
  myOrg.boardItems.forEach((item) => {
    // memberWiseBoardItems[item.assignedTo] =
    //   memberWiseBoardItems[item.assignedTo] + 1 || 1;

    if (!memberWiseBoardItems[item.assignedTo]) {
      memberWiseBoardItems[item.assignedTo] = [item];
    } else {
      memberWiseBoardItems[item.assignedTo].push(item);
    }
  });

  // console.log(memberWiseBoardItems);
}

function automaticLogin() {
  let authDetail = JSON.parse(localStorage.getItem("tracky_auth")) || null;

  if (authDetail?.timestamp) {
    let currTime = new Date().getTime();
    let isValid = currTime - authDetail.timestamp <= 60 * 60 * 1000; // 1 hr session
    // // console.log(60 * 60 * 1000/1000);
    if (isValid) {
      return authDetail;
    }
  }

  return null;
}
function syncToLocalStorage(data, name = "tracky") {
  localStorage.setItem(name, JSON.stringify(data));
}

function loginMember(orgId, memberId, password) {
  if (!orgId || !memberId || !password) {
    CustomAlert("Fill all fields");
    return null;
  }

  let orgObj = JSON.parse(localStorage.getItem(`tracky_${orgId}`));

  if (!orgObj) {
    CustomAlert("No such organization exists ");
    return null;
  }

  let { members, ...restId } = orgObj;

  for (let i = 0; i < members.length; i++) {
    if (members[i].id === memberId && members[i].password === password) {
      const currTime = new Date().getTime();
      syncToLocalStorage(
        {
          orgId,
          memberId,
          timestamp: currTime,
        },
        "tracky_auth"
      );
      return { orgId, memberId };
    }
  }

  CustomAlert("Invalid credentials");
  return null;
}
// syncToLocalStorage(organizations[1], "tracky_O2");

export {
  loadDataFromLocalStorage,
  myOrg,
  syncToLocalStorage,
  automaticLogin,
  loginMember,
  boardWiseTaskCount,
  memberWiseBoardItems,
};
