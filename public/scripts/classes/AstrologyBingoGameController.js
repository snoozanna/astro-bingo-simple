import SmallBirthChart from "./SmallBirthChart.js";
import Player from "./Player.js";
import {
  connectToWebSocket,
  deepFreeze,
  getRandomIntInclusive,
  uuidv4,
} from "../utilities.js";
import celebs from "./../../players/celebs.js"

/****************************************************************
 * The controller for a game
 * Hold the players, potential call list and alreadyCalled items
 ****************************************************************/

class AstrologyBingoGameController {
  static storageLabels = {
    potentialPicks: "potentials",
    alreadyCalled: "called",
    players: "players",
  };
  
  constructor() {
    console.log("hello", celebs);
    this._id = uuidv4();

    const potentialsData = localStorage.getItem(
      AstrologyBingoGameController.storageLabels.potentialPicks,
    );
    const calledData = localStorage.getItem(
      AstrologyBingoGameController.storageLabels.alreadyCalled,
    );
    const playerData = localStorage.getItem(
      AstrologyBingoGameController.storageLabels.players,
    );


    const potentials = JSON.parse(potentialsData);
    const called = JSON.parse(calledData);
    const players = JSON.parse(playerData);
    // const players = celebs;
   

    if (potentials != null && Array.isArray(potentials)) {
      this.potentialCallList = potentials;
    } else {
      if (potentials != null && !Array.isArray(potentials)) {
        console.warn(
          `Corrupted data. 'potentials' should be an array, instead got ${potentials}`,
        );
      }
      this.potentialCallList = [];
      for (const sign of SmallBirthChart.signs) {
        for (const planet of SmallBirthChart.reducedPlanets) {
          this.potentialCallList.push({ planet, sign });
          // console.log("push", planet, sign)
        }
      }
    }

    if (called != null && Array.isArray(called)) {
      this.alreadyCalled = called;
    } else {
      if (called != null && !Array.isArray(called)) {
        console.warn(
          `Corrupted data. 'called' should be an array, instead got ${called}`,
        );
      }
      this.alreadyCalled = [];
    }

    if (players != null && Array.isArray(players)) {
      this.players = players.map(
        (player) => new Player({ chartData: player, _id: player._id }),
      );
    } else {
      if (players != null && !Array.isArray(players)) {
        console.warn(
          `Corrupted data. 'players' should be an array, instead got ${players}`,
        );
      }
      this.players = [];
    }

    this.socket = connectToWebSocket(
      undefined,
      undefined,
      (event) => {
        const evt = JSON.parse(event.data);
        console.log("game reveives message", event);

        switch (evt.type) {
          case "reset":
            // this makes games in other tabs reset
            if (evt.controllerId !== this._id) {
              console.log("from another controller; reseting", this._id);
              this.reset({ signal: false });
            }
            // this makes the grids re-render
            console.log(
              `${this._id} sending the updated-state signal for grids`,
            );
            this.socket.send(
              JSON.stringify({ type: "updated-state", controllerId: this._id }),
            );
            break;
          case "picked":
            if (evt.controllerId !== this._id) {
              console.log("from another controller; updating", this._id);
              this.refreshData();
            }
            console.log(
              `${this._id} sending the updated-state signal for grids`,
            );
            this.socket.send(
              JSON.stringify({ type: "updated-state", controllerId: this._id }),
            );
            break;
          // case "toggle-result-visibility":
          //   if (evt.controllerId === this._id) {
          //     this.refreshData();
          //   }
          //   break;
          case "player-added":
            if (evt.controllerId !== this._id) {
              console.log("from another controller; player-added", this._id);
              this.updatePlayers();
            }
            // console.log(
            //   `${this._id} sending the updated-state signal for grids`
            // );
            this.socket.send(
              JSON.stringify({ type: "updated-state", controllerId: this._id }),
            );
            break;
          case "player-deleted":
            if (evt.controllerId !== this._id) {
              this.updatePlayers();
            }
            this.socket.send(
              JSON.stringify({ type: "updated-state", controllerId: this._id }),
            );
            break;
          default:
            console.log(
              `game ${this._id} received unknown evt`,
              evt,
              "doing nothing",
            );
        }
      },
      undefined,
    );

    // save
    localStorage.setItem(
      AstrologyBingoGameController.storageLabels.potentialPicks,
      JSON.stringify(this.potentialCallList),
    );
    localStorage.setItem(
      AstrologyBingoGameController.storageLabels.alreadyCalled,
      JSON.stringify(this.alreadyCalled),
    );
    localStorage.setItem(
      AstrologyBingoGameController.storageLabels.players,
      JSON.stringify(this.players),
    );
  }



addCelebsToLocalStorage(){
// delete current players

this.players = [];
this.savePlayers();
celebs.map((celeb)=> {
  console.log("player", celeb)
  // let p = celeb;
  //   if (!(celeb instanceof Player)) {
  //     p = new Player(celeb);
  //   }
  this.players.push(celeb);
  console.log("adding celeb", celeb)
  this.savePlayers();
  this.socket.send(JSON.stringify({ type: "player-added" }));
})
    
  }

