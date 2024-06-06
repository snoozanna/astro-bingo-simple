import { uuidv4, isElement } from "../utilities.js";

/****************************************************************
 * Constructor for a basic Smallbirthchart
 * Holds static dictionaries; imagery and Smallbirthchart data
 ****************************************************************/

class SmallBirthChart {
  constructor({
    // name,
    birthday,
    time,
    latitude,
    longitude,
    ownerName,
    Sun,
    Mercury,
    Venus,
    Mars,
    Jupiter,
    Saturn,
    Uranus,
    Neptune,
    Pluto,
    Ascendant,
    Descendant,
    Moon,
    _id = uuidv4(),
    image = null,
  }) {
    // console.log("chart", arguments[0]);
    if (typeof ownerName !== "string" || !ownerName.length) {
      throw new Error(`No ownerName provided. Instead received ${ownerName}`);
    }
    // this.name = name;
    this.birthday = birthday;
    this.time = time;
    this.latitude = latitude;
    this.longitude = longitude;
    this.ownerName = ownerName;
    this.image = image;

    this.Sun =
      typeof Sun === "string"
        ? {
            sign: Sun,
            icon: SmallBirthChart.getIconSVG(Sun),
            location: { x: 515, y: -190 },
            word: SmallBirthChart.getSignWordSVG(Sun),
            wordLocation: { x: 450, y: -260 },
            viewBox: "-500 60 600 600",
            textAnchor: "end",
            called: false,
          }
        : Sun;

    this.Mercury =
      typeof Mercury === "string"
        ? {
            sign: Mercury,
            icon: SmallBirthChart.getIconSVG(Mercury),
            location: { x: 590, y: -140 },
            word: SmallBirthChart.getSignWordSVG(Mercury),
            wordLocation: { x: 630, y: -120 },
            viewBox: "-500 60 600 600",
            textAnchor: "end",
            called: false,
          }
        : Mercury;

    this.Venus =
      typeof Venus === "string"
        ? {
            sign: Venus,
            icon: SmallBirthChart.getIconSVG(Venus),
            location: { x: 635, y: -65 },
            word: SmallBirthChart.getSignWordSVG(Venus),
            wordLocation: { x: 700, y: 30 },
            viewBox: "-500 60 600 600",
            textAnchor: "end",
            called: false,
          }
        : Venus;

    this.Mars =
      typeof Mars === "string"
        ? {
            sign: Mars,
            icon: SmallBirthChart.getIconSVG(Mars),
            location: { x: 650, y: 30 },
            word: SmallBirthChart.getSignWordSVG(Mars),
            wordLocation: { x: 675, y: 260 },
            viewBox: "-500 60 600 600",
            textAnchor: "end",
            called: false,
          }
        : Mars;

    this.Jupiter =
      typeof Jupiter === "string"
        ? {
            sign: Jupiter,
            icon: SmallBirthChart.getIconSVG(Jupiter),
            location: { x: 600, y: 100 },
            word: SmallBirthChart.getSignWordSVG(Jupiter),
            wordLocation: { x: 550, y: 420 },
            viewBox: "-500 60 600 600",
            textAnchor: "end",
            called: false,
          }
        : Jupiter;

    this.Saturn =
      typeof Saturn === "string"
        ? {
            sign: Saturn,
            icon: SmallBirthChart.getIconSVG(Saturn),
            location: { x: 515, y: 140 },
            word: SmallBirthChart.getSignWordSVG(Saturn),
            wordLocation: { x: 530, y: 495 },
            viewBox: "-100 60 600 600",
            textAnchor: "end",
            called: false,
          }
        : Saturn;

    this.Uranus =
      typeof Uranus === "string"
        ? {
            sign: Uranus,
            icon: SmallBirthChart.getIconSVG(Uranus),
            location: { x: 430, y: 140 },
            word: SmallBirthChart.getSignWordSVG(Uranus),
            wordLocation: { x: 340, y: 490 },
            viewBox: "-150 60 600 600",
            called: false,
          }
        : Uranus;

    this.Neptune =
      typeof Neptune === "string"
        ? {
            sign: Neptune,
            icon: SmallBirthChart.getIconSVG(Neptune),
            location: { x: 340, y: 90 },
            word: SmallBirthChart.getSignWordSVG(Neptune),
            wordLocation: { x: 190, y: 395 },
            viewBox: "-100 60 600 600",
            called: false,
          }
        : Neptune;

    this.Pluto =
      typeof Pluto === "string"
        ? {
            sign: Pluto,
            icon: SmallBirthChart.getIconSVG(Pluto),
            location: { x: 285, y: 15 },
            word: SmallBirthChart.getSignWordSVG(Pluto),
            wordLocation: { x: 95, y: 245 },
            viewBox: "-100 60 600 600",
            called: false,
          }
        : Pluto;

    this.Ascendant =
      typeof Ascendant === "string"
        ? {
            sign: Ascendant,
            icon: SmallBirthChart.getIconSVG(Ascendant),
            location: { x: 300, y: -65 },
            word: SmallBirthChart.getSignWordSVG(Ascendant),
            wordLocation: { x: 90, y: 40 },
            viewBox: "-50 60 600 600",
            textAnchor: "start",
            called: false,
          }
        : Ascendant;

    this.Descendant =
      typeof Descendant === "string"
        ? {
            sign: Descendant,
            icon: SmallBirthChart.getIconSVG(Descendant),
            location: { x: 340, y: -150 },
            word: SmallBirthChart.getSignWordSVG(Descendant),
            wordLocation: { x: 150, y: -140 },
            viewBox: "-100 60 600 600",
            called: false,
          }
        : Descendant;

    this.Moon =
      typeof Moon === "string"
        ? {
            sign: Moon,
            icon: SmallBirthChart.getIconSVG(Moon),
            location: { x: 430, y: -190 },
            word: SmallBirthChart.getSignWordSVG(Moon),
            wordLocation: { x: 315, y: -250 },
            viewBox: "-100 60 600 600",
            textAnchor: "start",
            called: false,
          }
        : Moon;

    this._id = _id;
  }

  markCalled({ planet: p, sign }) {
    const planet = this[p];
    if (planet.sign === sign) {
      planet.called = true;
    }
  }
  unMarkCalled() {
    for (const planet of SmallBirthChart.planets) {
      this[planet].called = false;
    }
  }

  bcReport() {
    return `
    Sun: ${this.Sun.sign}
    Moon: ${this.Moon.sign}
    Ascendant: ${this.Ascendant.sign}
    Mercury: ${this.Mercury.sign}
    Venus: ${this.Venus.sign}
    Mars: ${this.Mars.sign}
    Jupiter: ${this.Jupiter.sign}
    Saturn: ${this.Saturn.sign}
    Uranus: ${this.Uranus.sign}
    Neptune${this.Neptune.sign}
    Id: ${this._id}`;
  }

  renderChart({ mountNode, clearNode = true, recreate = false, options = {} }) {
    if (!isElement(mountNode)) {
      throw new Error(
        `You must provide a DOM node to insert the chart in. Received ${mountNode} of type: ${typeof mountNode}; class: ${
          mountNode?.__proto__?.constructor
        }`,
      );
    }

    if (clearNode) {
      mountNode.innerHTML = "";
    }

    if (recreate || this.image == null) {
      this.image = this.generateChartImage();
    }

    const defaults = {
      showControls: true,
      showBirthday: true,
    };

    const { showControls, showBirthday } = { ...defaults, ...options };

    if (showControls) {
      const controls = document.createElement("div");
      controls.classList.add("controls");
      controls.id = "controls";

      const heading = document.createElement("h2");
      heading.classList.add("chart-heading");
      heading.textContent = `${this.ownerName}`;
      controls.append(heading);

      const printButton = document.createElement("button");
      printButton.textContent = "print chart";
      printButton.classList.add(
        "btn",
        "waves-effect",
        "waves-light",
        "print-btn",
      );
      printButton.addEventListener("click", () => {
        // console.log("window", window);
        window.print();
        // printJS({
        //   printable: "modalContent",
        //   type: "html",
        //   css: ["../styles/styles.css", "../styles/print-styles.css"],
        // });
      });

      const transButton = document.createElement("button");
      transButton.textContent = "Remove outline";
      transButton.classList.add(
        "btn",
        "waves-effect",
        "waves-light",
        "trans-btn",
      );
      transButton.addEventListener("click", () => {
        const outline = document.getElementById("chart");
        const children = outline.childNodes;
        for (const child of children) {
          if (!child.classList.contains("sign")) {
            child.classList.toggle("transparent");
          } else {
            return;
          }
        }
        // // console.log("children", children);
        // children.classList.add("transparent");
        // outline.classList.add("transparent");
      });

      controls.append(printButton, transButton);
      mountNode.append(controls);
      mountNode.append(this.image);
    }

    if (showBirthday) {
      const birthdayDisplay = document.createElement("ul");
      birthdayDisplay.classList.add("birthday");
      const dateDisplay = document.createElement("li");
      dateDisplay.textContent = `Birthday: ${this.birthday}`;
      const timeDisplay = document.createElement("li");
      timeDisplay.textContent = `Time: ${this.time.slice(
        0,
        2,
      )}:${this.time.slice(2)}`;
      const locationDisplay = document.createElement("li");
      locationDisplay.textContent = `Lat: ${this.latitude.toFixed(
        2,
      )}, Long: ${this.longitude.toFixed(2)}`;
      console.log(dateDisplay, timeDisplay);
      birthdayDisplay.append(dateDisplay, timeDisplay, locationDisplay);
      // heading.append(birthdayDisplay);
      mountNode.append(birthdayDisplay);
    }
  }

  generateChartImage() {
    const { planets } = SmallBirthChart;
    // Created a document fragment, so we append lis as few times as possible
    // const imgfrag = document.createDocumentFragment();
    // console.log("chart to be rendered", this);
    const symbolsToPopulate = [];
    // console.log("planets", planets);
    for (const [planet, sign] of Object.entries(this)) {
      console.log(planet, sign);
      if (!planets.includes(planet)) {
        console.log(`skipping ${planet}`);
        continue;
      }

      const currentSymbol = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );

      const currentWord = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      // console.log("currentWord", currentWord);
      currentSymbol.setAttribute("viewBox", "0 0 300 300");
      currentSymbol.setAttribute("width", "60");
      currentSymbol.classList.add("sign", "icon", "chart");
      currentSymbol.innerHTML = sign.icon;
      currentSymbol.location = sign.location;

      currentWord.setAttribute("viewBox", `${sign.viewBox}`);

      currentWord.setAttribute("width", "230");
      currentWord.classList.add(
        "sign",
        "word",
        "chart",
        `${sign.sign.toLowerCase()}`,
      );
      currentWord.innerHTML = sign.word;
      currentWord.location = sign.wordLocation;
      const toRotate = currentWord.firstChild;
      toRotate.classList.add("inner-word","small-chart", `${planet.toLowerCase()}`);
      const degrees = sign.wordRotation;
      const anchor = sign.textAnchor;
      // toRotate.setAttribute("transform", `${degrees}`); // no rotataion
      toRotate.setAttribute("text-anchor", `${anchor}`);
      gsap.to(
        currentSymbol,
        // duration: 6,
        {
          attr: {
            x: `${currentSymbol.location.x}`,
            y: `${currentSymbol.location.y}`,
          },
        },
      );
      gsap.to(currentWord, {
        attr: {
          x: `${currentWord.location.x}`,
          y: `${currentWord.location.y}`,
        },
      });

      symbolsToPopulate.push(currentSymbol, currentWord);
      // symbolsToPopulate.push( currentWord);
    }
    // console.log("symbolsToPopulate", symbolsToPopulate);

    ///BINGO CARD USING AN IMG

    // const chartImg = document.createElement("img");
    // // console.log("chartImg", chartImg);
    // chartImg.classList.add("bc-template", "materialboxed");
    // chartImg.src = "./assets/img/fake-bc-template.svg";

    ///BINGO CAR USING AN SVG

    const chartImg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    // console.log("chartImg", chartImg);
    chartImg.id = "chart";
    chartImg.classList.add("bc-template", "materialboxed", "chart-outline");
    chartImg.setAttribute("viewBox", "-30 -30 1060 1060");
    chartImg.innerHTML = `<defs><clipPath id="a" transform="translate(.67 -1)"><path fill="none" d="M-1 1h997v997H-1z"/></clipPath><clipPath id="b" transform="translate(.67 -1)"><path fill="none" d="M457.08 461h81.72v81.72h-81.72z"/></clipPath></defs><g clip-path="url(#a)" fill="none"><circle cx="498.17" cy="498.5" r="495.71" stroke="#000" stroke-width="1.914"/><circle cx="498.68" cy="501.66" r="411.6" stroke="#1d1d1b" stroke-width="6"/></g><text transform="rotate(82.75 -294.441 291.786)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">P</text><text transform="rotate(80.62 -317.211 304.402)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">l</text><text transform="rotate(79.2 -330.395 310.24)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">u</text><text transform="rotate(77.08 -353.564 322.403)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">t</text><text transform="rotate(75.67 -368.85 330.046)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">o</text><text transform="rotate(74.27 -388.049 342.358)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(72.87 -402.524 348.16)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(71.48 -417.492 354.12)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.33 .94 -.94 .33 54.86 649.23)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(63.86 -500.17 372.802)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(58 -620.584 460.37)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(56 -654.282 471.969)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">N</text><text transform="rotate(53 -712.9 504.725)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">e</text><text transform="matrix(.63 .78 -.78 .63 128.11 785)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">p</text><text transform="rotate(49.5 -798.026 551.801)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">t</text><text transform="matrix(.68 .74 -.74 .68 147.48 808.31)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">u</text><text transform="rotate(45.38 -902.89 602.458)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="matrix(.74 .68 -.68 .74 173.36 835.2)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">e</text><text transform="rotate(41.26 -1031.117 668.622)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(37.11 -1173.792 708.942)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(32.23 -1421.222 871.43)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(31.53 -1461.205 894.784)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(30.12 -1543.336 930.76)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(29.42 -1589.145 957.054)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(28.71 -1637.451 984.945)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(27.3 -1737.205 1028.988)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(26.59 -1793.023 1060.792)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(24.46 -1972.469 1132.639)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">U</text><text transform="matrix(.93 .38 -.38 .93 314.75 928.62)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">r</text><text transform="rotate(20.17 -2461.137 1386.407)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">a</text><text transform="rotate(18.02 -2791.023 1548.78)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="rotate(15.86 -3212.659 1763.96)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">u</text><text transform="rotate(14 -3704.492 2036.395)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">s</text><text transform="rotate(10.06 -5223.942 2693.084)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(.64 -86183.023 40016.252)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-6.54 8702.743 -4300.45)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-7.96 7193.837 -3499.215)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">S</text><text transform="rotate(-10.09 5723.174 -2758.323)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">a</text><text transform="rotate(-11.5 5029.144 -2434.936)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">t</text><text transform="rotate(-13.62 4297.223 -2030)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">u</text><text transform="rotate(-15.73 3748.828 -1757.648)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">r</text><text transform="rotate(-17.83 3332.847 -1535.827)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="rotate(-18.52 3209.598 -1517.034)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.94 -.33 .33 .94 648.68 940.73)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-20 3006.45 -1398.215)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-21.3 2819.187 -1294.902)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-21.6 2764.913 -1287.827)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.92 -.4 .4 .92 677.05 930.09)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-24.07 2516.243 -1140.577)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-24.76 2450.39 -1112.024)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-26.14 2332.187 -1042.555)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-26.82 2276.614 -1018.888)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-27.51 2222.773 -995.99)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-28.88 2127.23 -939.182)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-29.57 2080.465 -919.653)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.86 -.5 .5 .86 731.35 903.2)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.85 -.52 .52 .85 737.9 899.43)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-31.8 1932.126 -857.512)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-32.9 1896.207 -828.513)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-33.9 1826.545 -797.62)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-35 1793.2 -773.024)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-35.73 1747.838 -754.527)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-37 1699.085 -726.555)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">J</text><text transform="matrix(.78 -.63 .63 .78 785.24 867.14)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">u</text><text transform="rotate(-41.19 1537.96 -636.3)" font-size="34.454" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">p</text><text transform="rotate(-43.25 1469.963 -605.029)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">i</text><text transform="rotate(-44.62 1429.572 -581.861)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">t</text><text transform="matrix(.69 -.72 .72 .69 828.75 828.73)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">e</text><text transform="rotate(-48 1343.393 -535.73)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">r</text><text transform="rotate(-52.89 1237.039 -450.652)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-57.77 1125.913 -433.198)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-58.47 1112.453 -428.5)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-59.88 1090.023 -412.583)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-60.58 1077.418 -408.118)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-61.29 1064.871 -403.732)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-62.7 1044.47 -388.925)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-63.41 1032.547 -384.826)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-64.12 1020.934 -380.746)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-65.54 1002.202 -366.973)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-66.25 991.109 -363.185)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-68.39 966.738 -340.91)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">M</text><text transform="rotate(-71.26 925.78 -327.881)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">a</text><text transform="rotate(-73.42 900.42 -313.586)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">r</text><text transform="rotate(-74.87 882.532 -306.378)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">s</text><text transform="rotate(-79.21 846.526 -268.814)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-89.36 762.964 -210.75)" font-size="34.455" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.09 -1 1 .09 49.67 476.31)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">A</text><text transform="rotate(-82.74 283.28 197.132)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">s</text><text transform="matrix(.16 -.99 .99 .16 53.53 440.82)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">c</text><text transform="rotate(-79 287.024 180.366)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">e</text><text transform="rotate(-76.96 288.786 169.365)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="rotate(-74.79 289.707 156.378)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">d</text><text transform="rotate(-72.61 290.643 142.616)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">a</text><text transform="rotate(-70.44 292.948 130.046)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="rotate(-68.26 294.105 114.967)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">t</text><text transform="rotate(-63.92 309.259 102.074)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-58.89 301.42 40.368)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-58 301.707 31.615)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-56.04 308.136 20.806)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">D</text><text transform="rotate(-53 311.055 -9.785)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">e</text><text transform="rotate(-51.9 308.482 -29.1)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">c</text><text transform="rotate(-49.67 314.543 -51.062)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">e</text><text transform="rotate(-47.57 318.207 -76.2)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="matrix(.7 -.71 .71 .7 171.89 196.86)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">d</text><text transform="matrix(.73 -.69 .69 .73 184.75 183.86)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">a</text><text transform="rotate(-41.31 327.704 -173.39)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="matrix(.77 -.63 .63 .77 209.61 161.48)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">t</text><text transform="rotate(-37.86 334.246 -240.814)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-35.12 348.288 -278.422)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-32.38 347.71 -375.918)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-31.01 354.166 -409.466)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.86 -.5 .5 .86 267.82 120.1)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-29.64 357.044 -459.653)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-28.27 364.258 -500.38)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-27.1 365.897 -536.025)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-26.91 368.183 -559.894)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.9 -.43 .43 .9 299.79 102.72)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-24.86 379.112 -645.026)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-24.5 384.297 -678.91)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(-21.44 406.084 -797.04)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">M</text><text transform="rotate(-18.7 424.228 -1013.325)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">o</text><text transform="rotate(-16.64 445.087 -1205.525)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">o</text><text transform="rotate(-14 490.477 -1523.149)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="rotate(-9.72 593.352 -2304.888)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(.83 -3613.685 31195.479)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(8.1 -143.873 3983.777)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(8.1 -155.783 3767.252)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.98 .18 -.18 .98 570.71 62.18)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">S</text><text transform="rotate(12.31 -8.518 2756.395)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">u</text><text transform="rotate(15.21 44.204 2299.997)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="rotate(18.11 80.65 1989.352)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(27.1 154.285 1396.193)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(34.67 161.31 1269.508)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="matrix(.82 .58 -.58 .82 756.83 137.81)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(35.9 159.153 1241.527)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(38.92 177.63 1160.905)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">M</text><text transform="rotate(41.73 179.552 1121.292)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">e</text><text transform="rotate(43.83 184.007 1085.953)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">r</text><text transform="rotate(45.22 185.382 1067.5)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">c</text><text transform="rotate(47.3 190.124 1035.59)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">u</text><text transform="rotate(49.38 192.348 1010.86)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">r</text><text transform="matrix(.63 .77 -.77 .63 843.4 217.29)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">y</text><text transform="rotate(56 211.189 916.538)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(61.04 202.194 899.458)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(62.6 204.986 881.087)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(63.09 204.923 881.504)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(63.9 203.983 874.777)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(65.14 207.408 864.58)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(65.8 208.22 862.56)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(67.88 213.151 839.748)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">V</text><text transform="rotate(69.93 212.948 828.745)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">e</text><text transform="rotate(72 215.186 815.865)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">n</text><text transform="rotate(74.05 215.653 803.585)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">u</text><text transform="rotate(76.1 216.565 793.01)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700">s</text><text transform="rotate(82.37 238.32 738.713)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><text transform="rotate(94.39 249.946 684.089)" font-size="33.112" font-family="WolpePegasus-Bold,Wolpe Pegasus" font-weight="700"></text><g clip-path="url(#a)" fill="none"><path stroke="#1d1d1b" stroke-width="6" d="M498.36 0v497.71"/><path stroke="#000" stroke-width=".334" d="M500.79 499.93V997M498.33 499.93V997M495.93 499.93V997"/></g><path fill="none" stroke="#000" stroke-width=".334" d="M992.5 504.46H4.87M992.5 502H4.87M992.5 499.6H4.87M772.39 84.59L231.22 917.92M770.33 83.25L229.16 916.58M768.32 81.94L227.15 915.28M495.6 503.32L63.01 258.58M496.81 501.19L64.22 256.44M497.99 499.1L65.4 254.35"/><path fill="none" stroke="#1d1d1b" stroke-width="2.229" d="M929.3 745.44l-78.79-44.58"/><path fill="none" stroke="#000" stroke-width=".334" d="M746.29 927.78L244.56 76.02M748.4 926.53L246.68 74.77M750.47 925.31L248.75 73.55"/><path fill="none" stroke="#1d1d1b" stroke-width="6" d="M60.99 729.78l439.44-228.76"/><g clip-path="url(#a)" fill="#1d1d1b"><path d="M660.83 93.42a20.43 20.43 0 10-20.4-20.78 20.4 20.4 0 0020.4 20.78m.07-44.81a24.53 24.53 0 11-24.57 24.54 24.54 24.54 0 0124.57-24.54"/><path d="M660.86 67.55A5.45 5.45 0 11655.4 73a5.46 5.46 0 015.46-5.44M419.23 30.51c8.62 4.47 13.28 11 13.69 19.66-.11 8.72-4.54 15.36-12.93 20.09 7.48.37 16.25-2.72 21.09-10.08a17.69 17.69 0 00-1.81-22.11c-5.1-5.54-11.84-7.94-20-7.56m2.85 42.62a30.87 30.87 0 01-8.11-.84 1.51 1.51 0 01-1.34-1.29 1.41 1.41 0 011.16-1.42 24.79 24.79 0 006.84-3.22A20.09 20.09 0 00428.76 56a16.83 16.83 0 00.79-7.2 18.52 18.52 0 00-6.15-11.89 23.12 23.12 0 00-10-5.36c-.74-.19-1.28-.53-1.39-1.25a1.32 1.32 0 01.95-1.47c1-.28 2-.53 3-.73a26.57 26.57 0 015-.49 28.39 28.39 0 0116.45 4.85 22.15 22.15 0 019.29 12.69 19.24 19.24 0 01.61 6.45 20.83 20.83 0 01-5.79 13 26.36 26.36 0 01-12.23 7.4 29.12 29.12 0 01-7.21 1.14M877.41 255.08a9.74 9.74 0 10-9.74-10.21 9.71 9.71 0 009.72 10.21m1.54 10.25v2.31a1.16 1.16 0 01-1.16 1.16h-.87a1 1 0 01-1-1v-2.45a.07.07 0 00-.08-.07h-2.43a1.08 1.08 0 01-1.08-1.08v-.74a1.24 1.24 0 011.24-1.24h2.24a.08.08 0 00.08-.08v-4a.07.07 0 00-.07-.07c-5.61-1.06-9.3-4.23-10.85-9.78-1.19-6.37 1.16-11.1 6.58-14.41a.08.08 0 000-.13 11 11 0 01-4.86-7.18 1 1 0 01.88-1.18l.76-.07a1.25 1.25 0 011.41.94 7.83 7.83 0 002.68 4.32 8 8 0 0012.85-4.22 1.39 1.39 0 011.48-1h.39a1.24 1.24 0 011.14 1.52 11 11 0 01-4.87 6.91.08.08 0 000 .13c5.42 3.4 7.74 8.17 6.43 14.58-1.61 5.42-5.26 8.52-10.79 9.55a.09.09 0 00-.06.08v3.94a.08.08 0 00.08.08h2.07a1.37 1.37 0 011.37 1.37v.3a1.39 1.39 0 01-1.39 1.39h-2.08a.08.08 0 00-.07.08M965.12 439.82a13.11 13.11 0 10-13.27 13.06 13.08 13.08 0 0013.27-13.06m-21 27.83V464a.46.46 0 01.46-.45h4.87a.46.46 0 00.45-.46v-4.92a1.41 1.41 0 00-1.14-1.39 17.29 17.29 0 116.23.05 1.12 1.12 0 00-.91 1.1V463a.45.45 0 00.45.45h4.88a.46.46 0 01.46.45v3.69h-5.41c-.3 0-.41.08-.4.4v5.8c0 .55-4.13.5-4.13 0v-1-4.72c0-.36-.12-.44-.45-.43M944.23 582.59a13.41 13.41 0 0013.44-13.66 13.46 13.46 0 10-13.45 13.66m19.86-36.31h-6.37v-4.18h13.56v13.54h-4.16v-6.24l-8.92 8.91c.24.35.54.75.81 1.17a16.85 16.85 0 012.79 7.79 17.35 17.35 0 01-4.25 13.47 16.85 16.85 0 01-10.1 5.77 17.24 17.24 0 01-14.69-4 16.88 16.88 0 01-5.82-9.86 17.24 17.24 0 013.37-14.4 17 17 0 0110.11-6.38 17.32 17.32 0 0114.42 3.1c.19.14.32.25.54 0 2.82-2.85 5.66-5.67 8.49-8.51l.23-.25M847.83 783.67v-1.06a1.22 1.22 0 011.25-1.19h.63a11.19 11.19 0 006.57-2.37 16.78 16.78 0 005.79-8.66 14.65 14.65 0 00.65-5.8 7.23 7.23 0 00-2.05-4.66 6 6 0 00-4.31-1.69 7.07 7.07 0 00-6.4 4.92 5.19 5.19 0 00.19 3 1.94 1.94 0 00.41.66 2 2 0 01.56 1.46v1a1 1 0 01-1.33.94c-2.24-.89-3.14-3-3.28-5.55a8.49 8.49 0 011.8-5.61 10.28 10.28 0 016.32-4 9.17 9.17 0 017.77 1.89 10 10 0 013.56 6.31 15.06 15.06 0 01.18 4 20.73 20.73 0 01-1.93 7 20.43 20.43 0 01-4 5.85c-.41.41-.84.79-1.29 1.19a.15.15 0 00.09.26l10.58.18a.14.14 0 00.15-.14l.42-24a1.81 1.81 0 011.84-1.78 1.58 1.58 0 011.55 1.61l-.42 24.26a.15.15 0 00.14.15l3.32.06a1 1 0 01.93 1 2.42 2.42 0 01-2.46 2.38h-1.84a.15.15 0 00-.15.15l-.11 6.2a1.46 1.46 0 01-1.49 1.43h-.56a1.35 1.35 0 01-1.33-1.37l.11-6.3a.15.15 0 00-.14-.15l-20.53-.36a1.15 1.15 0 01-1.13-1.17M668.83 933.93l-2.8.05a.42.42 0 01-.43-.41l-.41-23.83a.42.42 0 00-.43-.41h-2.84a.43.43 0 01-.43-.41v-2.41a.43.43 0 01.41-.43h2.83a.41.41 0 00.41-.42v-2.7a.43.43 0 01.41-.43h2.41a.41.41 0 01.42.41v2.67a.42.42 0 00.43.41l5.24-.09a.41.41 0 01.42.41v2.44a.41.41 0 01-.41.42l-5.22.09a.41.41 0 00-.4.43l.07 4.27a.42.42 0 00.68.32 11.73 11.73 0 012.68-1.6 11.26 11.26 0 013.58-1 7.62 7.62 0 015.3 1.13 8.77 8.77 0 013.26 4.26 12.74 12.74 0 01.89 5.56 17.87 17.87 0 01-4.75 11.34 9.75 9.75 0 00-2.27 3.59 4 4 0 00-.21 1.91 1.84 1.84 0 001.54 1.31.71.71 0 00.42-.14c.43-.34.84-.71 1.25-1.08a4.91 4.91 0 00.43-.48l1.46 1.41a1.25 1.25 0 010 1.78 5.8 5.8 0 01-2.86 1.72 4.39 4.39 0 01-3.42-.89 4.69 4.69 0 01-2.11-4.48 10.43 10.43 0 012.72-6.12 20.6 20.6 0 002.61-3.4 16 16 0 001.86-5.75 10.07 10.07 0 00-1.15-6.28 4.09 4.09 0 00-3.16-2.24 7.92 7.92 0 00-3.44.46 9.37 9.37 0 00-4.83 4.2 2.8 2.8 0 00-.4 1.62q.13 6.25.23 12.5v.31M427.41 967.28a3.8 3.8 0 10-.16-7.6 3.8 3.8 0 00.16 7.6m-2.26-20.87l-3.79.07a.17.17 0 00-.17.14 12.32 12.32 0 01-6.23 9 12 12 0 01-5 1.53.77.77 0 01-.84-.75v-2.29a.75.75 0 01.66-.75 8.59 8.59 0 007.71-9.18 8.62 8.62 0 00-7.93-7.91.84.84 0 01-.76-.81v-2.26a.71.71 0 01.75-.72 12.12 12.12 0 017.32 2.84 12.24 12.24 0 014.28 7.24.19.19 0 00.18.15l3.62-.07a.17.17 0 00.18-.18l-.14-8.34a1 1 0 011-1h1.94a.88.88 0 01.9.87l.15 8.43a.18.18 0 00.18.18l3.63-.07a.16.16 0 00.17-.15 12.34 12.34 0 015.5-8.52 12.17 12.17 0 014.22-1.75 2 2 0 012.33 1.89 1.83 1.83 0 01-1.49 1.83 8.39 8.39 0 00-5.63 4 8.11 8.11 0 00-1.21 5.26 8.59 8.59 0 007 7.61 2 2 0 011.66 1.9v.23a1.64 1.64 0 01-1.84 1.67 12 12 0 01-6.22-2.74 12.24 12.24 0 01-4.27-7.23.18.18 0 00-.18-.15l-3.81.07v.3l.15 9.16c0 .25.09.32.31.39a7.3 7.3 0 015.43 6.09 7.61 7.61 0 01-15 2.58 7.93 7.93 0 015.56-8.71M221.25 871.45c-1.22-.16-2.4-.25-3.56-.46a9.91 9.91 0 01-4.9-2.27 11 11 0 01-3.18-5.35 26.06 26.06 0 01-.91-7.66c0-2.08.17-4.16.27-6.24 0-.35 0-.71.09-1.14l-1.78 1.48a.68.68 0 01-1-.13l-1.12-1.52a.8.8 0 01.12-1.08l5.33-4.46a.91.91 0 011.34.18l4.16 5.86a.73.73 0 01-.13 1l-1.48 1.19a.71.71 0 01-1-.14l-1.24-1.71c-.07.91-.17 1.7-.19 2.5-.06 1.87-.14 3.75-.1 5.62a18.52 18.52 0 001.07 6.21 6.21 6.21 0 004.67 4.15c1.07.24 2.19.3 3.29.44h.19l-.27-15.17-1.37 1.4a.93.93 0 01-1.34 0l-1.15-1.15a.84.84 0 010-1.13l4.71-5.4a.74.74 0 011.12 0l5 5.17a.75.75 0 010 1l-1.34 1.36a.66.66 0 01-1 0l-1.24-1.35-.12.05.27 15.13c.53-.05 1.06-.1 1.59-.17a10.69 10.69 0 003.08-.85 6.47 6.47 0 003.46-4.37 16.13 16.13 0 00.65-4.42c0-1.74 0-3.49-.1-5.23a37.1 37.1 0 00-.45-3.84c-.41.6-.81 1.2-1.23 1.8a.68.68 0 01-1 .17l-1.52-1.18a.73.73 0 01-.15-1l4.2-6.19a.61.61 0 01.9-.15l5.78 4.6a.7.7 0 01.13 1l-1.13 1.65a.61.61 0 01-.9.14l-1.75-1.39c.12 1 .13 1.05.32 3.14.16 1.69.26 3.38.26 5.08a24.6 24.6 0 01-.86 6.94 9.75 9.75 0 01-7 7.1 18.1 18.1 0 01-3.93.63h-.24c0 1.63.06 3.25.09 4.89l5.25-.09a.76.76 0 01.74.76v2a.7.7 0 01-.66.73l-5.32.09v.48c0 1.92.06 3.62.1 5.54a.61.61 0 01-.54.6h-2.14a.64.64 0 01-.58-.62c0-1.93-.06-3.61-.1-5.55v-.41l-5.12.09a.92.92 0 01-.91-.95v-1.53a.92.92 0 01.86-1l5.11-.09zM80.17 676.43h-6.7c-1.2-.06-1.2-.06-1.17 1.18v8h-3.51c-.56 0-.56 0-.56-.54v-8.67h-7.88a1.18 1.18 0 01-1.17-1.18v-1.67a1.17 1.17 0 011.17-1.18h7.85c.09 0 .06-.35.06-.47v-7.82c0-.35-.08-.43-.43-.48a18.28 18.28 0 01-10.06-4.71 18.56 18.56 0 01-5.84-10.42 10.53 10.53 0 01-.3-2.76c0-.84.38-.74.4-.83h2.58a1.05 1.05 0 011 1 14.65 14.65 0 006 11 14.12 14.12 0 009.73 2.83A14.83 14.83 0 0084.92 646a1.18 1.18 0 011.17-1.09h1.65a1.18 1.18 0 011.17 1.27 18.83 18.83 0 01-15.64 17.38 1.16 1.16 0 00-.94 1.15v6.47c0 1.3 0 1.18 1.17 1.18h6.67a1.18 1.18 0 011.17 1.19v1.69a1.18 1.18 0 01-1.17 1.19"/><path d="M70.35 652.61a7.79 7.79 0 10-7.68-7.79 7.75 7.75 0 007.69 7.79m-11.74-7.76a11.76 11.76 0 1123.51.06 11.76 11.76 0 11-23.51-.06M82.41 327.11v-31a.69.69 0 00-1.19-.51l-12.08 12.62a.68.68 0 01-1 0l-.88-.79a.75.75 0 010-1.06l15.88-16.76a.67.67 0 011 0l15.91 16.78a.76.76 0 010 1.07l-.84.75a.68.68 0 01-1 0l-12-12.63a.69.69 0 00-1.19.51v31a.71.71 0 01-.69.73h-1.22a.72.72 0 01-.7-.73M235.86 108v31a.69.69 0 001.19.51l12.08-12.61a.69.69 0 01.95 0l.88.79a.76.76 0 010 1.07l-15.88 16.75a.67.67 0 01-1 0l-15.91-16.78a.75.75 0 010-1.06l.84-.76a.69.69 0 01.95 0c4 4.21 8 8.41 12.05 12.63a.69.69 0 001.19-.51V108a.71.71 0 01.69-.73h1.19a.71.71 0 01.69.73"/></g><path fill="none" stroke="#1d1d1b" stroke-width="6" d="M926.55 744.29L495.96 500.67"/><path fill="none" stroke="#000" stroke-width=".334" d="M498.73 500.03l438.84-228.44M499.86 502.21L938.7 273.77M500.97 504.34L939.81 275.9"/><g clip-path="url(#b)"><path d="M498.67 539a38.18 38.18 0 10-38.18-38.18A38.17 38.17 0 00498.67 539" fill="#fff"/><circle cx="498.61" cy="500.86" r="38.17" fill="none" stroke="#1d1d1b" stroke-width="2"/></g><path d="M498.84 501V4.91c272.01 0 495.83 223.92 495.83 496.09a496.21 496.21 0 01-64.41 244.5z" fill="#0ff" opacity=".4"/><path d="M499.61 498.81L933.3 744.6c-134.84 237.92-441.57 322.74-679.48 187.91a498.56 498.56 0 01-195.1-201.06z" fill="#f0f" opacity=".4"/><path d="M498.5 501.78L54.81 729A498.55 498.55 0 010 501.78C0 228.31 225 3.28 498.5 3.28z" fill="#f15a24" opacity=".4"/>`;

