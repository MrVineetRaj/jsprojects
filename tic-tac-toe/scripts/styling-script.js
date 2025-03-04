import { loadedPlayers } from "./script.js";

import {
  inputLabelPlayer,
  inputLabelPlayer1,
  inputLabelPlayer2,
  inputPlayer,
  inputPlayer1,
  inputPlayer2,
  formContainer,
  startWithComputerButton,
  startWithPlayerButton,
  startWithComputerForm,
  startWithPlayerForm,
  closeFormButton,
  playerX_NameDisplay,
  playerO_NameDisplay,
  playerO_ScoreDisplay,
  playerX_ScoreDisplay,
  playerNameNextTurnDisplay,
  startGameContainer,
} from "./dom-elemetns.js";

console.log(inputLabelPlayer1);

inputPlayer1.addEventListener("focus", () => {
  inputLabelPlayer1.style.color = "transparent";
  inputLabelPlayer1.classList.add("gradient-text");
  // console.log(inputLabelPlayer1.classList);
  inputLabelPlayer1.style.transition = "all 0.5s ease";
  inputLabelPlayer1.style.fontSize = "14px";
  inputLabelPlayer1.style.top = "-13px";
  inputLabelPlayer1.style.fontWeight = "800";
});

inputPlayer1.addEventListener("blur", () => {
  // console.log(inputPlayer1.value);
  if (inputPlayer1.value) return;
  inputLabelPlayer1.classList.remove("gradient-text");
  inputLabelPlayer1.style.color = "gray";
  inputLabelPlayer1.style.transition = "all 0.3s ease";
  inputLabelPlayer1.style.fontSize = "16px";
  inputLabelPlayer1.style.top = "6px";
  inputLabelPlayer1.style.fontWeight = "500";
});

inputPlayer2.addEventListener("focus", () => {
  inputLabelPlayer2.style.color = "transparent";
  inputLabelPlayer2.classList.add("gradient-text");
  // console.log(inputLabelPlayer1.classList);
  inputLabelPlayer2.style.transition = "all 0.5s ease";
  inputLabelPlayer2.style.fontSize = "14px";
  inputLabelPlayer2.style.top = "-13px";
  inputLabelPlayer2.style.fontWeight = "800";
});

inputPlayer2.addEventListener("blur", () => {
  if (inputPlayer2.value) return;
  inputLabelPlayer2.classList.remove("gradient-text");
  inputLabelPlayer2.style.color = "gray";
  inputLabelPlayer2.style.transition = "all 0.3s ease";
  inputLabelPlayer2.style.fontSize = "16px";
  inputLabelPlayer2.style.top = "6px";
  inputLabelPlayer2.style.fontWeight = "500";
});
inputPlayer.addEventListener("focus", () => {
  inputLabelPlayer.style.color = "transparent";
  inputLabelPlayer.classList.add("gradient-text");
  // console.log(inputLabelPlayer1.classList);
  inputLabelPlayer.style.transition = "all 0.5s ease";
  inputLabelPlayer.style.fontSize = "14px";
  inputLabelPlayer.style.top = "-13px";
  inputLabelPlayer.style.fontWeight = "800";
});

inputPlayer.addEventListener("blur", () => {
  if (inputPlayer.value) return;
  inputLabelPlayer.classList.remove("gradient-text");
  inputLabelPlayer.style.color = "gray";
  inputLabelPlayer.style.transition = "all 0.3s ease";
  inputLabelPlayer.style.fontSize = "16px";
  inputLabelPlayer.style.top = "6px";
  inputLabelPlayer.style.fontWeight = "500";
});

// form visibility management
// const formShown = false;

const openForm = (whichForm) => {
  formContainer.style.display = "flex";
  // formShown = true;
  switch (whichForm) {
    case "player":
      startWithPlayerForm.style.display = "flex";
      startWithComputerForm.style.display = "none";
      break;
    case "computer":
      startWithComputerForm.style.display = "flex";
      startWithPlayerForm.style.display = "none";
      break;
  }
};

