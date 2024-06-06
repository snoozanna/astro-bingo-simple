import { uuidv4 } from "../utilities.js";
import SmallBirthChart from "./SmallBirthChart.js";

const { planets } = SmallBirthChart;

/****************************************************************
 * Constructor for a player
 * Name, birthchart & id
 ****************************************************************/

class Player extends SmallBirthChart {
  constructor({ chartData, _id = uuidv4() }) {
    super(chartData);
    this._id = _id;
    this.created = chartData.created || Date.now();

    const { ownerName: name, score, complete } = chartData;

    if (typeof name !== "string") {
      throw new Error(
        `Player name must be a string; instead received ${name} (type: ${typeof name})`
      );
    } else if (typeof name === "string" && !name.length) {
      throw new Error(
        `Player name is required; received ${name} (length: ${name.length})`
      );
    }

    this.name = name;
    this.score = score ?? 0;
    this.complete = complete ?? false;
  }

  markCalled(callItem) {
    super.markCalled(callItem);
    let noOfCalledItems = 0;
    for (const planet of planets) {
      if(this[planet].called) {
        noOfCalledItems += 1;
      }
    }
    this.score = noOfCalledItems;
    if (this.score === 12) {
      this.complete = true;
    }
  }

  unMarkCalled() {
    super.unMarkCalled();
    this.score = 0;
    this.complete = false;
  }
}

export default Player;
