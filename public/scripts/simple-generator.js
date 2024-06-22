import AstrologyBingoGameController from "./classes/AstrologyBingoGameController.js";
import SimpleGenerator from "./components/SimpleGenerator.js";

/****************************************************************
 * The DOM script for the ADMIN grid page (w/ call button, etc.)
 ****************************************************************/

const game = new AstrologyBingoGameController();
const grid = new SimpleGenerator({
  game,
  domNodes: {
    gridArea: document.getElementById("grid-container"),
    controls: document.getElementById("upperControls"),
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
      controls: true,
      hoverguides: true,
      clickable: false,
      showModal: false,
      showPhrases: true,
    },
  },
});

grid.render();
