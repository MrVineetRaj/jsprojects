import {
  endMatchButton,
  gameBoxes,
  playerNameNextTurnDisplay,
  playerO_ScoreDisplay,
  playerX_ScoreDisplay,
  startGameContainer,
} from "./dom-elemetns.js";
import { loadedPlayers } from "./script.js";
import { getPlayersDetail } from "./styling-script.js";

const gameValues = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
let gameEnded = false;
let isPlayer1_turn = true;

const computerPlay = (mat) => {
  let availableOptions = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (mat[i][j] === -1) {
        availableOptions.push([i, j]);
      }
    }
  }
  console.log(availableOptions);
  if (availableOptions.length === 0) return null; // No moves left

  let randomIndex = Math.floor(Math.random() * availableOptions.length);

  return availableOptions[randomIndex]; // Return a random move
};

const initializeBoard = () => {
  if (isPlayer1_turn) {
    playerNameNextTurnDisplay.innerText = `${
      getPlayersDetail().player1.name
    }'s turn`;
  } else {
    playerNameNextTurnDisplay.innerText = `${
      getPlayersDetail().player2.name
    }'s turn`;
  }
  gameValues.forEach((row) => row.fill(-1));
};

const loadGameBoard = () => {
  gameBoxes.forEach((box, index) => {
    let boxValue = gameValues[Math.floor(index / 3)][index % 3];
    if (boxValue === 0) {
      box.innerText = "O";
      box.style.background = "rgb(45, 1, 99)";
      box.style.color = "white";
    } else if (boxValue === 1) {
      box.innerText = "X";
      box.style.background = "rgb(128, 43, 0)";
      box.style.color = "white";
    } else {
      box.innerText = "";
      box.style.background = "transparent";
      box.style.color = "";
    }
  });
};

const announceWin = (playerName) => {
  let recordedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  recordedPlayers.forEach((player) => {
    if (player.name === playerName) {
      let currTime = new Date().getTime();
      player.score++;
      player.rankedAt = currTime;
      if (getPlayersDetail().player1.name === playerName) {
        playerX_ScoreDisplay.innerText = player.score;
      } else if (getPlayersDetail().player2.name === playerName) {
        playerO_ScoreDisplay.innerText = player.score;
      }
    }
  });
  // console.log(recordedPlayers);
  gameEnded = true;
  localStorage.setItem("players", JSON.stringify(recordedPlayers));
  setTimeout(() => {
    alert(`${playerName} Won`);
    initializeBoard();
    loadGameBoard();
  }, 30);
};

const checkTie = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameValues[i][j] === -1) {
        return false;
      }
    }
  }
  alert("It's a Tie");
  initializeBoard();
  loadGameBoard();

  return true;
};

const checkWinStatus = (arr) => {
  for (let i = 0; i < 3; i++) {
    if (arr[i][0] === 0 && arr[i][1] == 0 && arr[i][2] == 0) {
      isPlayer1_turn = false;
      announceWin(getPlayersDetail().player2.name);
      return;
    }
    if (arr[i][0] === 1 && arr[i][1] == 1 && arr[i][2] == 1) {
      isPlayer1_turn = true;
      announceWin(getPlayersDetail().player1.name);
      return;
    }
    if (arr[0][i] === 0 && arr[1][i] == 0 && arr[2][i] == 0) {
      isPlayer1_turn = true;
      announceWin(getPlayersDetail().player2.name);
      return;
    }
    if (arr[0][i] === 1 && arr[1][i] == 1 && arr[2][i] == 1) {
      isPlayer1_turn = true;
      announceWin(getPlayersDetail().player1.name);
      return;
    }
  }

  if (arr[0][0] == 0 && arr[1][1] == 0 && arr[2][2] == 0) {
    isPlayer1_turn = false;
    announceWin(getPlayersDetail().player2.name);
    return;
  }
  if (arr[0][0] == 1 && arr[1][1] == 1 && arr[2][2] == 1) {
    isPlayer1_turn = true;
    announceWin(getPlayersDetail().player1.name);
    return;
  }
  if (arr[0][2] == 0 && arr[1][1] == 0 && arr[2][0] == 0) {
    // if()
    isPlayer1_turn = false;
    announceWin(getPlayersDetail().player2.name);
    return;
  }
  if (arr[0][2] == 1 && arr[1][1] == 1 && arr[2][0] == 1) {
    isPlayer1_turn = true;
    announceWin(getPlayersDetail().player1.name);
    return;
  }

  checkTie();
};

gameBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (gameValues[Math.floor(index / 3)][index % 3] !== -1) {
      alert("Select legal box!");
      return;
    }
    if (isPlayer1_turn) {
      gameValues[Math.floor(index / 3)][index % 3] = 1;
      loadGameBoard();
      checkWinStatus(gameValues);
      console.log("gameEnded, ", gameEnded);
      playerNameNextTurnDisplay.innerText = `${
        getPlayersDetail().player2.name
      }'s turn`;
      if (gameEnded) {
        gameEnded = false;
        return;
      } else {
        if (getPlayersDetail().player2.name === "Computer") {
          setTimeout(() => {
            console.log("marked =>", gameValues);
            let computerMove = computerPlay(gameValues);
            gameValues[computerMove[0]][computerMove[1]] = 0;
            loadGameBoard();
            checkWinStatus(gameValues);
            playerNameNextTurnDisplay.innerText = `${
              getPlayersDetail().player1.name
            }'s turn`;
            isPlayer1_turn = true;
          }, 1);
          return;
        }
      }
    } else {
      gameValues[Math.floor(index / 3)][index % 3] = 0;
      playerNameNextTurnDisplay.innerText = `${
        getPlayersDetail().player1.name
      }'s turn`;
    }
    isPlayer1_turn = !isPlayer1_turn;
    loadGameBoard();
    checkWinStatus(gameValues);
  });
});

endMatchButton.addEventListener("click", () => {
  let sureToEnd = confirm("Are you sure ?");
  if (!sureToEnd) return;
  startGameContainer.style.display = "none";
  initializeBoard();
  loadedPlayers();
});

loadGameBoard();
