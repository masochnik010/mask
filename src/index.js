const engine = {
  start: function(systems) {
    const {
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
    } = systems;
    console.log("Движок запущен. Мир загружен. Веселье начинается.");
  },
};

if (typeof module !== "undefined") module.exports = engine;
