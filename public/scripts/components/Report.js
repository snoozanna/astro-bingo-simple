import BirthChart from "../classes/BirthChart.js";
import Player from "../classes/Player.js";
import AstrologyBingoGameController from "../classes/AstrologyBingoGameController.js";
import { isElement } from "../utilities.js";

const { planets } = BirthChart;

// /****************************************************************
//  * Report Component
//  ****************************************************************/

class Report {
  constructor({ game, domNodes: { mountNode, controls }, options = {} }) {
    if (!(game instanceof AstrologyBingoGameController)) {
      throw new Error(
        `PlayerList needs a an AstrologyBingoGameController; instead received: ${game} (type: ${typeof game}, class: ${
          game?.__proto__?.constructor
        })`,
      );
    }
    this.game = game;
    console.log("number of players:", game.players.length);
    console.log(" players:", game.players);
    if (!isElement(mountNode)) {
      throw new Error(
        `PlayerList needs an element to mount into; instead received: ${mountNode} (type: ${typeof mountNode}, class: ${
          mountNode?.__proto__?.constructor
        })`,
      );
    }
    const playerSuns = [];
    const playerMoons = [];
    const playerAscs = [];
    playerSuns.push(game.players.map((player) => player.Sun.sign));
    playerMoons.push(game.players.map((player) => player.Moon.sign));
    playerAscs.push(game.players.map((player) => player.Rising.sign));

    console.log("playerSuns", playerSuns);

    //Sun count
    const ariesCount = playerSuns[0].filter((i) => i === "Aries").length;
    const taurusCount = playerSuns[0].filter((i) => i === "Taurus").length;
    const geminiCount = playerSuns[0].filter((i) => i === "Gemini").length;
    const cancerCount = playerSuns[0].filter((i) => i === "Cancer").length;
    const leoCount = playerSuns[0].filter((i) => i === "Leo").length;
    const virgoCount = playerSuns[0].filter((i) => i === "Virgo").length;
    const libraCount = playerSuns[0].filter((i) => i === "Libra").length;
    const scorpioCount = playerSuns[0].filter((i) => i === "Scorpio").length;
    const sagittariusCount = playerSuns[0].filter(
      (i) => i === "Sagittarius",
    ).length;
    const capricornCount = playerSuns[0].filter(
      (i) => i === "Capricorn",
    ).length;
    const aquariusCount = playerSuns[0].filter((i) => i === "Aquarius").length;
    const piscesCount = playerSuns[0].filter((i) => i === "Pisces").length;

    //Moon Count
    const ariesMoonCount = playerMoons[0].filter((i) => i === "Aries").length;
    const taurusMoonCount = playerMoons[0].filter((i) => i === "Taurus").length;
    const geminiMoonCount = playerMoons[0].filter((i) => i === "Gemini").length;
    const cancerMoonCount = playerMoons[0].filter((i) => i === "Cancer").length;
    const leoMoonCount = playerMoons[0].filter((i) => i === "Leo").length;
    const virgoMoonCount = playerMoons[0].filter((i) => i === "Virgo").length;
    const libraMoonCount = playerMoons[0].filter((i) => i === "Libra").length;
    const scorpioMoonCount = playerMoons[0].filter(
      (i) => i === "Scorpio",
    ).length;
    const sagittariusMoonCount = playerMoons[0].filter(
      (i) => i === "Sagittarius",
    ).length;
    const capricornMoonCount = playerMoons[0].filter(
      (i) => i === "Capricorn",
    ).length;
    const aquariusMoonCount = playerMoons[0].filter(
      (i) => i === "Aquarius",
    ).length;
    const piscesMoonCount = playerMoons[0].filter((i) => i === "Pisces").length;

    // Asc Count

    const ariesAscCount = playerAscs[0].filter((i) => i === "Aries").length;
    const taurusAscCount = playerAscs[0].filter((i) => i === "Taurus").length;
    const geminiAscCount = playerAscs[0].filter((i) => i === "Gemini").length;
    const cancerAscCount = playerAscs[0].filter((i) => i === "Cancer").length;
    const leoAscCount = playerAscs[0].filter((i) => i === "Leo").length;
    const virgoAscCount = playerAscs[0].filter((i) => i === "Virgo").length;
    const libraAscCount = playerAscs[0].filter((i) => i === "Libra").length;
    const scorpioAscCount = playerAscs[0].filter((i) => i === "Scorpio").length;
    const sagittariusAscCount = playerAscs[0].filter(
      (i) => i === "Sagittarius",
    ).length;
    const capricornAscCount = playerAscs[0].filter(
      (i) => i === "Capricorn",
    ).length;
    const aquariusAscCount = playerAscs[0].filter(
      (i) => i === "Aquarius",
    ).length;
    const piscesAscCount = playerAscs[0].filter((i) => i === "Pisces").length;
    console.log("ariesCount", ariesCount);

    this.ariesCount = ariesCount;
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
    ariesCount = this.ariesCount;
    console.log("ariesCount in re", this.ariesCount);
    const {
      game: { players },
      // game,
    } = this;
    if (!players.length) {
      mountNode.innerHTML = "<p>No players yet...</p>";
    } else {
      // console.log("ariesCount in re", ariesCount);
      const roundup = document.createElement("div");

      roundup.innerHTML = `<h3>Sun Count</h3>
      
      `;

      const list = document.createElement("ol");
      list.classList.add("list-group");
      // console.table(this.game.alreadyCalled);

      for (const player of players) {
        // console.table(player, ["sign", "value"]);
        const { name, value = 7, img, _id: id } = player;
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
