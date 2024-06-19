import BirthChart from "../classes/BirthChart.js";
import AstrologyBingoGameController from "../classes/AstrologyBingoGameController.js";
import { isElement } from "../utilities.js";

/****************************************************************************
 * A component that constructs the visual grid (both public and admin views)
 * Basic (grid with items); Admin (lineguides and call button)
 ***************************************************************************/

class SimpleGenerator {
  constructor({
    game,
    domNodes: { gridArea, controls, phraseDisplay, prevCallDisplay, gameControls },
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
    this.gameControls = gameControls;
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


    if (settings.features.controls) {
      this.addControls();
    }

    
    this.markCalled({ alreadyCalled: this.game.alreadyCalled });
  }

  

  

  markCalled() {
    // if (gameData == null) {
    //   throw new Error(
    //     `Expected an game data in BingoGridDisplay.markCalled; instead received ${gameData} (type: ${typeof gameData})`
    //   );
    // }
    // debugger;
    console.log("in grid markCalled");
    const { alreadyCalled: called } = this.game;
    if (!called.length) {
      if (this.settings.features.showPhrases) {
        this.phraseDisplay.innerHTML = "";
        this.prevCallDisplay.innerHTML = "";
      }
      return;
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

export default SimpleGenerator;