  addPlayer(data) {
    let p = data;
    console.log("player", data)
    if (!(data instanceof Player)) {
      p = new Player(data);
    }
    this.players.push(p);

    // for (let i = 0; i < 50; i += 1) {
    //   if (!(data instanceof Player)) {
    //     p = new Player(data);
    //   }
    //   this.players.push(p);
    // }

    this.savePlayers();
    this.socket.send(JSON.stringify({ type: "player-added" }));
  }

  removePlayer(player) {
    if (!(player instanceof Player)) {
      throw new Error(
        `AstrologyBingoGameController.removePlayer needs a Player object; instead received: ${player} (type: ${typeof player}, class: ${
          player?.__proto__?.constructor
        })`,
      );
    }
    const idx = this.players.findIndex(({ _id }) => _id === player._id);
    this.players.splice(idx, 1);
    this.savePlayers();
    this.socket.send(JSON.stringify({ type: "player-deleted" }));
  }

  sortPlayers(showingResults = false) {
    if (showingResults) {
      console.log("Showing results: sorting by score");
      this.players
        .sort((p1, p2) => {
          // console.log(`${p1.name} score: ${p1.score}`);
          // console.log(`${p2.name} score: ${p2.score}`);
          return p1.score - p2.score;
        })
        .reverse();
    } else {
      console.log("[un]sorting by created");
      this.players.sort((p1, p2) => {
        // console.log(`${p1.name} created: ${p1.created}`);
        // console.log(`${p2.name} created: ${p2.created}`);
        return p1.created - p2.created;
      });
    }
    this.savePlayers();
  }

  updatePicks() {
    const potentialsData = localStorage.getItem(
      AstrologyBingoGameController.storageLabels.potentialPicks,
    );
    const calledData = localStorage.getItem(
      AstrologyBingoGameController.storageLabels.alreadyCalled,
    );
    const potentials = JSON.parse(potentialsData);
    const called = JSON.parse(calledData);

    if (potentials != null && Array.isArray(potentials)) {
      this.potentialCallList = potentials;
    } else {
      if (potentials != null && !Array.isArray(potentials)) {
        console.warn(
          `Corrupted data. 'potentials' should be an array, instead got ${potentials}`,
        );
      }
    }

    if (called != null && Array.isArray(called)) {
      this.alreadyCalled = called;
    } else {
      if (called != null && !Array.isArray(called)) {
        console.warn(
          `Corrupted data. 'called' should be an array, instead got ${called}`,
        );
      }
    }
  }

  updatePlayers() {
    const playerData = localStorage.getItem(
      AstrologyBingoGameController.storageLabels.players,
    );
    const players = JSON.parse(playerData);
    if (players != null && Array.isArray(players)) {
      this.players = players.map(
        (player) => new Player({ chartData: player, _id: player._id }),
      );
    } else {
      if (players != null && !Array.isArray(players)) {
        console.warn(
          `Corrupted data. 'players' should be an array, instead got ${players}`,
        );
      }
    }
  }

  refreshData() {
    this.updatePicks();
    this.updatePlayers();
  }

  reset({ signal = true } = {}) {
  //   if (window.location.pathname !== "/current-call.html") {
  //     console.log("window.location.pathname", window.location.pathname);
  //     const confirmReset = window.confirm("Are you sure?");
  //     if (!confirmReset) {
  //         // If the user clicks "No", exit the function early
  //         return;
  //     }
  // }

    for (const item of this.alreadyCalled) {
      delete item.callPosition;
    }
    this.potentialCallList = [...this.potentialCallList, ...this.alreadyCalled];
    this.alreadyCalled = [];
    for (const player of this.players) {
      player.unMarkCalled();
    }
    this.save();

    if (signal) {
      this.socket.send(
        JSON.stringify({ type: "reset", controllerId: this._id }),
      );
    }
  }

