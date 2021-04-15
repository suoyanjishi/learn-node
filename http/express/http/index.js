const fs = require("fs");
const game = require("./game");
const express = require("express");

let playerWon = 0;
let playerLastAction = null;
let sameCount = 0;

const app = express();

app.get("/favicon.ico", function (request, response) {
  response.status(200);
  return;
});

app.get(
  "/game",
  function (request, response, next) {
    if (playerWinCount >= 3 || sameCount === 9) {
      response.status(500);
      response.send("我不会再玩了！");
      return;
    }
    next();
    if (response.playerWon) {
      playerWinCount++;
    }
  },
  function (request, response, next) {
    const query = request.query;
    const playerAction = query.action;

    if (!playerAction) {
      response.status(400);
      response.send();
      return;
    }

    if (lastPlayerAction === playerAction) {
      sameCount++;
      if (sameCount >= 3) {
        response.status(400);
        response.send("你作弊！我再也不玩了");
        sameCount = 9;
        return;
      }
    } else {
      sameCount = 0;
    }
    lastPlayerAction = playerAction;

    response.playerAction = playerAction;
    next();
  },
  function (request, response) {
    const playerAction = response.playerAction;
    const result = game(playerAction);

    response.status(200);
    if (result === 0) {
      response.send("平局");
    } else if (result === -1) {
      response.send("你输了");
    } else {
      response.send("你赢了");
      response.playerWon = true;
    }
  }
);

app.get("/", function (request, response) {
  response.send(fs.readFileSync(__dirname + "./index.html", "utf-8"));
});

app.listen(3000);
