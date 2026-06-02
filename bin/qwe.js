// Данные и Базы
const user = require("../src/logica/user.js");
const vrag = require("../src/logica/vrag.js");
const loc = require("../src/logica/loc.js");
const nps = require("../src/logica/nps.js");
const lyt = require("../src/logica/lyt.js");
// Механики и Логика
const yron = require("../src/logica/yron.js");
const lvl = require("../src/logica/lvl.js");
const prch = require("../src/logica/prch.js");
const nav = require("../src/logica/nav.js");
const saveSys = require("./save.js");
const engine = require("../src/index.js");

const { exec } = require("child_process");
const path = require("path");
const os = require("os");

const htmlPath = path.resolve(__dirname, "../src/index.html");

let openCmd;
if (os.platform() === "win32") openCmd = `start "" "${htmlPath}"`;
else if (os.platform() === "darwin") openCmd = `open "${htmlPath}"`;
else openCmd = `xdg-open "${htmlPath}"`;

exec(openCmd); // Открываем браузер автоматически!

// Запуск движка (Твой блок один в один)
engine.start({
  nps,
  user,
  vrag,
  loc,
  yron,
  lvl,
  prch,
  nav,
  saveSys,
  lyt,
});
