import AstrologyBingoGameController from "./classes/AstrologyBingoGameController.js";
import BingoDisplayGrid from "./components/BingoDisplayGrid.js";

/****************************************************************
 * The DOM script for the public grid page
 ****************************************************************/

const grid = new BingoDisplayGrid({
  game: new AstrologyBingoGameController(),
  domNodes: {
    gridArea: document.getElementById("grid-container"),
    controls: document.getElementById("controls"),
    resetNode: document.getElementById("resetNode"),
    phraseDisplay: document.getElementById("phrase"),
    prevCallDisplay: document.getElementById("prevCall"),
    // upperControls: document.getElementById("upperControls"),
  },
  classes: {
    calledClass: "called",
    hoveringClass: "hover",
    lastCalledClass: "lastCalled",
  },
  options: {
    features: {
      showModal: false,
      showPhrases: false,
    },
  },
});

grid.render();
