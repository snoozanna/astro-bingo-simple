import express from "express";
import http from "http";
// import url from "url";
import WebSocket from "ws";
import util from "util";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, port: 3001 });

// Each wss (web socket server) has a number of..
// ws is that particular web socket
// req is the request object
wss.on("connection", function connection(ws, req) {
  // console.log('connection', ws);
  // const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on("message", function incoming(message) {
    // console.log("received: %s", message);
    console.log(util.inspect(message, false, 7, true));

    for (const client of wss.clients) {
      // console.log('client', client);
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });
});

wss.on("error", function connection(err) {
  console.log(err);
});

export default app;
