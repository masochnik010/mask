// Данные и Базы
const user = require("../src/logica/user.js"); // Пользователи
const vrag = require("../src/logica/vrag.js"); // Враги
const loc = require("../src/logica/loc.js"); // Локации
const nps = require("../src/logica/nps.js"); // нпс
const lyt = require("../src/logica/lyt.js"); // броня и оружие
const brow = require("../src/logica/brow.js");
// Механики и Логика
const yron = require("../src/logica/yron.js"); // Урон
const lvl = require("../src/logica/lvl.js"); // Уровни
const prch = require("../src/logica/prch.js"); // Шансы %
const nav = require("../src/logica/nav.js"); // Движение
const saveSys = require("./save.js"); // Сохранение

// Главный движок
const engine = require("../src/index.js"); // Движок в src/index.js

engine.start({
  nps,
  brow,
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
