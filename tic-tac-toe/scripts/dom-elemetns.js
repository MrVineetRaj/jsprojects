// player details
const inputPlayer1 = document.getElementById("input-player-1");
const inputPlayer2 = document.getElementById("input-player-2");
const inputPlayer = document.getElementById("input-player");

// selecting labels
const inputLabelPlayer1 = document.getElementById("input-label-player-1");
const inputLabelPlayer2 = document.getElementById("input-label-player-2");
const inputLabelPlayer = document.getElementById("input-label-player");

// form elements
const formContainer = document.getElementById("registration-forms");
const startWithPlayerForm = document.getElementById("start-player-form");
const startWithComputerForm = document.getElementById("start-computer-form");
const startWithComputerButton = document.getElementById("start-computer-btn");
const startWithPlayerButton = document.getElementById("start-player-btn");
const closeFormButton = document.getElementById("form-close-button");

let leaderBoardDisplay = document.getElementById("leader-board-ranking");

const gameBoxes = document.querySelectorAll(".game-box");
let playerX_NameDisplay = document.getElementById("player-x-name");
let playerX_ScoreDisplay = document.getElementById("player-x-score");
let playerO_NameDisplay = document.getElementById("player-o-name");
let playerO_ScoreDisplay = document.getElementById("player-o-score");
let startGameContainer = document.querySelector(".start-game-container");
let playerNameNextTurnDisplay = document.getElementById(
  "player-name-next-turn"
);
let endMatchButton = document.getElementById("end-match-btn");
console.log(playerO_ScoreDisplay);
export {
  leaderBoardDisplay,
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
  startGameContainer,
  gameBoxes,
  playerNameNextTurnDisplay,
  endMatchButton,
};
