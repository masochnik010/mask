const fs = require("fs");
const path = require("path");
const put = path.resolve(__dirname, "savDeta.json");

const dvi = {
  data: null,
  actCom: null,
  //деструктурирующее присваивание
  start: function(systems) {
    const { user } = systems;
    dvi.data = systems;
  },

  loading: function(Uslot) {
    const q = JSON.parse(fs.readFileSync(put, "utf8"));
    q[Uslot] = dvi.data.user;
    const qwe = JSON.stringify(q, null, 2);
    fs.writeFileSync(put, qwe, "utf8");
    return `загружен`;
  },

  unloading: function(Uslot) {
    const q = JSON.parse(fs.readFileSync(put, "utf8"));
    dvi.data.user = q[Uslot];
    return `выгружен`;
  },
};
// JSON.parse()
//— преобразует строку JSON в объект.
// JSON.stringify()
//— преобразует объект в строку JSON.
