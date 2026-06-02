const nav = {
  where: function() {
    return data.loc.list[data.user.loc].ex;
  },
  //команда север
  kyda: function(com) {
    const usLoc = data.user.loc;
    const locEx = data.loc.list[usLoc].ex;

    if (locEx[com]) {
      data.user.loc = locEx[com];
      return { success: true, msg: "Туда можно" };
    } else {
      return { success: false, msg: "Туда нельзя" };
    }
  },
};

if (typeof module !== "undefined") module.exports = nav;