const closeForm = () => {
  startWithComputerForm.style.display = "none";
  startWithPlayerForm.style.display = "none";
  formContainer.style.display = "none";
};

startWithComputerButton.addEventListener("click", () => {
  openForm("computer");
});

startWithPlayerButton.addEventListener("click", () => {
  openForm("player");
});

closeFormButton.addEventListener("click", () => {
  closeForm();
});

let player1 = {};
let player2 = {};

startWithPlayerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!startWithPlayerForm[0].value || !startWithPlayerForm[1].value) {
    alert("Fill Name fo both Players!");
    return;
  }

  const recordedPlayers = JSON.parse(localStorage.getItem("players")) || [];

  let player1Exists = recordedPlayers.some(
    (player) => player.name === startWithPlayerForm[0].value
  );

  let player2Exists = recordedPlayers.some(
    (player) => player.name === startWithPlayerForm[1].value
  );

  if (!player1Exists) {
    let newPlayer = {
      name: startWithPlayerForm[0].value,
      score: 0,
      rankedAt: 0,
    };
    recordedPlayers.push(newPlayer);
  }
  if (!player2Exists) {
    let newPlayer = {
      name: startWithPlayerForm[1].value,
      score: 0,
      rankedAt: 0,
    };
    recordedPlayers.push(newPlayer);
  }
  localStorage.setItem("players", JSON.stringify(recordedPlayers));

  let player1ExistingData = recordedPlayers.filter((player) => {
    return player.name === startWithPlayerForm[0].value;
  });

  let player2ExistingData = recordedPlayers.filter((player) => {
    return player.name === startWithPlayerForm[1].value;
  });

  player1 = player1ExistingData[0];
  player2 = player2ExistingData[0];

  console.log(player1, player2);

  startWithPlayerForm[0].value = "";
  startWithPlayerForm[1].value = "";
  console.log("Here");
  document.querySelector(".start-game-container").style.display = "flex";
  playerX_NameDisplay.innerText = `${player1.name} ( X )`;
  playerX_ScoreDisplay.innerText = player1.score;
  playerO_NameDisplay.innerText = `${player2.name} ( O )`;
  playerO_ScoreDisplay.innerText = player2.score;
  playerNameNextTurnDisplay.innerText = `${player1.name}'s turn`;
  loadedPlayers();
  closeForm();

  // alert("Players Recorded!");
});

startWithComputerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!startWithComputerForm[0].value) {
    alert("FillPlayer name");
    return;
  }

  const recordedPlayers = JSON.parse(localStorage.getItem("players")) || [];

  let playerExists = recordedPlayers.some(
    (player) => player.name === startWithComputerForm[0].value
  );

  if (!playerExists) {
    let newPlayer = {
      name: startWithComputerForm[0].value,
      score: 0,
      rankedAt: 0,
    };
    recordedPlayers.push(newPlayer);
  }

  localStorage.setItem("players", JSON.stringify(recordedPlayers));

  let player1ExistingData = recordedPlayers.filter((player) => {
    return player.name === startWithComputerForm[0].value;
  });

  let player2ExistingData = recordedPlayers.filter((player) => {
    return player.name === "Computer";
  });

  player1 = player1ExistingData[0];
  player2 = player2ExistingData[0];

  console.log(player1, player2);

  startWithComputerForm[0].value = "";
  startWithPlayerForm[1].value = "";

  console.log("Here");

  startGameContainer.style.display = "flex";
  playerX_NameDisplay.innerText = `${player1.name} ( X )`;
  playerX_ScoreDisplay.innerText = player1.score;
  playerO_NameDisplay.innerText = `${player2.name} ( O )`;
  playerO_ScoreDisplay.innerText = player2.score;
  playerNameNextTurnDisplay.innerText = `${player1.name}'s turn`;

  loadedPlayers();
  closeForm();

  // alert("Players Recorded!");
});

let getPlayersDetail = () => {
  return { player1, player2 };
};

export { getPlayersDetail };
