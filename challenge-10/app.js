//  🐶, 🐱, 🐭, 🐹, 🐰, 🦊, 🐻, 🐼.
const gameContainer = document.getElementById("gameContainer");
let gameBoard = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
];

function initializeBoard() {
  const emojis = {
    "🐶": 2,
    "🐱": 2,
    "🐭": 2,
    "🐹": 2,
    "🐰": 2,
    "🦊": 2,
    "🐻": 2,
    "🐼": 2,
  };

  for (let emoji in emojis) {
    for (let i = 0; i < 2; i++) {
      let placed = true;

      while (placed) {
        let row = Math.floor(Math.random() * 3.5);
        let col = Math.floor(Math.random() * 3.5);

        if (gameBoard[row][col] === "") {
          gameBoard[row][col] = emoji;
          placed = false;
        }
      }
    }
  }
  renderGameBoard();
  console.log(gameBoard);
}

function renderGameBoard() {
  for (let i = 0; i < 16; i++) {
    
  }
}
initializeBoard();
