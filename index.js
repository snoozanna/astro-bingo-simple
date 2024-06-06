import fs from "fs";
import app from "./server.js";

const { PORT = 3000, NODE_ENV } = process.env;

const isProd = NODE_ENV === "production";

// Read users.json file
const config = JSON.parse(
  fs.readFileSync("./.vscode/settings.json", { encoding: "utf8" }),
);
const DEV_SERVER_PORT = config["liveServer.settings.port"];

const WEB_HOST_PORT = isProd ? PORT : DEV_SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`Birthchart List page: http://localhost:${WEB_HOST_PORT}/`);
  console.log(
    `Add Birthchart page:  http://localhost:${WEB_HOST_PORT}/add-birth-data.html`,
  );
  console.log(
    `Calling Page:  http://localhost:${WEB_HOST_PORT}/generator.html`,
  );
  console.log(
    `Public grid page:  http://localhost:${WEB_HOST_PORT}/call-reporter.html`,
  );
  console.log(
    `Example Chart page:  http://localhost:${WEB_HOST_PORT}/example-chart.html`,
  );
});
