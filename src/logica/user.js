const user = {
  hp: 100,
  mana: 100,
  crit: 20, //20%
  xp: 0,
  lvl: 1,
  acvip: "null",
  arrmor: "null",
  slot1: "null",
  slot2: "null",
  slot3: "null",
  slot4: "null",
  slot5: "null",
  slot6: "null",
  slot7: "null",
  slot8: "null",
  slot9: "null",
};
//это на подобии импорта 
//(не зыбыть добавить в другие js)
if (typeof module !== 'undefined') {
    module.exports = user;
}
