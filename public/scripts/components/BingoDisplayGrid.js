import BirthChart from "../classes/BirthChart.js";
import SmallBirthChart from "../classes/SmallBirthChart.js";
import AstrologyBingoGameController from "../classes/AstrologyBingoGameController.js";
import { isElement } from "../utilities.js";

/****************************************************************************
 * A component that constructs the visual grid (both public and admin views)
 * Basic (grid with items); Admin (lineguides and call button)
 ***************************************************************************/

class BingoDisplayGrid {
  constructor({
    game,
    domNodes: { gridArea, controls, phraseDisplay, prevCallDisplay },
    classes: {
      calledClass = "called",
      hoveringClass = "hover",
      lastCalledClass = "lastCalled",
      ...supplemental
    },
    options,
  }) {
    this.game = game;
    this.gridArea = gridArea;
    this.controls = controls;
    this.phraseDisplay = phraseDisplay;
    this.prevCallDisplay = prevCallDisplay;
    this.classes = {
      calledClass,
      hoveringClass,
      lastCalledClass,
      ...supplemental,
    };
    const defaults = {
      showPickedTime: 5000,
      modalOpacity: 0.8,
      features: {
        showModal: true,
      },
    };
    this.settings = { ...defaults, ...options };
    this.modal = null;

    // Connection opened
    const { socket, alreadyCalled, reset } = this.game;
    socket.addEventListener("open", () => {
      // console.log("open from the grid");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("grid received message", event.data);
      const evt = JSON.parse(event.data);
      console.log("evt", evt);
      switch (evt.type) {
        case "updated-state":
          if (evt.controllerId === this.game._id) {
            console.log(`grid for controller ${evt.controllerId} re-endering`);
            this.render();
          }
          break;
        default:
          console.log(`grid for controller ${evt.controllerId} doing nothing`);
      }
    });

    // Listen for errors
    socket.addEventListener("error", (err) => {
      // console.log("error from the grid", err);
    });

    if (this.settings.features.showModal) {
      let modalElem = document.getElementById("pick-modal");

      if (!modalElem) {
        modalElem = document.createElement("div");
        modalElem.classList.add("modal", "pick-modal");
        modalElem.id = "pick-modal";
        modalElem.innerHTML = `
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
            <div class="modal-content"></div>
            `;
        document.body.append(modalElem);
      }
      const modalOptions = {
        opacity: this.settings.modalOpacity,
      };
      // console.log("sdfsdfsdfsd", M.Modal.init(modalElem, modalOptions));
      this.modal = M.Modal.init(modalElem, modalOptions);
    }
  }

  addControls() {
    if (!this.controls.querySelector("#reset")) {
      const button = document.createElement("button");
      button.id = "reset";
      button.classList.add("btn", "danger");
      button.textContent = "Reset game";
      button.addEventListener("click", (e) => {
        this.game.reset();
      });
      this.controls.append(button);
    }
  }

  // clearPhrase() {
  //   this.phraseDisplay.innerHTML = "";
  // }

  // resetUI() {
  //   this.clearCalled();
  //   this.clearPhrase();
  // }

  render(overrides = {}) {
    const defaults = {
      features: {
        controls: false,
        hoverguides: false,
        clickable: false,
      },
    };

    const settings = { ...defaults, ...this.settings, ...overrides };

    // So you can provide an override from outside the class
    if (typeof settings.renderFn === "function") {
      renderFn();
      return;
    }

    // Create the table parts
    const table = document.createElement("table");
    table.classList.add("call-table");
    table.id = "call-table";
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.classList.add("blank-cell");

    tr.append(td);

    // Now insert one <th> per planet
    for (const planet of SmallBirthChart.reducedPlanets) {
      const th = document.createElement("th");
      th.textContent = planet;
      th.dataset.planet = planet;
      th.classList.add(planet);
      th.setAttribute("scope", "col");
      tr.append(th);
    }

    tr.append(td.cloneNode());

    thead.append(tr);
    table.append(thead);

    // Now do the rows (Nested loops is OK here because very small data set)
    const tbody = document.createElement("tbody");
    for (const sign of BirthChart.signs) {
      const row = document.createElement("tr");
      const rowHeader = document.createElement("th");
      rowHeader.textContent = sign;
      rowHeader.dataset.sign = sign;
      rowHeader.classList.add(sign);
      row.append(rowHeader);
      for (const planet of SmallBirthChart.reducedPlanets) {
        const cell = document.createElement("td");
        cell.dataset.planet = planet;
        cell.dataset.sign = sign;
        cell.classList.add(planet, sign);
        cell.textContent = "";
        row.append(cell);
      }
      row.append(rowHeader.cloneNode(true));
      tbody.append(row);
    }
    table.append(tbody);

    const tfoot = document.createElement("tfoot");
    tfoot.append(tr.cloneNode(true));
    table.append(tfoot);

    // Put this here after the cloning.
    td.id = "blank-cell";

    if (settings.features.controls && !this.controls.querySelector("#call")) {
      // Put the call button in
      const callButton = document.createElement("button");
      callButton.textContent = "call";
      callButton.id = "call";
      callButton.classList.add("btn", "new-call");

      callButton.addEventListener("click", () => {
        this.game.pick();
        this.markCalled();
        // this.game.socket.send(JSON.stringify({ type: 'call'}));
      });

      if (!this.game.potentialCallList.length) {
        callButton.setAttribute("disabled", "disabled");
      }
      // td.append(callButton);
      this.controls.append(callButton);
    }

    this.gridArea.innerHTML = "";
    this.gridArea.append(table);

    if (settings.features.controls) {
      this.addControls();
    }

    if (settings.features.hoverguides) {
      this.setUpHoverGuides();
    }

    if (settings.features.clickable) {
      this.setUpClickable();
    }
    this.markCalled({ alreadyCalled: this.game.alreadyCalled });
  }

