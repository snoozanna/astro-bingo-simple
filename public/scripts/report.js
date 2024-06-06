import AstrologyBingoGameController from "./classes/AstrologyBingoGameController.js";
import Report from "./components/Report.js";

/****************************************************************
 * The DOM script for the player list
 ****************************************************************/

const game = new AstrologyBingoGameController();
// console.log("game", game);

const mountNode = document.getElementById("report-container");
// console.log("mountNode", mountNode);

const report = new Report({
  game,
  domNodes: { mountNode },
});

report.render();
