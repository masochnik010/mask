const dvi = {
  data: null,
  actCom: null,
  currentSlot: null,

  start: function(systems) {
    const {
      nps,
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

    dvi.data = systems;
    dvi.currentSlot = "slot1";

    systems.saveSys.data = systems;
    if (nav) nav.data = systems;

    systems.saveSys.unloading("slot1");
    const saveData = systems.saveSys.data.user;

    if (saveData && saveData !== "null" && typeof saveData === "object") {
      Object.assign(systems.user, saveData);
      console.log("ЗАГРУЖЕНО!");
    } else {
      console.log("НОВАЯ ИГРА");
    }
  },

  loading: function(Uslot) {
    return dvi.data.saveSys.loading(Uslot);
  },

  unloading: function(Uslot) {
    return dvi.data.saveSys.unloading(Uslot);
  },

  comands: function(com) {
    const data = dvi.data;
    const user = data.user;
    const yron = data.yron;
    const prch = data.prch;
    const nps = data.nps;

    const fs = require("fs");
    const path = require("path");
    const dataJsonPath = path.resolve(__dirname, "../bin/data.json");

    const command = com.trim().toLowerCase();

    if (fs.existsSync(dataJsonPath)) {
      try {
        fs.writeFileSync(dataJsonPath, "{}");
      } catch (e) {
        console.error("Ошибка очистки файла в {}", e);
      }
    }

    if (command === "сохранить") {
      return data.saveSys.loading();
    }
    if (command === "загрузить") {
      return data.saveSys.unloading();
    }

    if (command.startsWith("использовать ")) {
      const sep = command.split(" ");
      const slotSep = sep[1];
      const userSlot = data.user["slot" + slotSep];
      if (userSlot === "null" || !userSlot) {
        return "слот пусть";
      }
      const idItems = userSlot.toLowerCase().replace(" ", "_");
      const poti = data.lyt.potions[idItems];
      if (!poti) return "Этот предмет нельзя использовать как зелье.";

      if (poti.healHp) {
        const heal = poti.healHp;
        data.user.hp = data.user.hp + heal;
        if (data.user.hp > data.user.MaxHp) {
          data.user.hp = data.user.MaxHp;
        }
      } else if (poti.healMana) {
        const heal = poti.healMana;
        data.user.mana = data.user.mana + heal;
        if (data.user.mana > data.user.MaxMana) {
          data.user.mana = data.user.MaxMana;
        }
      }
      data.user["slot" + slotSep] = "null";
      return "предмет " + poti.name + " использован";
    }

    if (dvi.actCom) {
      if (command === "бой") {
        return "ты уже в бою с " + dvi.actCom.name;
      }
      return dvi.battle(command);
    }

    if (command.startsWith("говорить с ёриком") || command.startsWith("ёрик")) {
      const usLoc = data.user.loc;
      const loca = data.loc.list[usLoc].nps;
      if (loca.includes("yorick")) {
        return (
          "Контракты Ёрика:\n1. Охота на Слизней (Надо убить: " +
          data.nps.list.yorick.quests.q1 +
          ")\nВведите 'взять q1', чтобы подписать договор."
        );
      }
      return "тут нету ёрика";
    }

    if (
      command.startsWith("говорить с валерой") ||
      command.startsWith("валера")
    ) {
      const usLoc = data.user.loc;
      const loca = data.loc.list[usLoc].nps;
      if (loca.includes("valera")) {
        return "Валера: Привет, путник! Можешь 'купить mech' за монеты или написать 'продать slot1-9', чтобы сдать хлам.";
      }
      return "тут нету валеры";
    }

    if (command.startsWith("купить ")) {
      const item = command.split(" ")[1];
      const muni = data.user.gold;
      const product = data.nps.list.valera.products;
      const Buy = product[item];
      if (!Buy) return "Валера: У меня нет такого товара!";

      if (Buy > muni) {
        return "тебе не хватает " + (Buy - muni);
      }

      const slotUser = prompt("введите слот инвентаря 1-9");
      const slotNum = "slot" + slotUser;
      if (isNaN(slotUser)) {
        return "разрешены только числа ";
      } else if (slotUser > 9 || slotUser <= 0) {
        return "у тебя нету столько места";
      }
      if (data.user[slotNum] !== "null") {
        return "место неть";
      }

      data.user[slotNum] = item;
      data.user.gold = muni - Buy;
      return "спасибо за покупку " + data.user.name;
    }

    if (command.startsWith("взять ")) {
      const item = command.split(" ")[1];
      const questUser = data.user.que;
      const product = data.nps.list.yorick.quests;
      const Buy = product[item];
      if (!Buy) return "Такого контракта нет у Ёрика!";

      if (questUser !== "null") {
        return "квест уже есть";
      }

      data.user.que = item;
      data.user.queProg = 0;
      return "взяли квест за " + Buy;
    }

    if (command.startsWith("продать ")) {
      const sep = command.split(" ");
      const Uslot = sep[1];
      if (!user["slot" + Uslot] || user["slot" + Uslot] === "null")
        return "Этот слот рюкзака пуст!";

      let itemObj = null;
      const itemKey = user["slot" + Uslot].toLowerCase().replace(" ", "_");

      if (data.lyt.armor[itemKey]) itemObj = data.lyt.armor[itemKey];
      else if (data.lyt.weapons[itemKey]) itemObj = data.lyt.weapons[itemKey];
      else if (data.lyt.magic[itemKey]) itemObj = data.lyt.magic[itemKey];

      if (!itemObj) return "Валера: Не тот тип, я такое не беру!";

      const buyItem = itemObj.price;
      data.user.gold = data.user.gold + buyItem;
      let oldName = data.user["slot" + Uslot];
      data.user["slot" + Uslot] = "null";
      return "вы продали " + oldName + " за " + buyItem + " монет.";
    }

    if (
      command.startsWith("говорить с баб зиной") ||
      command.startsWith("баб зина")
    ) {
      const usLoc = data.user.loc;
      const loca = data.loc.list[usLoc].nps;
      if (loca.includes("bab_zinu")) {
        return "Баба Зина: Привет, соколик! Напиши 'исцелиться 1', чтобы попить чайку за 5 золотых.";
      }
      return "тут нету баб зины";
    }

    if (command.startsWith("исцелиться ")) {
      const sep = command.split(" ");
      const slotSep = sep[1];
      const buyHeal = data.nps.list.bab_zinu.heal;
      const menHeal = buyHeal[slotSep];
      if (!menHeal) return "Баба Зина: Нет у меня такого отвара!";

      if (data.user.gold < menHeal) {
        return "не хватает " + (menHeal - data.user.gold);
      }
      data.user.hp = data.user.MaxHp;
      data.user.gold = data.user.gold - menHeal;
      return "вы исцелены";
    }

    if (command.startsWith("экиперовать ")) {
      const sep = command.split(" ");
      const slotSep = sep[1];
      const userSlot = data.user["slot" + slotSep];
      if (userSlot === "null" || !userSlot) {
        return "слот пусть";
      }
      const idItems = userSlot.toLowerCase().replace(" ", "_");

      if (data.lyt.weapons[idItems]) {
        const potiW = data.lyt.weapons[idItems];
        if (potiW.expensesSlot === 1) {
          const subspace_pocket = data.user.acvip;
          data.user.acvip = potiW.name;
          data.user["slot" + slotSep] = subspace_pocket;
          return "ты взял в основную руку " + potiW.name;
        }
      } else if (data.lyt.magic[idItems]) {
        const potiM = data.lyt.magic[idItems];
        if (potiM.expensesSlot === 1) {
          const subspace_pocket = data.user.acvip;
          data.user.acvip = potiM.name;
          data.user["slot" + slotSep] = subspace_pocket;
          return "ты взял в основную руку " + potiM.name;
        } else if (potiM.expensesSlot === 2) {
          const subspace_pocket = data.user.acvip2;
          data.user.acvip2 = potiM.name;
          data.user["slot" + slotSep] = subspace_pocket;
          return "ты взял в дополнительную руку " + potiM.name;
        }
      } else if (data.lyt.armor[idItems]) {
        const potiA = data.lyt.armor[idItems];
        if (potiA.expensesSlot === 4) {
          const subspace_pocket = data.user.arrmor;
          data.user.arrmor = potiA.name;
          data.user["slot" + slotSep] = subspace_pocket;
          return "ты надел " + potiA.name;
        } else if (potiA.expensesSlot === 2) {
          const subspace_pocket = data.user.acvip2;
          data.user.acvip2 = potiA.name;
          data.user["slot" + slotSep] = subspace_pocket;
          return "ты взял в дополнительную руку " + potiA.name;
        }
      }
      return "Этот предмет нельзя экипировать!";
    }

    if (command.startsWith("идти на ")) {
      const nap = command.replace("идти на ", "").trim();
      const kyd = data.nav.kyda(nap);
      if (kyd.success) {
        data.user.loc = kyd.newLoc || data.user.loc;
        dvi.loading(dvi.currentSlot);
        return "Вы успешно переместились!";
      }
      return kyd.msg;
    }

    if (command === "бой") {
      const currentLocKey =
        data.user.loc && data.user.loc !== "null" ? data.user.loc : "centre";
      const currentRoomObj = data.loc.list[currentLocKey];
      if (!currentRoomObj) return "Локация не прогружена.";

      const Vrags = currentRoomObj.enemies;
      if (!Vrags || Vrags.length === 0)
        return "На этой локации нет монстров, тут безопасно 💤";

      const col = Vrags.length - 1;
      const vragss = Vrags[data.prch.randomNum(0, col)];
      if (!vragss) return "Не удалось найти монстра.";

      let targetMonster =
        data.vrag[vragss] ||
        data.vrag[vragss.toLowerCase()] ||
        data.vrag["sliz"];
      if (!targetMonster) return "Монстр отсутствует в базе.";

      dvi.actCom = JSON.parse(JSON.stringify(targetMonster));

      if (!dvi.actCom.MaxHp && dvi.actCom.maxHp) {
        dvi.actCom.MaxHp = dvi.actCom.maxHp;
      }

      return "бой начат с " + dvi.actCom.name;
    }

    if (command.startsWith("сдать квест")) {
      if (data.user.que === "null") return "нет квеста";
      if (data.loc.list[data.user.loc].nps.includes("yorick")) {
        const qU = data.user.que;
        for (let i = 1; i <= 10; i++) {
          if (
            data.nps.list.yorick.quests["q" + i] &&
            data.nps.list.yorick.quests["q" + i] === qU
          ) {
            if (data.user.queProg >= data.nps.list.yorick.quests["q" + i]) {
              data.user.gold = data.user.gold + 10;
              data.user.que = "null";
              data.user.queProg = 0;
              dvi.loading(dvi.currentSlot);
              return "вы сдали квест";
            }
            return "ты еще не завершил квест";
          }
        }
      }
      return "ёрика нету";
    }

    if (command === "статы") {
      return (
        "Имя: " + user.name + " Уровень: " + user.lvl + " Золото: " + user.gold
      );
    }

    return "Неизвестная мирная команда.";
  },

  battle: function(bat) {
    const data = dvi.data;
    if (!data.actCom) return "узбагойся, боя нет";

    let MaxHp = data.user.MaxHp;
    let maxMana = data.user.MaxMana;
    let crit = data.user.crit;
    const lvl = data.user.lvl;
    let que = data.user.que;

    const acvip = data.user.acvip.toLowerCase().replace(" ", "_");
    const acvip2 = data.user.acvip2.toLowerCase().replace(" ", "_");
    const arrmor = data.user.arrmor.toLowerCase().replace(" ", "_");

    if (lvl > 1) {
      const lv = (lvl - 1) * 5;
      MaxHp = MaxHp + lv;
      maxMana = maxMana + lv;
      crit = crit + (lvl - 1) * 2;
    }

    const enemy = data.actCom;
    let logBattle = "";

    if (bat === "атака") {
      let dmg = 2;
      if (data.user.acvip !== "null") {
        const tip = data.lyt.weapons[acvip] ? "weapons" : "magic";
        if (tip === "weapons") {
          const atc = data.lyt.weapons[acvip].atk;
          dmg = dmg + atc;
        } else if (tip === "magic") {
          const expM = data.lyt.magic[acvip].expensesMana;
          const atcM = data.lyt.magic[acvip].magicAtac;
          if (data.user.mana >= expM) {
            dmg = dmg - 2 + atcM;
            data.user.mana = data.user.mana - expM;
          } else {
            dmg = dmg + 1;
          }
        }
      }
      dmg = Math.round(dmg * (1 + (lvl - 1) * 0.05));

      if (data.prch.crit(crit)) {
        dmg = dmg * 2;
        logBattle += "Крит! ";
      }

      if (dmg > 0) {
        const damage = data.yron.damage(dmg, enemy.def);
        enemy.hp = data.yron.rezyltat(enemy.hp, dmg, enemy.def);
        logBattle += "Вы нанесли " + enemy.name + " " + damage + " урона.\n";
      }

      if (enemy.hp <= 0) {
        data.user.xp += enemy.xpDrop;
        data.user.gold += 10;

        const lvlRezyltat = data.lvl(data.user.xp, data.user.lvl);
        if (lvlRezyltat > data.user.lvl) {
          data.user.xp = lvlRezyltat;
          data.user.lvl = lvlRezyltat;
          data.user.MaxHp += 5;
          data.user.MaxMana += 5;
          data.user.hp = data.user.MaxHp;
          data.user.mana = data.user.MaxMana;
          logBattle += "\nУРОВЕНЬ ПОВЫШЕН!\n";
        } else {
          data.user.xp = lvlRezyltat;
        }

        if (que !== "null" && enemy.name === que) {
          data.user.queProg += 1;
        }

        let dropText = "";
        if (enemy.drop && enemy.drop.length > 0) {
          const rand = data.prch.randomNum(0, enemy.drop.length - 1);
          const item = enemy.drop[rand];
          for (let i = 1; i <= 9; i++) {
            if (data.user["slot" + i] === "null") {
              data.user["slot" + i] = item;
              dropText = " Вы нашли предмет: " + item;
              break;
            }
          }
        }

        data.actCom = null;
        dvi.loading(dvi.currentSlot);
        return logBattle + "Монстр " + enemy.name + " повержен!" + dropText;
      }

      let playerDef = 0;
      if (arrmor !== "null" && data.lyt.armor[arrmor])
        playerDef += data.lyt.armor[arrmor].def;
      if (acvip2 !== "null" && data.lyt.armor[acvip2])
        playerDef += data.lyt.armor[acvip2].def;
      playerDef = Math.round(playerDef * (1 + (lvl - 1) * 0.05));

      const enemyDmg = data.yron.damage(enemy.atk, playerDef);
      data.user.hp = data.yron.rezyltat(data.user.hp, enemy.atk, playerDef);
      logBattle +=
        "Монстр " +
        enemy.name +
        " ударил вас в ответ на " +
        enemyDmg +
        " урона.\n";

      if (data.user.hp <= 0) {
        data.actCom = null;
        data.user.hp = data.user.MaxHp;
        data.user.loc = "centre";
        dvi.loading(dvi.currentSlot);
        return logBattle + "Вы погибли в бою!";
      }

      return (
        logBattle +
        "Ваше HP: " +
        data.user.hp +
        "/" +
        MaxHp +
        " | HP монстра: " +
        enemy.hp +
        "/" +
        (enemy.MaxHp || enemy.maxHp)
      );
    }
    return "Неизвестная боевая команда!";
  },
};

if (typeof module !== "undefined") {
  module.exports = dvi;
} else {
  window.dvi = dvi;
}
