import { renderLayout } from "./app.js";
import { renderAdminPanel } from "./script-for-aside.js";
import { syncToLocalStorage } from "./utility.js";

function isAccessAllowed(
  samePersonAllowed = false,
  isSamePerson = false,
  actionTaker,
  validRoles
) {
  // // console.log(samePersonAllowed, isSamePerson, actionTaker, validRoles);

  if (!validRoles.includes(actionTaker.role)) {
    return true;
  } else if (samePersonAllowed && isSamePerson) {
    return false;
  }

  return false;
}

class OrgServices {
  orgName;
  members;
  boards;
  boardItems;
  loggedIn;
  currMemberId;
  orgId;

  constructor(orgObj, currMemberId) {
    this.orgName = orgObj?.orgName;
    this.members = orgObj?.members;
    this.boards = orgObj?.boards;
    this.boardItems = orgObj?.boardItems;
    this.currMemberId = currMemberId;
    this.loggedIn = true;
    this.orgId = orgObj?.id;
  }

  // org related
  setOrgName(newOrgName) {
    if (isAccessAllowed(remover, ["super-admin"])) {
      return "Access Denied";
    }
    this.orgName = newOrgName;
    let previousDetails = JSON.parse(localStorage.getItem(`tracky_${orgId}`));
    let updatedDetails = {
      ...previousDetails,
      orgName: newOrgName,
    };

    syncToLocalStorage(updatedDetails, `tracky_${orgId}`);
  }

  // member related
  addNewMember(newMemberName, role, password) {
    let currTime = new Date().getTime();

    this.members.push({
      id: `M${currTime}`,
      name: newMemberName,
      password: password,
      role: role,
    });

    let previousDetails = JSON.parse(
      localStorage.getItem(`tracky_${this.orgId}`)
    );
    let updatedDetails = {
      ...previousDetails,
      members: this.members,
    };

    syncToLocalStorage(updatedDetails, `tracky_${this.orgId}`);
    renderAdminPanel();
    return "Member Added";
  }

  removeMember(memberName, remover) {
    if (isAccessAllowed(remover, "admin", "super-admin")) {
      return "Access Denied";
    }

    let newMemberList = this.members.filter((member) => {
      return member.name === memberName;
    });

    this.members = newMemberList;

    let previousDetails = JSON.parse(localStorage.getItem(`tracky_${orgId}`));
    let updatedDetails = {
      ...previousDetails,
      members: this.members,
    };

    syncToLocalStorage(updatedDetails, `tracky_${orgId}`);
  }

  getOneMember(memberId) {
    if (!memberId) {
      return "provide memberId";
    }

    let member = this.members.filter((member) => {
      return member.id === memberId;
    });
    // console.log("member from management", member);

    return member[0];
  }

  updateMemberProfile(updatedMember, updater) {
    if (
      isAccessAllowed(true, updater.id === updatedMember.id, remover, [
        "admin",
        "super-admin",
      ])
    ) {
      return "Access Denied";
    }

    let newMemberList = this.members.map((member) => {
      if (member.id === newMemberName) {
        member = updatedMember;
      }
    });

    this.members = newMemberList;
    let previousDetails = JSON.parse(localStorage.getItem(`tracky_${orgId}`));
    let updatedDetails = {
      ...previousDetails,
      members: this.members,
    };

    syncToLocalStorage(updatedDetails, `tracky_${orgId}`);
    return "Profile Updated";
  }

  // board related
  addNewBoard(boardTitle, themeColor, access) {
    if (isAccessAllowed(adder, ["super-admin"])) {
      return "Access Denied";
    }

    let currTime = new Date().getTime();

    this.boards.push({
      id: `B${currTime}`,
      boardTitle,
      themeColor,
      access,
    });

    return "Board Added";
  }

  updateBoard(updatedBoard, updater) {
    if (isAccessAllowed(updater, ["super-admin"])) {
      return "Access Denied";
    }

    let updatedBoards = this.boards.map((board) => {
      if (board.id === updatedBoard.id) {
        board = updatedBoard;
      }
    });

    this.boards = updatedBoards;

    let previousDetails = JSON.parse(localStorage.getItem(`tracky_${orgId}`));
    let updatedDetails = {
      ...previousDetails,
      boards: this.boards,
    };

    syncToLocalStorage(updatedDetails, `tracky_${orgId}`);
    return "Board Updated";
  }

  removeBoard(boardId, remover) {
    if (isAccessAllowed(remover, ["super-admin"])) {
      return "Access Denied";
    }

    let newBoardsList = this.boards.filter((board) => {
      return board.id === boardId;
    });

    this.boards = newBoardsList;

    let previousDetails = JSON.parse(localStorage.getItem(`tracky_${orgId}`));
    let updatedDetails = {
      ...previousDetails,
      boards: this.boards,
    };

    syncToLocalStorage(updatedDetails, `tracky_${orgId}`);
    return "Board Updated";
  }

