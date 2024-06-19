import BirthChart from "./classes/BirthChart.js";

import Player from "./classes/Player.js";

const alice = {
  Rising: "Scorpio",
  Chiron: "Cancer",
  Descendant: "Taurus",
  Jupiter: "Cancer",
  Mars: "Aries",
  Mercury: "Cancer",
  Moon: "Sagittarius",
  Neptune: "Capricorn",
  Pluto: "Scorpio",
  Saturn: "Capricorn",
  Sun: "Cancer",
  Uranus: "Capricorn",
  Venus: "Gemini",
  birthday: "1990/07/04",
  latitude: 53.4083714,
  longitude: -2.9915726,
  ownerName: "Alice Fig",
  time: "1800",
};

///render chart
// function renderChart(player, mount = document.getElementById("exampleMount")) {
//   if (!(player instanceof Player)) {
//     throw new Error(
//       `player supplied to renderChart must be an instance of Player; instead received ${player} (type: ${typeof player} of class ${
//         player?.__proto__?.constructor
//       })`,
//     );
//   }
//   player.renderChart({ mountNode: mount });
//   setTimeout(() => {
//     mount.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, 250);
// }
// const player = new Player({ chartData: alice });
// // console.log("example birthChart", player);
// renderChart(player);



//render small chart
function renderSmallChart(player, mount = document.getElementById("exampleMount")) {
  if (!(player instanceof Player)) {
    throw new Error(
      `player supplied to renderSmallChart must be an instance of Player; instead received ${player} (type: ${typeof player} of class ${
        player?.__proto__?.constructor
      })`,
    );
  }
  player.renderSmallChart({ mountNode: mount });
  setTimeout(() => {
    mount.scrollIntoView({
      behavior: "smooth",
    });
  }, 250);
}
const player = new Player({ chartData: alice });
// console.log("example birthChart", player);
renderSmallChart(player);


// ///render table
// function renderTable(player, mount = document.getElementById("tableMount")) {
//   if (!(player instanceof Player)) {
//     throw new Error(
//       `player supplied to renderChart must be an instance of Player; instead received ${player} (type: ${typeof player} of class ${
//         player?.__proto__?.constructor
//       })`,
//     );
//   }
//   player.renderTable({ mountNode: mount });
//   setTimeout(() => {
//     mount.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, 250);
// }
// const player = new Player({ chartData: alice });

// renderTable(player);

//remove buttons