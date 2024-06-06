import AstrologyBingoGameController from "./classes/AstrologyBingoGameController.js";
import CurrentCall from "./components/CurrentCall.js";

/****************************************************************
 * The DOM script for the public grid page
 ****************************************************************/

const call = new CurrentCall({
  game: new AstrologyBingoGameController(),
  domNodes: {
    callDisplay: document.getElementById("call-container"),
    controls: document.getElementById("upperControls"),
  },
  options: {
    features: {
      controls: true,
      hoverguides: false,
      clickable: false,
    },
  },
});

call.render();
