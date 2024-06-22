import BirthChart from "../classes/BirthChart.js";
import SmallBirthChart from "../classes/SmallBirthChart.js";
import Player from "../classes/Player.js";
import AstrologyBingoGameController from "../classes/AstrologyBingoGameController.js";
import { isElement } from "../utilities.js";

const { planets } = SmallBirthChart.reducedPlanets;

// /****************************************************************
//  * Report Component
//  ****************************************************************/

class Report {
  constructor({ game, domNodes: { mountNode, controls }, options = {} }) {
    if (!(game instanceof AstrologyBingoGameController)) {
      throw new Error(
        `PlayerList needs an AstrologyBingoGameController; instead received: ${game} (type: ${typeof game}, class: ${
          game?.__proto__?.constructor
        })`,
      );
    }
    this.game = game;
    console.log("number of players:", game.players.length);
    console.log("players:", game.players);
    if (!isElement(mountNode)) {
      throw new Error(
        `PlayerList needs an element to mount into; instead received: ${mountNode} (type: ${typeof mountNode}, class: ${
          mountNode?.__proto__?.constructor
        })`,
      );
    }

    this.mountNode = mountNode;
    this.controls = controls;

    this.sorted = false;

    const defaults = {
      showPickedTime: 5000,
      modalOpacity: 0.8,
      showControls: true,
      sorted: false,
      showingResults: false,
    };
    this.options = { ...defaults, ...options };

    // Precompute counts for each sign
    this.playerSuns = game.players.map((player) => player.Sun.sign);
    this.playerMoons = game.players.map((player) => player.Moon.sign);
    this.playerRisings = game.players.map((player) => player.Rising.sign);

    this.sunSignCounts = this.countSigns(this.playerSuns);
    this.moonSignCounts = this.countSigns(this.playerMoons);
    this.risingSignCounts = this.countSigns(this.playerRisings);
  }

  countSigns(signs) {
    const signCounts = {};
    signs.forEach((sign) => {
      signCounts[sign] = (signCounts[sign] || 0) + 1;
    });
    return signCounts;
  }

  renderSignCounts(title, counts) {
    let html = `<h3>${title}</h3><ul>`;
    for (const [sign, count] of Object.entries(counts)) {
      html += `<li>${sign}: ${count}</li>`;
    }
    html += `</ul>`;
    return html;
  }

  render({ mountNode = null, renderFn, options = {} } = {}) {
    if (!mountNode) {
      mountNode = this.mountNode;
    }
    this.game.sortPlayers(this.options.showingResults);

    mountNode.innerHTML = "";
    if (renderFn && typeof renderFn === "function") {
      mountNode.innerHTML = renderFn(this.game);
      return;
    }

    const {
      game: { players },
    } = this;
    if (!players.length) {
      mountNode.innerHTML = "<p>No players yet...</p>";
    } else {
      const roundup = document.createElement("div");
      roundup.innerHTML = `
        ${this.renderSignCounts("Sun Sign Counts", this.sunSignCounts)}
        ${this.renderSignCounts("Moon Sign Counts", this.moonSignCounts)}
        ${this.renderSignCounts("Rising Sign Counts", this.risingSignCounts)}
      `;

      const list = document.createElement("ol");
      list.classList.add("list-group");

      for (const player of players) {
        const { name } = player;
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        const title = document.createElement("h2");
        title.textContent = name;
        title.classList.add("owner");
        li.append(title);

        const controls = document.createElement("div");
        controls.classList.add("cip-controls");

        li.append(controls);
        list.append(li);
      }
      mountNode.append(roundup);
      mountNode.append(list);
    }
  }
}

export default Report;