  // cb = () => {}
  pick(picked = {}) {
    // if (typeof cb !== "function") {
    //   throw new Error(
    //     `Expected a callback function for AstrologyBingoGameController.pick; instead received ${cb} (type: ${typeof cb})`
    //   );
    // }
    console.log("in app.pick", picked, `appId: ${this._id}`);
    if (!picked.planet) {
      picked.planet = AstrologyBingoGameController.getRandomPlanet();
      picked.sign = AstrologyBingoGameController.getRandomSign();
    }

    // Find the object
    const pickedItemIndex = this.potentialCallList.findIndex(
      ({ sign, planet }) => sign === picked.sign && planet === picked.planet,
    );

    // move from 'potentialCallList' to 'alreadyCalled'
    const pickedItem = this.potentialCallList.splice(pickedItemIndex, 1)[0];
    pickedItem.callPosition = this.alreadyCalled.length + 1;
    this.alreadyCalled.push(pickedItem);

    for (const player of this.players) {
      player.markCalled(pickedItem);
    }

    this.save();

    // Send to other page
    this.socket.send(
      JSON.stringify({
        type: "picked",
        item: pickedItem,
        controllerId: this._id,
      }),
    );

    // cb(this);
  }

  static getCatchPhrase(planet, sign) {
    if (typeof planet !== "string") {
      throw new Error(
        `Planet supplied to getCatchPhrase must be a string. Received ${planet} (type: ${planet})`,
      );
    }

    if (typeof sign !== "string") {
      throw new Error(
        `Sign supplied to getCatchPhrase must be a string. Received ${sign} (type: ${sign})`,
      );
    }

    const { signs, reducedPlanets } = SmallBirthChart;

    if (!reducedPlanets.includes(planet)) {
      throw new Error(
        `Planet supplied to getCatchPhrase must be a recognised planet (One of ${reducedPlanets.join(
          ", ",
        )}). Received ${planet}`,
      );
    }

    if (!signs.includes(sign)) {
      throw new Error(
        `Planet supplied to getCatchPhrase must be a recognised sign (One of ${signs.join(
          ", ",
        )}). Received ${sign}`,
      );
    }

    return this.catchPhraseDict[planet][sign];
  }

  saveItems() {
    // Save in case you change page
    localStorage.setItem(
      AstrologyBingoGameController.storageLabels.potentialPicks,
      JSON.stringify(this.potentialCallList),
    );
    localStorage.setItem(
      AstrologyBingoGameController.storageLabels.alreadyCalled,
      JSON.stringify(this.alreadyCalled),
    );
  }

  savePlayers() {
    console.log("this.players", this.players);
    localStorage.setItem(
      AstrologyBingoGameController.storageLabels.players,
      JSON.stringify(this.players),
    );
  }

  save() {
    this.saveItems();
    this.savePlayers();
  }

  static getRandomPlanet() {
    const Rn = getRandomIntInclusive(0, SmallBirthChart.reducedPlanets.length - 1);
    let planetToCall = SmallBirthChart.reducedPlanets[Rn];
    // // console.log("planetToCall", planetToCall);
    return planetToCall;
  }

  static getRandomSign() {
    const Rn = getRandomIntInclusive(0, SmallBirthChart.signs.length - 1);
    let signToCall = SmallBirthChart.signs[Rn];
    // // console.log("signToCall", signToCall);
    return signToCall;
  }

