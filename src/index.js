const dvi = {
  data: null,
  actCom: null,
  //деструктурирующее присваивание
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
    console.log("запущено");
    dvi.data = systems;
  },
  comands: function(com) {
    const data = dvi.data;
    const command = com.trim().toLowerCase();

    //проверка на бой
    if (dvi.actCom) {
      if (command === "бой") {
        return `ты уже в бою с ${dvi.actCom.name}`;
      }
      return dvi.battle;
    }
    //ёрик квесты
    if (command.startsWith("говорить с ёриком") || command.startsWith("ёрик")) {
      const usLoc = data.user.loc;
      const loca = data.loc.list[usLoc].nps;
      if (loca.includes("yorick")) {
        return data.nps.list[1].yorick.quests;
      }
      return "тут нету ёрика";
    }
    //валера торговец
    if (
      command.startsWith("говорить с валерой") ||
      command.startsWith("валера")
    ) {
      const usLoc = data.user.loc;
      const loca = data.loc.list[usLoc].nps;
      if (loca.includes("valera")) {
        return data.nps.list[1].valera.quests;
      }
      return "тут нету валеры";
    }
    //*крик души*АААААААААААААААААААААААААААААААААААА

    if (command.startsWith("купить ")) {
      const item = command.split(" ");
      const muni = data.user.gold;
      const product = data.nps.list[0].valera.products;
      const Buy = product[item[1]];
      const tovarBuy = Buy[1];
      const tovaritem = Buy[0];
      if (tovarBuy > muni) {
        return `тебе не хватает ${tovarBuy - muni}`;
      }

      const slotUser = prompt("ведите слот инвенторя 1-9");
      const slotNum = "slot" + slotUser;
      if (isNaN(slotUser)) {
        return `разрешены только числа `;
      } else if (slotUser > 9) {
        return `у тебя нету столько места`;
      } else if (slotUser <= 0) {
        return `у тебя нету столько места`;
      }
      if (data.user[slotNum] !== "null") {
        return "место неть";
      }
      data.user[slotNum] = tovaritem;
      data.user.gold = muni - tovarBuy;
      return `спасибо за покупку ${data.user.name}`;
    }
    //а у меня пицца и сосиски в тесте, домашние. А у вас? (•ω•) 30.05.2026

    if (command.startsWith("взять ")) {
      const quest = command.split(" ");
      const questUser = data.user.que;
      const product = data.nps.list[0].yorick.quests;
      const Buy = product[item[1]];
      const purpose = Buy[0];
      const quantity = Buy[1];
      const prise = Buy[2];
      if (questUser === nill) {
        return `квест уже есть`;
      }
      data.user.que = purpose;
      return `вызяли квест на ${purpose} за ${prise} надо убить ${quantity}`;
    }
    //использование предметов из слотов
    if (command.startsWith("использовать ")) {
      const sep = command.split(" ");
      const slotSep = sep[1];
      const userSlot = data.user[slotSep];
      if (userSlot === "null") {
        return `слот пусть`;
      }
      const idItems = userSlot.toLowerCase().replace(" ", "_");
      const poti = data.lyt.potions[idItems];
      if (poti.healHp) {
        const heal = poti.healHp;
        const hpUs = data.user.MaxHp - data.user.hp;
        data.user.hp = data.user.hp + heal;
        if (data.uset.hp > data.user.MaxHp) {
          data.user.hp = data.user.MaxHp;
        }
      } else if (poti.healMana) {
        const heal = poti.healMana;
        const hpUs = data.user.MaxMana - data.user.mana;
        data.user.mana = data.user.mana + heal;
        if (data.uset.mana > data.user.MaxMana) {
          data.user.mana = data.user.MaxMana;
        }
      }
      data.user[slotSep] = "null";
      return `предмет ${poti.name} использован`;
    }
    //  баб зина медик
    if (
      command.startsWith("говорить с баб зиной") ||
      command.startsWith("баб зина")
    ) {
      const usLoc = data.user.loc;
      const loca = data.loc.list[usLoc].nps;
      if (loca.includes("bab_zinu")) {
        return data.nps.list[1].bab_zinu.heal;
      }
      return "тут нету баб зины";
    }
    if (q) {
    }
  },
  battle: function(bat) {},
};
