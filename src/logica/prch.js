const prch = {
  // Ваша базовая функция случайного диапазона
  randomNum: function(min, max) {
    const q = Math.random() * (max - min) + min;
    return Math.round(q);
  },

  // от 1 до 10
  Num1_10: function() {
    const q = Math.random() * 10 + 1;
    return Math.round(q);
  },

  // от 1 до 100
  Num1_100: function() {
    const q = Math.random() * 100 + 1;
    return Math.round(q);
  },

  // от 1 до 1000
  Num1_1000: function() {
    const q = Math.random() * 1000 + 1;
    return Math.round(q);
  },

  crit: function(atc, critChance) {
    const chance = this.Num1_100();
    if (chance <= critChance) {
      return true;
    }
    return false;
  },

  // Расчет выпадения лута после смерти монстра (шанс 50%)
  RanDropChance: function() {
    const chance = this.Num1_100();
    if (chance <= 50) {
      return true;
    }
    return false;
  },
};

if (typeof module !== "undefined") {
  module.exports = prch;
}
