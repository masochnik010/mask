function lvl(xp, lvlUser) {
  const xpNAlvl = lvlUser * 2 + 3;
  if (xp === 0 || xp < xpNAlvl) {
    return [xp, lvlUser];
  }
  let lvlup = lvlUser + 1;
  let xpUpLimit = 0;
  if (xp > xpNAlvl) {
    xpUpLimit = xp - xpNAlvl;
  }
  const qwe = [xpUpLimit, lvlup];
  return qwe.flat();
}
if (typeof module !== "undefined") module.exports = lvl;