  static catchPhraseDict = deepFreeze({
    Sun: {
      Aries: "A little bit scaries, Sun in Aries",
      Taurus: "Set meal for one Taurus Sun",
      Gemini: "Who even am I, Sun in Gemini",
      Cancer: "You ok hun? Cancer sun",
      Leo: "All about me-o, Sun in Leo",
      Virgo: "Marie Kondo Sun in Virgo",
      Libra: "Eenie Meanie Miney Moe - Libra Sun",
      Scorpio: "Where’s my gun, Scorpio sun",
      Sagittarius: "A bit precarious, Sun in Sagittarius",
      Capricorn: "No time for fun, Capricorn Sun",
      Aquarius: "I’m so random, Aquarius Sun",
      Pisces: "Cries when they’ve won, Pisces Sun",
    },
    Moon: {
      Aries: "Fighting by noon, Aries Moon",
      Taurus: "Nutella with spoon, Taurus Moon",
      Gemini: "Spoke to soon, Gemini Moon",
      Cancer: "Cosy cocoon, Cancer Moon",
      Leo: "Dine at Dishoom, Leo Moon",
      Virgo: "Clean up your room, Virgo Moon",
      Libra: "Takes long to groom, Libra Moon",
      Scorpio: "Orlando Bloom, Scorpio Moon",
      Sagittarius: "Travels in June, Sagittarius Moon",
      Capricorn: "Swampy lagoon, Capricorn Moon",
      Aquarius: "See you soon, Aquarius Moon",
      Pisces: "Humming a tune, Pisces Moon",
    },
    Rising: {
      Aries: "1st amendment, Aries Rising",
      Taurus: "Loves pie and we don't mean Pythagorus, Rising in Taurus",
      Gemini: "Personality will Multiply, Ascendent in Gemini",
      Cancer: "Crabbies Ginger Ale, Cancer Rising",
      Leo: "Fiercely independent, Leo Rising",
      Virgo: "Work commitment, Virgo Rising",
      Libra: "Balancing Act, Libra Rising",
      Scorpio: "Moody Swamp, Scorpio Rising",
      Sagittarius: "I need to leave the country, Sagittarius Rising",
      Capricorn: "Let me speak to the manager, Capricorn Rising",
      Aquarius: "Feed the people, Aquarius Rising",
      Pisces: "Finding Nemo Pisces Rising",
    },
    Mercury: {
      Aries: "Things might get hairy, Mercury in Aries",
      Taurus: "No I’ll do it, but after my nap Taurus Mercury",
      Gemini: "Chatty Cathy, Gemini Mercury",
      Cancer: "Taking it personally, Cancer in Mercury",
      Leo: "Sandra Bullock, Leo in Mercury",
      Virgo: "The thinker who likes to tinker, Virgo Mercury",
      Libra: "Queen of Sheeba, Mercury Libra",
      Scorpio: "They’ll see through your perjury, Scorpio Mercury",
      Sagittarius: "Gorgeous & Gregarious, Mercury in Sagittarius",
      Capricorn: "Thorough to the bone, Mercury Capricorn",
      Aquarius: "By the way, you will bore us, Mercury Aquarius",
      Pisces: "Can you repeat the question? Pisces Mercury",
    },
    Venus: {
      Aries: "Beunos Aries, Venus Aries",
      Taurus: "Stable as an ox’es knees its, Taurus Venus",
      Gemini: "Relationship genius, Gemini Venus",
      Cancer: "Deep Sea diver in the ocean of love, Venus Cancer",
      Leo: "Bossy Bottom, Venus Leo",
      Virgo: "Suck on my toe Venus Virgo",
      Libra: "Your cousins a zeebra Venus Libra",
      Scorpio: "Love you so much I’ll kill you Scorpio Venus",
      Sagittarius: "New phone who dis? Venus Sagittarius",
      Capricorn: "Who’s got the horn? Venus Capricorn",
      Aquarius: "That’s a big penis, Aquarius Venus",
      Pisces: "The Fish of your dreams Pisces Venus",
    },
    Mars: {
      Aries: "Raising the bars, Aries in Mars",
      Taurus: "Expensive cars, Taurus Mars",
      Gemini: "Poke you in the eye, Mars in Gemini",
      Cancer: "Spitting some lonely bars, Cancer in Mars",
      Leo: "Wannabee Superstars, Leo Mars",
      Virgo: "Put things in jars, Virgo Mars",
      Libra: "Makeup from NARS, Libra Mars",
      Scorpio: "You’ll end up with scars, Scorpio Mars",
      Sagittarius: "Spanish Guitars, Sagittarius Mars",
      Capricorn: "Can afford Cigars, Capricorn Mars",
      Aquarius: "Kooky bras, Aquarius Mars",
      Pisces: "Sensitive at heart, Pisces Mars",
    },
    Jupiter: {
      Aries: "Bloody Mary’s! Jupiter Aries",
      Taurus: "Eat your way through the Virus, Jupiter Taurus",
      Gemini: "Social Butterfly Jupiter Gemini",
      Cancer: "Being sad isn’t the answer, Jupiter Cancer",
      Leo: "Put up the gazebo, Jupiter Leo",
      Virgo: "On Furlough, Jupiter Virgo",
      Libra: "secret monsta, Jupiter Libra",
      Scorpio: "Spooky Scenario, Jupiter Scorpio",
      Sagittarius: "Very adventurous, Jupiter Sagittarius",
      Capricorn:
        "Behind your wildest dreams lies reality...of course, Jupiter Capricorn",
      Aquarius: "Very generous, Jupiter Aquarius",
      Pisces: "Will help you out of a crises, Jupiter Pisces",
    },
    Saturn: {
      Aries: "Eat my dust, Aries Saturn",
      Taurus: "Binge buy then return, Taurus Saturn",
      Gemini: "Gossip Hater Gemini Saturn",
      Cancer: "Tiny dancer, Saturn in Cancer",
      Leo: "Can’t take a joke, Leo Saturn",
      Virgo: "Download The Pattern, Virgo in Saturn",
      Libra: "Beyonce Knowles, Saturn in Libra",
      Scorpio: "Feel the burn, Scorpio Saturn",
      Sagittarius: "Why, Why, Why Sagittarius Saturn",
      Capricorn: "Tony Robbins, Capricorn Saturn",
      Aquarius: "Elvis Presley, Saturn in Aquarius",
      Pisces: "Jesus christ, Dalai Lama and Isaac Newton Pisces in Saturn",
    },
    Uranus: {
      Aries: "Let’s push things forward, Aries Uranus",
      Taurus: "Slow and porous Uranus in Taurus",
      Gemini: "A hole in 2 Gemini Uranus",
      Cancer: "Dream catcher earring, Cancer Uranus",
      Leo: "Despacito, Uranus Leo",
      Virgo: "Possibly Vegan, Virgo Uranus",
      Libra: "Making arty farty, Libra Uranus",
      Scorpio: "Shakira Shakira Scorpio Uranus",
      Sagittarius: "Pretty precarious Uranus Sagittarius",
      Capricorn: "Hot knife in butter, Capricorn Uranus",
      Aquarius: "Dance to the beat of your own drum, Aquarius Uranus",
      Pisces: "Slippery fish, Pisces Uranus",
    },
    Neptune: {
      Aries: "Covid Immune, Aries Neptune",
      Taurus: "Wake up at Noon, Taurus Neptune",
      Gemini: "Fruit of the loom, Gemini Neptune",
      Cancer: "Swim to the moon, Cancer Neptune",
      Leo: "Pastry of filo, Neptune in Leo",
      Virgo: "Ladies commune, Virgo Neptune",
      Libra: "Vidal Sassoon, Libra Neptune",
      Scorpio: "Bonking by noon, Scorpio Neptune",
      Sagittarius: "Holiday to Cancun, Sagittarius Neptune",
      Capricorn: "Read the room, Capricorn Neptune",
      Aquarius: "Fly a balloon, Aquarius Neptune",
      Pisces: "Wrinkly prune, Pisces Neptune",
    },
    Pluto: {
      Aries: "Fighting in the Dojo, Aries Pluto",
      Taurus: "Why go so slow slow? Taurus Pluto",
      Gemini: "Takes two to tango, Gemini Pluto",
      Cancer: "Heavy Flow, Cancer Pluto",
      Leo: "Bilbo looking For Frodo, Leo Pluto",
      Virgo: "The Cleaning Popo, Virgo Pluto",
      Libra: "Yes or no Yoyo, Libra Pluto",
      Scorpio: "Dancing some butoh, Scorpio Pluto",
      Sagittarius: "Tasty Prosciutto, Sagittarius Pluto",
      Capricorn: "Saving for a bungalow, Capricorn Pluto",
      Aquarius: "A Silly Dodo, Aquarius Pluto",
      Pisces: "Delicious cod roe, Pisces Pluto",
    },
    Descendant: {
      Aries: "Married at first sight, Aries Descendant",
      Taurus: "You’re my lobster, Taurus Descendant",
      Gemini: "Easy Breezy Beautiful Cover Girls Gemini Descendant",
      Cancer: "Total independence, Cancer Descendant",
      Leo: "Live, Laugh, Love, Leo Descendant",
      Virgo: "Split the bill, Virgo Descendant",
      Libra: "There’s no I in team, but there is an I in Libra Descendant",
      Scorpio: "Tame a weirdo, Descendent Scorpio",
      Sagittarius: "Luck be a lady tonight, Sagittarius Descendant",
      Capricorn: "Adele Dazeem, Descendant in Capricorn",
      Aquarius: "Snakes on a Plane, Aquarius Descendant",
      Pisces: "Fishy Wishy Washy, Pisces Descendant",
    },
  });
}

export default AstrologyBingoGameController;
