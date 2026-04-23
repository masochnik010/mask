
const user    = require('./src/logica/user.js');
const vrag    = require('./src/logica/vrag.js');
const locau   = require('./src/logica/locau.js');
const neredv  = require('./src/logica/neredv.js');
const nrount  = require('./src/logica/nrount.js');
const yron    = require('./src/logica/yron.js');
const saveSys = require('./save.js'); 

const engine  = require('./src/logica/index.js');

engine.run({
    saveSys,
    user,
    vrag,
    locau,
    neredv,
    nrount,
    yron
});