    chartImg.append(...symbolsToPopulate);
    // this.image = chartImg;
    return chartImg;
  }

  renderSmallChart({ mountNode, clearNode = true, recreate = false, options = {} }) {
    if (!isElement(mountNode)) {
      throw new Error(
        `You must provide a DOM node to insert the chart in. Received ${mountNode} of type: ${typeof mountNode}; class: ${
          mountNode?.__proto__?.constructor
        }`,
      );
    }

    if (clearNode) {
      mountNode.innerHTML = "";
    }

    if (recreate || this.image == null) {
      this.image = this.generateSmallChartImage();
    }

    const defaults = {
      showControls: true,
      showBirthday: true,
    };

    const { showControls, showBirthday } = { ...defaults, ...options };

    if (showControls) {
      const controls = document.createElement("div");
      controls.classList.add("controls");
      controls.id = "controls";

      const heading = document.createElement("h2");
      heading.classList.add("chart-heading");
      heading.textContent = `${this.ownerName}`;
      controls.append(heading);

      const printButton = document.createElement("button");
      printButton.textContent = "print chart";
      printButton.classList.add(
        "btn",
        "waves-effect",
        "waves-light",
        "print-btn",
      );
      printButton.addEventListener("click", () => {
        // console.log("window", window);
        window.print();
        // printJS({
        //   printable: "modalContent",
        //   type: "html",
        //   css: ["../styles/styles.css", "../styles/print-styles.css"],
        // });
      });

      const transButton = document.createElement("button");
      transButton.textContent = "Remove outline";
      transButton.classList.add(
        "btn",
        "waves-effect",
        "waves-light",
        "trans-btn",
      );
      transButton.addEventListener("click", () => {
        const outline = document.getElementById("chart");
        const children = outline.childNodes;
        for (const child of children) {
          if (!child.classList.contains("sign")) {
            child.classList.toggle("transparent");
          } else {
            return;
          }
        }
        // // console.log("children", children);
        // children.classList.add("transparent");
        // outline.classList.add("transparent");
      });

      controls.append(printButton, transButton);
      mountNode.append(controls);
      mountNode.append(this.image);
    }

    if (showBirthday) {
      const birthdayDisplay = document.createElement("ul");
      birthdayDisplay.classList.add("birthday");
      const dateDisplay = document.createElement("li");
      dateDisplay.textContent = `Birthday: ${this.birthday}`;
      const timeDisplay = document.createElement("li");
      timeDisplay.textContent = `Time: ${this.time.slice(
        0,
        2,
      )}:${this.time.slice(2)}`;
      const locationDisplay = document.createElement("li");
      locationDisplay.textContent = `Lat: ${this.latitude.toFixed(
        2,
      )}, Long: ${this.longitude.toFixed(2)}`;
      console.log(dateDisplay, timeDisplay);
      birthdayDisplay.append(dateDisplay, timeDisplay, locationDisplay);
      // heading.append(birthdayDisplay);
      mountNode.append(birthdayDisplay);
    }
  }


  generateSmallChartImage() {
    const { reducedPlanets } = SmallBirthChart;
    // Created a document fragment, so we append lis as few times as possible
    // const imgfrag = document.createDocumentFragment();
    // console.log("chart to be rendered", this);
    const symbolsToPopulate = [];
    // console.log("planets", planets);
    for (const [planet, sign] of Object.entries(this)) {
      console.log(planet, sign);
      if (!reducedPlanets.includes(planet)) {
        console.log(`skipping ${planet}`);
        continue;
      }

      const currentSymbol = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );

      const currentWord = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      // console.log("currentWord", currentWord);
      currentSymbol.setAttribute("viewBox", "0 0 300 300");
      currentSymbol.setAttribute("width", "60");
      currentSymbol.classList.add("sign", "icon", "chart");
      currentSymbol.innerHTML = sign.icon;
      currentSymbol.location = sign.location;

      currentWord.setAttribute("viewBox", `${sign.viewBox}`);

      currentWord.setAttribute("width", "230");
      currentWord.classList.add(
        "sign",
        "word",
        "chart",
        `${sign.sign.toLowerCase()}`,
      );
      currentWord.innerHTML = sign.word;
      currentWord.location = sign.wordLocation;
      const toRotate = currentWord.firstChild;
      toRotate.classList.add("inner-word", `${planet.toLowerCase()}`);
      const degrees = sign.wordRotation;
      const anchor = sign.textAnchor;
      // toRotate.setAttribute("transform", `${degrees}`); // no rotataion
      toRotate.setAttribute("text-anchor", `${anchor}`);
      gsap.to(
        currentSymbol,
        // duration: 6,
        {
          attr: {
            x: `${currentSymbol.location.x}`,
            y: `${currentSymbol.location.y}`,
          },
        },
      );
      gsap.to(currentWord, {
        attr: {
          x: `${currentWord.location.x}`,
          y: `${currentWord.location.y}`,
        },
      });

      symbolsToPopulate.push(currentSymbol, currentWord);
      // symbolsToPopulate.push( currentWord);
    }
    // console.log("symbolsToPopulate", symbolsToPopulate);

    ///BINGO CARD USING AN IMG

    // const chartImg = document.createElement("img");
    // // console.log("chartImg", chartImg);
    // chartImg.classList.add("bc-template", "materialboxed");
    // chartImg.src = "./assets/img/fake-bc-template.svg";

    ///BINGO CAR USING AN SVG

    const chartImg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    // console.log("chartImg", chartImg);
    chartImg.id = "chart";
    chartImg.classList.add("bc-template", "materialboxed", "chart-outline");
    chartImg.setAttribute("viewBox", "-30 -30 1060 1060");
    chartImg.innerHTML = `<style type="text/css">
    .st0{display:none;}
    .st1{display:inline;}
    .st2{clip-path:url(#SVGID_00000024688682449096429640000002132529588793623222_);fill:none;stroke:#000000;stroke-width:1.914;}
    .st3{clip-path:url(#SVGID_00000024688682449096429640000002132529588793623222_);fill:none;stroke:#1D1D1B;stroke-width:6;}
    .st4{font-family:'WolpePegasus-Bold';}
    .st5{font-size:27.4755px;}
    .st6{font-size:27.4756px;}
    .st7{font-size:27.4757px;}
    .st8{font-size:27.4754px;}
    .st9{display:inline;fill:#1D1D1B;}
    .st10{font-family:'WolpePegasus-Italic';}
    .st11{font-size:27.2693px;}
    .st12{font-size:27.2694px;}
    .st13{font-size:27.2695px;}
    .st14{font-size:28.621px;}
    .st15{font-size:28.6212px;}
    .st16{font-size:28.6211px;}
    .st17{clip-path:url(#SVGID_00000076583401046558177830000010227856920884533673_);fill:none;stroke:#000000;stroke-width:0.957;}
    .st18{font-size:26.4048px;}
    .st19{font-size:26.4049px;}
    .st20{font-size:26.405px;}
    .st21{display:inline;fill:none;stroke:#1D1D1B;stroke-width:6;}
    .st22{display:inline;fill:none;stroke:#000000;stroke-width:0.334;}
    .st23{display:inline;fill:none;stroke:#1D1D1B;stroke-width:2.229;}
    .st24{clip-path:url(#SVGID_00000159441286251789625190000013136977521179918987_);fill:#1D1D1B;}
    .st25{clip-path:url(#SVGID_00000078742467437311214410000010434021356510853254_);fill:none;stroke:#000000;stroke-width:1.914;}
    .st26{clip-path:url(#SVGID_00000078742467437311214410000010434021356510853254_);fill:none;stroke:#1D1D1B;stroke-width:6;}
    .st27{font-size:34.4546px;}
    .st28{font-size:34.4547px;}
    .st29{font-size:34.4548px;}
    .st30{font-size:34.4545px;}
    .st31{font-size:33.1119px;}
    .st32{font-size:33.112px;}
    .st33{font-size:33.1121px;}
    .st34{font-size:33.1122px;}
    .st35{clip-path:url(#SVGID_00000033335008897517675130000000380857440184887178_);fill:none;stroke:#1D1D1B;stroke-width:6;}
    .st36{clip-path:url(#SVGID_00000033335008897517675130000000380857440184887178_);fill:none;stroke:#000000;stroke-width:0.334;}
    .st37{clip-path:url(#SVGID_00000061433807219780426160000009352026246123327406_);fill:#1D1D1B;}
    .st38{clip-path:url(#SVGID_00000036972908100357921720000016762526931849399963_);fill:#FFFFFF;}
    .st39{clip-path:url(#SVGID_00000036972908100357921720000016762526931849399963_);fill:none;stroke:#1D1D1B;stroke-width:2;}
    .st40{opacity:0.61;}
    .st41{display:inline;fill:#00FFFF;}
    .st42{display:inline;fill:#FF00FF;}
    .st43{display:inline;fill:#F15A24;}
    .st44{display:inline;opacity:0.4;}
    .st45{fill:#00FFFF;}
    .st46{fill:#FF00FF;}
    .st47{fill:#F15A24;}
    .st48{clip-path:url(#SVGID_00000110432261279919849130000001703288039464303489_);fill:none;stroke:#000000;stroke-width:1.914;}
    .st49{clip-path:url(#SVGID_00000110432261279919849130000001703288039464303489_);fill:none;stroke:#1D1D1B;stroke-width:6;}
    .st50{font-family:'MyriadPro-Regular';}
    .st51{font-size:34.5538px;}
    .st52{font-size:34.5537px;}
    .st53{font-size:34.5539px;}
    .st54{font-size:34.5536px;}
    .st55{clip-path:url(#SVGID_00000041991225857308769900000005566462407943258789_);}
    .st56{font-family:'Krungthep';}
    .st57{font-size:50.7471px;}
    .st58{font-size:50.7472px;}
    .st59{font-size:50.7473px;}
    .st60{clip-path:url(#SVGID_00000065774127438271928760000010157938221438043292_);}
    .st61{font-size:50.7474px;}
    .st62{font-size:33.2071px;}
    .st63{font-size:33.2074px;}
    .st64{font-size:33.2073px;}
    .st65{font-size:33.2072px;}
    .st66{clip-path:url(#SVGID_00000068648256713969468560000002976507826509283745_);fill:none;stroke:#1D1D1B;stroke-width:6;}
    .st67{fill:none;stroke:#1D1D1B;stroke-width:2.229;}
    .st68{fill:none;stroke:#1D1D1B;stroke-width:6;}
    .st69{clip-path:url(#SVGID_00000181777036887730599920000004741929111008796303_);fill:#1D1D1B;}
  </style>
  <g id="Layer_1" class="st0">
    <g class="st1">
      <defs>
        <rect id="SVGID_1_" x="18" width="981.74" height="981.74"/>
      </defs>
      <clipPath id="SVGID_00000156570103460173067770000016346996875004456600_">
        <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
      </clipPath>
      
        <circle style="clip-path:url(#SVGID_00000156570103460173067770000016346996875004456600_);fill:none;stroke:#000000;stroke-width:1.914;" cx="508.54" cy="484.77" r="395.3"/>
      
        <ellipse transform="matrix(0.7071 -0.7071 0.7071 0.7071 -195.4977 502.6071)" style="clip-path:url(#SVGID_00000156570103460173067770000016346996875004456600_);fill:none;stroke:#1D1D1B;stroke-width:6;" cx="508.95" cy="487.29" rx="328.23" ry="328.23"/>
    </g>
    <text transform="matrix(0.1262 0.992 -0.992 0.1262 136.9465 523.4805)" class="st1 st4 st5">P</text>
    <text transform="matrix(0.163 0.9866 -0.9866 0.163 139.0504 539.9932)" class="st1 st4 st6">l</text>
    <text transform="matrix(0.1874 0.9823 -0.9823 0.1874 140.2013 547.0866)" class="st1 st4 st5">u</text>
    <text transform="matrix(0.2236 0.9747 -0.9747 0.2236 142.9587 561.6678)" class="st1 st4 st5">t</text>
    <text transform="matrix(0.2474 0.9689 -0.9689 0.2474 144.9536 570.2764)" class="st1 st4 st6">o</text>
    <text transform="matrix(0.2711 0.9626 -0.9626 0.2711 148.5076 584.1074)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.2945 0.9556 -0.9556 0.2945 150.1513 589.8542)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.3177 0.9482 -0.9482 0.3177 151.8673 595.6088)" class="st1 st4 st7"> </text>
    <text transform="matrix(0.3292 0.9443 -0.9443 0.3292 155.0242 604.9522)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.4405 0.8978 -0.8978 0.4405 155.0301 611.6147)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.5345 0.8452 -0.8452 0.5345 190.7226 680.427)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.5644 0.8255 -0.8255 0.5644 194.1006 685.9009)" class="st1 st4 st5">N</text>
    <text transform="matrix(0.6031 0.7977 -0.7977 0.6031 205.8755 703.0198)" class="st1 st4 st5">e</text>
    <text transform="matrix(0.6312 0.7756 -0.7756 0.6312 213.4418 713.2375)" class="st1 st4 st8">p</text>
    <text transform="matrix(0.6496 0.7603 -0.7603 0.6496 222.9572 724.9114)" class="st1 st4 st5">t</text>
    <text transform="matrix(0.6764 0.7366 -0.7366 0.6764 228.8762 731.8267)" class="st1 st4 st5">u</text>
    <text transform="matrix(0.7023 0.7118 -0.7118 0.7023 238.9606 742.6995)" class="st1 st4 st5">n</text>
    <text transform="matrix(0.7357 0.6773 -0.6773 0.7357 249.5322 753.2571)" class="st1 st4 st6">e</text>
    <text transform="matrix(0.7517 0.6595 -0.6595 0.7517 258.7481 761.8882)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.7975 0.6033 -0.6033 0.7975 262.8177 766.4836)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.8459 0.5333 -0.5333 0.8459 307.2653 798.7587)" class="st1 st4 st7"> </text>
    <text transform="matrix(0.8524 0.5229 -0.5229 0.8524 312.4034 801.931)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.865 0.5018 -0.5018 0.865 317.567 805.0422)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.8711 0.4912 -0.4912 0.8711 322.7498 808.1538)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.877 0.4804 -0.4804 0.877 328.0639 811.0588)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.8886 0.4587 -0.4587 0.8886 333.3272 814.0192)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.8942 0.4476 -0.4476 0.8942 338.6895 816.7017)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.9102 0.4141 -0.4141 0.9102 344.101 819.5912)" class="st1 st4 st6">U</text>
    <text transform="matrix(0.9251 0.3798 -0.3798 0.9251 362.2719 827.7685)" class="st1 st4 st5">r</text>
    <text transform="matrix(0.9386 0.3449 -0.3449 0.9386 372.1286 831.7531)" class="st1 st4 st6">a</text>
    <text transform="matrix(0.951 0.3093 -0.3093 0.951 384.1707 836.3445)" class="st1 st4 st5">n</text>
    <text transform="matrix(0.962 0.2732 -0.2732 0.962 398.1837 840.9352)" class="st1 st4 st5">u</text>
    <text transform="matrix(0.9716 0.2366 -0.2366 0.9716 412.3803 844.9471)" class="st1 st4 st5">s</text>
    <text transform="matrix(0.9846 0.1747 -0.1747 0.9846 422.357 847.9404)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.9999 0.0112 -0.0112 0.9999 463.442 856.8936)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.9935 -0.1138 0.1138 0.9935 547.0363 855.3541)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.9904 -0.1385 0.1385 0.9904 552.9604 854.7744)" class="st1 st4 st6">S</text>
    <text transform="matrix(0.9845 -0.1752 0.1752 0.9845 567.224 852.79)" class="st1 st4 st5">a</text>
    <text transform="matrix(0.9799 -0.1995 0.1995 0.9799 579.8239 850.496)" class="st1 st4 st5">t</text>
    <text transform="matrix(0.9719 -0.2355 0.2355 0.9719 588.8576 848.6569)" class="st1 st4 st5">u</text>
    <text transform="matrix(0.9626 -0.2711 0.2711 0.9626 603.2244 845.2249)" class="st1 st4 st5">r</text>
    <text transform="matrix(0.952 -0.3061 0.3061 0.952 613.9507 842.1985)" class="st1 st4 st5">n</text>
    <text transform="matrix(0.9482 -0.3177 0.3177 0.9482 628.0842 837.5596)" class="st1 st4 st7"> </text>
    <text transform="matrix(0.9443 -0.3292 0.3292 0.9443 628.5651 837.4012)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.9402 -0.3406 0.3406 0.9402 634.2181 835.4835)" class="st1 st4 st7"> </text>
    <text transform="matrix(0.9317 -0.3633 0.3633 0.9317 639.9417 833.3403)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.9272 -0.3745 0.3745 0.9272 645.6057 831.1412)" class="st1 st4 st8"> </text>
    <text transform="matrix(0.9179 -0.3968 0.3968 0.9179 651.1809 828.9258)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.913 -0.4078 0.4078 0.913 656.7063 826.5303)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.9081 -0.4188 0.4188 0.9081 662.3227 824.1141)" class="st1 st4 st7"> </text>
    <text transform="matrix(0.8978 -0.4405 0.4405 0.8978 667.7828 821.5679)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.8924 -0.4513 0.4513 0.8924 673.1675 818.9711)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.8869 -0.4619 0.4619 0.8869 678.5622 816.1748)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.8756 -0.483 0.483 0.8756 683.9791 813.392)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.8698 -0.4935 0.4935 0.8698 689.2838 810.4336)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.8638 -0.5039 0.5039 0.8638 694.4915 807.4907)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.8515 -0.5243 0.5243 0.8515 699.7079 804.4907)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.8452 -0.5345 0.5345 0.8452 704.8063 801.2668)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.8388 -0.5445 0.5445 0.8388 709.9965 798.0748)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.8255 -0.5644 0.5644 0.8255 715.0997 794.7843)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.8187 -0.5742 0.5742 0.8187 720.0549 791.3665)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.8118 -0.5839 0.5839 0.8118 724.9952 787.9332)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.7977 -0.6031 0.6031 0.7977 729.8937 784.3016)" class="st1 st4 st5">J</text>
    <text transform="matrix(0.7756 -0.6312 0.6312 0.7756 737.4637 778.7458)" class="st1 st4 st8">u</text>
    <text transform="matrix(0.7525 -0.6586 0.6586 0.7525 748.9384 769.3511)" class="st1 st4 st8">p</text>
    <text transform="matrix(0.7284 -0.6851 0.6851 0.7284 760.2665 759.3649)" class="st1 st4 st5">i</text>
    <text transform="matrix(0.7118 -0.7023 0.7023 0.7118 765.7579 754.2495)" class="st1 st4 st5">t</text>
    <text transform="matrix(0.6948 -0.7192 0.7192 0.6948 772.1689 748.1118)" class="st1 st4 st5">e</text>
    <text transform="matrix(0.6685 -0.7438 0.7438 0.6685 780.9464 739.0081)" class="st1 st4 st6">r</text>
    <text transform="matrix(0.6033 -0.7975 0.7975 0.6033 789.1623 731.3745)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.5333 -0.8459 0.8459 0.5333 822.5169 685.5355)" class="st1 st4 st7"> </text>
    <text transform="matrix(0.5229 -0.8524 0.8524 0.5229 825.7469 680.3771)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.5018 -0.865 0.865 0.5018 828.9049 675.1841)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.4912 -0.8711 0.8711 0.4912 831.9049 670.0387)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.4804 -0.877 0.877 0.4804 834.9102 664.7227)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.4587 -0.8886 0.8886 0.4587 837.7684 659.4927)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.4476 -0.8942 0.8942 0.4476 840.5396 654.0262)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.4365 -0.8997 0.8997 0.4365 843.2192 648.6237)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.4141 -0.9102 0.9102 0.4141 845.9454 643.2486)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.4027 -0.9153 0.9153 0.4027 848.4153 637.6739)" class="st1 st4 st6"> </text>
    <text transform="matrix(0.3682 -0.9297 0.9297 0.3682 851.0347 632.233)" class="st1 st4 st6">M</text>
    <text transform="matrix(0.3212 -0.947 0.947 0.3212 859.9554 608.9063)" class="st1 st4 st6">a</text>
    <text transform="matrix(0.2853 -0.9584 0.9584 0.2853 864.0889 596.7182)" class="st1 st4 st8">r</text>
    <text transform="matrix(0.2611 -0.9653 0.9653 0.2611 867.1954 586.0729)" class="st1 st4 st5">s</text>
    <text transform="matrix(0.1872 -0.9823 0.9823 0.1872 870.5305 576.1228)" class="st1 st4 st8"> </text>
    <text transform="matrix(0.0112 -0.9999 0.9999 0.0112 880.9651 529.4376)" class="st1 st4 st5"> </text>
    <text transform="matrix(0.4159 -0.9094 0.9094 0.4159 137.769 322.7335)" class="st9 st10 st11">R</text>
    <text transform="matrix(0.4483 -0.8939 0.8939 0.4483 144.0863 309.1126)" class="st9 st10 st12">o</text>
    <text transform="matrix(0.4696 -0.8829 0.8829 0.4696 149.3846 298.6113)" class="st9 st10 st13">u</text>
    <text transform="matrix(0.5009 -0.8655 0.8655 0.5009 155.5086 287.2073)" class="st9 st10 st13">n</text>
    <text transform="matrix(0.5315 -0.847 0.847 0.5315 162.1653 275.6718)" class="st9 st10 st13">d</text>
    <text transform="matrix(0.5516 -0.8341 0.8341 0.5516 168.9398 264.9227)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.5615 -0.8275 0.8275 0.5615 171.8023 260.5193)" class="st9 st10 st11">3</text>
    <text transform="matrix(0.581 -0.8139 0.8139 0.581 178.7963 250.4126)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.656 -0.7548 0.7548 0.656 177.5515 248.9244)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.8031 -0.5959 0.5959 0.8031 232.7065 185.5152)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.9094 -0.4158 0.4158 0.9094 299.9499 135.0709)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.9742 -0.2256 0.2256 0.9742 376.2696 100.1225)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.9997 -0.0253 0.0253 0.9997 458.0436 81.3419)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.9827 0.1851 -0.1851 0.9827 542.0408 79.4207)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.9238 0.3828 -0.3828 0.9238 624.5131 95.0779)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.8772 0.4801 -0.4801 0.8772 700.8308 129.1892)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.8714 0.4905 -0.4905 0.8714 705.5362 131.7332)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.8655 0.5009 -0.5009 0.8655 710.136 134.3323)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.8533 0.5214 -0.5214 0.8533 714.7203 136.9508)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.847 0.5315 -0.5315 0.847 719.239 139.6846)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.8406 0.5416 -0.5416 0.8406 723.7012 142.4654)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.8341 0.5516 -0.5516 0.8341 728.2042 145.3222)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.8275 0.5615 -0.5615 0.8275 732.579 148.2564)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.8207 0.5713 -0.5713 0.8207 736.9914 151.2693)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.8139 0.581 -0.581 0.8139 741.3284 154.2464)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.8069 0.5907 -0.5907 0.8069 745.5753 157.4071)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.7998 0.6003 -0.6003 0.7998 749.8108 160.4842)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.7926 0.6098 -0.6098 0.7926 754.0544 163.651)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.7852 0.6192 -0.6192 0.7852 758.2379 166.8812)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.7702 0.6378 -0.6378 0.7702 762.4178 170.2133)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.7625 0.6469 -0.6469 0.7625 766.4589 173.5878)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.7548 0.656 -0.656 0.7548 770.5696 177.0356)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.7469 0.665 -0.665 0.7469 774.5557 180.3943)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.7389 0.6739 -0.6739 0.7389 778.4934 183.9418)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.7307 0.6827 -0.6827 0.7307 782.4189 187.5204)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.7225 0.6914 -0.6914 0.7225 786.2332 191.1287)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.7142 0.7 -0.7 0.7142 790.0605 194.7593)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.7057 0.7085 -0.7085 0.7057 793.7832 198.5429)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.6971 0.7169 -0.7169 0.6971 797.5242 202.228)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.6885 0.7253 -0.7253 0.6885 801.1793 206.0568)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.6708 0.7416 -0.7416 0.6708 804.8366 209.9607)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.6618 0.7497 -0.7497 0.6618 808.3889 213.8521)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.6527 0.7576 -0.7576 0.6527 811.9839 217.7585)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.6435 0.7655 -0.7655 0.6435 815.3379 221.7826)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.6342 0.7732 -0.7732 0.6342 818.7783 225.7773)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.6248 0.7808 -0.7808 0.6248 822.1197 229.8671)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.6152 0.7883 -0.7883 0.6152 825.4615 234.0477)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.6056 0.7958 -0.7958 0.6056 828.758 238.2537)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.5959 0.8031 -0.8031 0.5959 831.9424 242.4526)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.5861 0.8103 -0.8103 0.5861 835.0749 246.695)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.5761 0.8174 -0.8174 0.5761 838.1689 250.9745)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.5661 0.8243 -0.8243 0.5661 841.1772 255.3554)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.5354 0.8446 -0.8446 0.5354 844.2216 259.7076)" class="st9 st10 st12">R</text>
    <text transform="matrix(0.5145 0.8575 -0.8575 0.5145 852.3273 272.3642)" class="st9 st10 st12">o</text>
    <text transform="matrix(0.4824 0.876 -0.876 0.4824 858.3923 282.465)" class="st9 st10 st11">u</text>
    <text transform="matrix(0.4605 0.8876 -0.8876 0.4605 864.5375 293.8097)" class="st9 st10 st13">n</text>
    <text transform="matrix(0.4271 0.9042 -0.9042 0.4271 870.6531 305.5532)" class="st9 st10 st13">d</text>
    <text transform="matrix(0.4044 0.9146 -0.9146 0.4044 876.002 317.0082)" class="st9 st10 st11"> </text>
    <text transform="matrix(0.3814 0.9244 -0.9244 0.3814 878.2547 321.8561)" class="st9 st10 st12">1</text>
    <text transform="matrix(0.3108 0.9505 -0.9505 0.3108 883.7983 332.9259)" class="st9 st10 st13"> </text>
    <text transform="matrix(0.1385 0.9904 -0.9904 0.1385 902.2249 385.802)" class="st9 st10 st13"> </text>
    <text transform="matrix(-0.0623 0.9981 -0.9981 -0.0623 913.9054 469.0116)" class="st9 st10 st11"> </text>
    <text transform="matrix(-0.2685 0.9633 -0.9633 -0.2685 908.5011 552.7536)" class="st9 st10 st12"> </text>
    <text transform="matrix(-0.459 0.8885 -0.8885 -0.459 885.6342 633.5139)" class="st9 st10 st12"> </text>
    <text transform="matrix(-0.6378 0.7702 -0.7702 -0.6378 847.1091 708.188)" class="st9 st10 st13"> </text>
    <text transform="matrix(-0.7808 0.6248 -0.6248 -0.7808 793.6771 773.0041)" class="st9 st10 st13"> </text>
    <text transform="matrix(-0.8933 0.4495 -0.4495 -0.8933 728.2566 825.7336)" class="st9 st10 st12"> </text>
    <text transform="matrix(-0.965 0.2624 -0.2624 -0.965 653.2239 863.3257)" class="st9 st10 st12"> </text>
    <text transform="matrix(0.9942 0.108 -0.108 0.9942 462.1946 905.587)" class="st1 st10 st14"> </text>
    <text transform="matrix(0.9965 0.084 -0.084 0.9965 467.7069 906.2003)" class="st1 st10 st15"> </text>
    <text transform="matrix(0.9982 0.06 -0.06 0.9982 473.2928 906.7698)" class="st1 st10 st14">R</text>
    <text transform="matrix(0.9994 0.0358 -0.0358 0.9994 489.1052 907.7018)" class="st1 st10 st16">o</text>
    <text transform="matrix(1 -5.400000e-04 5.400000e-04 1 501.4472 908.1235)" class="st1 st10 st16">u</text>
    <text transform="matrix(0.9993 -0.037 0.037 0.9993 514.8802 908.202)" class="st1 st10 st15">n</text>
    <text transform="matrix(0.9981 -0.0614 0.0614 0.9981 528.8339 907.707)" class="st1 st10 st15">d</text>
    <text transform="matrix(0.9963 -0.0859 0.0859 0.9963 542.2105 906.8007)" class="st1 st10 st14"> </text>
    <text transform="matrix(0.9939 -0.1103 0.1103 0.9939 547.6631 906.4189)" class="st1 st10 st16">2</text>
    <text transform="matrix(0.9781 -0.2079 0.2079 0.9781 560.7864 906.4274)" class="st1 st10 st15"> </text>
    <text transform="matrix(0.9268 -0.3756 0.3756 0.9268 628.5773 892.7745)" class="st1 st10 st14"> </text>
    <text transform="matrix(0.8393 -0.5437 0.5437 0.8393 706.2342 861.0058)" class="st1 st10 st15"> </text>
    <text transform="matrix(0.7142 -0.6999 0.6999 0.7142 776.3838 814.9926)" class="st1 st10 st14"> </text>
    <text transform="matrix(0.554 -0.8325 0.8325 0.554 836.4343 756.2248)" class="st1 st10 st15"> </text>
    <text transform="matrix(0.3847 -0.923 0.923 0.3847 883.1745 686.4752)" class="st1 st10 st15"> </text>
    <text transform="matrix(0.2026 -0.9793 0.9793 0.2026 915.2804 608.9694)" class="st1 st10 st14"> </text>
    <text transform="matrix(-5.400000e-04 -1 1 -5.400000e-04 932.1633 526.6033)" class="st1 st10 st16"> </text>
    <g class="st1">
      <defs>
        <rect id="SVGID_00000082335321557633705620000016176253352638624435_" x="18" width="981.74" height="981.74"/>
      </defs>
      <clipPath id="SVGID_00000176027550392705264410000003927009409606250368_">
        <use xlink:href="#SVGID_00000082335321557633705620000016176253352638624435_"  style="overflow:visible;"/>
      </clipPath>
      
        <circle style="clip-path:url(#SVGID_00000176027550392705264410000003927009409606250368_);fill:none;stroke:#000000;stroke-width:0.957;" cx="508.54" cy="484.14" r="432.17"/>
    </g>
    <text transform="matrix(0.0891 -0.996 0.996 0.0891 150.905 467.0757)" class="st1 st4 st18">A</text>
    <text transform="matrix(0.1264 -0.992 0.992 0.1264 152.7045 448.6627)" class="st1 st4 st18">s</text>
    <text transform="matrix(0.1637 -0.9865 0.9865 0.1637 153.9769 438.7682)" class="st1 st4 st19">c</text>
    <text transform="matrix(0.1885 -0.9821 0.9821 0.1885 155.7317 428.0558)" class="st1 st4 st19">e</text>
    <text transform="matrix(0.2256 -0.9742 0.9742 0.2256 158.0383 416.1936)" class="st1 st4 st19">n</text>
    <text transform="matrix(0.2624 -0.965 0.965 0.2624 161.3721 402.1537)" class="st1 st4 st18">d</text>
    <text transform="matrix(0.2988 -0.9543 0.9543 0.2988 165.2528 388.1571)" class="st1 st4 st18">a</text>
    <text transform="matrix(0.3349 -0.9423 0.9423 0.3349 168.9609 376.3607)" class="st1 st4 st19">n</text>
    <text transform="matrix(0.3704 -0.9289 0.9289 0.3704 173.7815 362.8039)" class="st1 st4 st18">t</text>
    <text transform="matrix(0.4396 -0.8982 0.8982 0.4396 176.3763 354.349)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.5166 -0.8562 0.8562 0.5166 199.9006 308.5973)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.5273 -0.8497 0.8497 0.5273 202.9458 303.5879)" class="st1 st4 st18"> </text>
    <text transform="matrix(0.5586 -0.8294 0.8294 0.5586 205.974 298.3589)" class="st1 st4 st18">D</text>
    <text transform="matrix(0.599 -0.8007 0.8007 0.599 216.7541 282.5675)" class="st1 st4 st20">e</text>
    <text transform="matrix(0.6186 -0.7857 0.7857 0.6186 224.1385 272.6725)" class="st1 st4 st20">c</text>
    <text transform="matrix(0.6471 -0.7624 0.7624 0.6471 230.8134 264.0921)" class="st1 st4 st19">e</text>
    <text transform="matrix(0.6747 -0.7381 0.7381 0.6747 238.6844 254.7632)" class="st1 st4 st20">n</text>
    <text transform="matrix(0.7012 -0.713 0.713 0.7012 248.3559 244.2342)" class="st1 st4 st20">d</text>
    <text transform="matrix(0.7267 -0.687 0.687 0.7267 258.6124 233.867)" class="st1 st4 st18">a</text>
    <text transform="matrix(0.7511 -0.6602 0.6602 0.7511 267.5803 225.3275)" class="st1 st4 st18">n</text>
    <text transform="matrix(0.7745 -0.6326 0.6326 0.7745 278.4291 216.0172)" class="st1 st4 st19">t</text>
    <text transform="matrix(0.7895 -0.6138 0.6138 0.7895 285.2493 210.3944)" class="st1 st4 st18"> </text>
    <text transform="matrix(0.818 -0.5752 0.5752 0.818 289.5705 206.5987)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8446 -0.5355 0.5355 0.8446 314.9338 189.1133)" class="st1 st4 st18"> </text>
    <text transform="matrix(0.8571 -0.5152 0.5152 0.8571 319.8752 186.0872)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8632 -0.5049 0.5049 0.8632 324.8636 183.0119)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8691 -0.4946 0.4946 0.8691 329.8059 180.0798)" class="st1 st4 st18"> </text>
    <text transform="matrix(0.8807 -0.4737 0.4737 0.8807 334.9281 177.222)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8863 -0.4632 0.4632 0.8863 340.0114 174.4417)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8917 -0.4526 0.4526 0.8917 345.153 171.7758)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.9023 -0.4312 0.4312 0.9023 350.3582 169.1585)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.9074 -0.4204 0.4204 0.9074 355.5287 166.6856)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.9123 -0.4095 0.4095 0.9123 360.8377 164.1553)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.9308 -0.3655 0.3655 0.9308 366.0078 161.6232)" class="st1 st4 st18">M</text>
    <text transform="matrix(0.9472 -0.3206 0.3206 0.9472 388.2122 153.0475)" class="st1 st4 st18">o</text>
    <text transform="matrix(0.9581 -0.2863 0.2863 0.9581 401.4307 148.6227)" class="st1 st4 st19">o</text>
    <text transform="matrix(0.9708 -0.2399 0.2399 0.9708 414.5084 144.6654)" class="st1 st4 st18">n</text>
    <text transform="matrix(0.9856 -0.1688 0.1688 0.9856 428.3936 140.754)" class="st1 st4 st18"> </text>
    <text transform="matrix(0.9999 0.0145 -0.0145 0.9999 471.3327 131.6136)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.9903 0.1389 -0.1389 0.9903 554.889 135.0672)" class="st1 st4 st18"> </text>
    <text transform="matrix(0.9885 0.1513 -0.1513 0.9885 560.6707 135.9135)" class="st1 st4 st18"> </text>
    <text transform="matrix(0.9844 0.1761 -0.1761 0.9844 566.3925 136.843)" class="st1 st4 st19">S</text>
    <text transform="matrix(0.977 0.2133 -0.2133 0.977 579.7563 139.2307)" class="st1 st4 st19">u</text>
    <text transform="matrix(0.965 0.2624 -0.2624 0.965 593.7211 142.2337)" class="st1 st4 st18">n</text>
    <text transform="matrix(0.9505 0.3109 -0.3109 0.9505 607.5886 145.8486)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8869 0.462 -0.462 0.8869 636.9741 153.1126)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8224 0.5689 -0.5689 0.8224 709.9958 193.8311)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8153 0.579 -0.579 0.8153 714.8213 197.1436)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.8081 0.5891 -0.5891 0.8081 719.5208 200.4649)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.778 0.6282 -0.6282 0.778 724.3011 203.7469)" class="st1 st4 st19">M</text>
    <text transform="matrix(0.7463 0.6656 -0.6656 0.7463 742.788 218.8038)" class="st1 st4 st18">e</text>
    <text transform="matrix(0.7214 0.6925 -0.6925 0.7214 751.8728 226.8937)" class="st1 st4 st18">r</text>
    <text transform="matrix(0.7044 0.7098 -0.7098 0.7044 759.2154 233.9581)" class="st1 st4 st19">c</text>
    <text transform="matrix(0.6781 0.7349 -0.7349 0.6781 766.9832 241.6001)" class="st1 st4 st18">u</text>
    <text transform="matrix(0.6511 0.759 -0.759 0.6511 776.6816 252.1124)" class="st1 st4 st19">r</text>
    <text transform="matrix(0.6326 0.7745 -0.7745 0.6326 783.8463 260.5277)" class="st1 st4 st19">y</text>
    <text transform="matrix(0.5555 0.8315 -0.8315 0.5555 792.0252 269.0602)" class="st1 st4 st18"> </text>
    <text transform="matrix(0.4842 0.875 -0.875 0.4842 822.0161 316.1431)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.4632 0.8863 -0.8863 0.4632 824.8828 321.1653)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.4526 0.8917 -0.8917 0.4526 827.5679 326.3278)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.4419 0.8971 -0.8971 0.4419 830.1996 331.4892)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.4204 0.9074 -0.9074 0.4204 832.7001 336.7891)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.4095 0.9123 -0.9123 0.4095 835.1802 341.9585)" class="st1 st4 st19"> </text>
    <text transform="matrix(0.3766 0.9264 -0.9264 0.3766 837.5999 347.2745)" class="st1 st4 st19">V</text>
    <text transform="matrix(0.3432 0.9393 -0.9393 0.3432 843.5616 361.8331)" class="st1 st4 st19">e</text>
    <text transform="matrix(0.3092 0.951 -0.951 0.3092 847.7621 373.1265)" class="st1 st4 st18">n</text>
    <text transform="matrix(0.2748 0.9615 -0.9615 0.2748 852.1361 386.6055)" class="st1 st4 st19">u</text>
    <text transform="matrix(0.2399 0.9708 -0.9708 0.2399 855.9261 400.3285)" class="st1 st4 st18">s</text>
    <text transform="matrix(0.1327 0.9912 -0.9912 0.1327 859.966 409.7405)" class="st1 st4 st19"> </text>
    <text transform="matrix(-0.0766 0.9971 -0.9971 -0.0766 869.7714 475.7939)" class="st1 st4 st19"> </text>
    <line class="st21" x1="508.69" y1="53.08" x2="508.69" y2="484.13"/>
    <line class="st22" x1="510.63" y1="485.91" x2="510.63" y2="882.29"/>
    <line class="st22" x1="508.67" y1="485.91" x2="508.67" y2="882.29"/>
    <line class="st22" x1="506.76" y1="485.91" x2="506.76" y2="882.29"/>
    <line class="st22" x1="902.74" y1="489.52" x2="115.17" y2="489.52"/>
    <line class="st22" x1="902.74" y1="487.56" x2="115.17" y2="487.56"/>
    <line class="st22" x1="902.74" y1="485.65" x2="115.17" y2="485.65"/>
    <line class="st22" x1="727.22" y1="154.7" x2="295.66" y2="819.23"/>
    <line class="st22" x1="725.57" y1="153.63" x2="294.02" y2="818.16"/>
    <line class="st22" x1="723.97" y1="152.59" x2="292.42" y2="817.12"/>
    <line class="st22" x1="506.49" y1="488.61" x2="161.52" y2="293.44"/>
    <line class="st22" x1="507.45" y1="486.91" x2="162.49" y2="291.74"/>
    <line class="st22" x1="508.4" y1="485.24" x2="163.43" y2="290.07"/>
    <line class="st23" x1="852.34" y1="681.69" x2="789.51" y2="646.14"/>
    <line class="st22" x1="706.4" y1="827.09" x2="306.3" y2="147.86"/>
    <line class="st22" x1="708.09" y1="826.1" x2="307.99" y2="146.87"/>
    <line class="st22" x1="709.74" y1="825.12" x2="309.64" y2="145.9"/>
    <line class="st21" x1="126.74" y1="686.47" x2="510.35" y2="486.78"/>
    <g class="st1">
      <defs>
        <rect id="SVGID_00000002382266988183949110000016753546641174240406_" x="18" width="981.74" height="981.74"/>
      </defs>
      <clipPath id="SVGID_00000151513661259268914770000018362601332946051753_">
        <use xlink:href="#SVGID_00000002382266988183949110000016753546641174240406_"  style="overflow:visible;"/>
      </clipPath>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M638.25,161.74
        c8.91,0.03,16.15-7.1,16.31-15.97c0.17-9.28-7.27-16.63-16.3-16.61c-8.96,0.01-16.13,7.16-16.28,16.01
        C621.83,154.53,629.41,161.77,638.25,161.74 M638.3,126.01c10.82,0,19.57,8.85,19.53,19.63c-0.04,10.74-8.82,19.54-19.69,19.48
        c-10.69-0.05-19.41-8.82-19.43-19.54C618.7,134.79,627.48,125.97,638.3,126.01"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M638.28,141.11
        c2.38,0,4.34,1.94,4.36,4.31c0.01,2.4-1.97,4.41-4.36,4.38c-2.42-0.02-4.33-1.92-4.35-4.35
        C633.89,143.07,635.88,141.11,638.28,141.11"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M445.59,111.57
        c6.88,3.57,10.59,8.73,10.92,15.68c-0.08,6.96-3.61,12.25-10.3,16.02c5.96,0.29,12.95-2.17,16.82-8.04
        c3.7-5.61,3.15-12.65-1.45-17.63C457.51,113.19,452.13,111.27,445.59,111.57 M447.86,145.56c-2.46,0.03-4.48-0.19-6.46-0.67
        c-0.62-0.15-1-0.55-1.03-1.06c-0.03-0.5,0.32-0.96,0.93-1.13c1.98-0.59,3.82-1.42,5.46-2.54c3.17-2.15,5.31-4.91,6.43-8.26
        c0.63-1.88,0.84-3.8,0.63-5.74c-0.39-3.65-2.02-6.82-4.9-9.48c-2.22-2.05-4.89-3.46-7.98-4.27c-0.6-0.16-1.03-0.43-1.11-1
        c-0.07-0.5,0.22-1.01,0.76-1.17c0.78-0.23,1.58-0.43,2.39-0.59c1.32-0.26,2.67-0.39,4.02-0.39c4.88-0.01,9.28,1.24,13.12,3.87
        c3.82,2.62,6.28,6.01,7.41,10.12c0.46,1.69,0.61,3.41,0.49,5.14c-0.26,3.89-1.81,7.35-4.62,10.39c-2.58,2.79-5.86,4.74-9.77,5.88
        C451.61,145.23,449.56,145.52,447.86,145.56"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M810.96,290.65
        c4.21,0.03,7.74-3.36,7.78-7.69c0.04-4.38-3.49-7.82-7.75-7.83c-4.28-0.01-7.61,3.38-7.78,7.39
        C803,287.14,806.75,290.69,810.96,290.65 M812.19,298.83v1.84c0,0.51-0.41,0.92-0.92,0.92h-0.69c-0.44,0-0.8-0.36-0.8-0.8v-1.95
        c0-0.03-0.03-0.06-0.06-0.06h-1.94c-0.47,0-0.86-0.38-0.86-0.86v-0.6c0-0.54,0.44-0.98,0.98-0.98h1.79c0.03,0,0.06-0.03,0.06-0.06
        v-3.16c0-0.03-0.02-0.05-0.05-0.06c-4.48-0.84-7.42-3.37-8.66-7.8c0,0,0,0,0-0.01c-0.95-5.08,0.93-8.85,5.25-11.49
        c0.04-0.02,0.04-0.08,0-0.1c-2.08-1.39-3.38-3.3-3.88-5.72c-0.1-0.46,0.24-0.9,0.7-0.94l0.61-0.06c0.58-0.06,1.01,0.27,1.13,0.75
        c0.34,1.39,1.04,2.55,2.13,3.45c1.35,1.1,3.1,1.64,4.83,1.43c2.68-0.33,4.78-2.25,5.43-4.79c0.13-0.53,0.64-0.87,1.18-0.82
        l0.31,0.03c0.65,0.06,1.04,0.63,0.91,1.22c-0.53,2.33-1.84,4.16-3.88,5.51c-0.04,0.03-0.04,0.08,0,0.1
        c4.32,2.71,6.17,6.52,5.12,11.62c0,0,0,0,0,0.01c-1.28,4.33-4.2,6.8-8.61,7.62c-0.03,0-0.05,0.03-0.05,0.06v3.15
        c0,0.03,0.03,0.06,0.06,0.06h1.65c0.6,0,1.09,0.49,1.09,1.09v0.24c0,0.61-0.5,1.11-1.11,1.11h-1.65
        C812.21,298.77,812.19,298.79,812.19,298.83"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M880.9,437.97
        c0.01-5.78-4.64-10.47-10.4-10.48c-5.86-0.01-10.37,4.69-10.5,10.18c-0.14,5.98,4.69,10.65,10.32,10.72
        C876.21,448.45,880.94,443.65,880.9,437.97 M864.15,460.16v-2.93c0-0.2,0.16-0.36,0.36-0.36h3.89c0.2,0,0.36-0.16,0.36-0.36v-3.93
        c0-0.54-0.38-1-0.91-1.11c-7.4-1.44-11.8-8.35-11.09-14.92c0.79-7.3,6.99-12.44,13.84-12.36c6.95,0.08,12.63,5.29,13.51,11.91
        c0.99,7.49-4.17,14.17-11.3,15.41c-0.42,0.07-0.72,0.45-0.72,0.88v4.09c0,0.2,0.16,0.36,0.36,0.36h3.89c0.2,0,0.36,0.16,0.36,0.36
        v2.94c-0.11,0-0.89,0.02-1.01,0.02c-1.32,0-1.98,0-3.3-0.01c-0.24,0-0.33,0.06-0.33,0.32c0.01,1.42,0.01,2.49,0.01,3.92
        c0,0.11,0,0.57,0,0.71c0.01,0.44-3.3,0.4-3.3,0c0-0.12,0-0.73,0-0.83c0-1.42-0.01-2.34,0.01-3.76c0-0.29-0.1-0.35-0.36-0.35"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M864.25,551.82
        c6.01,0,10.75-4.8,10.73-10.89c-0.02-5.68-4.87-10.57-10.7-10.57c-5.92,0-10.73,4.8-10.76,10.66
        C853.48,547.02,858.37,551.86,864.25,551.82 M880.08,522.86H875v-3.33h10.81v10.79h-3.32v-4.97c-2.37,2.37-4.73,4.73-7.11,7.11
        c0.19,0.27,0.43,0.59,0.65,0.93c1.25,1.89,2.01,3.97,2.22,6.22c0.39,4.05-0.73,7.65-3.39,10.74c-2.14,2.48-4.84,4.04-8.05,4.6
        c-4.37,0.76-8.31-0.27-11.72-3.15c-2.45-2.07-4.02-4.71-4.64-7.86c-0.83-4.21,0.05-8.07,2.68-11.48c2.06-2.67,4.77-4.38,8.06-5.09
        c4.19-0.9,8.03-0.04,11.5,2.48c0.15,0.11,0.25,0.19,0.43,0.01c2.25-2.27,4.51-4.52,6.76-6.78
        C879.94,523.03,879.98,522.98,880.08,522.86"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M787.38,712.18
        l0.01-0.85c0.01-0.54,0.46-0.96,0.99-0.95c0.17,0,0.34,0,0.51,0c1.95-0.07,3.7-0.71,5.23-1.89c2.33-1.79,3.77-4.16,4.62-6.9
        c0.46-1.5,0.68-3.07,0.52-4.63c-0.15-1.39-0.57-2.68-1.63-3.71c-0.95-0.93-2.12-1.33-3.44-1.35c-2.23-0.03-4.62,1.91-5.1,3.92
        c-0.2,0.82-0.13,1.62,0.15,2.41c0.07,0.2,0.18,0.39,0.33,0.53c0.3,0.3,0.45,0.73,0.45,1.16l-0.01,0.81
        c-0.01,0.54-0.56,0.95-1.06,0.75c0,0,0,0-0.01,0c-1.79-0.71-2.5-2.38-2.61-4.43c-0.09-1.61,0.44-3.2,1.43-4.47
        c1.3-1.68,2.96-2.82,5.04-3.22c2.28-0.44,4.37,0.06,6.19,1.51c1.62,1.29,2.46,3.03,2.84,5.03c0.2,1.07,0.23,2.14,0.14,3.21
        c-0.16,1.96-0.71,3.83-1.54,5.61c-0.81,1.74-1.86,3.31-3.23,4.67c-0.32,0.32-0.67,0.63-1.03,0.95c-0.08,0.07-0.03,0.21,0.07,0.21
        l8.43,0.15c0.07,0,0.12-0.05,0.12-0.12l0.33-19.14c0.01-0.8,0.67-1.43,1.47-1.42c0.7,0.01,1.25,0.59,1.24,1.28l-0.34,19.34
        c0,0.07,0.05,0.12,0.12,0.12l2.64,0.05c0.42,0.01,0.75,0.35,0.74,0.77c-0.02,1.07-0.9,1.92-1.97,1.9l-1.46-0.03
        c-0.07,0-0.12,0.05-0.12,0.12l-0.09,4.94c-0.01,0.64-0.54,1.16-1.19,1.14l-0.45-0.01c-0.6-0.01-1.07-0.5-1.06-1.1l0.09-5.02
        c0-0.07-0.05-0.12-0.12-0.12l-16.37-0.29C787.77,713.1,787.37,712.68,787.38,712.18"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M644.63,832
        l-2.23,0.04c-0.18,0-0.34-0.14-0.34-0.33l-0.33-19.01c0-0.18-0.16-0.33-0.34-0.33l-2.27,0.04c-0.19,0-0.34-0.14-0.34-0.33
        l-0.03-1.92c0-0.19,0.14-0.34,0.33-0.34l2.25-0.04c0.18,0,0.33-0.16,0.33-0.34l-0.04-2.15c0-0.18,0.14-0.33,0.33-0.34l1.92-0.03
        c0.18,0,0.34,0.14,0.34,0.33l0.04,2.13c0,0.18,0.16,0.33,0.34,0.33l4.18-0.07c0.19,0,0.34,0.14,0.34,0.33l0.03,1.94
        c0,0.18-0.14,0.33-0.33,0.34l-4.16,0.07c-0.18,0-0.33,0.16-0.33,0.34l0.06,3.41c0,0.28,0.33,0.43,0.55,0.25
        c0.43-0.36,0.94-0.7,2.14-1.27c0.9-0.43,1.86-0.73,2.85-0.84c1.49-0.17,2.92,0.02,4.23,0.89c1.25,0.84,2.05,2.02,2.6,3.4
        c0.56,1.42,0.8,2.91,0.71,4.43c-0.21,3.47-1.42,6.53-3.79,9.1c-0.78,0.84-1.46,1.75-1.82,2.86c-0.16,0.49-0.26,1-0.16,1.52
        c0.09,0.49,0.72,1.03,1.22,1.04c0.11,0,0.25-0.04,0.34-0.11c0.34-0.27,0.67-0.56,1-0.86c0.13-0.12,0.23-0.26,0.35-0.39l1.16,1.13
        c0.4,0.39,0.4,1.03,0.01,1.41c-0.64,0.63-1.33,1.19-2.28,1.37c-1,0.2-1.91-0.13-2.73-0.7c-1.23-0.87-1.79-2.05-1.69-3.57
        c0.13-1.9,0.98-3.47,2.17-4.88c0.74-0.87,1.53-1.69,2.08-2.71c0.77-1.44,1.3-2.96,1.48-4.59c0.2-1.76-0.02-3.45-0.91-5
        c-0.56-0.97-1.37-1.66-2.52-1.78c-0.93-0.1-1.85,0.05-2.74,0.37c-1.72,0.62-2.92,1.82-3.86,3.34c-0.25,0.41-0.33,0.82-0.31,1.29
        c0.07,3.32,0.12,6.65,0.18,9.97C644.64,831.83,644.63,831.91,644.63,832"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M452.11,858.59
        c1.7-0.03,3.02-1.4,2.98-3.09c-0.03-1.69-1.41-3-3.11-2.97c-1.66,0.03-2.99,1.42-2.95,3.11
        C449.07,857.3,450.44,858.62,452.11,858.59 M450.31,841.95l-3.02,0.05c-0.07,0-0.13,0.05-0.14,0.12
        c-0.56,3.13-2.18,5.53-4.97,7.13c-1.23,0.71-2.56,1.09-3.97,1.22c-0.35,0.03-0.66-0.24-0.66-0.6l-0.03-1.83
        c0-0.3,0.22-0.57,0.53-0.6c1.83-0.2,3.38-0.99,4.58-2.44c1.18-1.41,1.68-3.05,1.56-4.88c-0.2-3.11-2.75-6.04-6.32-6.31
        c-0.34-0.03-0.6-0.3-0.61-0.65l-0.03-1.8c-0.01-0.33,0.27-0.59,0.6-0.57c2.18,0.11,4.14,0.84,5.84,2.26
        c1.82,1.52,2.95,3.45,3.41,5.78c0.01,0.07,0.07,0.12,0.14,0.12l2.89-0.05c0.08,0,0.14-0.07,0.14-0.15l-0.12-6.65
        c-0.01-0.43,0.33-0.78,0.76-0.79l1.54-0.03c0.39-0.01,0.72,0.3,0.72,0.7l0.12,6.72c0,0.08,0.07,0.14,0.15,0.14l2.89-0.05
        c0.07,0,0.13-0.05,0.14-0.12c0.49-2.88,1.94-5.17,4.39-6.79c1.13-0.76,2.29-1.18,3.36-1.39c0.95-0.19,1.85,0.53,1.86,1.51
        c0.01,0.71-0.49,1.32-1.19,1.46c-1.89,0.38-3.4,1.42-4.49,3.16c-0.81,1.28-1.12,2.7-0.97,4.2c0.31,3.07,2.61,5.53,5.61,6.07
        c0.75,0.13,1.31,0.75,1.32,1.51l0,0.18c0.01,0.8-0.68,1.44-1.47,1.34c-1.83-0.25-3.48-0.96-4.96-2.18
        c-1.83-1.52-2.94-3.45-3.41-5.77c-0.01-0.07-0.07-0.12-0.14-0.12l-3.04,0.05c0,0.08,0,0.16,0,0.24c0.04,2.44,0.09,4.87,0.12,7.31
        c0,0.19,0.07,0.26,0.25,0.31c2.43,0.74,3.91,2.37,4.34,4.86c0.55,3.2-1.56,6.23-4.71,6.89c-3.37,0.7-6.63-1.48-7.24-4.83
        c-0.55-3.02,1.51-6.05,4.44-6.95"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M287.71,782.17
        c-0.97-0.12-1.92-0.19-2.84-0.36c-1.43-0.26-2.76-0.81-3.9-1.81c-1.28-1.13-2.05-2.6-2.53-4.27c-0.58-1.99-0.76-4.04-0.73-6.11
        c0.02-1.66,0.14-3.31,0.22-4.97c0.01-0.28,0.04-0.57,0.07-0.92l-1.42,1.18c-0.24,0.2-0.6,0.16-0.79-0.1l-0.89-1.21
        c-0.2-0.27-0.15-0.65,0.1-0.86l4.25-3.56c0.33-0.28,0.81-0.21,1.06,0.15l3.32,4.67c0.18,0.25,0.13,0.6-0.1,0.79l-1.18,0.95
        c-0.25,0.2-0.61,0.15-0.81-0.12l-0.97-1.36c-0.06,0.72-0.13,1.36-0.15,1.99c-0.05,1.49-0.11,2.98-0.08,4.47
        c0.04,1.69,0.25,3.36,0.85,4.95c0.69,1.82,1.95,2.92,3.72,3.31c0.86,0.19,1.75,0.24,2.62,0.35c0.04,0.01,0.09,0,0.15,0l-0.21-12.1
        c0-0.02-0.02-0.03-0.03-0.01l-1.09,1.11c-0.3,0.3-0.77,0.31-1.07,0.01l-0.88-0.87c-0.24-0.24-0.26-0.64-0.03-0.9
        c1.26-1.44,2.5-2.87,3.75-4.3c0.24-0.28,0.65-0.29,0.9-0.02l3.97,4.13c0.21,0.22,0.21,0.59,0,0.81l-1.03,1.09
        c-0.21,0.23-0.56,0.23-0.77-0.01l-0.98-1.08c-0.05,0.02-0.05,0.02-0.1,0.04l0.21,12.07c0.43-0.05,0.85-0.09,1.27-0.14
        c0.84-0.11,1.67-0.31,2.45-0.67c1.46-0.68,2.31-1.91,2.76-3.49c0.33-1.15,0.5-2.33,0.51-3.52c0.01-1.39-0.01-2.78-0.08-4.17
        c-0.05-1.01-0.2-2.02-0.36-3.06c-0.32,0.47-0.65,0.95-0.98,1.43c-0.18,0.27-0.53,0.33-0.78,0.13l-1.22-0.94
        c-0.24-0.18-0.29-0.54-0.12-0.79c1.12-1.65,2.23-3.29,3.35-4.94c0.17-0.25,0.5-0.3,0.72-0.12c1.53,1.22,3.04,2.43,4.57,3.66
        c0.23,0.18,0.28,0.53,0.1,0.77l-0.93,1.32c-0.17,0.24-0.5,0.29-0.72,0.11l-1.39-1.11c0.09,0.79,0.1,0.84,0.26,2.5
        c0.13,1.34,0.2,2.7,0.2,4.05c-0.01,1.88-0.15,3.74-0.68,5.54c-0.88,2.98-2.75,4.86-5.58,5.66c-1.03,0.29-2.07,0.44-3.13,0.51
        c-0.06,0-0.12,0.01-0.19,0.01c0.02,1.3,0.05,2.59,0.07,3.9l4.19-0.07c0.32-0.01,0.58,0.27,0.59,0.6l0.03,1.56
        c0,0.31-0.23,0.57-0.53,0.58l-4.24,0.07c0,0.15,0,0.26,0.01,0.38c0.03,1.53,0.04,2.89,0.08,4.42c0,0.23-0.21,0.48-0.43,0.48
        c-0.68,0-1.03,0-1.7,0.03c-0.22,0.01-0.46-0.23-0.46-0.5c-0.01-1.54-0.05-2.88-0.08-4.42c0-0.1,0-0.2,0-0.33l-4.08,0.07
        c-0.4,0.01-0.72-0.33-0.73-0.75l-0.02-1.23c-0.01-0.41,0.3-0.75,0.69-0.76l4.08-0.07L287.71,782.17z"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M175.21,626.65h-5.35
        c-0.96-0.04-0.96-0.04-0.93,0.94v6.41c-0.18,0-0.32,0-0.47,0c-0.78,0-1.56,0-2.33,0c-0.45,0-0.45,0-0.45-0.43
        c0-2.17,0-4.35,0-6.52v-0.4h-6.28c-0.52,0-0.93-0.42-0.93-0.94v-1.33c0-0.52,0.42-0.94,0.93-0.94h6.26
        c0.07-0.02,0.05-0.28,0.05-0.37c0-2.09-0.03-4.14-0.03-6.24c0-0.27-0.07-0.34-0.35-0.38c-3.05-0.43-5.74-1.66-8.02-3.75
        c-2.46-2.25-4.02-5.03-4.65-8.31c-0.17-0.84-0.26-1.24-0.24-2.21c0.01-0.67,0.3-0.59,0.32-0.66l2.06,0.01
        c0.43,0,0.79,0.33,0.83,0.76c0.29,3.58,1.84,6.54,4.79,8.76c2.3,1.73,4.91,2.45,7.76,2.25c5.45-0.38,10.37-4.82,10.83-10.9
        c0.04-0.49,0.44-0.87,0.93-0.87h1.32c0.54,0,0.97,0.47,0.93,1.01c-0.23,3.41-1.47,6.42-3.77,9.02c-2.35,2.65-5.27,4.24-8.71,4.83
        c-0.44,0.08-0.75,0.47-0.75,0.91v5.16c-0.01,1.03-0.01,0.94,0.93,0.94h5.32c0.52,0,0.93,0.42,0.93,0.94v1.35
        C176.14,626.23,175.73,626.65,175.21,626.65"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M167.38,607.66
        c3.33,0.04,6.16-2.74,6.16-6.18c0-3.39-2.64-6.23-6.16-6.23c-3.5,0-6.13,2.81-6.15,6.2C161.23,604.94,164.09,607.69,167.38,607.66
         M158.01,601.47c0.03-5.38,4.35-9.46,9.35-9.47c5.01-0.02,9.43,4.07,9.4,9.52c-0.03,5.21-4.13,9.4-9.37,9.4
        C162.16,610.92,158.07,606.72,158.01,601.47"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M177,348.09v-24.71
        c0-0.52-0.6-0.78-0.95-0.41l-9.64,10.06c-0.2,0.21-0.53,0.23-0.75,0.03l-0.7-0.63c-0.25-0.22-0.26-0.61-0.03-0.85l12.66-13.36
        c0.22-0.23,0.57-0.23,0.79,0l12.69,13.38c0.23,0.24,0.21,0.63-0.03,0.85l-0.67,0.6c-0.22,0.2-0.55,0.18-0.76-0.03
        c-3.2-3.36-6.39-6.7-9.6-10.07c-0.35-0.36-0.95-0.11-0.95,0.41l0,0.78c0,8.65,0,15.24,0,23.97c0,0.32-0.25,0.58-0.56,0.58h-0.94
        C177.24,348.68,177,348.41,177,348.09"/>
      <path style="clip-path:url(#SVGID_00000151513661259268914770000018362601332946051753_);fill:#1D1D1B;" d="M299.36,173.38v24.71
        c0,0.52,0.6,0.78,0.95,0.41l9.64-10.06c0.2-0.21,0.53-0.23,0.75-0.03l0.7,0.63c0.25,0.22,0.26,0.61,0.03,0.85l-12.66,13.36
        c-0.22,0.23-0.57,0.23-0.79,0l-12.69-13.38c-0.23-0.24-0.21-0.63,0.03-0.85l0.67-0.6c0.22-0.2,0.55-0.18,0.76,0.03
        c3.2,3.36,6.39,6.7,9.6,10.07c0.35,0.37,0.95,0.11,0.95-0.41l0-0.78c0-8.65,0-15.24,0-23.97c0-0.32,0.25-0.58,0.56-0.58h0.94
        C299.12,172.8,299.36,173.06,299.36,173.38"/>
    </g>
    <line class="st21" x1="882.26" y1="698.93" x2="506.78" y2="486.5"/>
    <line class="st22" x1="508.99" y1="485.99" x2="858.93" y2="303.82"/>
    <line class="st22" x1="509.89" y1="487.73" x2="859.84" y2="305.56"/>
    <line class="st22" x1="510.78" y1="489.42" x2="860.72" y2="307.25"/>
  </g>
  <g id="Layer_2" class="st0">
    <g class="st1">
      <defs>
        <rect id="SVGID_00000116222850312225538220000008271511005532767149_" x="-1" y="1" width="997" height="997"/>
      </defs>
      <clipPath id="SVGID_00000176750997851600557850000015394361327414912677_">
        <use xlink:href="#SVGID_00000116222850312225538220000008271511005532767149_"  style="overflow:visible;"/>
      </clipPath>
      
        <circle style="clip-path:url(#SVGID_00000176750997851600557850000015394361327414912677_);fill:none;stroke:#000000;stroke-width:1.914;" cx="497.5" cy="499.5" r="495.71"/>
      
        <circle style="clip-path:url(#SVGID_00000176750997851600557850000015394361327414912677_);fill:none;stroke:#1D1D1B;stroke-width:6;" cx="498.02" cy="502.67" r="411.6"/>
    </g>
    <text transform="matrix(0.1262 0.992 -0.992 0.1262 31.5035 548.0504)" class="st1 st4 st27">P</text>
    <text transform="matrix(0.163 0.9866 -0.9866 0.163 34.1542 568.7638)" class="st1 st4 st28">l</text>
    <text transform="matrix(0.1874 0.9823 -0.9823 0.1874 35.5896 577.6464)" class="st1 st4 st27">u</text>
    <text transform="matrix(0.2236 0.9747 -0.9747 0.2236 39.0638 595.93)" class="st1 st4 st27">t</text>
    <text transform="matrix(0.2474 0.9689 -0.9689 0.2474 41.5492 606.7338)" class="st1 st4 st29">o</text>
    <text transform="matrix(0.2711 0.9626 -0.9626 0.2711 46.022 624.0605)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.2945 0.9556 -0.9556 0.2945 48.0805 631.2849)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.3177 0.9482 -0.9482 0.3177 50.2352 638.5128)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.3292 0.9443 -0.9443 0.3292 54.1892 650.2299)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.4405 0.8978 -0.8978 0.4405 54.1905 658.5715)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.5345 0.8452 -0.8452 0.5345 98.971 744.8696)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.5644 0.8255 -0.8255 0.5644 103.1791 751.7247)" class="st1 st4 st27">N</text>
    <text transform="matrix(0.6031 0.7977 -0.7977 0.6031 117.9556 773.2099)" class="st1 st4 st28">e</text>
    <text transform="matrix(0.6312 0.7756 -0.7756 0.6312 127.4441 785.9974)" class="st1 st4 st30">p</text>
    <text transform="matrix(0.6496 0.7603 -0.7603 0.6496 139.3904 800.6343)" class="st1 st4 st27">t</text>
    <text transform="matrix(0.6764 0.7366 -0.7366 0.6764 146.8122 809.3079)" class="st1 st4 st27">u</text>
    <text transform="matrix(0.7023 0.7118 -0.7118 0.7023 159.4518 822.9501)" class="st1 st4 st27">n</text>
    <text transform="matrix(0.7357 0.6773 -0.6773 0.7357 172.6931 836.2006)" class="st1 st4 st28">e</text>
    <text transform="matrix(0.7517 0.6595 -0.6595 0.7517 184.2699 847.0045)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.7975 0.6033 -0.6033 0.7975 189.354 852.7848)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8459 0.5333 -0.5333 0.8459 245.0919 893.2388)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.8524 0.5229 -0.5229 0.8524 251.5358 897.2307)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.865 0.5018 -0.5018 0.865 258.0116 901.1432)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8711 0.4912 -0.4912 0.8711 264.5181 905.0188)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.877 0.4804 -0.4804 0.877 271.1776 908.6831)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.8886 0.4587 -0.4587 0.8886 277.7851 912.3771)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.8942 0.4476 -0.4476 0.8942 284.5084 915.7599)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.9102 0.4141 -0.4141 0.9102 291.2873 919.3732)" class="st1 st4 st28">U</text>
    <text transform="matrix(0.9251 0.3798 -0.3798 0.9251 314.0804 929.6262)" class="st1 st4 st27">r</text>
    <text transform="matrix(0.9386 0.3449 -0.3449 0.9386 326.4411 934.6406)" class="st1 st4 st29">a</text>
    <text transform="matrix(0.951 0.3093 -0.3093 0.951 341.5428 940.3713)" class="st1 st4 st27">n</text>
    <text transform="matrix(0.962 0.2732 -0.2732 0.962 359.1041 946.1307)" class="st1 st4 st28">u</text>
    <text transform="matrix(0.9716 0.2366 -0.2366 0.9716 376.9295 951.1717)" class="st1 st4 st27">s</text>
    <text transform="matrix(0.9846 0.1747 -0.1747 0.9846 389.4464 954.9242)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.9999 0.0112 -0.0112 0.9999 440.9372 966.1556)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.9935 -0.1138 0.1138 0.9935 545.7693 964.2353)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.9904 -0.1385 0.1385 0.9904 553.2224 963.4972)" class="st1 st4 st28">S</text>
    <text transform="matrix(0.9845 -0.1752 0.1752 0.9845 571.0927 961.0082)" class="st1 st4 st27">a</text>
    <text transform="matrix(0.9799 -0.1995 0.1995 0.9799 586.9069 958.1279)" class="st1 st4 st27">t</text>
    <text transform="matrix(0.9719 -0.2355 0.2355 0.9719 598.2083 955.8309)" class="st1 st4 st28">u</text>
    <text transform="matrix(0.9626 -0.2711 0.2711 0.9626 616.238 951.5035)" class="st1 st4 st28">r</text>
    <text transform="matrix(0.952 -0.3061 0.3061 0.952 629.6779 947.734)" class="st1 st4 st27">n</text>
    <text transform="matrix(0.9482 -0.3177 0.3177 0.9482 647.416 941.9219)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.9443 -0.3292 0.3292 0.9443 648.0129 941.7262)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.9402 -0.3406 0.3406 0.9402 655.1163 939.297)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.9317 -0.3633 0.3633 0.9317 662.2809 936.6239)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.9272 -0.3745 0.3745 0.9272 669.3721 933.8688)" class="st1 st4 st30"> </text>
    <text transform="matrix(0.9179 -0.3968 0.3968 0.9179 676.3792 931.0869)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.913 -0.4078 0.4078 0.913 683.3118 928.0795)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.9081 -0.4188 0.4188 0.9081 690.331 925.0372)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.8978 -0.4405 0.4405 0.8978 697.1882 921.8538)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8924 -0.4513 0.4513 0.8924 703.948 918.5807)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.8869 -0.4619 0.4619 0.8869 710.7153 915.0931)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8756 -0.483 0.483 0.8756 717.4923 911.602)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8698 -0.4935 0.4935 0.8698 724.148 907.9053)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8638 -0.5039 0.5039 0.8638 730.6857 904.204)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8515 -0.5243 0.5243 0.8515 737.2303 900.4347)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.8452 -0.5345 0.5345 0.8452 743.6343 896.398)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.8388 -0.5445 0.5445 0.8388 750.1227 892.3895)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8255 -0.5644 0.5644 0.8255 756.5173 888.2667)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.8187 -0.5742 0.5742 0.8187 762.7377 883.9797)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.8118 -0.5839 0.5839 0.8118 768.9312 879.6628)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.7977 -0.6031 0.6031 0.7977 775.08 875.1364)" class="st1 st4 st28">J</text>
    <text transform="matrix(0.7756 -0.6312 0.6312 0.7756 784.5693 868.1401)" class="st1 st4 st30">u</text>
    <text transform="matrix(0.7525 -0.6586 0.6586 0.7525 798.9708 856.3688)" class="st1 st4 st30">p</text>
    <text transform="matrix(0.7284 -0.6851 0.6851 0.7284 813.173 843.8467)" class="st1 st4 st27">i</text>
    <text transform="matrix(0.7118 -0.7023 0.7023 0.7118 820.0676 837.4355)" class="st1 st4 st27">t</text>
    <text transform="matrix(0.6948 -0.7192 0.7192 0.6948 828.0818 829.7282)" class="st1 st4 st28">e</text>
    <text transform="matrix(0.6685 -0.7438 0.7438 0.6685 839.0933 818.3232)" class="st1 st4 st28">r</text>
    <text transform="matrix(0.6033 -0.7975 0.7975 0.6033 849.3962 808.7625)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.5333 -0.8459 0.8459 0.5333 891.2245 751.2576)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.5229 -0.8524 0.8524 0.5229 895.2738 744.8021)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.5018 -0.865 0.865 0.5018 899.2397 738.3002)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.4912 -0.8711 0.8711 0.4912 903.006 731.8278)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.4804 -0.877 0.877 0.4804 906.7615 725.1713)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.4587 -0.8886 0.8886 0.4587 910.3605 718.5945)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.4476 -0.8942 0.8942 0.4476 913.8348 711.7628)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.4365 -0.8997 0.8997 0.4365 917.2 704.9904)" class="st1 st4 st29"> </text>
    <text transform="matrix(0.4141 -0.9102 0.9102 0.4141 920.602 698.2326)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.4027 -0.9153 0.9153 0.4027 923.7062 691.2631)" class="st1 st4 st28"> </text>
    <text transform="matrix(0.3682 -0.9297 0.9297 0.3682 926.9849 684.432)" class="st1 st4 st28">M</text>
    <text transform="matrix(0.3212 -0.947 0.947 0.3212 938.1868 655.1653)" class="st1 st4 st29">a</text>
    <text transform="matrix(0.2853 -0.9584 0.9584 0.2853 943.3663 639.8826)" class="st1 st4 st27">r</text>
    <text transform="matrix(0.2611 -0.9653 0.9653 0.2611 947.2737 626.5356)" class="st1 st4 st27">s</text>
    <text transform="matrix(0.1872 -0.9823 0.9823 0.1872 951.4412 614.0736)" class="st1 st4 st30"> </text>
    <text transform="matrix(0.0112 -0.9999 0.9999 0.0112 964.5175 555.5185)" class="st1 st4 st27"> </text>
    <text transform="matrix(0.0891 -0.996 0.996 0.0891 49.0051 477.3155)" class="st1 st4 st31">A</text>
    <text transform="matrix(0.1264 -0.992 0.992 0.1264 51.2616 454.2317)" class="st1 st4 st31">s</text>
    <text transform="matrix(0.1637 -0.9865 0.9865 0.1637 52.8628 441.825)" class="st1 st4 st32">c</text>
    <text transform="matrix(0.1885 -0.9821 0.9821 0.1885 55.0632 428.3799)" class="st1 st4 st33">e</text>
    <text transform="matrix(0.2256 -0.9742 0.9742 0.2256 57.9614 413.4893)" class="st1 st4 st32">n</text>
    <text transform="matrix(0.2624 -0.965 0.965 0.2624 62.1375 395.9081)" class="st1 st4 st32">d</text>
    <text transform="matrix(0.2988 -0.9543 0.9543 0.2988 67.0093 378.3467)" class="st1 st4 st31">a</text>
    <text transform="matrix(0.3349 -0.9423 0.9423 0.3349 71.6607 363.5526)" class="st1 st4 st33">n</text>
    <text transform="matrix(0.3704 -0.9289 0.9289 0.3704 77.7163 346.5691)" class="st1 st4 st31">t</text>
    <text transform="matrix(0.4396 -0.8982 0.8982 0.4396 80.954 335.9676)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.5166 -0.8562 0.8562 0.5166 110.4583 278.5822)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.5273 -0.8497 0.8497 0.5273 114.2631 272.3102)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.5586 -0.8294 0.8294 0.5586 118.0859 265.7567)" class="st1 st4 st32">D</text>
    <text transform="matrix(0.599 -0.8007 0.8007 0.599 131.5838 245.9283)" class="st1 st4 st33">e</text>
    <text transform="matrix(0.6186 -0.7857 0.7857 0.6186 140.8494 233.5212)" class="st1 st4 st34">c</text>
    <text transform="matrix(0.6471 -0.7624 0.7624 0.6471 149.2315 222.77)" class="st1 st4 st33">e</text>
    <text transform="matrix(0.6747 -0.7381 0.7381 0.6747 159.091 211.0812)" class="st1 st4 st34">n</text>
    <text transform="matrix(0.7012 -0.713 0.713 0.7012 171.2195 197.8585)" class="st1 st4 st33">d</text>
    <text transform="matrix(0.7267 -0.687 0.687 0.7267 184.08 184.8612)" class="st1 st4 st31">a</text>
    <text transform="matrix(0.7511 -0.6602 0.6602 0.7511 195.3401 174.1799)" class="st1 st4 st32">n</text>
    <text transform="matrix(0.7745 -0.6326 0.6326 0.7745 208.9388 162.4783)" class="st1 st4 st32">t</text>
    <text transform="matrix(0.7895 -0.6138 0.6138 0.7895 217.4813 155.4492)" class="st1 st4 st31"> </text>
    <text transform="matrix(0.818 -0.5752 0.5752 0.818 222.9163 150.6764)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.8446 -0.5355 0.5355 0.8446 254.7141 128.7592)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.8571 -0.5152 0.5152 0.8571 260.9046 124.9378)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.8632 -0.5049 0.5049 0.8632 267.1549 121.1031)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.8691 -0.4946 0.4946 0.8691 273.3777 117.4302)" class="st1 st4 st31"> </text>
    <text transform="matrix(0.8807 -0.4737 0.4737 0.8807 279.7747 113.8364)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.8863 -0.4632 0.4632 0.8863 286.1569 110.3556)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.8917 -0.4526 0.4526 0.8917 292.6075 107.0069)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.9023 -0.4312 0.4312 0.9023 299.1263 103.718)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.9074 -0.4204 0.4204 0.9074 305.6293 100.611)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.9123 -0.4095 0.4095 0.9123 312.278 97.4648)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.9308 -0.3655 0.3655 0.9308 318.7746 94.2762)" class="st1 st4 st31">M</text>
    <text transform="matrix(0.9472 -0.3206 0.3206 0.9472 346.6157 83.5239)" class="st1 st4 st31">o</text>
    <text transform="matrix(0.9581 -0.2863 0.2863 0.9581 363.1819 77.9689)" class="st1 st4 st33">o</text>
    <text transform="matrix(0.9708 -0.2399 0.2399 0.9708 379.6001 73.0182)" class="st1 st4 st31">n</text>
    <text transform="matrix(0.9856 -0.1688 0.1688 0.9856 396.9904 68.0938)" class="st1 st4 st31"> </text>
    <text transform="matrix(0.9999 0.0145 -0.0145 0.9999 450.8408 56.6246)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.9903 0.1389 -0.1389 0.9903 555.619 60.9842)" class="st1 st4 st31"> </text>
    <text transform="matrix(0.9885 0.1513 -0.1513 0.9885 562.8632 62.0362)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.9844 0.1761 -0.1761 0.9844 570.0424 63.1795)" class="st1 st4 st32">S</text>
    <text transform="matrix(0.977 0.2133 -0.2133 0.977 586.8009 66.1913)" class="st1 st4 st33">u</text>
    <text transform="matrix(0.965 0.2624 -0.2624 0.965 604.3054 69.9662)" class="st1 st4 st32">n</text>
    <text transform="matrix(0.9505 0.3109 -0.3109 0.9505 621.7055 74.4845)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.8869 0.462 -0.462 0.8869 658.5565 83.6121)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.8224 0.5689 -0.5689 0.8224 750.1296 134.6517)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.8153 0.579 -0.579 0.8153 756.1682 138.8095)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.8081 0.5891 -0.5891 0.8081 762.0727 142.9873)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.778 0.6282 -0.6282 0.778 768.0792 147.1051)" class="st1 st4 st33">M</text>
    <text transform="matrix(0.7463 0.6656 -0.6656 0.7463 791.2463 165.9728)" class="st1 st4 st32">e</text>
    <text transform="matrix(0.7214 0.6925 -0.6925 0.7214 802.64 176.118)" class="st1 st4 st32">r</text>
    <text transform="matrix(0.7044 0.7098 -0.7098 0.7044 811.864 184.9778)" class="st1 st4 st33">c</text>
    <text transform="matrix(0.6781 0.7349 -0.7349 0.6781 821.5917 194.571)" class="st1 st4 st32">u</text>
    <text transform="matrix(0.6511 0.759 -0.759 0.6511 833.7454 207.7501)" class="st1 st4 st32">r</text>
    <text transform="matrix(0.6326 0.7745 -0.7745 0.6326 842.7325 218.2945)" class="st1 st4 st32">y</text>
    <text transform="matrix(0.5555 0.8315 -0.8315 0.5555 852.9884 228.9934)" class="st1 st4 st31"> </text>
    <text transform="matrix(0.4842 0.875 -0.875 0.4842 890.613 288.0336)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.4632 0.8863 -0.8863 0.4632 894.1943 294.3471)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.4526 0.8917 -0.8917 0.4526 897.5598 300.8156)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.4419 0.8971 -0.8971 0.4419 900.8656 307.2953)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.4204 0.9074 -0.9074 0.4204 904.0104 313.921)" class="st1 st4 st32"> </text>
    <text transform="matrix(0.4095 0.9123 -0.9123 0.4095 907.1099 320.4304)" class="st1 st4 st33"> </text>
    <text transform="matrix(0.3766 0.9264 -0.9264 0.3766 910.1606 327.0858)" class="st1 st4 st32">V</text>
    <text transform="matrix(0.3432 0.9393 -0.9393 0.3432 917.6188 345.331)" class="st1 st4 st32">e</text>
    <text transform="matrix(0.3092 0.951 -0.951 0.3092 922.8863 359.5195)" class="st1 st4 st32">n</text>
    <text transform="matrix(0.2748 0.9615 -0.9615 0.2748 928.3732 376.4134)" class="st1 st4 st33">u</text>
    <text transform="matrix(0.2399 0.9708 -0.9708 0.2399 933.1396 393.6255)" class="st1 st4 st31">s</text>
    <text transform="matrix(0.1327 0.9912 -0.9912 0.1327 938.1884 405.4261)" class="st1 st4 st33"> </text>
    <text transform="matrix(-0.0766 0.9971 -0.9971 -0.0766 950.4935 488.2396)" class="st1 st4 st32"> </text>
    <g class="st1">
      <defs>
        <rect id="SVGID_00000130634061715164798170000005408958188852188293_" x="-1" y="1" width="997" height="997"/>
      </defs>
      <clipPath id="SVGID_00000127741311405407912000000001200787725600477574_">
        <use xlink:href="#SVGID_00000130634061715164798170000005408958188852188293_"  style="overflow:visible;"/>
      </clipPath>
      
        <line style="clip-path:url(#SVGID_00000127741311405407912000000001200787725600477574_);fill:none;stroke:#1D1D1B;stroke-width:6;" x1="497.69" y1="1" x2="497.69" y2="498.71"/>
      
        <line style="clip-path:url(#SVGID_00000127741311405407912000000001200787725600477574_);fill:none;stroke:#000000;stroke-width:0.334;" x1="500.12" y1="500.93" x2="500.12" y2="998"/>
      
        <line style="clip-path:url(#SVGID_00000127741311405407912000000001200787725600477574_);fill:none;stroke:#000000;stroke-width:0.334;" x1="497.67" y1="500.93" x2="497.67" y2="998"/>
      
        <line style="clip-path:url(#SVGID_00000127741311405407912000000001200787725600477574_);fill:none;stroke:#000000;stroke-width:0.334;" x1="495.27" y1="500.93" x2="495.27" y2="998"/>
    </g>
    <line class="st22" x1="991.83" y1="505.46" x2="4.2" y2="505.46"/>
    <line class="st22" x1="991.83" y1="503" x2="4.2" y2="503"/>
    <line class="st22" x1="991.83" y1="500.6" x2="4.2" y2="500.6"/>
    <line class="st22" x1="771.73" y1="85.59" x2="230.55" y2="918.92"/>
    <line class="st22" x1="769.66" y1="84.25" x2="228.49" y2="917.58"/>
    <line class="st22" x1="767.65" y1="82.94" x2="226.48" y2="916.28"/>
    <line class="st22" x1="494.93" y1="504.33" x2="62.34" y2="259.58"/>
    <line class="st22" x1="496.14" y1="502.19" x2="63.55" y2="257.44"/>
    <line class="st22" x1="497.32" y1="500.1" x2="64.73" y2="255.35"/>
    <line class="st23" x1="928.64" y1="746.44" x2="849.84" y2="701.86"/>
    <line class="st22" x1="745.62" y1="928.78" x2="243.9" y2="77.02"/>
    <line class="st22" x1="747.74" y1="927.53" x2="246.01" y2="75.77"/>
    <line class="st22" x1="749.8" y1="926.31" x2="248.08" y2="74.55"/>
    <line class="st21" x1="60.32" y1="730.78" x2="499.77" y2="502.02"/>
    <g class="st1">
      <defs>
        <rect id="SVGID_00000113324461595764445830000003317093193913472424_" x="-1" y="1" width="997" height="997"/>
      </defs>
      <clipPath id="SVGID_00000018228148072069755340000016523069391696212110_">
        <use xlink:href="#SVGID_00000113324461595764445830000003317093193913472424_"  style="overflow:visible;"/>
      </clipPath>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M660.16,94.42
        c11.17,0.03,20.25-8.91,20.45-20.02c0.21-11.64-9.12-20.85-20.45-20.83c-11.24,0.02-20.23,8.98-20.41,20.07
        C639.57,85.38,649.07,94.45,660.16,94.42 M660.23,49.61c13.57-0.01,24.54,11.09,24.49,24.62c-0.05,13.46-11.06,24.5-24.69,24.43
        c-13.41-0.06-24.35-11.06-24.36-24.51C635.65,60.62,646.66,49.57,660.23,49.61"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M660.19,68.55
        c2.99,0,5.45,2.43,5.46,5.41c0.02,3.01-2.47,5.53-5.47,5.5c-3.04-0.03-5.43-2.4-5.46-5.46C654.69,71.01,657.19,68.55,660.19,68.55
        "/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M418.56,31.51
        c8.63,4.47,13.28,10.95,13.69,19.66c-0.1,8.72-4.53,15.36-12.92,20.09c7.48,0.37,16.24-2.72,21.09-10.08
        c4.63-7.04,3.94-15.86-1.81-22.11C433.5,33.53,426.76,31.13,418.56,31.51 M421.41,74.13c-3.09,0.04-5.62-0.24-8.1-0.84
        c-0.77-0.19-1.26-0.69-1.3-1.33c-0.04-0.63,0.4-1.2,1.16-1.42c2.48-0.74,4.79-1.78,6.85-3.18c3.97-2.7,6.66-6.16,8.07-10.36
        c0.79-2.36,1.05-4.76,0.79-7.2c-0.49-4.57-2.53-8.55-6.15-11.89c-2.78-2.57-6.13-4.34-10.01-5.35c-0.75-0.2-1.29-0.53-1.4-1.25
        c-0.09-0.62,0.27-1.26,0.96-1.46c0.98-0.29,1.98-0.54,2.99-0.73c1.66-0.32,3.35-0.49,5.04-0.49c6.12-0.01,11.64,1.56,16.45,4.85
        c4.79,3.28,7.87,7.54,9.29,12.69c0.58,2.12,0.76,4.27,0.61,6.45c-0.33,4.87-2.27,9.22-5.8,13.02c-3.24,3.5-7.35,5.95-12.25,7.37
        C426.11,73.72,423.53,74.08,421.41,74.13"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M876.74,256.08
        c5.28,0.03,9.71-4.21,9.76-9.65c0.05-5.49-4.38-9.81-9.71-9.82c-5.36-0.01-9.54,4.24-9.76,9.27
        C866.76,251.68,871.46,256.12,876.74,256.08 M878.28,266.33v2.31c0,0.64-0.52,1.16-1.16,1.16h-0.87c-0.56,0-1.01-0.45-1.01-1.01
        v-2.45c0-0.04-0.03-0.08-0.08-0.08h-2.43c-0.59,0-1.08-0.48-1.08-1.08v-0.75c0-0.68,0.55-1.23,1.23-1.23h2.24
        c0.04,0,0.08-0.04,0.08-0.08v-3.96c0-0.03-0.03-0.07-0.06-0.07c-5.61-1.06-9.3-4.22-10.86-9.78c0,0,0-0.01,0-0.01
        c-1.19-6.37,1.16-11.09,6.58-14.41c0.05-0.03,0.05-0.1,0-0.13c-2.61-1.75-4.24-4.13-4.87-7.18c-0.12-0.57,0.3-1.13,0.88-1.18
        l0.76-0.08c0.73-0.07,1.27,0.34,1.42,0.94c0.42,1.75,1.3,3.2,2.68,4.33c1.69,1.38,3.89,2.06,6.05,1.79c3.36-0.42,6-2.83,6.8-6.01
        c0.17-0.66,0.8-1.1,1.47-1.03l0.39,0.04c0.82,0.08,1.31,0.79,1.14,1.52c-0.67,2.93-2.31,5.22-4.87,6.91
        c-0.05,0.03-0.05,0.1,0,0.13c5.42,3.4,7.74,8.17,6.42,14.58c0,0,0,0.01,0,0.01c-1.61,5.43-5.27,8.52-10.79,9.56
        c-0.03,0.01-0.06,0.04-0.06,0.07v3.94c0,0.04,0.03,0.08,0.08,0.08h2.07c0.75,0,1.37,0.61,1.37,1.37v0.31
        c0,0.77-0.62,1.39-1.39,1.39h-2.07C878.31,266.25,878.28,266.29,878.28,266.33"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M964.45,440.82
        c0.01-7.24-5.82-13.13-13.05-13.14c-7.35-0.01-13,5.88-13.17,12.76c-0.17,7.5,5.89,13.36,12.94,13.44
        C958.56,453.96,964.49,447.95,964.45,440.82 M943.43,468.65v-3.68c0-0.25,0.2-0.45,0.45-0.45h4.87c0.25,0,0.45-0.2,0.45-0.45
        v-4.93c0-0.68-0.48-1.26-1.14-1.39c-9.28-1.81-14.79-10.47-13.91-18.71c0.99-9.16,8.76-15.6,17.36-15.5
        c8.71,0.1,15.84,6.63,16.94,14.94c1.24,9.39-5.23,17.78-14.17,19.33c-0.53,0.09-0.9,0.56-0.9,1.1v5.13c0,0.25,0.2,0.45,0.45,0.45
        h4.88c0.25,0,0.45,0.2,0.45,0.45v3.69c-0.14,0.01-1.12,0.02-1.26,0.02c-1.66,0-2.48,0-4.14-0.01c-0.31,0-0.41,0.08-0.41,0.4
        c0.01,1.78,0.01,3.13,0.01,4.91c0,0.13,0,0.71,0,0.89c0.01,0.55-4.14,0.5-4.13,0c0-0.15,0-0.91,0-1.05c0-1.78-0.01-2.93,0.01-4.72
        c0.01-0.37-0.12-0.44-0.45-0.44"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M943.56,583.59
        c7.54-0.01,13.48-6.01,13.45-13.66c-0.03-7.12-6.11-13.26-13.42-13.25c-7.42,0.01-13.45,6.02-13.49,13.37
        C930.06,577.57,936.19,583.64,943.56,583.59 M963.42,547.28h-6.38v-4.17h13.55v13.54h-4.16v-6.24c-2.97,2.97-5.93,5.93-8.91,8.91
        c0.24,0.34,0.53,0.74,0.81,1.16c1.57,2.37,2.52,4.98,2.79,7.79c0.48,5.07-0.91,9.6-4.25,13.47c-2.68,3.11-6.07,5.07-10.1,5.77
        c-5.48,0.95-10.42-0.34-14.69-3.95c-3.08-2.6-5.05-5.91-5.82-9.86c-1.03-5.28,0.07-10.12,3.37-14.4c2.59-3.35,5.98-5.5,10.11-6.39
        c5.26-1.13,10.07-0.05,14.42,3.11c0.19,0.14,0.32,0.24,0.54,0.01c2.82-2.84,5.65-5.67,8.48-8.5
        C963.24,547.48,963.29,547.42,963.42,547.28"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M847.16,784.67
        l0.02-1.06c0.01-0.67,0.57-1.2,1.24-1.19c0.21,0,0.42,0,0.64,0c2.44-0.08,4.63-0.89,6.56-2.37c2.92-2.24,4.73-5.21,5.79-8.66
        c0.58-1.88,0.85-3.85,0.65-5.81c-0.18-1.74-0.72-3.36-2.05-4.66c-1.19-1.17-2.66-1.67-4.31-1.69c-2.8-0.04-5.79,2.39-6.4,4.92
        c-0.25,1.03-0.17,2.04,0.19,3.02c0.09,0.26,0.23,0.48,0.41,0.67c0.38,0.38,0.57,0.92,0.56,1.46l-0.02,1.02
        c-0.01,0.68-0.7,1.19-1.33,0.94c-0.01,0-0.01,0-0.01-0.01c-2.24-0.89-3.14-2.99-3.28-5.55c-0.1-2.02,0.56-4.01,1.8-5.61
        c1.63-2.1,3.71-3.54,6.33-4.04c2.86-0.55,5.48,0.08,7.77,1.89c2.04,1.61,3.09,3.8,3.56,6.31c0.25,1.34,0.29,2.68,0.18,4.03
        c-0.21,2.46-0.89,4.8-1.93,7.03c-1.02,2.18-2.34,4.15-4.05,5.85c-0.41,0.41-0.84,0.78-1.29,1.19c-0.1,0.09-0.04,0.26,0.09,0.26
        l10.57,0.18c0.08,0,0.15-0.06,0.15-0.15l0.42-24c0.02-1,0.84-1.8,1.84-1.78c0.87,0.01,1.57,0.73,1.55,1.61l-0.42,24.26
        c0,0.08,0.06,0.15,0.15,0.15l3.31,0.06c0.52,0.01,0.94,0.44,0.93,0.96c-0.02,1.34-1.13,2.4-2.47,2.38l-1.84-0.03
        c-0.08,0-0.15,0.06-0.15,0.15l-0.11,6.2c-0.01,0.81-0.68,1.45-1.49,1.43l-0.56-0.01c-0.75-0.01-1.34-0.63-1.33-1.38l0.11-6.3
        c0-0.08-0.06-0.15-0.15-0.15l-20.53-0.36C847.66,785.83,847.15,785.31,847.16,784.67"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M668.16,934.93
        l-2.8,0.05c-0.23,0-0.42-0.18-0.43-0.41l-0.42-23.84c0-0.23-0.2-0.41-0.43-0.41l-2.84,0.05c-0.23,0.01-0.42-0.18-0.43-0.41
        l-0.04-2.41c0-0.23,0.18-0.42,0.41-0.43l2.83-0.05c0.23-0.01,0.41-0.2,0.41-0.43l-0.05-2.7c0-0.23,0.18-0.42,0.41-0.43l2.41-0.04
        c0.23,0,0.42,0.18,0.43,0.41l0.05,2.67c0,0.23,0.2,0.41,0.43,0.41l5.24-0.09c0.23,0,0.42,0.18,0.43,0.41l0.04,2.44
        c0,0.23-0.18,0.42-0.41,0.43l-5.21,0.09c-0.23,0-0.41,0.2-0.41,0.43l0.07,4.28c0.01,0.35,0.41,0.54,0.68,0.31
        c0.55-0.45,1.18-0.88,2.68-1.6c1.13-0.54,2.33-0.91,3.57-1.05c1.87-0.21,3.67,0.02,5.31,1.12c1.57,1.06,2.58,2.54,3.26,4.26
        c0.71,1.78,1.01,3.66,0.89,5.56c-0.26,4.35-1.78,8.19-4.76,11.41c-0.98,1.06-1.84,2.2-2.28,3.59c-0.2,0.62-0.32,1.26-0.2,1.91
        c0.11,0.62,0.9,1.3,1.53,1.3c0.14,0,0.31-0.05,0.42-0.14c0.43-0.34,0.84-0.71,1.25-1.08c0.16-0.15,0.29-0.33,0.43-0.49l1.46,1.42
        c0.5,0.48,0.51,1.29,0.01,1.77c-0.8,0.78-1.67,1.49-2.86,1.72c-1.26,0.25-2.4-0.16-3.42-0.88c-1.54-1.09-2.25-2.57-2.11-4.48
        c0.17-2.38,1.22-4.35,2.72-6.12c0.92-1.09,1.92-2.12,2.61-3.4c0.96-1.81,1.63-3.71,1.86-5.76c0.25-2.21-0.02-4.33-1.15-6.28
        c-0.7-1.22-1.71-2.08-3.16-2.24c-1.17-0.12-2.33,0.06-3.44,0.46c-2.16,0.77-3.66,2.28-4.84,4.19c-0.31,0.51-0.41,1.03-0.39,1.62
        c0.09,4.17,0.15,8.33,0.23,12.5C668.17,934.72,668.16,934.82,668.16,934.93"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M426.74,968.28
        c2.13-0.04,3.79-1.75,3.74-3.88c-0.04-2.12-1.77-3.76-3.9-3.73c-2.08,0.04-3.75,1.79-3.7,3.9
        C422.92,966.67,424.65,968.32,426.74,968.28 M424.48,947.41l-3.79,0.07c-0.09,0-0.16,0.06-0.17,0.15
        c-0.7,3.92-2.74,6.94-6.23,8.95c-1.54,0.89-3.21,1.37-4.98,1.53c-0.44,0.04-0.83-0.3-0.83-0.75l-0.04-2.29
        c-0.01-0.38,0.28-0.71,0.66-0.75c2.3-0.25,4.23-1.24,5.75-3.05c1.47-1.77,2.11-3.82,1.96-6.12c-0.25-3.9-3.45-7.57-7.93-7.92
        c-0.43-0.03-0.76-0.38-0.77-0.81l-0.04-2.26c-0.01-0.41,0.34-0.73,0.75-0.71c2.73,0.14,5.19,1.06,7.33,2.83
        c2.29,1.9,3.7,4.33,4.28,7.24c0.02,0.08,0.09,0.15,0.18,0.15l3.62-0.06c0.1,0,0.18-0.08,0.18-0.19l-0.15-8.34
        c-0.01-0.54,0.42-0.98,0.95-0.99l1.94-0.03c0.49-0.01,0.9,0.38,0.91,0.87l0.15,8.42c0,0.1,0.08,0.18,0.19,0.18l3.62-0.06
        c0.09,0,0.16-0.06,0.17-0.15c0.62-3.62,2.44-6.48,5.5-8.52c1.42-0.95,2.87-1.48,4.21-1.75c1.2-0.24,2.32,0.67,2.34,1.89
        c0.02,0.89-0.62,1.65-1.49,1.82c-2.36,0.48-4.26,1.78-5.63,3.96c-1.01,1.61-1.4,3.38-1.21,5.27c0.39,3.85,3.27,6.93,7.04,7.61
        c0.94,0.17,1.64,0.94,1.66,1.89l0,0.23c0.02,1-0.85,1.81-1.85,1.68c-2.29-0.31-4.37-1.21-6.21-2.74c-2.29-1.9-3.69-4.33-4.28-7.23
        c-0.02-0.09-0.09-0.15-0.18-0.15l-3.81,0.06c0,0.1,0,0.2,0.01,0.3c0.05,3.05,0.11,6.11,0.15,9.17c0.01,0.24,0.09,0.32,0.31,0.39
        c3.04,0.93,4.9,2.97,5.44,6.09c0.69,4.01-1.96,7.81-5.91,8.64c-4.22,0.88-8.31-1.85-9.08-6.06c-0.69-3.78,1.89-7.58,5.56-8.71"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M220.58,872.45
        c-1.22-0.15-2.4-0.24-3.57-0.45c-1.8-0.32-3.47-1.02-4.89-2.27c-1.61-1.41-2.57-3.26-3.18-5.35c-0.73-2.5-0.95-5.07-0.92-7.66
        c0.03-2.08,0.17-4.16,0.27-6.24c0.02-0.36,0.05-0.71,0.08-1.15l-1.78,1.48c-0.31,0.26-0.75,0.2-0.99-0.13l-1.12-1.52
        c-0.25-0.34-0.19-0.82,0.12-1.08l5.33-4.46c0.41-0.35,1.01-0.26,1.33,0.18l4.16,5.85c0.22,0.31,0.16,0.75-0.13,0.99l-1.48,1.19
        c-0.32,0.26-0.77,0.19-1.01-0.15l-1.22-1.7c-0.07,0.9-0.17,1.7-0.19,2.5c-0.06,1.87-0.14,3.74-0.1,5.61
        c0.05,2.12,0.31,4.22,1.06,6.21c0.86,2.29,2.44,3.66,4.67,4.15c1.08,0.24,2.19,0.3,3.29,0.44c0.05,0.01,0.11,0,0.19,0l-0.27-15.17
        c0-0.02-0.02-0.03-0.04-0.02l-1.37,1.4c-0.38,0.38-0.96,0.39-1.35,0.01l-1.1-1.09c-0.3-0.3-0.32-0.8-0.04-1.13
        c1.57-1.81,3.14-3.6,4.7-5.4c0.3-0.35,0.81-0.36,1.13-0.03l4.98,5.17c0.27,0.28,0.27,0.73,0.01,1.01l-1.29,1.37
        c-0.27,0.29-0.71,0.28-0.97-0.01l-1.23-1.35c-0.06,0.03-0.06,0.03-0.12,0.05l0.26,15.13c0.54-0.06,1.07-0.11,1.6-0.18
        c1.06-0.14,2.09-0.39,3.08-0.85c1.83-0.85,2.89-2.4,3.47-4.38c0.42-1.44,0.63-2.92,0.64-4.42c0.01-1.74-0.01-3.49-0.1-5.23
        c-0.06-1.27-0.24-2.53-0.45-3.84c-0.41,0.59-0.81,1.19-1.22,1.8c-0.23,0.34-0.66,0.41-0.98,0.17l-1.52-1.17
        c-0.3-0.23-0.36-0.67-0.15-0.99c1.4-2.07,2.8-4.12,4.2-6.2c0.21-0.31,0.62-0.38,0.91-0.15c1.92,1.53,3.81,3.05,5.74,4.59
        c0.29,0.23,0.35,0.66,0.13,0.96l-1.17,1.66c-0.21,0.31-0.62,0.37-0.91,0.14l-1.75-1.39c0.12,0.99,0.13,1.05,0.32,3.14
        c0.16,1.68,0.26,3.38,0.25,5.07c-0.01,2.36-0.19,4.69-0.86,6.95c-1.11,3.74-3.45,6.09-7,7.1c-1.29,0.37-2.6,0.55-3.93,0.64
        c-0.08,0-0.15,0.01-0.24,0.02c0.03,1.63,0.06,3.24,0.08,4.89l5.25-0.09c0.4-0.01,0.73,0.33,0.74,0.76l0.03,1.95
        c0.01,0.39-0.29,0.72-0.66,0.73l-5.32,0.09c0,0.19,0.01,0.33,0.01,0.48c0.03,1.92,0.06,3.62,0.1,5.54c0.01,0.29-0.27,0.6-0.55,0.6
        c-0.85,0-1.29,0.01-2.14,0.04c-0.27,0.01-0.58-0.29-0.58-0.62c-0.02-1.93-0.06-3.61-0.1-5.54c0-0.13,0-0.25-0.01-0.41l-5.12,0.09
        c-0.5,0.01-0.91-0.41-0.92-0.94l-0.03-1.54c-0.01-0.52,0.38-0.94,0.87-0.95l5.11-0.09L220.58,872.45z"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M79.5,677.43h-6.7
        c-1.2-0.06-1.2-0.06-1.17,1.18v8.04c-0.23,0-0.41,0-0.59,0c-0.97,0-1.95,0-2.92,0c-0.56,0-0.56,0-0.56-0.54c0-2.73,0-5.45,0-8.18
        v-0.5h-7.87c-0.65,0-1.17-0.53-1.17-1.18v-1.67c0-0.65,0.52-1.18,1.17-1.18h7.85c0.09-0.02,0.06-0.35,0.06-0.47
        c0-2.63-0.04-5.19-0.03-7.82c0-0.34-0.08-0.43-0.43-0.48c-3.82-0.54-7.19-2.08-10.06-4.71c-3.08-2.82-5.04-6.3-5.83-10.42
        c-0.21-1.05-0.33-1.56-0.3-2.77c0.02-0.84,0.38-0.73,0.4-0.83l2.58,0.02c0.54,0,0.99,0.41,1.04,0.95c0.36,4.49,2.31,8.21,6,10.98
        c2.88,2.17,6.16,3.08,9.73,2.83c6.83-0.48,13-6.05,13.58-13.67c0.05-0.62,0.55-1.09,1.17-1.09h1.65c0.68,0,1.22,0.59,1.17,1.27
        c-0.29,4.27-1.85,8.05-4.73,11.31c-2.95,3.33-6.61,5.31-10.92,6.05c-0.55,0.1-0.94,0.59-0.94,1.15v6.47
        c-0.01,1.3-0.01,1.17,1.17,1.18h6.67c0.65,0,1.17,0.53,1.17,1.18v1.7C80.67,676.9,80.15,677.43,79.5,677.43"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M69.68,653.61
        c4.18,0.06,7.73-3.44,7.73-7.75c0-4.25-3.31-7.81-7.72-7.81c-4.39,0.01-7.69,3.53-7.71,7.78
        C61.97,650.2,65.55,653.65,69.68,653.61 M57.94,645.85c0.03-6.75,5.46-11.86,11.73-11.88c6.28-0.02,11.83,5.1,11.78,11.94
        c-0.04,6.53-5.17,11.79-11.75,11.79C63.14,657.69,58.01,652.44,57.94,645.85"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M81.74,328.11v-30.99
        c0-0.65-0.75-0.97-1.19-0.52l-12.08,12.61c-0.26,0.27-0.67,0.28-0.94,0.04l-0.88-0.79c-0.31-0.27-0.33-0.76-0.04-1.07l15.88-16.76
        c0.27-0.29,0.72-0.29,0.99,0l15.91,16.78c0.28,0.3,0.27,0.79-0.04,1.07l-0.84,0.75c-0.28,0.25-0.69,0.23-0.95-0.04
        c-4.01-4.21-8.01-8.41-12.04-12.63c-0.44-0.46-1.19-0.14-1.19,0.51l0,0.97c0,10.85,0,19.11,0,30.06c0,0.4-0.31,0.73-0.7,0.73
        h-1.18C82.05,328.84,81.74,328.51,81.74,328.11"/>
      <path style="clip-path:url(#SVGID_00000018228148072069755340000016523069391696212110_);fill:#1D1D1B;" d="M235.19,109.02v30.99
        c0,0.65,0.75,0.97,1.19,0.52l12.08-12.61c0.26-0.27,0.67-0.28,0.94-0.04l0.88,0.79c0.31,0.27,0.33,0.76,0.04,1.07l-15.88,16.76
        c-0.27,0.29-0.72,0.29-0.99,0l-15.91-16.78c-0.28-0.3-0.27-0.79,0.04-1.07l0.84-0.75c0.28-0.25,0.69-0.23,0.95,0.04
        c4.01,4.21,8.01,8.41,12.04,12.63c0.44,0.46,1.19,0.14,1.19-0.51l0-0.97c0-10.85,0-19.11,0-30.06c0-0.4,0.31-0.73,0.7-0.73h1.18
        C234.88,108.29,235.19,108.62,235.19,109.02"/>
    </g>
    <line class="st21" x1="925.89" y1="745.29" x2="495.29" y2="501.67"/>
    <line class="st22" x1="498.06" y1="501.03" x2="936.9" y2="272.59"/>
    <line class="st22" x1="499.2" y1="503.21" x2="938.03" y2="274.77"/>
    <line class="st22" x1="500.31" y1="505.34" x2="939.14" y2="276.9"/>
    <g class="st1">
      <defs>
        <rect id="SVGID_00000071557992590841054740000004989313796361296296_" x="457.08" y="461" width="81.72" height="81.72"/>
      </defs>
      <clipPath id="SVGID_00000181046697666420402770000002637266870562029753_">
        <use xlink:href="#SVGID_00000071557992590841054740000004989313796361296296_"  style="overflow:visible;"/>
      </clipPath>
      <path style="clip-path:url(#SVGID_00000181046697666420402770000002637266870562029753_);fill:#FFFFFF;" d="M497.95,540.04
        c21.08,0,38.17-17.09,38.17-38.17s-17.09-38.17-38.17-38.17c-21.08,0-38.17,17.09-38.17,38.17S476.86,540.04,497.95,540.04"/>
      
        <circle style="clip-path:url(#SVGID_00000181046697666420402770000002637266870562029753_);fill:none;stroke:#1D1D1B;stroke-width:2;" cx="497.95" cy="501.86" r="38.17"/>
    </g>
    <g class="st40">
      <polygon class="st41" points="504.5,502.71 504.5,0.5 1152.5,0.5 1152.5,861.15 		"/>
      <path class="st1" d="M1152,1v859.3L505,502.41V1H1152 M1153,0H504v503l649,359V0L1153,0z"/>
    </g>
    <g class="st40">
      <polygon class="st42" points="-140.02,867.01 502.92,499.23 931.8,760.02 594.98,1313.94 		"/>
      <path class="st1" d="M502.92,499.81l428.2,260.38l-336.31,553.07l-733.84-446.23L502.92,499.81 M502.93,498.65L-141,867
        l736.14,447.63l337.35-554.78L502.93,498.65L502.93,498.65z"/>
    </g>
    <g class="st40">
      <polygon class="st43" points="-256.46,177.41 498.5,-235.82 495.2,504.71 54.67,745.83 		"/>
      <path class="st1" d="M497.99-234.97l-3.29,739.38L54.87,745.15l-310.65-567.54L497.99-234.97 M499-236.67l-756.14,413.88
        l311.61,569.3L495.7,505L499-236.67L499-236.67z"/>
    </g>
    <g class="st44">
      <path class="st45" d="M498.17,501.95V5.91c272,0,495.83,223.92,495.83,496.05c0,85.69-22.19,169.94-64.41,244.5L498.17,501.95z"/>
    </g>
    <g class="st44">
      <path class="st46" d="M498.94,499.81L932.63,745.6c-134.84,237.92-441.57,322.74-679.48,187.9
        c-82.91-46.99-150.62-116.77-195.1-201.05L498.94,499.81z"/>
    </g>
    <g class="st44">
      <path class="st47" d="M497.83,502.78L54.14,730.03C18.12,659.7-0.67,581.8-0.67,502.78c0-273.47,225.03-498.5,498.5-498.5V502.78z
        "/>
    </g>
  </g>
  <g id="Layer_3">
    <g>
      <defs>
        <rect id="SVGID_00000171717262633331352350000015727793495285004725_" x="3.28" y="0.13" width="999.87" height="999.87"/>
      </defs>
      <clipPath id="SVGID_00000003100646980996892400000007921470505844573346_">
        <use xlink:href="#SVGID_00000171717262633331352350000015727793495285004725_"  style="overflow:visible;"/>
      </clipPath>
      
        <circle style="clip-path:url(#SVGID_00000003100646980996892400000007921470505844573346_);fill:none;stroke:#000000;stroke-width:1.914;" cx="503.21" cy="500.07" r="497.14"/>
      
        <circle style="clip-path:url(#SVGID_00000003100646980996892400000007921470505844573346_);fill:none;stroke:#1D1D1B;stroke-width:6;" cx="503.73" cy="503.24" r="412.79"/>
    </g>
    <text transform="matrix(0.1138 0.9935 -0.9935 0.1138 35.9194 548.7509)" class="st50 st51"> </text>
    <text transform="matrix(0.2236 0.9747 -0.9747 0.2236 34.2462 556.5107)" class="st50 st52"> </text>
    <text transform="matrix(0.3292 0.9443 -0.9443 0.3292 58.6253 651.2829)" class="st50 st51"> </text>
    <text transform="matrix(0.352 0.936 -0.936 0.352 61.0225 658.2044)" class="st50 st52"> </text>
    <text transform="matrix(0.3633 0.9317 -0.9317 0.3633 63.5763 665.0718)" class="st50 st53"> </text>
    <text transform="matrix(0.3745 0.9272 -0.9272 0.3745 66.2393 671.8943)" class="st50 st54"> </text>
    <text transform="matrix(0.3857 0.9226 -0.9226 0.3857 68.9982 678.6757)" class="st50 st53"> </text>
    <text transform="matrix(0.4078 0.9131 -0.9131 0.4078 71.8316 685.4346)" class="st50 st51"> </text>
    <text transform="matrix(0.4188 0.9081 -0.9081 0.4188 74.8067 692.1296)" class="st50 st53"> </text>
    <text transform="matrix(0.4297 0.903 -0.903 0.4297 77.8843 698.7739)" class="st50 st53"> </text>
    <text transform="matrix(0.4513 0.8924 -0.8924 0.4513 81.0302 705.3923)" class="st50 st52"> </text>
    <text transform="matrix(0.4619 0.8869 -0.8869 0.4619 84.3167 711.937)" class="st50 st51"> </text>
    <text transform="matrix(0.4725 0.8813 -0.8813 0.4725 87.7029 718.4324)" class="st50 st51"> </text>
    <text transform="matrix(0.483 0.8756 -0.8756 0.483 91.1848 724.878)" class="st50 st51"> </text>
    <text transform="matrix(0.5038 0.8638 -0.8638 0.5038 94.742 731.2826)" class="st50 st52"> </text>
    <text transform="matrix(0.5141 0.8577 -0.8577 0.5141 98.4263 737.6121)" class="st50 st51"> </text>
    <text transform="matrix(0.5243 0.8515 -0.8515 0.5243 102.2063 743.8851)" class="st50 st52"> </text>
    <text transform="matrix(0.5445 0.8387 -0.8387 0.5445 106.0506 750.1181)" class="st50 st52"> </text>
    <text transform="matrix(0.5545 0.8322 -0.8322 0.5545 110.0301 756.2721)" class="st50 st53"> </text>
    <text transform="matrix(0.5644 0.8255 -0.8255 0.5644 114.1003 762.3679)" class="st50 st52"> </text>
    <text transform="matrix(0.5839 0.8118 -0.8118 0.5839 118.2273 768.4163)" class="st50 st51"> </text>
    <text transform="matrix(0.5935 0.8048 -0.8048 0.5935 122.4916 774.3712)" class="st50 st52"> </text>
    <text transform="matrix(0.6031 0.7977 -0.7977 0.6031 126.841 780.2648)" class="st50 st52"> </text>
    <text transform="matrix(0.6126 0.7904 -0.7904 0.6126 131.2732 786.0945)" class="st50 st54"> </text>
    <text transform="matrix(0.6312 0.7756 -0.7756 0.6312 135.7769 791.8722)" class="st50 st54"> </text>
    <text transform="matrix(0.6404 0.768 -0.768 0.6404 140.3976 797.5569)" class="st50 st53"> </text>
    <text transform="matrix(0.6496 0.7603 -0.7603 0.6496 145.1012 803.1716)" class="st50 st52"> </text>
    <text transform="matrix(0.6675 0.7446 -0.7446 0.6675 149.8639 808.7383)" class="st50 st53"> </text>
    <text transform="matrix(0.6764 0.7366 -0.7366 0.6764 154.7457 814.2003)" class="st50 st52"> </text>
    <text transform="matrix(0.6851 0.7284 -0.7284 0.6851 159.7076 819.5847)" class="st50 st54"> </text>
    <text transform="matrix(0.7024 0.7118 -0.7118 0.7024 164.7233 824.93)" class="st50 st52"> </text>
    <text transform="matrix(0.7108 0.7034 -0.7034 0.7108 169.8534 830.157)" class="st50 st54"> </text>
    <text transform="matrix(0.7192 0.6948 -0.6948 0.7192 175.0639 835.3068)" class="st50 st51"> </text>
    <text transform="matrix(0.7275 0.6861 -0.6861 0.7275 180.3477 840.3776)" class="st50 st52"> </text>
    <text transform="matrix(0.7437 0.6685 -0.6685 0.7437 185.6879 845.3876)" class="st50 st51"> </text>
    <text transform="matrix(0.7517 0.6595 -0.6595 0.7517 191.1342 850.2904)" class="st50 st51"> </text>
    <text transform="matrix(0.7596 0.6504 -0.6504 0.7596 196.649 855.1116)" class="st50 st52"> </text>
    <text transform="matrix(0.7751 0.6319 -0.6319 0.7751 202.2162 859.8719)" class="st50 st54"> </text>
    <text transform="matrix(0.7827 0.6225 -0.6225 0.7827 207.887 864.511)" class="st50 st51"> </text>
    <text transform="matrix(0.7901 0.6129 -0.6129 0.7901 213.6215 869.0635)" class="st50 st51"> </text>
    <text transform="matrix(0.8047 0.5936 -0.5936 0.8047 219.4022 873.5656)" class="st50 st51"> </text>
    <text transform="matrix(0.8119 0.5838 -0.5838 0.8119 225.2852 877.9316)" class="st50 st51"> </text>
    <text transform="matrix(0.8189 0.5739 -0.5739 0.8189 231.2326 882.2119)" class="st50 st52"> </text>
    <text transform="matrix(0.8258 0.5639 -0.5639 0.8258 237.2413 886.3987)" class="st50 st53"> </text>
    <text transform="matrix(0.8393 0.5436 -0.5436 0.8393 243.2962 890.5225)" class="st50 st51"> </text>
    <text transform="matrix(0.8459 0.5333 -0.5333 0.8459 249.4388 894.5135)" class="st50 st53"> </text>
    <text transform="matrix(0.8524 0.5229 -0.5229 0.8524 255.6372 898.4151)" class="st50 st52"> </text>
    <text transform="matrix(0.865 0.5018 -0.5018 0.865 261.8738 902.255)" class="st50 st51"> </text>
    <text transform="matrix(0.8711 0.4912 -0.4912 0.8711 268.1988 905.9527)" class="st50 st52"> </text>
    <text transform="matrix(0.877 0.4804 -0.4804 0.877 274.5773 909.55)" class="st50 st51"> </text>
    <text transform="matrix(0.8829 0.4696 -0.4696 0.8829 281.0126 913.0517)" class="st50 st51"> </text>
    <text transform="matrix(0.8942 0.4476 -0.4476 0.8942 287.4802 916.4952)" class="st50 st51"> </text>
    <text transform="matrix(0.8997 0.4365 -0.4365 0.8997 294.0238 919.7855)" class="st50 st53"> </text>
    <text transform="matrix(0.905 0.4253 -0.4253 0.905 300.6136 922.9799)" class="st50 st51"> </text>
    <text transform="matrix(0.9102 0.4141 -0.4141 0.9102 307.2538 926.0729)" class="st50 st51"> </text>
    <text transform="matrix(0.9203 0.3913 -0.3913 0.9203 313.9279 929.0995)" class="st50 st51"> </text>
    <text transform="matrix(0.9251 0.3798 -0.3798 0.9251 320.6632 931.9728)" class="st50 st52"> </text>
    <text transform="matrix(0.9297 0.3682 -0.3682 0.9297 327.4426 934.75)" class="st50 st51"> </text>
    <text transform="matrix(0.9343 0.3566 -0.3566 0.9343 334.2617 937.4182)" class="st50 st51"> </text>
    <text transform="matrix(0.9429 0.3331 -0.3331 0.9429 341.1128 940.0149)" class="st50 st53"> </text>
    <text transform="matrix(0.947 0.3212 -0.3212 0.947 348.0152 942.4586)" class="st50 st53"> </text>
    <text transform="matrix(0.951 0.3093 -0.3093 0.951 354.9566 944.8037)" class="st50 st52"> </text>
    <text transform="matrix(0.9548 0.2973 -0.2973 0.9548 361.9294 947.0443)" class="st50 st52"> </text>
    <text transform="matrix(0.962 0.2732 -0.2732 0.962 368.9299 949.2054)" class="st50 st52"> </text>
    <text transform="matrix(0.9653 0.2611 -0.2611 0.9653 375.9741 951.216)" class="st50 st52"> </text>
    <text transform="matrix(0.9685 0.2489 -0.2489 0.9685 383.0466 953.1252)" class="st50 st52"> </text>
    <text transform="matrix(0.9716 0.2366 -0.2366 0.9716 390.144 954.9201)" class="st50 st54"> </text>
    <text transform="matrix(0.9773 0.212 -0.212 0.9773 397.2665 956.6506)" class="st50 st53"> </text>
    <text transform="matrix(0.9799 0.1996 -0.1996 0.9799 404.4209 958.2183)" class="st50 st52"> </text>
    <g>
      <defs>
        <rect id="SVGID_00000071557410497708233420000009292846776096726678_" x="3.28" y="0.13" width="999.87" height="999.87"/>
      </defs>
      <clipPath id="SVGID_00000033350131705675031960000004922593996198315688_">
        <use xlink:href="#SVGID_00000071557410497708233420000009292846776096726678_"  style="overflow:visible;"/>
      </clipPath>
      <g style="clip-path:url(#SVGID_00000033350131705675031960000004922593996198315688_);">
        <text transform="matrix(1.4089 0.177 -0.1247 0.9922 410.3378 969.5187)" class="st56 st57">M</text>
      </g>
      <g style="clip-path:url(#SVGID_00000033350131705675031960000004922593996198315688_);">
        <text transform="matrix(1.4199 -0.0198 0.0139 0.9999 483.202 977.7559)" class="st56 st58">O</text>
      </g>
      <g style="clip-path:url(#SVGID_00000033350131705675031960000004922593996198315688_);">
        <text transform="matrix(1.4108 -0.1616 0.1138 0.9935 532.1439 977.244)" class="st56 st59">O</text>
      </g>
    </g>
    <text transform="matrix(1.3841 -0.3175 0.2236 0.9747 580.9338 971.9805)" class="st56 st57">N</text>
    <text transform="matrix(1.357 -0.4182 0.2945 0.9557 634.1059 959.1929)" class="st56 st58"> </text>
    <text transform="matrix(1.3351 -0.4837 0.3406 0.9402 657.1682 951.9322)" class="st56 st58"> </text>
    <text transform="matrix(1.3166 -0.5318 0.3745 0.9272 674.0029 945.8129)" class="st56 st57"> </text>
    <text transform="matrix(0.9179 -0.3968 0.3968 0.9179 686.9943 931.0014)" class="st50 st51"> </text>
    <text transform="matrix(0.9081 -0.4188 0.4188 0.9081 693.7166 928.0957)" class="st50 st53"> </text>
    <text transform="matrix(0.903 -0.4297 0.4297 0.903 700.3789 925.0446)" class="st50 st53"> </text>
    <text transform="matrix(0.8977 -0.4405 0.4405 0.8977 706.9905 921.8903)" class="st50 st51"> </text>
    <text transform="matrix(0.8869 -0.4619 0.4619 0.8869 713.5715 918.6772)" class="st50 st51"> </text>
    <text transform="matrix(0.8813 -0.4725 0.4725 0.8813 720.0809 915.3149)" class="st50 st51"> </text>
    <text transform="matrix(0.8756 -0.483 0.483 0.8756 726.5352 911.8555)" class="st50 st51"> </text>
    <text transform="matrix(0.8698 -0.4935 0.4935 0.8698 732.9432 908.2997)" class="st50 st51"> </text>
    <text transform="matrix(0.8577 -0.5141 0.5141 0.8577 739.3102 904.682)" class="st50 st51"> </text>
    <g>
      <defs>
        <rect id="SVGID_00000172405677864285578780000016468704144635790001_" x="3.28" y="0.13" width="999.87" height="999.87"/>
      </defs>
      <clipPath id="SVGID_00000044888883971681638590000007528491709689949115_">
        <use xlink:href="#SVGID_00000172405677864285578780000016468704144635790001_"  style="overflow:visible;"/>
      </clipPath>
      <g style="clip-path:url(#SVGID_00000044888883971681638590000007528491709689949115_);">
        <text transform="matrix(0.1592 -1.4111 0.9937 0.1121 61.4524 482.0305)" class="st56 st59">A</text>
      </g>
      <g style="clip-path:url(#SVGID_00000044888883971681638590000007528491709689949115_);">
        <text transform="matrix(0.301 -1.3877 0.9773 0.212 66.8017 435.1687)" class="st56 st57">S</text>
      </g>
    </g>
    <text transform="matrix(0.4392 -1.3504 0.951 0.3093 75.2077 394.8114)" class="st56 st59">C</text>
    <text transform="matrix(0.5719 -1.2998 0.9153 0.4027 89.7563 349.9232)" class="st56 st57">E</text>
    <text transform="matrix(0.6975 -1.2369 0.8711 0.4912 106.0958 312.062)" class="st56 st58">N</text>
    <text transform="matrix(0.8429 -1.1427 0.8047 0.5936 132.2969 265.9568)" class="st56 st59">D</text>
    <text transform="matrix(0.9618 -1.0446 0.7357 0.6773 160.069 227.875)" class="st56 st59">A</text>
    <text transform="matrix(1.0686 -0.9352 0.6586 0.7525 191.743 192.9605)" class="st56 st59">N</text>
    <text transform="matrix(1.1528 -0.8291 0.5839 0.8118 232.092 158.2575)" class="st56 st61">T</text>
    <text transform="matrix(0.8387 -0.5445 0.5445 0.8387 256.4624 130.4443)" class="st50 st62"> </text>
    <text transform="matrix(0.8924 -0.4513 0.4513 0.8924 255.6593 127.6657)" class="st50 st63"> </text>
    <text transform="matrix(0.9747 -0.2236 0.2236 0.9747 350.1097 80.0782)" class="st50 st64"> </text>
    <text transform="matrix(0.9948 -0.1014 0.1014 0.9948 453.2264 59.398)" class="st50 st65"> </text>
    <text transform="matrix(0.996 -0.089 0.089 0.996 460.2289 58.6822)" class="st50 st65"> </text>
    <text transform="matrix(0.9971 -0.0766 0.0766 0.9971 467.2424 58.0748)" class="st50 st63"> </text>
    <text transform="matrix(0.9987 -0.0516 0.0516 0.9987 474.2625 57.5329)" class="st50 st64"> </text>
    <text transform="matrix(0.9992 -0.039 0.039 0.9992 481.2899 57.1544)" class="st50 st65"> </text>
    <text transform="matrix(0.9996 -0.0265 0.0265 0.9996 488.3257 56.8795)" class="st50 st64"> </text>
    <text transform="matrix(0.9999 -0.0139 0.0139 0.9999 495.3621 56.7085)" class="st50 st64"> </text>
    <text transform="matrix(0.9999 0.0113 -0.0113 0.9999 502.4043 56.611)" class="st50 st63"> </text>
    <text transform="matrix(0.9997 0.0239 -0.0239 0.9997 509.4403 56.6678)" class="st50 st62"> </text>
    <text transform="matrix(0.9993 0.0365 -0.0365 0.9993 516.4771 56.8348)" class="st50 st65"> </text>
    <text transform="matrix(0.9988 0.0491 -0.0491 0.9988 523.5109 57.1045)" class="st50 st64"> </text>
    <text transform="matrix(0.9972 0.0743 -0.0743 0.9972 530.5469 57.4439)" class="st50 st64"> </text>
    <text transform="matrix(0.9962 0.0869 -0.0869 0.9962 537.5703 57.9388)" class="st50 st65"> </text>
    <text transform="matrix(0.995 0.0995 -0.0995 0.995 544.5831 58.544)" class="st50 st65"> </text>
    <text transform="matrix(0.9937 0.1121 -0.1121 0.9937 551.584 59.2489)" class="st50 st64"> </text>
    <text transform="matrix(0.9922 0.1247 -0.1247 0.9922 558.5797 60.0632)" class="st50 st63"> </text>
    <text transform="matrix(0.9887 0.1498 -0.1498 0.9887 565.5656 60.9421)" class="st50 st64"> </text>
    <text transform="matrix(0.9867 0.1623 -0.1623 0.9867 572.5264 61.9756)" class="st50 st62"> </text>
    <text transform="matrix(0.9846 0.1747 -0.1747 0.9846 579.4741 63.1155)" class="st50 st65"> </text>
    <text transform="matrix(0.9823 0.1872 -0.1872 0.9823 586.4015 64.3544)" class="st50 st64"> </text>
    <text transform="matrix(0.9799 0.1996 -0.1996 0.9799 593.3106 65.6977)" class="st50 st64"> </text>
    <text transform="matrix(0.9745 0.2243 -0.2243 0.9745 600.2067 67.1157)" class="st50 st64"> </text>
    <text transform="matrix(0.9716 0.2366 -0.2366 0.9716 607.0684 68.6811)" class="st50 st65"> </text>
    <text transform="matrix(0.9685 0.2489 -0.2489 0.9685 613.9078 70.35)" class="st50 st65"> </text>
    <text transform="matrix(0.9653 0.2611 -0.2611 0.9653 620.7251 72.1213)" class="st50 st63"> </text>
    <text transform="matrix(0.9584 0.2853 -0.2853 0.9584 627.5173 73.9607)" class="st50 st64"> </text>
    <text transform="matrix(0.9548 0.2973 -0.2973 0.9548 634.27 75.9555)" class="st50 st62"> </text>
    <text transform="matrix(0.951 0.3093 -0.3093 0.951 640.9919 78.0472)" class="st50 st65"> </text>
    <text transform="matrix(0.947 0.3212 -0.3212 0.947 647.6813 80.2446)" class="st50 st64"> </text>
    <text transform="matrix(0.9387 0.3449 -0.3449 0.9387 654.3478 82.5057)" class="st50 st65"> </text>
    <text transform="matrix(0.9343 0.3566 -0.3566 0.9343 660.9629 84.9164)" class="st50 st64"> </text>
    <text transform="matrix(0.9297 0.3682 -0.3682 0.9297 667.5368 87.4261)" class="st50 st62"> </text>
    <text transform="matrix(0.9251 0.3798 -0.3798 0.9251 674.0775 90.0359)" class="st50 st65"> </text>
    <text transform="matrix(0.9153 0.4027 -0.4027 0.9153 680.5867 92.7157)" class="st50 st64"> </text>
    <text transform="matrix(0.9102 0.4141 -0.4141 0.9102 687.0347 95.5345)" class="st50 st65"> </text>
    <text transform="matrix(0.905 0.4253 -0.4253 0.905 693.4434 98.4518)" class="st50 st65"> </text>
    <text transform="matrix(0.8997 0.4365 -0.4365 0.8997 699.8075 101.4687)" class="st50 st64"> </text>
    <text transform="matrix(0.8886 0.4586 -0.4586 0.8886 706.1296 104.554)" class="st50 st64"> </text>
    <text transform="matrix(0.8829 0.4696 -0.4696 0.8829 712.3917 107.7726)" class="st50 st65"> </text>
    <text transform="matrix(0.877 0.4804 -0.4804 0.877 718.6033 111.0879)" class="st50 st65"> </text>
    <text transform="matrix(0.865 0.5018 -0.5018 0.865 724.7803 114.4595)" class="st50 st63"> </text>
    <text transform="matrix(0.8587 0.5124 -0.5124 0.8587 730.8808 117.9773)" class="st50 st64"> </text>
    <text transform="matrix(0.8524 0.5229 -0.5229 0.8524 736.9266 121.5842)" class="st50 st65"> </text>
    <text transform="matrix(0.8459 0.5333 -0.5333 0.8459 742.9203 125.278)" class="st50 st65"> </text>
    <text transform="matrix(0.8327 0.5538 -0.5538 0.8327 748.8715 129.0385)" class="st50 st65"> </text>
    <text transform="matrix(0.8258 0.5639 -0.5639 0.8258 754.7392 132.9286)" class="st50 st63"> </text>
    <text transform="matrix(0.8189 0.5739 -0.5739 0.8189 760.5472 136.905)" class="st50 st62"> </text>
    <text transform="matrix(0.8047 0.5936 -0.5936 0.8047 766.3182 140.9318)" class="st50 st64"> </text>
    <text transform="matrix(0.7975 0.6033 -0.6033 0.7975 771.9952 145.0966)" class="st50 st62"> </text>
    <text transform="matrix(0.7901 0.6129 -0.6129 0.7901 777.6077 149.3436)" class="st50 st65"> </text>
    <text transform="matrix(0.7827 0.6225 -0.6225 0.7827 783.1614 153.676)" class="st50 st64"> </text>
    <text transform="matrix(0.7674 0.6412 -0.6412 0.7674 788.6642 158.065)" class="st50 st64"> </text>
    <text transform="matrix(0.7596 0.6504 -0.6504 0.7596 794.0712 162.571)" class="st50 st64"> </text>
    <text transform="matrix(0.7517 0.6595 -0.6595 0.7517 799.4145 167.1574)" class="st50 st62"> </text>
    <text transform="matrix(0.7357 0.6773 -0.6773 0.7357 804.7083 171.7949)" class="st50 st65"> </text>
    <text transform="matrix(0.7275 0.6861 -0.6861 0.7275 809.8978 176.5536)" class="st50 st63"> </text>
    <text transform="matrix(0.7192 0.6948 -0.6948 0.7192 815.0173 181.3863)" class="st50 st65"> </text>
    <text transform="matrix(0.7024 0.7118 -0.7118 0.7024 820.096 186.2643)" class="st50 st63"> </text>
    <text transform="matrix(0.6938 0.7202 -0.7202 0.6938 825.0554 191.2533)" class="st50 st64"> </text>
    <text transform="matrix(0.6851 0.7284 -0.7284 0.6851 829.941 196.3242)" class="st50 st62"> </text>
    <text transform="matrix(0.6764 0.7366 -0.7366 0.6764 834.7507 201.4609)" class="st50 st65"> </text>
    <text transform="matrix(0.6586 0.7525 -0.7525 0.6586 839.5086 206.6524)" class="st50 st65"> </text>
    <text transform="matrix(0.6496 0.7603 -0.7603 0.6496 844.1516 211.9454)" class="st50 st62"> </text>
    <text transform="matrix(0.6404 0.768 -0.768 0.6404 848.7216 217.3018)" class="st50 st65"> </text>
    <text transform="matrix(0.6219 0.7831 -0.7831 0.6219 853.2301 222.7059)" class="st50 st64"> </text>
    <text transform="matrix(0.6126 0.7904 -0.7904 0.6126 857.6252 228.2075)" class="st50 st63"> </text>
    <text transform="matrix(0.6031 0.7977 -0.7977 0.6031 861.9329 233.7749)" class="st50 st64"> </text>
    <text transform="matrix(0.5839 0.8118 -0.8118 0.5839 866.1922 239.3788)" class="st50 st64"> </text>
    <text transform="matrix(0.5742 0.8187 -0.8187 0.5742 870.3225 245.0819)" class="st50 st64"> </text>
    <text transform="matrix(0.5644 0.8255 -0.8255 0.5644 874.3652 250.8412)" class="st50 st63"> </text>
    <text transform="matrix(0.5545 0.8322 -0.8322 0.5545 878.3267 256.6595)" class="st50 st63"> </text>
    <text transform="matrix(0.7155 1.2266 -0.8638 0.5038 875.0514 266.6991)" class="st56 st58">S</text>
    <text transform="matrix(0.5947 1.2895 -0.9081 0.4188 895.9531 302.2648)" class="st56 st61">U</text>
    <text transform="matrix(0.4347 1.3518 -0.952 0.3061 915.9244 344.8588)" class="st56 st59">N</text>
    <text transform="matrix(0.1508 0.9886 -0.9886 0.1508 942.5564 393.3705)" class="st50 st65"> </text>
    <g>
      <defs>
        <rect id="SVGID_00000106140180655179826100000011091703197060479360_" x="3.28" y="0.13" width="999.87" height="999.87"/>
      </defs>
      <clipPath id="SVGID_00000176728806184256577020000003577912459177312911_">
        <use xlink:href="#SVGID_00000106140180655179826100000011091703197060479360_"  style="overflow:visible;"/>
      </clipPath>
      
        <line style="clip-path:url(#SVGID_00000176728806184256577020000003577912459177312911_);fill:none;stroke:#1D1D1B;stroke-width:6;" x1="503.41" y1="0.13" x2="503.41" y2="499.28"/>
    </g>
    <line class="st67" x1="935.59" y1="747.72" x2="856.57" y2="703.01"/>
    <line class="st68" x1="64.77" y1="732.02" x2="505.49" y2="502.6"/>
    <g>
      <defs>
        <rect id="SVGID_00000158741732852775831850000010968261140982268803_" x="3.28" y="0.13" width="999.87" height="999.87"/>
      </defs>
      <clipPath id="SVGID_00000047034253421615260160000016596664676853059221_">
        <use xlink:href="#SVGID_00000158741732852775831850000010968261140982268803_"  style="overflow:visible;"/>
      </clipPath>
      <path style="clip-path:url(#SVGID_00000047034253421615260160000016596664676853059221_);fill:#1D1D1B;" d="M868.06,241.16
        c11.2,0.03,20.31-8.93,20.51-20.08c0.21-11.67-9.15-20.91-20.5-20.89c-11.27,0.02-20.29,9.01-20.47,20.13
        C847.41,232.1,856.94,241.2,868.06,241.16 M868.12,196.22c13.61-0.01,24.61,11.13,24.56,24.69c-0.05,13.5-11.09,24.57-24.76,24.5
        c-13.45-0.06-24.42-11.09-24.43-24.58C843.47,207.27,854.51,196.18,868.12,196.22"/>
      <path style="clip-path:url(#SVGID_00000047034253421615260160000016596664676853059221_);fill:#1D1D1B;" d="M868.09,215.22
        c3,0,5.46,2.44,5.48,5.43c0.02,3.02-2.47,5.54-5.48,5.51c-3.05-0.03-5.44-2.41-5.48-5.48
        C862.57,217.68,865.07,215.22,868.09,215.22"/>
      <path style="clip-path:url(#SVGID_00000047034253421615260160000016596664676853059221_);fill:#1D1D1B;" d="M367.25,921.36
        c8.65,4.49,13.32,10.98,13.73,19.72c-0.1,8.75-4.55,15.41-12.96,20.15c7.5,0.37,16.29-2.73,21.15-10.11
        c4.65-7.06,3.96-15.9-1.82-22.18C382.24,923.4,375.47,920.98,367.25,921.36 M370.11,964.11c-3.1,0.04-5.64-0.24-8.13-0.84
        c-0.77-0.19-1.26-0.69-1.3-1.33c-0.04-0.63,0.4-1.2,1.17-1.43c2.49-0.74,4.8-1.78,6.87-3.19c3.98-2.71,6.68-6.18,8.09-10.39
        c0.79-2.36,1.05-4.78,0.79-7.22c-0.49-4.59-2.54-8.57-6.17-11.93c-2.79-2.57-6.14-4.35-10.04-5.37c-0.75-0.2-1.29-0.53-1.4-1.26
        c-0.09-0.63,0.27-1.27,0.96-1.47c0.99-0.29,1.99-0.54,3-0.74c1.66-0.32,3.36-0.49,5.06-0.49c6.14-0.01,11.68,1.56,16.5,4.86
        c4.81,3.29,7.89,7.56,9.31,12.73c0.58,2.12,0.76,4.28,0.61,6.46c-0.33,4.89-2.28,9.25-5.81,13.06c-3.25,3.51-7.37,5.96-12.28,7.39
        C374.82,963.69,372.24,964.06,370.11,964.11"/>
      <path style="clip-path:url(#SVGID_00000047034253421615260160000016596664676853059221_);fill:#1D1D1B;" d="M38.66,544.6v-31.08
        c0-0.65-0.75-0.98-1.19-0.52l-12.12,12.65c-0.26,0.27-0.67,0.28-0.95,0.04l-0.88-0.79c-0.31-0.27-0.33-0.77-0.04-1.07l15.93-16.8
        c0.27-0.29,0.72-0.29,0.99,0l15.96,16.83c0.28,0.3,0.27,0.8-0.04,1.07l-0.84,0.75c-0.28,0.25-0.69,0.23-0.95-0.04
        c-4.02-4.22-8.04-8.43-12.08-12.67c-0.44-0.46-1.19-0.14-1.19,0.51l0,0.98c0,10.88,0,19.17,0,30.14c0,0.4-0.31,0.73-0.7,0.73
        h-1.18C38.98,545.33,38.66,545,38.66,544.6"/>
    </g>
    <line class="st68" x1="932.83" y1="746.56" x2="501" y2="502.24"/>
  </g>`;

    chartImg.append(...symbolsToPopulate);
    // this.image = chartImg;
    return chartImg;
  }

  renderTable({ mountNode, clearNode = true, recreate = false, options = {} }) {
    if (!isElement(mountNode)) {
      throw new Error(
        `You must provide a DOM node to insert the chart in. Received ${mountNode} of type: ${typeof mountNode}; class: ${
          mountNode?.__proto__?.constructor
        }`,
      );
    }
  
    if (clearNode) {
      mountNode.innerHTML = "";
    }
  
    if (recreate || this.table == null) {
      this.table = this.generateChartTable();
    }
  
    const defaults = {
      showControls: true,
      showBirthday: true,
    };
  
    const { showControls, showBirthday } = { ...defaults, ...options };
  
    if (showControls) {
      const controls = document.createElement("div");
      controls.classList.add("controls");
      controls.id = "controls";
  
      const heading = document.createElement("h2");
      heading.classList.add("chart-heading");
      heading.textContent = `${this.ownerName}`;
      controls.append(heading);
  
      const printButton = document.createElement("button");
      printButton.textContent = "Print Chart";
      printButton.classList.add(
        "btn",
        "waves-effect",
        "waves-light",
        "print-btn",
      );
      printButton.addEventListener("click", () => {
        window.print();
      });
  
      const transButton = document.createElement("button");
      transButton.textContent = "Remove Outline";
      transButton.classList.add(
        "btn",
        "waves-effect",
        "waves-light",
        "trans-btn",
      );
      transButton.addEventListener("click", () => {
        const outline = document.getElementById("chart");
        const children = outline.childNodes;
        for (const child of children) {
          if (!child.classList.contains("sign")) {
            child.classList.toggle("transparent");
          } else {
            return;
          }
        }
      });
  
      controls.append(printButton, transButton);
      mountNode.append(controls);
    }
  
    mountNode.append(this.table);
  
    if (showBirthday) {
      const birthdayDisplay = document.createElement("ul");
      birthdayDisplay.classList.add("birthday");
      const dateDisplay = document.createElement("li");
      dateDisplay.textContent = `Birthday: ${this.birthday}`;
      const timeDisplay = document.createElement("li");
      timeDisplay.textContent = `Time: ${this.time.slice(
        0,
        2,
      )}:${this.time.slice(2)}`;
      const locationDisplay = document.createElement("li");
      locationDisplay.textContent = `Lat: ${this.latitude.toFixed(
        2,
      )}, Long: ${this.longitude.toFixed(2)}`;
      birthdayDisplay.append(dateDisplay, timeDisplay, locationDisplay);
      mountNode.append(birthdayDisplay);
    }
  }
  
  
  generateChartTable() {
    const importantPlanets = ['Sun', 'Moon', 'Ascendant'];
    const table = document.createElement('table');
    table.classList.add('planet-sign-table');
  
    // Create table header
    const headerRow = document.createElement('tr');
    const planetHeader = document.createElement('th');
    planetHeader.textContent = 'Planet';
    const signHeader = document.createElement('th');
    signHeader.textContent = 'Sign';
    headerRow.appendChild(planetHeader);
    headerRow.appendChild(signHeader);
    table.appendChild(headerRow);
  
    for (const [planet, sign] of Object.entries(this)) {
      if (!importantPlanets.includes(planet)) {
        continue;
      }
  
      const row = document.createElement('tr');
      const planetCell = document.createElement('td');
      planetCell.textContent = planet;
      const signCell = document.createElement('td');
      signCell.textContent = sign.sign; // Assuming `sign.sign` contains the name of the sign
  
      row.appendChild(planetCell);
      row.appendChild(signCell);
      table.appendChild(row);
    }
  
    return table;
  }
  
  static getIconSVG(sign) {
    switch (sign) {
      case "Aries":
        // return "./assets/img/aries.svg";
        return `	<path d="M243.46,123.91c0-4.75-.41-8.92.2-12.93.24-1.54,2.59-3.29,4.36-4,9.66-3.78,18.2-9,24.28-17.64,14.17-20.26,3.17-49.18-20.11-52.75-20.42-3.14-41.09,9.48-49.68,30.12C190.78,94.9,184,124.48,179,154.35,171,202.08,164.25,250,157,297.87a21.82,21.82,0,0,1-.57,2.13H142.54c-1.7-13-3.33-25.94-5.12-38.87-7.51-54.27-15.18-108.53-29.28-161.57A205.72,205.72,0,0,0,93.69,60.45C84.59,42.27,62.93,33,45,37.16,20,43,15.82,72.84,27.14,89.27c5.8,8.42,13.92,13.88,23.36,17.12C55.06,108,57,110,56.37,114.78c-.39,2.82-.07,5.73-.07,8.66C28.56,120.7,3.85,100,.62,71.09-1.47,52.42,1.44,35,13.37,19.87,29.63-.81,55-4.47,76.83,4.84c26.67,11.38,41.51,33.4,47.92,60.49,6.21,26.26,10.56,53,14.55,79.73,4.11,27.51,6.8,55.24,10.64,83,1.35-11.76,2.64-23.53,4.07-35.29,5.18-42.75,9.52-85.65,20.65-127.41,6.08-22.79,17.34-42.5,38-55.31,38.77-24,82.15-2.17,86.52,41,2.11,20.78-2.16,39.42-17.26,54.66C271.56,116.1,258.66,121.28,243.46,123.91Z" transform="translate(0)"/>`;
        break;
      case "Taurus":
        // return "./assets/img/taurus.svg";
        return `<path d="M95.92,113a62,62,0,0,1-18.16-15.9A82.46,82.46,0,0,1,67,78.15c-3.33-8-6.44-16-9.8-24a49.58,49.58,0,0,0-9.47-14.9C41.8,33,34.1,29.58,25.54,27.57A107.54,107.54,0,0,0,4,25.09c-1.27,0-2.54,0-4,0C.14,16.74.29,8.5.43.16,1.77.16,3,.13,4.2.16A134.3,134.3,0,0,1,34.05,3.85c13.47,3.42,25.21,9.46,34.4,19.27A75.3,75.3,0,0,1,82.71,45.49c3.56,8.38,6.82,16.87,10.36,25.26a49.8,49.8,0,0,0,9.47,14.89c5.89,6.26,13.58,9.69,22.16,11.67,10.21,2.36,20.62,2.75,31.08,2.4a98.8,98.8,0,0,0,20.43-2.62c8.27-2,15.66-5.47,21.33-11.54a49.83,49.83,0,0,0,9.38-14.79c3-7.12,5.77-14.32,8.7-21.46C219,41,223.13,33.13,229,26c7.69-9.31,17.62-15.8,29.47-19.94A107.45,107.45,0,0,1,287,.61c4.12-.27,8.24-.4,12.59-.61.15,8.41.3,16.65.45,25-3,.11-5.86.17-8.74.33a88.39,88.39,0,0,0-22.64,3.92,38.83,38.83,0,0,0-21.87,17.39c-4.09,6.8-6.69,14.15-9.58,21.39-2.63,6.62-5.2,13.27-8.71,19.57-5.74,10.28-13.41,19-24.11,25.23,36.44,21.3,55.75,51.35,54.32,91.25-1,27.71-13.46,51.1-36,69.65-46.08,37.93-117,33-156.63-10.64A95.26,95.26,0,0,1,44.59,224.7a91.06,91.06,0,0,1-1.77-43A94.18,94.18,0,0,1,61,142,106.59,106.59,0,0,1,95.92,113Zm54,161.34c45,.09,81.6-33.32,81.78-74.64s-36.47-74.82-81.63-74.91c-45-.08-81.59,33.32-81.77,74.64S104.76,274.21,149.92,274.3Z"/>`;
        break;
      case "Gemini":
        // return "./assets/img/gemini.svg";
        return `<path d="M300,284.44,288.22,299c-91.55-72.44-183.1-72.92-274.78,0L1.65,284.45c22.31-16.11,44.41-31.71,69-43.34,3.29-1.55,4.33-3.4,4.32-7Q74.82,150,75,65.92c0-3.58-1-5.41-4.34-7C46.16,47.54,24,32.33,1.67,16.22L13.47,1c91.6,73.73,183.16,73.22,274.72,0L300,16.27c-7.22,5.08-13.93,10.41-21.2,14.8-16,9.65-32.16,18.92-48.4,28.09-2.73,1.54-4,2.94-4,6.18q.14,84.63,0,169.26c0,3.57,1.43,5.08,4.39,6.47C255.36,252.69,277.5,268.25,300,284.44ZM191.59,228.11V71.86a210.86,210.86,0,0,1-81.69,0V228.13A266.7,266.7,0,0,1,191.59,228.11Z" transform="translate(-1.65 -1)"/>`;
        break;
      case "Cancer":
        // return "./assets/img/cancer.svg";
        return `<path d="M300,138.05H286.71c-1.73-6.36-3.29-12.79-5.21-19.12C266,67.86,226.83,35.78,173.67,30.17c-25.95-2.74-51.26-1.43-75.26,9.93a86.43,86.43,0,0,0-15.5,9.46c7.93,0,15.92-.64,23.77.11,26.13,2.5,47,20.78,50.56,43.59,4.28,27.68-7.85,50.85-34.18,61.48C95.68,165.8,68,165.63,42.3,149.66c-20.91-13-28.91-33.47-28.16-57.49.77-24.69,12.21-44.12,31-59.43C74.42,8.91,108.86.73,145.7.71c29.24,0,57.6,4.69,83.63,18.94C261,37,282.49,62.86,292.25,97.7,295.87,110.6,297.39,124.1,300,138.05ZM41.65,105.7a75.57,75.57,0,0,0,1.4,9.06,41.48,41.48,0,0,0,42,30c18.5-1,33.74-11.17,38.9-26,7.81-22.38-5-45-29-51.21C68.32,60.68,41.86,79.66,41.65,105.7Z" transform="translate(0 -0.71)"/><path d="M217.44,248.8c-9.72,0-19.65,1.32-29.1-.25-25.9-4.32-43.13-21.88-46.35-45.43-3.39-24.76,8.73-47,33.1-58.07s49.75-11.6,74.09-.43c25.67,11.77,37,33.48,36.47,61.34-.46,25.13-12,44.86-31,60.48-24.41,20.06-53.14,29.09-84.18,31.26-34.84,2.45-68.74-1.47-100.07-18.22-31.9-17.06-53.19-43.13-62.78-78C4,188.52,2.53,175.05,0,161.27H12.48c3.13,10,5.59,20.36,9.5,30.1,18.75,46.69,54.21,71.41,103.49,77.37,23.18,2.81,46.18,2.27,68.26-6.31,8.34-3.24,16.21-7.71,24.29-11.62C217.82,250.14,217.63,249.47,217.44,248.8Zm-3.81-15c5.66-1,11.49-1.51,17-3.18,24.53-7.52,35.26-36.52,21-57.7-10.35-15.36-25.58-20.68-43.7-18.3-21.28,2.79-36.9,23.83-33.75,45C176.57,215.89,193,232.72,213.63,233.82Z" transform="translate(0 -0.71)"/>`;
        break;
      case "Leo":
        // return "./assets/img/leo.svg";
        return `<path d="M99.84,123.25c-2.11-4.11-4.27-8.07-6.2-12.12A81.58,81.58,0,0,1,86,85.76a68.18,68.18,0,0,1,5.81-36.59C99.72,31.57,112.65,17.91,131.31,9c14.06-6.68,29.08-10,45-8.77,28.44,2.22,51.27,13.59,67.23,35.31a70.66,70.66,0,0,1,13.54,34.66,97,97,0,0,1-2.4,32.5c-2.71,11.69-7.17,22.87-11.75,34-7.47,18.2-16.63,35.71-25.75,53.25-6.34,12.2-12.58,24.44-17.9,37a49.68,49.68,0,0,0-3.64,28.22,30.54,30.54,0,0,0,6.62,14.86c5.87,7,13.81,9.88,23.31,9.53,7.88-.29,15-2.79,21.82-6.22a76.25,76.25,0,0,0,15.07-10.05l1-.8L279,277.19c-2.29,1.8-4.48,3.63-6.78,5.32A90.15,90.15,0,0,1,240.13,298c-11.34,2.8-22.65,2.91-33.8-.79a46.86,46.86,0,0,1-26.88-22.08c-5.43-9.61-7.19-19.92-6.75-30.62s3.78-20.76,8.25-30.59c7.22-15.88,15.41-31.34,23.48-46.87a471,471,0,0,0,23.38-51.94,117,117,0,0,0,6.77-26.15c1.47-11.47.68-22.71-4.57-33.44-9.61-19.67-26.56-30.71-49.58-34.41-10.9-1.75-21.46-.38-31.88,3.1C127.17,31.29,112.19,49.7,108.66,69c-2,11,0,21.49,4.41,31.72,3.7,8.58,8.71,16.55,13.65,24.55,4.68,7.56,9.38,15.11,13.16,23.09,3.71,7.8,6.73,15.83,7.81,24.29,3,23.9-6.27,43-27.9,56.89a65.39,65.39,0,0,1-29,9.9,72.36,72.36,0,0,1-19.22-.85c-25.11-4.09-44.93-22.75-50.81-44.81-6.13-23,4-50.2,30.79-64.13a69.73,69.73,0,0,1,37.2-8c3.39.22,6.75.94,10.12,1.44C99.16,123.11,99.48,123.19,99.84,123.25ZM126,180.8c-.26-2.32-.46-4.64-.79-6.94a27.24,27.24,0,0,0-.95-4.37c-6.78-21-31-32.45-52.63-25.9-15.73,4.76-28.92,16.26-30.26,35.2-.54,7.73,1.81,14.91,6.19,21.51,9.45,14.22,25.18,21,42.61,18.73C108.4,216.7,126.82,201,126,180.8Z" transform="translate(-19 0)"/>`;
        break;
      case "Virgo":
        // return "./assets/img/virgo.svg";
        return `<path d="M219.61,99.83a25.89,25.89,0,0,1,8.79-6.31c5.06-2,10.06-1.55,15,.47,6.12,2.5,10.94,6.72,15.11,11.72,7,8.42,11.49,18.15,14.48,28.61a100.44,100.44,0,0,1,3.67,21.14,160.54,160.54,0,0,1-6.38,57.4,109.69,109.69,0,0,1-19,37c-.17.21-.32.43-.54.73a238.42,238.42,0,0,0,37.12,30.19c-4.21,6.41-8.39,12.77-12.62,19.23a261,261,0,0,1-41.07-33.43c-21.32,15.72-45.73,20.93-71.76,21.15-.19-7.68-.38-15.29-.57-23,15.15-.08,29.84-2,43.76-8a71.8,71.8,0,0,0,13.28-7.49c-.28-.4-.53-.77-.79-1.12a118.6,118.6,0,0,1-15.57-26.88,76.08,76.08,0,0,1-5.41-21.08c-.29-3-.46-6.12-.46-9.18q0-57.37,0-114.75a25.87,25.87,0,0,0-2.28-10,129.6,129.6,0,0,0-24.21-38.41c-1.06-1.16-2.26-2.18-3.41-3.26-.24-.23-.53-.42-1-.8-1.9,2-3.94,3.86-5.67,6a107.33,107.33,0,0,0-18.7,33.68,40.3,40.3,0,0,0-2.27,13.18q.06,76,0,152.05v1.53h-23v-1.4q0-75.45,0-150.89a34.42,34.42,0,0,0-2-11.94,126.5,126.5,0,0,0-21.27-38c-1-1.21-2.17-2.27-3.22-3.44a.89.89,0,0,0-1.52,0c-3,3-6.22,5.84-9,9.07a109.24,109.24,0,0,0-16.39,26.1,45.59,45.59,0,0,0-4.07,13.24,24.67,24.67,0,0,0-.17,3.1c0,1.68,0,3.37,0,5.06q0,73.89,0,147.79v1.4h-23V81.24c0-11.75-1.51-23.25-5.51-34.34A74.23,74.23,0,0,0,15.79,22.16c-1.17-1.31-2.5-2.48-3.85-3.8L27.05,1A77.07,77.07,0,0,1,40.43,16.5,100.3,100.3,0,0,1,50,34.56c.28-.4.49-.7.69-1A124.19,124.19,0,0,1,69.13,10.4C72.91,6.79,77,3.53,81.88,1.52A18.52,18.52,0,0,1,99.06,2.84a42.16,42.16,0,0,1,10.24,8.82c6.87,7.76,12.33,16.5,17.25,25.59.15.27.29.53.53,1,.36-.67.66-1.23,1-1.79a116.55,116.55,0,0,1,18.08-25.69,38.17,38.17,0,0,1,12.07-9c6-2.64,11.77-2.1,17.41,1a43.35,43.35,0,0,1,10.69,8.64,151.58,151.58,0,0,1,29.5,46.42A47.3,47.3,0,0,1,219.65,77c-.18,7.09,0,14.19,0,21.29ZM236,116c-1,1.35-2,2.61-2.82,4A94.08,94.08,0,0,0,223,142.9c-1.89,6.13-3.37,12.36-3.39,18.83,0,10.09,0,20.18,0,30.27a51,51,0,0,0,1.72,13.07,78.83,78.83,0,0,0,10.91,23.19c1,1.49,2,3,3.16,4.6,1.5-2.38,3-4.54,4.27-6.79,6.51-11.21,10.23-23.38,12.37-36.1a155.44,155.44,0,0,0,2-22.9,95.48,95.48,0,0,0-2-21.6A60.73,60.73,0,0,0,242.77,123,26.07,26.07,0,0,0,236,116Z" transform="translate(-11.94 0)"/>`;
        break;
      case "Libra":
        // return "./assets/img/libra.svg";
        return `<path d="M299.93,191.38H181.67c0-.64-.08-1.21-.08-1.78,0-7.51,0-15,0-22.54a2.74,2.74,0,0,1,1.41-2.63c10.5-7.05,19.14-15.81,24.14-27.62,8.79-20.74,6.43-48-14.07-67.32-10.41-9.83-22.49-16-36.81-17.15-19.32-1.61-36,4.19-49.8,18.08-9.4,9.49-15.65,20.59-17.3,34-2.72,22,4.09,40.43,21.18,54.82,2.36,2,5,3.7,7.41,5.6a2.4,2.4,0,0,1,.92,1.51c0,8.27,0,16.54,0,24.95H.19V163.46h83c-1-1-1.62-1.72-2.26-2.42-8.89-9.64-15.62-20.54-18.47-33.45a77.73,77.73,0,0,1,9.39-58.31C83.19,50.36,99.2,36.7,120.06,29.13c12-4.34,24.43-5.58,37.13-4.72A82.91,82.91,0,0,1,197.68,37.6c16.82,11,29.92,25.26,37,44.36,6,16.19,7.15,32.76,2.23,49.49-3.28,11.17-9.37,20.76-17.18,29.3-.59.64-1.19,1.27-1.78,1.92a7.61,7.61,0,0,0-.44.65c.65,0,1.14.11,1.63.11h79.37a14,14,0,0,0,1.45-.14Z" transform="translate(-0.07 -24.15)"/><path d="M.07,275V247.31c.63,0,1.15-.08,1.68-.08H299.93V275Z" transform="translate(-0.07 -24.15)"/>`;
        break;
      case "Scorpio":
        // return "./assets/img/scorpio.svg";
        return `<path d="M205.17,300c-6-3.55-12.16-6.73-17.88-10.72-12.51-8.72-17.76-22.73-21.56-37.69-5.9-23.19-8.27-47-9.88-70.89-2.9-43.08-1.46-86.19-.73-129.29.06-3.93-1.18-5.13-4.39-6.24-10.24-3.55-20.36-5.54-30.87-1.32C117,45,115.71,46.44,115.73,50c.26,54.22.37,108.44.65,162.67A12,12,0,0,0,118.5,219c3.34,4.9,7,9.52,11,14.73-11.14,6.39-18.25,16.2-22,29.82-7.64-6.61-14.71-12.69-21.75-18.83-8.43-7.36-8.66-7.52-3.7-17.78a48.67,48.67,0,0,0,4.76-22.32c-.27-51-.19-101.9-.23-152.84v-7c-12.66-2.24-25-5-36,4.81a10.24,10.24,0,0,0-3,6.67q.06,80.24.54,160.48a14.92,14.92,0,0,0,1.54,6.11c2.69,5.59,5.64,11,8.79,17.1-10.19,6.21-16.35,16.16-21.7,27.49-1.17-1-2.21-1.71-3.1-2.62-6.54-6.65-13-13.42-19.63-20-2.12-2.09-3.21-3.89-1.43-6.87,7.51-12.58,8.06-26.59,8-41.19-.36-46.94-.05-93.88,0-140.83V49.57L0,45C6.17,33.45,12,22.47,18.1,11.12c10,5.79,21.14,9.56,33.51,8.17l-2.5,15.36,1,.71A60.06,60.06,0,0,0,55,29.06c3.76-6.39,7.22-13,11-19.36.8-1.35,2.79-3.11,3.81-2.82a97.08,97.08,0,0,0,41.25,2.2V28.47l1.15.32L127.14,4C137.21,5.85,147,8.36,156.86,9.26s20,.2,30.34.2c-.63,6.81-1.73,14.29-1.95,21.79-.94,32.16-2.36,64.33-2.13,96.48.17,22.3,2.24,44.63,4.36,66.84,2,20.56,5.14,41,12.75,60.15a63.78,63.78,0,0,0,7.51,13.94c6.75,9.24,15.17,10.91,23.88,3.85a93,93,0,0,0,16.81-18.17c5.76-8.09,10.33-17.23,15.36-26a8.15,8.15,0,0,0,1-4.82L232.07,246.3c-.48-4-.37-7.55-1.39-10.65-3.13-9.49,1.2-14.13,7.92-19,20.71-15.11,41-31,61.4-46.54v88.44l-18.39,11.71V230.58a18.76,18.76,0,0,0-4.59,6c-10.34,18.54-20.58,37.28-36.42,50.85-5.91,5.07-13,8.41-19.62,12.53Z" transform="translate(0 -4)"/>`;
        break;
      case "Sagittarius":
        // return "./assets/img/sagittarius.svg";
        return `<path d="M104.72,213.24c-25.82,25.88-51,51.12-76.18,76.35C19.12,299,12.39,300.41,6.06,294.3-.48,288,.92,281,10.74,271.22q34.71-34.73,69.5-69.38c2.05-2,4.89-3.28,7.9-5.25L33.75,142.4c-1.13-1.12-2.34-2.18-3.39-3.38-5.22-5.86-5.18-13.64.05-18.58s12.83-4.68,18.58,1q24.67,24.44,49.1,49.13a75.82,75.82,0,0,1,5.15,6.27L252.79,27.29c-2-.15-4.2-.47-6.4-.47q-43.9,0-87.81.13c-8.58,0-14.16-5.16-14-12.84.2-7.37,5.75-12.23,13.83-12.26q60.67-.23,121.33-.49C295.36,1.3,299,5,299,20.61q-.15,60.68-.3,121.34c0,8.67-5.07,14.18-12.77,14.06s-12.51-5.87-12.51-14.47c0-31.38,0-62.75,0-92.88L124.74,197.3c10.81,10.77,23.24,23.15,35.65,35.53,5.28,5.26,10.59,10.49,15.8,15.81,7,7.18,7.71,14.66,2,20.26s-13.08,4.79-20.26-2.36C140.4,249.07,123,231.53,104.72,213.24Z" transform="translate(-2.05 -1.36)"/>`;
        break;
      case "Capricorn":
        // return "./assets/img/capricorn.svg";
        return `<path d="M60.65,224.94h-25v-1.63q0-70.58,0-141.14c0-11.73-1.64-23.16-6-34.11-4.27-10.75-10.28-20.34-19.13-28a2.38,2.38,0,0,1-.27-.37L26,.4C37.11,9.71,45,21.24,51.09,34.39c.29-.42.56-.76.8-1.11,5.47-8.15,11.46-15.9,18.74-22.53a67.75,67.75,0,0,1,9.09-7c8.42-5.37,17-4.91,25.2.89,6.76,4.81,12.26,10.87,17.36,17.33A156.26,156.26,0,0,1,143.76,57.3a51.61,51.61,0,0,1,4.46,20.83c-.13,28.79,0,57.59-.06,86.38A47.1,47.1,0,0,0,157.89,194a44.82,44.82,0,0,0,14.35,12.23c.24.13.51.22.93.4V205c.08-9-.17-18.09.32-27.11a58.13,58.13,0,0,1,11.25-32.19,49.49,49.49,0,0,1,29.65-19.18,68.77,68.77,0,0,1,23.72-.9,59.17,59.17,0,0,1,21.35,6.54,45.77,45.77,0,0,1,20.37,21.31,60.49,60.49,0,0,1,3.58,43.11c-4.26,14.92-13.7,25.87-27.23,33.33a62.27,62.27,0,0,1-30.31,7.6c-9.88,0-19.76,0-29.63,0a1.18,1.18,0,0,0-1.38,1c-10.05,30.81-31.05,50.11-62,58.85a77,77,0,0,1-21,2.7q-12.63,0-25.26,0h-.84V275h1.31c8.13,0,16.26.2,24.38,0,24.54-.69,43-11.73,55.17-33.07a67.33,67.33,0,0,0,2.93-6.47c.36-.83.61-1.71.94-2.64-1.68-.7-3.31-1.31-4.88-2-22-10.21-35.59-27.22-40.92-50.84a68.64,68.64,0,0,1-1.52-15.13c0-28.76,0-57.51,0-86.26a28.44,28.44,0,0,0-2.43-11.37,124.56,124.56,0,0,0-13.31-23.25A95,95,0,0,0,93.11,27.13c-1.73-1.53-1.35-1.58-3.22-.05A82.94,82.94,0,0,0,75.63,42.93,101.81,101.81,0,0,0,63.28,64.71a36.13,36.13,0,0,0-2.7,13.85c.12,21.08.07,42.17.07,63.25q0,40.69,0,81.39Zm137.52-12.5.81,0c9,0,18.08,0,27.12,0a37.55,37.55,0,0,0,16-3.47c8.6-4,14.77-10.35,17.39-19.62a36.57,36.57,0,0,0-1.24-22.94,22.38,22.38,0,0,0-13.67-13.69,43.7,43.7,0,0,0-23.34-2.11c-9.08,1.55-15.51,6.69-19.39,15-2.75,5.89-3.64,12.16-3.65,18.59q0,13.42,0,26.86Z" transform="translate(-10.27 0)"/>`;
        break;
      case "Aquarius":
        // return "./assets/img/aquarius.svg";
        return `<path d="M271.07,50.34,300,118.12l-18.43,8.12L262.05,79.93l-70.83,46.29c-6.56-15.43-13.06-30.69-19.7-46.29l-70,46.29c-6.58-15.5-13-30.72-19.63-46.29L11.09,126.25.15,110,90.63,50.34l20,46.3L181,50.35l19.69,46.29Z" transform="translate(0 -50.34)"/><path d="M10.91,251,0,234.71l90.46-59.6c6.66,15.42,13.23,30.66,20,46.29l70.38-46.28c6.59,15.48,13.08,30.75,19.69,46.29l70.39-46.3c9.67,22.64,19.25,45.09,28.94,67.77L281.41,251,261.94,204.7,191.22,251l-19.7-46.29-70,46.29c-6.6-15.42-13.13-30.69-19.8-46.29Z" transform="translate(0 -50.34)"/>`;
        break;
      case "Pisces":
        // return "./assets/img/pisces.svg";
        return `<path d="M241.33.08q14,0,28,0c.36,0,1.17-.47,1,.56A289.28,289.28,0,0,0,246,30.84c-19.78,28.21-33.44,58.87-37.26,93.45-.33,2.94-.53,5.9-.8,9h60.64v21.35H208c0,.69,0,1.22,0,1.75a188.87,188.87,0,0,0,8.67,55.19,209.9,209.9,0,0,0,30.07,59.26,257.6,257.6,0,0,0,23.63,28.5c.18.9-.51.57-.88.57-4.1,0-8.2,0-12.3,0H239.57a14.72,14.72,0,0,0-.89-1.29,251,251,0,0,1-43.2-70.4c-9.58-23.34-15.81-47.45-16-72.87a3.48,3.48,0,0,0-.13-.69H120.7c0,.54-.08,1-.09,1.49A168.71,168.71,0,0,1,115.5,195c-9.3,36.93-26.3,70-50.36,99.41L60.63,300H29.3a276.05,276.05,0,0,0,23.92-28.83c14.23-19.87,25.21-41.35,31.87-64.94A190.32,190.32,0,0,0,92.16,156c0-.42,0-.84-.09-1.41H31.5V133.23H92.13a167.14,167.14,0,0,0-3.25-25C84.2,85.4,75.2,64.33,63.12,44.52A289.12,289.12,0,0,0,29.3.08H58.87c.27.34.52.7.82,1A250.4,250.4,0,0,1,86.56,35.6a218.18,218.18,0,0,1,33.83,96.13c.13,1.22.53,1.6,1.79,1.59q27.88-.06,55.78,0c.48,0,.95,0,1.49-.08.05-.31.08-.55.12-.78,1-6.32,1.71-12.67,2.9-19a218.83,218.83,0,0,1,35.2-84A261.25,261.25,0,0,1,241.33.08Z" transform="translate(-29.3 0)"/>`;
        break;
      default:
        // // console.log("default");
        break;
    }
  }

  static getSignWordSVG(sign) {
    switch (sign) {
      case "Aries":
        return `<text transform="rotate(88.854 -12.926 30.334)" font-size="252.05" font-family="WolpePegasus-Regular">
    Ari
  </text>`;
        break;
      case "Taurus":
        return `<text transform="rotate(88.854 7.47 9.713)" font-size="252.05" font-family="WolpePegasus-Regular">
    Tau
  </text>`;
        break;
      case "Gemini":
        return `<text transform="rotate(88.854 7.47 9.713)" font-size="240" font-family="WolpePegasus-Regular">
    Gem
  </text>`;
        break;
      case "Cancer":
        return `<text transform="rotate(88.854 7.47 9.713)" font-size="252.05" font-family="WolpePegasus-Regular">
    Can
  </text>`;
        break;
      case "Leo":
        return `<text transform="rotate(88.854 2.112 15.074)" font-size="252.05" font-family="WolpePegasus-Regular">
    Leo
  </text>`;
        break;
      case "Virgo":
        return `<text transform="rotate(88.854 7.47 9.713)" font-size="252.05" font-family="WolpePegasus-Regular">
    Vir
  </text>`;
        break;
      case "Libra":
        return `<text transform="rotate(88.854 -11.61 29.074)" letter-spacing="25" font-size="252.05" font-family="WolpePegasus-Regular">
    Lib
  </text>`;
        break;
      case "Scorpio":
        return `<text transform="rotate(88.854 7.47 9.713)" font-size="252.05" font-family="WolpePegasus-Regular">
    Sco
  </text>`;
        break;
      case "Sagittarius":
        return `<text transform="rotate(88.854 7.47 9.713)" font-size="252.05" font-family="WolpePegasus-Regular">
    Sag
  </text>`;
        break;
      case "Capricorn":
        return `<text transform="rotate(88.854 .623 10.473)" font-size="252.05" font-family="WolpePegasus-Regular">
    Cap
  </text>`;
        break;
      case "Aquarius":
        return `<text transform="rotate(88.854 7.47 9.713)" font-size="252.05" font-family="WolpePegasus-Regular">
    Aqu
  </text>`;
        break;
      case "Pisces":
        return `<text transform="rotate(88.854 -14.881 32.32)" letter-spacing="25" font-size="252.05" font-family="WolpePegasus-Regular">
    Pis
  </text>`;
        break;
      default:
        // console.log("default");
        break;
    }
  }

  static descDict = Object.freeze({
    Aries: "Libra",
    Taurus: "Scorpio",
    Gemini: "Sagittarius",
    Cancer: "Capricorn",
    Leo: "Aquarius",
    Virgo: "Pisces",
    Libra: "Aries",
    Scorpio: "Taurus",
    Sagittarius: "Gemini",
    Capricorn: "Cancer",
    Aquarius: "Leo",
    Pisces: "Virgo",
  });

  static signs = Object.freeze([
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ]);

  static planets = Object.freeze([
    "Sun",
    "Moon",
    "Ascendant",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
    "Descendant",
  ]);

  static reducedPlanets = Object.freeze([
    "Sun",
    "Moon",
    "Ascendant",
  ]);
}

export default SmallBirthChart;
