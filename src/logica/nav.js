const nav = {
  where: function(user, loc) {
    return loc.list[user.loc].ex;
  },
  kyda: function(user, dir, loc) {
    const exit = this.where(user, loc);
    if (exit && exit[dir]) {
      const nexLoc = exit[dir];
      user.loc = nexLoc;
      return {
        success: true,
        msg: `успешный переход в ${loc.list[nexLoc].name}`,
      };
    }
    return {
      success: false,
      msg: `туда нельзя идти`,
    };
  },
};

if (typeof module !== "undefined") module.exports = nav;
