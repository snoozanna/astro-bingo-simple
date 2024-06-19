import { makeCall } from "./utilities.js";
import { GEO_API_KEY, TIME_API_KEY } from "./config.js";
import BirthChart from "./classes/BirthChart.js";
// import BirthChartList from "./BirthChartList.js";
import BingoGameController from "./classes/AstrologyBingoGameController.js";
import Player from "./classes/Player.js";

// const birthChartList = new BirthChartList();

const bingoGameController = new BingoGameController();

/****************************************************************
 * The DOM script for the form page
 * Creates the player from form data and displays their chart
 ****************************************************************/

// UI elements
const timeInput = document.getElementById("tob");
const dateInput = document.getElementById("dob");
const geoMountLat = document.getElementById("location1");
const geoMountLong = document.getElementById("location2");
const utcOffsetInput = document.getElementById("utcoffset");

const datePickerElems = document.querySelectorAll(".datepicker");
const timePickerElems = document.querySelectorAll(".timepicker");

const personalDataForm = document.getElementById("addDataForm");
const locationForm = document.getElementById("location-form");
const utcButton = document.getElementById("find-utc");

const chartMountNode = document.getElementById("target");

// UI settings
// Date Pickers
const datePickerOptions = {
  format: "yyyymmdd",
  autoClose: true,
  yearRange: [1930, 2020],
  defaultDate: new Date(80, 0),

  // onOpenEnd: function(){....}
};

M.Datepicker.init(datePickerElems, datePickerOptions);

// Time Pickers
const timePickerOptions = {
  twelveHour: false,
  autoClose: true,
};

M.Timepicker.init(timePickerElems, timePickerOptions);

// Forms
locationForm.addEventListener("submit", (e) => {
  e.preventDefault(locationForm);
  const FD = new FormData(locationForm);
  const data = Object.fromEntries(FD);
  // console.log("data", data);
  const submitBtn = document.getElementById("placename-btn");
  locationForm.setAttribute("disabled", "disabled");
  console.log(locationForm.elements);
  for (const el of locationForm.elements) {
    console.log(el);
    el.setAttribute("disabled", "disabled");
    el.classList.add("disabled");
    el.classList.remove("valid");
    el.value = "";
    el.blur();
  }

  getGeo(data);
});

async function getGeo({ placename }) {
  // console.log("placename", placename);
  const GEO_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${placename}&key=${GEO_API_KEY}`;
  console.log(GEO_API_URL);

    const { results } = await makeCall(GEO_API_URL);
    // console.log("results", results);

    // Show a list or warn no match and reset
    if (!results?.length) {
      M.toast({html: `<h2>Error</h2><p>${placename} Not found</p>`, classes: ['toast', 'error']});
      return;
    }

    const choicesMount = document.getElementById("location-choices");
    const select = document.createElement("select");
    const holdingOption = document.createElement("option");
    holdingOption.textContent = "Choose your location";
    holdingOption.setAttribute("disabled", "disabled");
    holdingOption.setAttribute("selected", "selected");
    holdingOption.setAttribute("value", "");
    select.append(holdingOption);

    for (const [idx, val] of results.entries()) {
      const opt = document.createElement("option");
      opt.textContent = val.formatted_address;
      opt.setAttribute("value", idx);
      select.append(opt);
    }

    select.addEventListener("change", (e) => {
      const {
        geometry: {
          location: { lat, lng },
        },
      } = results[e.target.value];

      geoMountLat.value = lat;
      geoMountLong.value = lng;
      locationForm.reset();
      locationForm.setAttribute("disabled", "disabled");
    });

    choicesMount.innerHTML = "";
    choicesMount.append(select);

    const lbl = document.createElement("label");
    lbl.textContent = "Choose your location";

    choicesMount.append(lbl);

    const elems = document.querySelectorAll("select");
    const options = {};
    M.FormSelect.init(elems, options);
}

/****************** SECOND FORM *************************/
utcButton.addEventListener("click", function (e) {
  e.preventDefault();

  const inputtedTime = timeInput.value;
  // console.log("inputtedTime", inputtedTime);
  const timeToGo = inputtedTime.replace(":", "");
  timeInput.value = timeToGo;

  const inputtedDate = dateInput.value;
  // console.log("inputtedDate", inputtedDate);
  const latitude = geoMountLat.value;
  const longitude = geoMountLong.value;

  const year = inputtedDate.slice(0, 4);
  // console.log("year", year);

  const month = inputtedDate.slice(4, 6);
  // console.log("month", month);

  const day = inputtedDate.slice(6, 8);
  // console.log("day", day);

  const dateTime = `${year}-${month}-${day} ${inputtedTime}:00`;
  // console.log("dateTime", dateTime);

  const timestamp = Date.parse(dateTime) / 1000;
  // console.log("timestamp", timestamp);

  const fetchURLUTC = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${TIME_API_KEY}`;
  // console.log("fetchURLUTC", fetchURLUTC);
  getUTC(fetchURLUTC, renderUTC);
});

personalDataForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const FD = new FormData(e.target);
  const data = Object.fromEntries(FD);
  // console.log("data", data);

  const fetchURL = createBirthChartURL(data);
  getBirthChart(fetchURL, renderChart, data);
  personalDataForm.reset();
  personalDataForm.setAttribute("disabled", "disabled");
});

function reloadForms() {
  const { forms } = document;
  const choicesMount = document.getElementById("location-choices");
  choicesMount.innerHTML = "";
  for (const form of forms) {
    form.removeAttribute("disabled");
    for (const input of form.elements) {
      input.removeAttribute("disabled");
      input.classList.remove("disabled");
    }
  }
  M.updateTextFields();
}

function renderChart(player, mount = chartMountNode) {
  if (!(player instanceof Player)) {
    throw new Error(
      `player supplied to renderChart must be an instance of Player; instead received ${player} (type: ${typeof player} of class ${
        player?.__proto__?.constructor
      })`
    );
  }
  player.renderSmallChart({ mountNode: mount });
  setTimeout(() => {
    mount.scrollIntoView({
      behavior: "smooth",
    });
  }, 250);
  reloadForms();
  document.forms[0].elements[0].focus();
}

function createBirthChartURL({
  date: dob,
  time: tob,
  location1,
  location2,
  utcoffset,
}) {
  const year = Number(dob.slice(0, 4));
  // console.log("year", year);
  const month = Number(dob.slice(4, 6));
  // console.log("month", month);
  const jsMonth = month - 1;
  const date = Number(dob.slice(6, 8));
  // console.log("date", date);
  const [hours, minutes] = tob.split(":");
  // console.log("hours", hours, "minutes", minutes);
  const d = new Date(year, jsMonth, date, Number(hours), Number(minutes));
  const timestamp = d.getTime();

  const params = new URLSearchParams();
  params.append("location", `${location1},${location2}`);
  params.append("timestamp", timestamp);
  params.append("key", TIME_API_KEY);

  // console.log("params", params);

  const fetchURL = `http://localhost:8000/formatData?date=${dob}&time=${tob}&location1=${location1}&location2=${location2}&utc=${utcoffset}&action=`;
  // console.log("fetchURL", fetchURL);
  return fetchURL;
}

async function getBirthChart(fetchURL = "", renderFn, { firstname, lastname }) {
  try {
    const response = await fetch(fetchURL); // because of weird python formatting
    //handle bad responses
    if (!response.ok) throw response;
    let chartData = await response.json();
    chartData = JSON.parse(chartData); // twice because stupid python
    // console.log("chartData", chartData);
    chartData.Rising = chartData.Asc;
    chartData.Descendant = BirthChart.descDict[chartData.Rising];
    delete chartData.Asc;

    chartData.ownerName = `${firstname} ${lastname}`;

    // console.log("chartData", chartData);
    const player = new Player({ chartData });
    renderFn(player);
    bingoGameController.addPlayer(player);
  } catch (err) {
    console.log(err);
    M.toast({html: `<h2>Error with Python server</h2><p>${err.message}</p>`, classes: ['toast', 'error']});
  }
}

// function getUTCURL(lat, long, TIME_API_KEY, timestamp) {
//   const TIME_API_URL = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${long}&timestamp=${timestamp}&key=${TIME_API_KEY}`;
//   console.log(TIME_API_URL);
//   return TIME_API_URL;
// }

function renderUTC(report, mount = utcOffsetInput) {
  if (!report) {
    utcOffsetInput.innerHTML = "No UTC report";
    return;
  }
  const offset = (report.rawOffset += report.dstOffset);
  // console.log("offset", offset);
  const offsetUTC = Math.floor(offset / 60 / 60);
  // console.log("offsetUTC", offsetUTC);
  utcOffsetInput.value = offsetUTC;
}

async function getUTC(currentURL, handler = renderUTC) {
  try {
    const response = await fetch(currentURL);

    if (!response.ok) throw response;

    const data = await response.json();
    handler(data);
  } catch (err) {
    M.toast({html: `<h2>Error getting UTC</h2><p>${err.message}</p>`, classes: ['toast', 'error']});
    console.log(err);
  }
}
