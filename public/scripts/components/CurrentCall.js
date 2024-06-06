// import BingoDisplayGrid from "./BingoDisplayGrid";
/****************************************************************************
 * A component that sjows the current call
 ***************************************************************************/

class CurrentCall {
  constructor({ game, domNodes: { callDisplay, controls }, options }) {
    this.game = game;
    this.callDisplay = callDisplay;
    this.controls = controls;
    this.settings = { ...options };

    // Connection opened
    const { socket, alreadyCalled, reset } = this.game;
    socket.addEventListener("open", () => {
      // console.log("open from the current call");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("currentCall received message", event.data);
      const evt = JSON.parse(event.data);
      console.log("evt", evt);
      switch (evt.type) {
        case "updated-state":
          if (evt.controllerId === this.game._id) {
            console.log(`call for controller ${evt.controllerId} re-endering`);
            this.render();
          }
          break;
        default:
          console.log(`call for controller ${evt.controllerId} doing nothing`);
      }
    });

    // Listen for errors
    socket.addEventListener("error", (err) => {
      console.log("error from the current call", err);
    });
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

  render(overrides = {}) {
    const defaults = {
      features: {
        controls: false,
        hoverguides: false,
        clickable: false,
      },
    };

    const settings = { ...defaults, ...this.settings, ...overrides };
    const { alreadyCalled } = this.game;

    // So you can provide an override from outside the class
    if (typeof settings.renderFn === "function") {
      renderFn();
      return;
    }
    // console.log("rendering");
    // debugger;

    if (
      settings.features.controls &&
      !this.controls.querySelector("#callButton")
    ) {
      // Put the call button in
      const callButton = document.createElement("button");
      callButton.textContent = "call";
      callButton.id = "callButton";
      callButton.classList.add("btn", "new-call");

      callButton.addEventListener("click", () => {
        this.game.pick();
        // this.markCalled();
        // this.game.socket.send(JSON.stringify({ type: 'call'}));
      });

      if (!this.game.potentialCallList.length) {
        callButton.setAttribute("disabled", "disabled");
      }

      // const callButtonMount = document.getElementById("callButtonMount");
      this.controls.append(callButton);
    }

    if (settings.features.controls) {
      this.addControls();
    }

    // let callElem = document.getElementById("callContainer");
    // if (!alreadyCalled.length) {
    //   callElem.innerHTML = `No calls yet...`;
    // }

    let lastCallElem = document.getElementById("lastCallContainer");
    let prevCallElem = document.getElementById("prevCallContainer");

    if (!alreadyCalled.length) {
      lastCallElem.innerHTML = `No calls yet...`;
      prevCallElem.innerHTML = `No previous call yet...`;
    }

    if (!alreadyCalled.length === 1) {
      prevCallElem.innerHTML = `No previous call yet...`;
    }

    let lastCall = alreadyCalled[alreadyCalled.length - 1];

    // TODO if alreadyCalled = 0 let prevcall say no calls yet
    if (alreadyCalled.length > 1) {
      let prevCall = alreadyCalled[alreadyCalled.length - 2];
      let prevCallText =
        prevCall.planet === "Ascendant" || prevCall.planet === "Descendant"
          ? `${prevCall.sign} ${prevCall.planet}`
          : `${prevCall.planet} in ${prevCall.sign}`;
      prevCallElem.innerHTML = ` <h2 class="prev-call">${prevCallText}</h2>`;
    }

    let lastCallText =
      lastCall.planet === "Ascendant" || lastCall.planet === "Descendant"
        ? `${lastCall.sign} ${lastCall.planet}`
        : `${lastCall.planet} in ${lastCall.sign}`;

    //  callElem.innerHTML = `
    //       <h2 class="current-call">${lastCallText}</h2>
    //       <h2 class="prev-call">${prevCallText}</h2>
    //             `;
    lastCallElem.innerHTML = `<h2 class="current-call">${lastCallText}</h2>`;
  }
}

export default CurrentCall;
