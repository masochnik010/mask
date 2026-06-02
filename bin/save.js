const fs = require("fs");
const path = require("path");
const put = path.resolve(__dirname, "savDeta.json");

const saveSys = {
  data: null,
  //деструктурирующее присваивание
  start: function(systems) {
    const { user } = systems;
    saveSys.data = systems;
  },

  loading: function() {
    const q = JSON.parse(fs.readFileSync(put, "utf8"));
    q.slot1 = saveSys.data.user;
    const qwe = JSON.stringify(q, null, 2);
    fs.writeFileSync(put, qwe, "utf8");
    return `загружен`;
  },

  unloading: function() {
    const q = JSON.parse(fs.readFileSync(put, "utf8"));
    saveSys.data.user = q.slot1;
    return `выгружен`;
  },
};
if (typeof module !== "undefined") module.exports = saveSys;

// JSON.parse()
//— преобразует строку JSON в объект.
// JSON.stringify()
//— преобразует объект в строку JSON.
