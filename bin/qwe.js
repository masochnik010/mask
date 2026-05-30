// Данные и Базы
const user = require("../src/logica/user.js"); // Пользователи
const vrag = require("../src/logica/vrag.js"); // Враги
const loc = require("../src/logica/loc.js"); // Локации
const nps = require("../src/logica/nps.js"); // нпс
const lyt = require("../src/logica/lyt.js"); // броня и оружие

// Механики и Логика
const yron = require("../src/logica/yron.js"); // Урон
const lvl = require("../src/logica/lvl.js"); // Уровни
const prch = require("../src/logica/prch.js"); // Шансы %
const nav = require("../src/logica/nav.js"); // Движение
const saveSys = require("./save.js"); // Сохранение

// Главный движок
const engine = require("../src/index.js"); // Движок в src/index.js

// Подключаем встроенные инструменты Node.js для вызова браузера
const { exec } = require("child_process");
const path = require("path");

// ЗАПУСК И СВЯЗЫВАНИЕ МОДУЛЕЙ ДЛЯ ГИБРИДНОСТИ
engine.start({
  nps,
  brow: "null", // Заглушка, так как в консоли браузера нет
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

// АВТОМАТИЧЕСКИЙ ВЫЗОВ ОКНА ИГРЫ В БРАУЗЕРЕ
const htmlPath = path.resolve(__dirname, "../src/index.html");

// Формируем команду под ОС (Windows / Mac / Linux)
const startCommand =
  process.platform === "win32"
    ? `start "" "${htmlPath}"`
    : process.platform === "darwin"
    ? `open "${htmlPath}"`
    : `xdg-open "${htmlPath}"`;


