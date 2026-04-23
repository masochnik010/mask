
// Данные и Базы
const user    = require('../src/logica/user.js'); //пользователи 
const vrag    = require('../src/logica/vrag.js');   // Враги
const locau   = require('../src/logica/locau.js');  // Локации
const brow    = require('../src/logica/brow.js');

// Механики и Логика
const yron    = require('../src/logica/yron.js');   // Урон
const lvl     = require('../src/logica/lvl.js');    // Уровни
const nrount  = require('../src/logica/nrount.js'); // Шансы %
const neredv  = require('../src/logica/neredv.js'); // Движение
const saveSys = require('./save.js');               // Сохранение

// Главный движок
const engine  = require('../src/logica/index.js');

// ЗАПУСК
engine.start({
    brow,
    user,
    vrag,
    locau,
    yron,
    lvl,
    nrount,
    neredv,
    saveSys
});