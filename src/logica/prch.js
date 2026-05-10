const prch = {
  randomNum: function(min, max) {
    const q = Math.random() * (max - min) + min;
    return Math.round(q);
  },
  Num1_10: function() {
    const q = Math.random() * 10 + 1;
    return Math.round(q);
  },
  Num1_100: function() {
    const q = Math.random() * 100 + 1;
    return Math.round(q);
  },
  Num1_1000: function() {
    const q = Math.random() * 1000 + 1;
    return Math.round(q);
  },
};
if (typeof module !== "undefined") module.exports = prch;
