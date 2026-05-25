const prch = {
  // Ваша базовая функция случайного диапазона
  randomNum: function(min, max) {
    const q = Math.random() * (max - min) + min;
    return Math.round(q);
  },

  // Ваша функция от 1 до 10
  Num1_10: function() {
    const q = Math.random() * 10 + 1;
    return Math.round(q);
  },

  // Ваша функция от 1 до 100
  Num1_100: function() {
    const q = Math.random() * 100 + 1;
    return Math.round(q);
  },

  // Ваша функция от 1 до 1000
  Num1_1000: function() {
    const q = Math.random() * 1000 + 1;
    return Math.round(q);
  },

  // Проверка шанса в процентах через ваш метод Num1_100
  checkChance: function(percent) {
    return this.Num1_100() <= percent;
  },

  // Проверка встречи с монстром при ходьбе (шанс 40%)
  checkEnemyEncounter: function(currentLocObj) {
    if (currentLocObj.isSafe) return false;
    return this.checkChance(40);
  },

  // Выбор случайного имени монстра через ваш метод randomNum
  getRandomEnemyName: function(enemiesArray) {
    if (!enemiesArray || enemiesArray.length === 0) return null;
    const randomIndex = this.randomNum(0, enemiesArray.length - 1);
    return enemiesArray[randomIndex];
  },

  // Расчет критического удара игрока
  calculateCrit: function(baseDamage, critChance) {
    const isCritHit = this.checkChance(critChance);
    if (isCritHit) {
      return { damage: baseDamage * 2, isCrit: true };
    }
    return { damage: baseDamage, isCrit: false };
  },

  // Расчет выпадения лута после смерти монстра (шанс 50%)
  tryGetRandomDrop: function(currentLocObj) {
    if (!currentLocObj.lootPool || currentLocObj.lootPool.length === 0)
      return null;

    if (this.checkChance(50)) {
      const randomIndex = this.randomNum(0, currentLocObj.lootPool.length - 1);
      return currentLocObj.lootPool[randomIndex];
    }
    return null;
  },
};

if (typeof module !== "undefined") {
  module.exports = prch;
}
