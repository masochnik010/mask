const yron = {
  damage: function(atk, dex) {
    const yron = atk - dex;
    return yron > 0 ? yron : 0;
  },
  rezyltat: function(hp, atk, dex) {
    const damg = this.damage(atk, dex);
    if (damg === 0) {
      return hp;
    }
    if (hp <= damg) {
      return 0;
    }
    return hp - damg;
  },
};

if (typeof module !== "undefined") module.exports = yron;
