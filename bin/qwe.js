const user = require("../src/logica/user.js");
const vrag = require("../src/logica/vrag.js");
const loc = require("../src/logica/loc.js");
const nps = require("../src/logica/nps.js");
const lyt = require("../src/logica/lyt.js");
const yron = require("../src/logica/yron.js");
const lvl = require("../src/logica/lvl.js");
const prch = require("../src/logica/prch.js");
const nav = require("../src/logica/nav.js");
const saveSys = require("./save.js");
const engine = require("../src/index.js");

const systems = { nps, user, vrag, loc, yron, lvl, prch, nav, saveSys, lyt };

global.data = systems;

global.systemsEngine = engine;
global.systemsEngine.start(systems);

if (nav) nav.data = systems;
if (saveSys) saveSys.data = systems;

let lastLogText = global.systemsEngine.comands("");

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

const filePath = path.join(__dirname, "data.json");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ comand: "" }, null, 2), "utf8");
}

app.get("/api/state", (req, res) => {
  const activeLocKey = systems.user.loc || "centre";
  const roomObj = systems.loc.list[activeLocKey];

  res.json({
    user: systems.user,
    actCom: global.systemsEngine.actCom,
    currentRoom: roomObj || { name: activeLocKey, description: "Опасная зона" },
    logText: lastLogText,
  });
});

app.post("/api/command", (req, res) => {
  const rawInput = req.body.command || req.body.comand || req.body.textCommand;

  if (rawInput !== undefined && rawInput !== null) {
    lastLogText = global.systemsEngine.comands(String(rawInput).trim());
  }

  const activeLocKey = systems.user.loc || "centre";
  const roomObj = systems.loc.list[activeLocKey];

  res.json({
    user: systems.user,
    actCom: global.systemsEngine.actCom,
    currentRoom: roomObj || { name: activeLocKey, description: "Опасная зона" },
    logText: lastLogText,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`в браузере напиши http://localhost:3000/src/index.html`);
});