  getBoardDetail(boardId) {
    let board = this.boards.filter((board) => {
      return board.id === boardId;
    });

    // // console.log(board);
    return board[0];
  }

  // task item
  addTaskItem(
    updater,
    boardId,
    title,
    description,
    assignedTo,
    assignedOn,
    dueDate,
    tags
  ) {
    if (isAccessAllowed(false, false, updater, ["super-admin", "admin"])) {
      return `Access Denied must be super-admin or admin`;
    }

    let currTime = new Date().getTime();

    this.boardItems.push({
      id: `T${currTime}`,
      boardId,
      title,
      description,
      assignedTo,
      assignedOn,
      dueDate,
      tags,
    });

    let previousDetails = JSON.parse(
      localStorage.getItem(`tracky_${this.orgId}`)
    );
    let updatedDetails = {
      ...previousDetails,
      boardItems: this.boardItems,
    };

    syncToLocalStorage(updatedDetails, `tracky_${this.orgId}`);
    return "Board Items Updated";
  }

  updateTaskItem(updatedTaskItem, updater, dragSort = false, aboveItem = "") {
    // console.log("updatedTaskItem from management "), updatedTaskItem;
    if (isAccessAllowed(false, false, updater, ["super-admin", "admin"])) {
      return "Access Denied";
    }

    let updatedItems = this.boardItems.map((boardItem) => {
      if (boardItem.id === updatedTaskItem.id) {
        boardItem = updatedTaskItem;
      }
      return boardItem;
    });

    console.log(updatedItems, this.boardItems);

    let previousDetails = JSON.parse(
      localStorage.getItem(`tracky_${this.orgId}`)
    );

    let { boardItems, ...restContent } = previousDetails;
    // // console.log(restContent);
    updatedItems = updatedItems.sort((a, b) => {
      if (a.boardId < b.boardId) {
        return -1;
      }
      if (a.boardId > b.boardId) {
        return 1;
      }
      return 0;
    });

    if (dragSort === true) {
      let itemAtIndex = -1;
      let justAboveItemIdx = -1;
      updatedItems.forEach((item, index) => {
        if (item.id === updatedTaskItem.id) {
          itemAtIndex = index;
        }

        if (item.id === aboveItem) {
          justAboveItemIdx = index;
        }
      });

      // console.log(itemAtIndex, justAboveItemIdx);

      let tempElement = JSON.parse(JSON.stringify(updatedItems[itemAtIndex]));
      if (itemAtIndex > justAboveItemIdx) {
        for (let i = itemAtIndex; i > justAboveItemIdx; i--) {
          updatedItems[i] = JSON.parse(JSON.stringify(updatedItems[i - 1]));
        }

        updatedItems[justAboveItemIdx] = JSON.parse(
          JSON.stringify(tempElement)
        );
      } else if (itemAtIndex < justAboveItemIdx) {
        for (let i = itemAtIndex; i < justAboveItemIdx - 1; i++) {
          updatedItems[i] = JSON.parse(JSON.stringify(updatedItems[i + 1]));
        }

        updatedItems[justAboveItemIdx - 1] = JSON.parse(
          JSON.stringify(tempElement)
        );
      }
    }
    // // console.log(updatedItems);
    let updatedDetails = {
      ...restContent,
      boardItems: updatedItems,
    };

    // // console.log("updatedDetails", updatedDetails);
    syncToLocalStorage(updatedDetails, `tracky_${this.orgId}`);
    renderLayout();
    return "Board Item Updated";
  }

  removeBoardItem(boardItemId, remover) {
    if (isAccessAllowed(false, false, remover, ["super-admin"])) {
      return "Access Denied";
    }

    let newBoardItems = this.boardItems.filter((boardItem) => {
      return boardItem.id === boardItemId;
    });

    this.boardItems = newBoardItems;

    let previousDetails = JSON.parse(localStorage.getItem(`tracky_${orgId}`));
    let updatedDetails = {
      ...previousDetails,
      boardItems: this.boardItems,
    };

    syncToLocalStorage(updatedDetails, `tracky_${orgId}`);

    renderLayout();
    return "Board Item removed";
  }

  getTaskItemDetail(taskItemId) {
    let task = this.boardItems.filter((item) => {
      return item.id === taskItemId;
    });

    // // console.log(task);
    return task[0];
  }

  getOrgDetails() {
    return {
      orgName: this.orgName,
      members: this.members,
      boards: this.boards,
      boardItems: this.boardItems,
    };
  }

  getCurrMember() {
    let member = this.members.filter((member) => {
      return member.id === this.currMemberId;
    });
    // console.log("member from management", member);

    return member[0];
  }
}

export { OrgServices };