  setUpClickable() {
    if (!this.gridArea.dataset.evtBound) {
      const clickHandler = (e) => {
        // console.log("target", e?.target?.closest("td:not(.blank-cell)"));
        const target = e?.target?.closest("td:not(.blank-cell)");
        if (target) {
          const { planet, sign } = target.dataset;
          const pick = {
            planet,
            sign,
          };
          console.log(`in grid, abut to pick`, pick);
          console.log("trigger element was ", target);
          this.game.pick(pick);
          // this.game.socket.send(
          //   JSON.stringify({
          //     type: "forced-pick",
          //     data: pick,
          //     controllerId: this.game._id,
          //   })
          // );
        }
      };
      this.gridArea.addEventListener("click", clickHandler);
    }
    this.gridArea.dataset.evtBound = true;
  }

  setUpHoverGuides(
    grid = this.gridArea,
    hoverClass = this.classes.hoveringClass,
  ) {
    if (!isElement(grid)) {
      throw new Error(
        `You must provide a DOM node to insert the grid in. Received ${grid}`,
      );
    }

    grid.addEventListener("mouseover", (e) => {
      const oldEls = document.querySelectorAll(`.${hoverClass}`);
      for (const el of oldEls) {
        el.classList.remove(hoverClass);
      }
      // console.log("target", e?.target?.closest("td:not(.blank-cell)"));
      const target = e?.target?.closest("td:not(.blank-cell)");
      if (target) {
        const {
          dataset: { planet, sign },
        } = target;
        // // console.log("p", planet, "s", sign);

        const planetCells = document.querySelectorAll(`.${planet}`);
        for (const cell of planetCells) {
          cell.classList.add(hoverClass);
        }

        const signCells = document.querySelectorAll(`.${sign}`);
        for (const cell of signCells) {
          cell.classList.add(hoverClass);
        }
      }
    });
  }

  markCalled() {
    // if (gameData == null) {
    //   throw new Error(
    //     `Expected an game data in BingoGridDisplay.markCalled; instead received ${gameData} (type: ${typeof gameData})`
    //   );
    // }
    console.log("in grid markCalled");
    const { alreadyCalled: called } = this.game;
    if (!called.length) {
      if (this.settings.features.showPhrases) {
        this.phraseDisplay.innerHTML = "";
        this.prevCallDisplay.innerHTML = "";
      }
      return;
    }
    const { gridArea: grid } = this;
    const { calledClass, lastCalledClass } = this.classes;
    const lastPick = grid.querySelector(`.${lastCalledClass}`);
    if (lastPick) {
      lastPick.classList.remove(lastCalledClass);
    }
    for (const [i, { planet, sign, callPosition }] of called.entries()) {
      const item = grid.querySelector(`.${planet}.${sign}`);
      // item.textContent = callPosition;
      item.classList.add(calledClass);
      const isLastPicked = i === called.length - 1;
      if (isLastPicked) {
        // item.classList.add(lastCalledClass, "open");
        item.classList.add(lastCalledClass);
      }

      const text =
        planet === "Rising" || planet === "Descendant"
          ? `${sign} ${planet}`
          : `${planet} in ${sign}`;
      const HTML = `

        <h2 class="title">${text}</h2>
      `;

      item.innerHTML = HTML;
      if (this.settings.features.showModal) {
        const contentDiv = this.modal.el.querySelector(".modal-content");
        contentDiv.innerHTML = HTML;
        this.modal.open();

        setTimeout(() => {
          // item.classList.remove("open");
          this.modal.close();
        }, this.settings.showPickedTime);
      }
    }
    if (this.settings.features.showPhrases) {
      const phrase = document.createElement("p");
      const prevCallEl = document.createElement("p");
      const { planet, sign } = called[called.length - 1];
      if (called.length > 1) {
        const prevPlanet = called[called.length - 2].planet;
        const prevSign = called[called.length - 2].sign;
        let prevCallText =
          prevPlanet === "Rising" || prevSign === "Descendant"
            ? `Previous call = ${prevSign} ${prevPlanet}`
            : `Previous call = ${prevPlanet} in ${prevSign}`;
        prevCallEl.textContent = prevCallText;

        this.prevCallDisplay.innerHTML = "";
        this.prevCallDisplay.append(prevCallEl);
      }
      phrase.textContent =
        AstrologyBingoGameController.catchPhraseDict[planet][sign];
      this.phraseDisplay.innerHTML = "";
      this.phraseDisplay.append(phrase);
    }
  }

  // clearCalled(grid = this.gridArea) {
  //   const { calledClass, lastCalledClass } = this.classes;
  //   const markedSquares = grid.querySelectorAll(`.${calledClass}`);
  //   for (const square of markedSquares) {
  //     square.classList.remove(calledClass, lastCalledClass);
  //     square.innerHTML = "";
  //   }
  // }
}

export default BingoDisplayGrid;