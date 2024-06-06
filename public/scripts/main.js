import AstrologyBingoGameController from "./classes/AstrologyBingoGameController.js";
import PlayerListDisplay from "./components/PlayerListDisplay.js";

/****************************************************************
 * The DOM script for the player list
 ****************************************************************/

const game = new AstrologyBingoGameController();
// console.log("game", game);

const mountNode = document.getElementById("birthchart-list-container");
// console.log("mountNode", mountNode);

const playerListDisplay = new PlayerListDisplay({
  game,
  domNodes: { mountNode },
});

playerListDisplay.render();
