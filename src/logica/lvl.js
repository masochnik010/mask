function lvl(xp, lvlUser) {
  const xpNAlvl = lvlUser * 2 + 3;
  if (xp === "0" || xp < lvlUser) {
    return lvlUser;
  }
  let lvlup = lvlUser + 1;
  const xpUpLimit = [];
  if (xp > xpNAlvl) {
    xpUpLimit.push(xp - xpNAlvl);
  }
  const qwe = [lvlup, xpUpLimit];
  return qwe.flat();
}
console.log(lvl(10, 1));
