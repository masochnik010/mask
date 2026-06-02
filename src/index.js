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
  },
  comands: function(com) {
    const data = dvi.data;
    const command = com.trim().toLowerCase();

    if (command.startsWith("сохронить")) {
      data.saveSys.loading;
      return `сохронено`;
    }
    if (command.startsWith("загрузить")) {
      data.saveSys.unloading;
      return `загружено`;
    }

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
        if (data.user.hp > data.user.MaxHp) {
          data.user.hp = data.user.MaxHp;
        }
      } else if (poti.healMana) {
        const heal = poti.healMana;
        const hpUs = data.user.MaxMana - data.user.mana;
        data.user.mana = data.user.mana + heal;
        if (data.user.mana > data.user.MaxMana) {
          data.user.mana = data.user.MaxMana;
        }
      }
      data.user[slotSep] = "null";
      return `предмет ${poti.name} использован`;
    }

    //проверка на бой
    if (dvi.actCom) {
      if (command === "бой") {
        return `ты уже в бою с ${dvi.actCom.name}`;
      }
      return dvi.battle(command);
    }
    //ёрик квесты
    if (command.startsWith("говорить с ёриком") || command.startsWith("ёрик")) {
      const usLoc = data.user.loc;
      const loca = data.loc.list[usLoc].nps;
      if (loca.includes("yorick")) {
        return data.nps.list.yorick.quests;
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
        return data.nps.list.valera.quests;
      }
      return "тут нету валеры";
    }
    //*крик души*АААААААААААААААААААААААААААААААААААА

    if (command.startsWith("купить ")) {
      const item = command.split(" ");
      const muni = data.user.gold;
      const product = data.nps.list.valera.products;
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
      const product = data.nps.list.yorick.quests;
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
    let item = null;
    const acvip = data.user.acvip;
    const acvip2 = data.user.acvip2;
    const Uslot = command.split(" ")[1];

    if (acvip === "arrmor" || acvip === "acvip2") {
      item = data.lyt.armor[Uslot];
    } else if (data.lyt.weapons[Uslot]) {
      item = data.lyt.weapons[Uslot];
    } else if (data.lyt.magic[Uslot]) {
      item = data.lyt.magic[Uslot];
    } else if (!item) {
      return "Не тот тип";
    }
    const buyItem = item.price;
    data.user.gold = data.user.gold + buyItem;
    let qwe = data.user[acvip];
    data.user[acvip] = "null";
    return `вы продали ${qwe}`;

    //  баб зина медик
    if (
      command.startsWith("говорить с баб зиной") ||
      command.startsWith("баб зина")
    ) {
      const usLoc = data.user.loc;
      const loca = data.loc.list[usLoc].nps;
      if (loca.includes("bab_zinu")) {
        return data.nps.list.bab_zinu.heal;
      }
      return "тут нету баб зины";
    }
    if (command.startsWith("исцелиться ")) {
      const sep = command.split(" ");
      const slotSep = sep[1];
      const buyHeal = data.nps.list.bab_zinu.heal;
      const menHeal = buyHeal[slotSep];
      const priseHeal = menHeal[1];
      const healHp = menHeal[2];
      const hpUser = data.user.hp;
      if (data.user.gold < priseHeal) {
        return `не хватает${priseHeal - data.user.gold}`;
      }
      data.user.hp = data.user.hp + healHp;
      if (data.user.hp > data.user.MaxHp) {
        data.user.hp = data.user.MaxHp;
      }
      data.user.gold = data.user.gold - priseHeal;
      return `вы исцелены`;
    }
    //,kzzzzzzzzzzz экипировка
    if (command.startsWith("экиперовать ")) {
      const sep = command.split(" ");
      const slotSep = sep[1];
      const userSlot = data.user[slotSep];
      if (userSlot === "null") {
        return `слот пусть`;
      }
      const idItems = userSlot.toLowerCase().replace(" ", "_");
      if (data.lyt.weapons[idItems]) {
        const potiW = data.lyt.weapons[idItems];
        if (potiW.expensesSlot === 1) {
          const subspace_pocket = data.user.acvip;
          data.user.acvip = potiW.name;
          data.user[slotSep] = subspace_pocket;
          return `ты взял в основную руку ${potiW.name} `;
        }
      } else if (data.lyt.magic[idItems]) {
        const potiM = data.lyt.magic[idItems];
        if (potiM.expensesSlot === 1) {
          const subspace_pocket = data.user.acvip;
          data.user.acvip = potiM.name;
          data.user[slotSep] = subspace_pocket;
          return `ты взял в основную руку ${potiM.name} `;
        } else if (potiM.expensesSlot === 2) {
          const subspace_pocket = data.user.acvip2;
          data.user.acvip2 = potiM.name;
          data.user[slotSep] = subspace_pocket;
          return `ты взял в дополнительную руку ${potiM.name} `;
        }
      } else if (data.lyt.armor[idItems]) {
        const potiA = data.lyt.armor[idItems];

        if (potiA.expensesSlot === 4) {
          const subspace_pocket = data.user.arrmor;
          data.user.arrmor = potiA.name;
          data.user[slotSep] = subspace_pocket;
          return `ты надел ${potiA.name} `;
        } else if (potiA.expensesSlot === 2) {
          const subspace_pocket = data.user.acvip2;
          data.user.acvip2 = potiA.name;
          data.user[slotSep] = subspace_pocket;
          return `ты взял в дополнительную руку ${potiA.name} `;
        }
      }
    }
    if (command.startsWith("идти на ")) {
      const sep = command.split(" ");
      const nap = sep[2];
      const kyd = data.nav.kyda(nap);
      return kyd.msg;
    }
    if (command.startsWith("бой")) {
      const loc = data.user.loc;
      const random = data.prch.randomNum;
      const Vrags = data.loc.list[loc].enemies;
      const col = Vrags.length - 1;
      const vragss = Vrags[random(0, col)];
      dvi.actCom = structuredClone(data.vrag[vragss]);
      return `бой начат с ${dvi.actCom.name}`;
    }
    if (command.startsWith("сдать квест")) {
      if (data.user.que === "null") {
        return `нет квеста`;
      }
      if (data.loc.list[data.user.loc].nps.includes("yorick")) {
        const qU = data.user.que;
        for (let i = 1; i <= 10; i++) {
          if (data.nps.list.yorick.quests["q" + i][0] === qU) {
            if (data.user.queProg >= data.nps.list.yorick.quests["q" + i][1]) {
              data.user.gold =
                data.user.gold + data.nps.list.yorick.quests["q" + i][2];
              data.user.que = "null";
              data.user.queProg = 0;
              return `вы сдали квест на ${
                data.nps.list.yorick.quests["q" + i][0]
              }`;
            }
            return `ты еще не завершил квест`;
          }
        }
      }
      return `ёрика нету`;
    }
  },
  battle: function(bat) {
    const data = dvi.data;
    if (!data.actCom) {
      return "узбагойся, боя нет";
    }
    const hp = data.user.hp;
    let MaxHp = data.user.MaxHp;
    const mana = data.user.mana;
    let maxMana = data.user.MaxMana;
    let crit = data.user.crit;
    const xp = data.user.xp;
    const lvl = data.user.lvl;
    let que = data.user.que;
    let queProg = data.user.queProg;
    const acvip = data.user.acvip.toLowerCase().replace(" ", "_");
    const acvip2 = data.user.acvip2.toLowerCase().replace(" ", "_");
    const arrmor = data.user.arrmor.toLowerCase().replace(" ", "_");

    if (lvl > 1) {
      const lv = lvl * 5;
      const mH = MaxHp + lv;
      if (mH !== MaxHp) {
        MaxHp = mH;
      }
      const mMa = maxMana + lv;
      if (mMa !== maxMana) {
        maxMana = mMa;
      }
      const ct = crit + 2;
      if (ct !== crit) {
        crit = ct;
      }
    }

    const enemy = data.actCom;
    let logBattle = "";

    if (bat === "атака") {
      let dmg = 2; // Сила голых кулаков
      if (data.user.acvip !== "null") {
        const tip = data.lyt.weapons[acvip] ? "weapons" : "magic";
        if (tip === "weapons") {
          const atc = data.lyt.weapons[acvip].atk;
          dmg = dmg + atc;
        } else if (tip === "magic") {
          const expM = data.lyt.magic[acvip].expensesMana;
          const atcM = data.lyt.magic[acvip].magicAtac;
          if (mana >= expM) {
            dmg = dmg - 2;
            dmg = dmg + atcM;
            mana = mana - expM;
          } else {
            dmg = dmg + 1;
          }
        }
      }
      dmg = Math.round(dmg * (1 + (lvl - 1) * 0.05));

      if (data.prch.crit(crit)) {
        dmg = dmg * 2;
        logBattle += "Крит";
      }
      //урон по мончтру
      if (dmg > 0) {
        const damage = yron.damage(dmg, enemy.def);
        enemy.hp = yron.rezyltat(enemy.hp, dmg, enemy.def);
        logBattle += `вы нанесли ${enemy.name} ${damage} урона`;
      }

      // Шаг 5. Проверка смерти монстра и вызов lvl.js
      if (enemy.hp <= 0) {
        data.user.xp += enemy.xpDrop;

        const lvlRezyltat = lvl(data.user.xp, data.user.lvl);

        // Проверяем, вырос ли уровень
        if (lvlRezyltat[1] > data.user.lvl) {
          data.user.xp = lvlRezyltat[0]; // Записываем остаток опыта
          data.user.lvl = lvlRezyltat[1]; // Записываем новый уровень

          // Навсегда повышаем потолок характеристик персонажа
          data.user.MaxHp += 5;
          data.user.MaxMana += 5;

          // Полное исцеление в награду за лвлап
          data.user.hp = data.user.MaxHp;
          data.user.mana = data.user.MaxMana;
          //лвл
          logBattle += `\n УРОВЕНЬ ПОВЫШЕН! Вы достигли ${data.user.lvl} и исцелены! ☺,\n`;
        } else {
          data.user.xp = lvlRezyltat[0];
        }

        // Проверка квеста Ёрика
        if (que !== "null" && data.nps.list.yorick.quests[que]) {
          const questTarget = data.nps.list.yorick.quests[que];
          if (enemy.name === questTarget[0]) {
            data.user.queProg += 1;
          }
        }

        // Выпадение случайного лута в пустой слот (slot1-slot9)
        let dropText = "";
        if (enemy.drop[0] === "Золото") {
          const goldAmount = enemy.drop[1];
          data.user.gold = data.user.gold + goldAmount;
          dropText = ` Вы нашли золото ${goldAmount}`;
        } else if (enemy.drop.length > 0) {
          const rand = prch.randomNum(0, enemy.drop.length - 1);

          const item = enemy.drop[rand];
          for (let i = 1; i <= 9; i++) {
            if (data.user["slot" + i] === "null") {
              data.user["slot" + i] = item;
              dropText = ` Вы нашли предмет: ${item}!`;
              break;
            }
          }
        }

        data.actCom = null; // Выходим из боя
        return `${logBattle}Поздравляем! Монстр ${enemy.name} повержен! Получено опыта: ${enemy.xpDrop}.${dropText}`;
      }

      // Шаг 6. Ответный удар выжившего монстра
      let playerDef = 0;
      if (arrmor !== "null") {
        const armorData = data.lyt.armor[arrmor];
        if (armorData) playerDef += armorData.def;
      }
      if (acvip2 !== "null") {
        const shieldData = data.lyt.armor[acvip2];
        if (shieldData) playerDef += shieldData.def;
      }
      // Применяем к защите твой бонус уровня
      playerDef = Math.round(playerDef * (1 + (lvl - 1) * 0.05));

      // Наносим урон игроку через твой модуль урона
      const enemyDmg = yron.damage(enemy.atk, playerDef);
      data.user.hp = yron.rezyltat(data.user.hp, enemy.atk, playerDef);
      logBattle += `Монстр ${enemy.name} ударил вас в ответ на ${enemyDmg} урона.\n`;

      // Проверка гибели игрока и респавн у Бабы Зины
      if (data.user.hp <= 0) {
        data.actCom = null;
        data.user.hp = data.user.MaxHp;
        data.user.loc = "centre";
        return `${logBattle}Вы погибли в бою! Баба Зина воскресила вас у костра в Центральной деревне.`;
      }

      // Если все выжили — возвращаем текущее здоровье участников
      return `${logBattle}Ваше HP: ${data.user.hp}/${MaxHp} | HP монстра: ${enemy.hp}/${enemy.maxHp}`;
    }

    return "Неизвестная боевая команда! Доступно: атака";
  },
};
if (typeof module !== "undefined") module.exports = dvi;
