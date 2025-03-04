import { leaderBoardDisplay } from "./dom-elemetns.js";

let recordedPlayers = [];

const loadedPlayers = () => {
  recordedPlayers = JSON.parse(localStorage.getItem("players")) || [];

  let hasComputer = recordedPlayers.some(
    (player) => player.name === "Computer"
  );

  if (!hasComputer) {
    let newPlayer = {
      name: "Computer",
      score: 0,
      rankedAt: 0,
    };

    recordedPlayers.push(newPlayer);

    localStorage.setItem("players", JSON.stringify(recordedPlayers));
    recordedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  }

  recordedPlayers.sort((p1, p2) => p1.rankedAt - p2.rankedAt);
  recordedPlayers.sort((p1, p2) => p2.score - p1.score);

  // let leaderBoardDisplay = document.getElementById("leader-board-ranking");
  leaderBoardDisplay.innerHTML = "";

  recordedPlayers.map((player, index) => {
    let newPlayer = document.createElement("div");
    newPlayer.innerHTML = `
                            <span class="ranking">${index + 1}</span>
                            <span class="player-name">${player.name}</span>
                            <span class="games-won">${player.score}</span>
                          `;
    leaderBoardDisplay.append(newPlayer);
  });

  console.log(recordedPlayers);
};

loadedPlayers();

export { loadedPlayers };
