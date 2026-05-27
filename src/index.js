const engine = {
  // Внутренние ссылки на системы для использования в методах
  sys: null,
  activeCombat: null,

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
    console.log("Движок запущен. Мир загружен. Веселье начинается.");

    // Сохраняем ссылку на контекст систем для внутренних функций движка
    engine.sys = systems;
  },

  // Центральный обработчик текстовых команд игрока во время игры
  // Центральный обработчик текстовых команд игрока во время игры
  handleInput: function(inputStr) {
    const sys = engine.sys;
    const command = inputStr.trim().toLowerCase();

    // 1. Блокировка и ведение боя на самом верху метода
    if (engine.activeCombat) {
      if (command === "бой") {
        return `Вы уже сражаетесь с ${engine.activeCombat.name}! Введите "атака" или "побег".`;
      }
      return engine.executeCombatTurn(command);
    }

    // 2. МЕХАНИКА: Выбор имени персонажа
    if (command.startsWith("выбор имени ")) {
      const chosenName = inputStr.substring(12).trim();
      if (chosenName.length < 2) {
        return "Имя слишком короткое! Введите хотя бы 2 символа.";
      }
      sys.user.neme = chosenName;
      return `Ваше имя успешно изменено на: ${chosenName}.`;
    }

    // 3. Принудительный старт сражения
    if (command === "бой") {
      const currentLoc = sys.loc.list[sys.user.loc];
      if (
        currentLoc.isSafe ||
        !currentLoc.enemies ||
        currentLoc.enemies.length === 0
      ) {
        return "Здесь безопасно, не с кем воевать.";
      }

      const enemyName = sys.prch.getRandomEnemyName(currentLoc.enemies);
      const enemyTemplate = sys.vrag.list.find(
        (v) => v.name.toLowerCase() === enemyName.toLowerCase(),
      );

      if (enemyTemplate) {
        engine.activeCombat = JSON.parse(JSON.stringify(enemyTemplate));
        return `Вы бросаете вызов! Перед вами ${engine.activeCombat.name} (HP: ${engine.activeCombat.hp}). Ваши действия: [атака / побег]`;
      }
      return "Монстры спрятались, попробуйте еще раз.";
    }

    // 4. МЕХАНИКА: Просмотр квестов у Ёрика по вашей структуре массивов
    if (command === "ёрик квесты") {
      const currentLocObj = sys.loc.list[sys.user.loc];
      if (!currentLocObj.isSafe || !currentLocObj.nps.includes("yorick")) {
        return "Здесь нет квестодателя Ёрика.";
      }

      const yorick = sys.nps.list.find((n) => n.id === "yorick");
      let listLog = "Задания Ёрика:\n";

      // Проверка по вашей новой переменной sys.user.que
      if (sys.user.que !== "null") {
        const currentQuest = yorick.quests[sys.user.que];
        return `У вас уже есть активное задание: Охота на монстра ${currentQuest[0]}.\nПрогресс: уничтожено ${sys.user.queProg} из ${currentQuest[1]} шт.`;
      }

      // Вывод по вашему массиву [Цель, Количество, Золото] из nps.js
      for (const [key, qArray] of Object.entries(yorick.quests)) {
        listLog += ` - [${key}]: Охота на монстра ${qArray[0]} (Цель: ${qArray[1]} шт.) | Награда: ${qArray[2]} золота (введите 'взять ${key}')\n`;
      }
      return listLog;
    }

    // 5. МЕХАНИКА: Взятие квеста у Ёрика под переменную que и queProg
    if (command.startsWith("взять ")) {
      const parts = command.split(" ");
      const targetQuestKey = parts[1];
      const currentLocObj = sys.loc.list[sys.user.loc];

      if (!currentLocObj.isSafe || !currentLocObj.nps.includes("yorick")) {
        return "Здесь нет квестодателя Ёрика.";
      }

      if (sys.user.que !== "null") {
        return "Вы не можете взять новое задание, пока не выполните текущее!";
      }

      const yorick = sys.nps.list.find((n) => n.id === "yorick");
      const chosenQuest = yorick.quests[targetQuestKey];

      if (!chosenQuest) {
        return "У Ёрика нет задания с таким номером.";
      }

      // Запись в ваши переменные que и queProg
      sys.user.que = targetQuestKey;
      sys.user.queProg = 0;

      return `Вы взяли задание! Ваша цель — уничтожить ${chosenQuest[1]} шт. (${chosenQuest[0]}). Удачи!`;
    }

    // 6. МЕХАНИКА: Использование зелий и расходников на карте вне боя
    if (command.startsWith("использовать ")) {
      const targetItem = inputStr
        .substring(13)
        .trim()
        .toLowerCase();

      let foundSlot = null;
      for (let i = 1; i <= 9; i++) {
        if (sys.user[`slot${i}`].toLowerCase() === targetItem) {
          foundSlot = `slot${i}`;
          break;
        }
      }

      if (!foundSlot) {
        return `Предмет "${inputStr.substring(
          13,
        )}" не найден в вашем инвентаре.`;
      }

      const exactItemName = sys.user[foundSlot];

      if (exactItemName.toLowerCase().includes("малое зелье лечения")) {
        sys.user.hp += 30;
        if (sys.user.hp > 100) sys.user.hp = 100;
        sys.user[foundSlot] = "null";
        return `Вы выпили ${exactItemName} и восстановили 30 HP.`;
      }

      if (exactItemName.toLowerCase().includes("зелье маны")) {
        sys.user.mana += 40;
        if (sys.user.mana > 100) sys.user.mana = 100;
        sys.user[foundSlot] = "null";
        return `Вы выпили ${exactItemName} и восстановили 40 маны.`;
      }

      return `Предмет [${exactItemName}] нельзя использовать как расходник. Его можно только надеть.`;
    }

    // Обработка перемещения по направлениям через модуль nav
    if (
      [
        "север",
        "юг",
        "запад",
        "восток",
        "вверх",
        "вниз",
        "вперед",
        "назад",
        "глубже",
      ].includes(command)
    ) {
      const navRes = sys.nav.kyda(sys.user, command, sys.loc);
      if (!navRes.success) {
        return navRes.msg; // "туда нельзя идти"
      }

      // Проверка случайной встречи с монстром при ходьбе
      const currentLocObj = sys.loc.list[sys.user.loc];
      const hasEncounter = sys.prch.checkEnemyEncounter(currentLocObj);

      if (hasEncounter) {
        const enemyName = sys.prch.getRandomEnemyName(currentLocObj.enemies);
        const enemyTemplate = sys.vrag.list.find(
          (v) => v.name.toLowerCase() === enemyName.toLowerCase(),
        );

        if (enemyTemplate) {
          engine.activeCombat = JSON.parse(JSON.stringify(enemyTemplate));
          return `${navRes.msg}\nВнезапное нападение! Перед вами ${engine.activeCombat.name} (HP: ${engine.activeCombat.hp}). Ваши действия: [атака / побег]`;
        }
      }

      return `${navRes.msg}\n${currentLocObj.opis}`;
    }

    // 7. МЕХАНИКА: Поддержка синонима "экипировать" вместо "надеть"
    if (command.startsWith("надеть ") || command.startsWith("экипировать ")) {
      const skipLength = command.startsWith("надеть ") ? 7 : 12;
      const targetItem = inputStr
        .substring(skipLength)
        .trim()
        .toLowerCase();

      let foundSlot = null;
      for (let i = 1; i <= 9; i++) {
        if (sys.user[`slot${i}`].toLowerCase() === targetItem) {
          foundSlot = `slot${i}`;
          break;
        }
      }

      if (!foundSlot) {
        return `Предмет "${inputStr.substring(
          skipLength,
        )}" не найден в вашем инвентаре.`;
      }

      const exactItemName = sys.user[foundSlot];
      let itemData = null;
      let isWeapon = false;

      if (sys.lyt.weapons[exactItemName]) {
        itemData = sys.lyt.weapons[exactItemName];
        isWeapon = true;
      } else if (sys.lyt.magic[exactItemName]) {
        itemData = sys.lyt.magic[exactItemName];
        isWeapon = true;
      } else if (sys.lyt.armor[exactItemName]) {
        itemData = sys.lyt.armor[exactItemName];
        isWeapon = false;
      }

      if (!itemData) {
        return `Предмет [${exactItemName}] нельзя экипировать, это ресурс.`;
      }

      let oldItem = "null";
      if (isWeapon) {
        oldItem = sys.user.acvip;
        sys.user.acvip = exactItemName;
      } else {
        oldItem = sys.user.arrmor;
        sys.user.arrmor = exactItemName;
      }

      sys.user[foundSlot] = oldItem;

      if (oldItem !== "null") {
        return `Вы экипировали [${exactItemName}]. Предмет [${oldItem}] возвращен в инвентарь.`;
      }
      return `Вы успешно экипировали [${exactItemName}].`;
    }

    // 8. МЕХАНИКА: Покупка предметов у торговца Валеры через числовой кошелек gold
    if (command.startsWith("купить ")) {
      const parts = command.split(" ");
      const targetKey = parts[1];

      const currentLocObj = sys.loc.list[sys.user.loc];
      if (!currentLocObj.isSafe || !currentLocObj.nps.includes("valera")) {
        return "Здесь нет торговца Валеры.";
      }

      const valera = sys.nps.list.find((n) => n.id === "valera");
      const product = valera.products[targetKey];

      if (!product) {
        return "У Валеры нет товара с таким номером.";
      }

      const itemName = product[0];
      const itemPrice = product[1];

      if (sys.user.gold < itemPrice) {
        return `Недостаточно золота! Товар стоит ${itemPrice}, а у вас в кошельке всего ${sys.user.gold}.`;
      }

      let freeSlot = null;
      for (let i = 1; i <= 9; i++) {
        if (sys.user[`slot${i}`] === "null") {
          freeSlot = `slot${i}`;
          break;
        }
      }

      if (!freeSlot) {
        return "Ваш инвентарь полностью забит! Освободите место.";
      }

      sys.user.gold -= itemPrice;
      sys.user[freeSlot] = itemName;
      return `Вы купили [${itemName}] за ${itemPrice} золота. Деньги списаны со счета. Предмет положен в ${freeSlot}.`;
    }

    // Внутриигровые быстрые команды сохранения через saveSys
    if (command.startsWith("сохранить ")) {
      const parts = command.split(" ");
      const slotNum = parts[1];
      if (["1", "2", "3"].includes(slotNum)) {
        const res = sys.saveSys.saveGame(`slot${slotNum}`, sys.user);
        return res.msg;
      }
      return "Неверный номер слота. Доступны: 1, 2, 3.";
    }

    // Просмотр характеристик персонажа из user с учетом числового золота
    // Просмотр характеристик персонажа и статуса активного задания
    if (command === "статы") {
      const currentName =
        sys.user.neme === "null" ? "Без имени" : sys.user.neme;

      // Базовый лог параметров персонажа (без смайликов)
      let statusLog = `Персонаж: ${currentName}\nHP: ${sys.user.hp} | Мана: ${
        sys.user.mana
      } | Золото: ${sys.user.gold}\nУровень: ${sys.user.lvl} | Опыт: ${
        sys.user.xp
      }\nОружие: ${sys.user.acvip}\nВторая рука: ${sys.user.acvip2}\nБроня: ${
        sys.user.arrmor
      }\nЛокация: ${sys.loc.list[sys.user.loc].name}\n`;

      // 🆕 ДОБАВЛЕНО: Проверка и вывод текущего квеста по вашим новым переменным
      if (sys.user.que !== "null") {
        const yorick = sys.nps.list.find((n) => n.id === "yorick");
        const currentQuest = yorick.quests[sys.user.que]; // Получаем ваш массив ["Название", Количество, Золото]

        if (currentQuest) {
          statusLog += `\nТекущее задание: Охота на монстра ${currentQuest[0]} (Уничтожено: ${sys.user.queProg} из ${currentQuest[1]} шт.)`;
        }
      } else {
        statusLog += "\nТекущее задание: нет активных квестов.";
      }

      return statusLog;
    }

    // Взаимодействие с NPC в безопасной зоне
    const currentLocObj = sys.loc.list[sys.user.loc];
    if (command === "говорить" && currentLocObj.isSafe) {
      let npcLog = "Вы осматриваетесь у костра:\n";
      if (currentLocObj.nps.includes("valera")) {
        npcLog +=
          "• Торговец [Валера] готов продать товары. Наберите 'валера список'.\n";
      }
      if (currentLocObj.nps.includes("yorick")) {
        npcLog +=
          "• Квестодатель [Ёрик] ищет наемников. Наберите 'ёрик квесты'.\n";
      }
      return npcLog;
    }

    // Вывод списка товаров торговца Валеры из nps (по структуре массивов)
    if (
      command === "валера список" &&
      currentLocObj.isSafe &&
      currentLocObj.nps.includes("valera")
    ) {
      const valera = sys.nps.list.find((n) => n.id === "valera");
      let listLog = "Товары Валеры:\n";
      for (const [key, value] of Object.entries(valera.products)) {
        listLog += ` - [${key}]: ${value[0]} за ${value[1]} золота (введите 'купить ${key}')\n`;
      }
      return listLog;
    }

    return "Неизвестная команда. Перемещение: север, юг... Команды: статы, экипировать [название], выбор имени [имя], купить [id], ёрик квесты, взять [id], сохранить [1-3]. Чтобы выйти, введите 'выход'.";
  },

  // Пошаговый бой внутри игрового цикла (без смайликов)
  executeCombatTurn: function(action) {
    const sys = engine.sys;
    const enemy = engine.activeCombat;

    // 1. Использование зелий прямо во время боя
    if (action.startsWith("использовать ")) {
      const targetItem = action
        .substring(13)
        .trim()
        .toLowerCase();

      let foundSlot = null;
      for (let i = 1; i <= 9; i++) {
        if (sys.user[`slot${i}`].toLowerCase() === targetItem) {
          foundSlot = `slot${i}`;
          break;
        }
      }

      if (!foundSlot) {
        return `Предмет "${action.substring(13)}" не найден в вашем инвентаре.`;
      }

      const exactItemName = sys.user[foundSlot];
      let useLog = "";

      if (exactItemName.toLowerCase().includes("малое зелье лечения")) {
        sys.user.hp += 30;
        if (sys.user.hp > 100) sys.user.hp = 100;
        sys.user[foundSlot] = "null";
        useLog = `Вы выпили ${exactItemName} и восстановили 30 HP.`;
      } else if (exactItemName.toLowerCase().includes("зелье маны")) {
        sys.user.mana += 40;
        if (sys.user.mana > 100) sys.user.mana = 100;
        sys.user[foundSlot] = "null";
        useLog = `Вы выпили ${exactItemName} и восстановили 40 маны.`;
      } else {
        return `Предмет [${exactItemName}] нельзя использовать в бою.`;
      }

      // Ответный удар монстра с учетом бонуса брони за уровень (+5% за лвл выше 1)
      let currentDef = 0;
      if (sys.user.arrmor !== "null" && sys.lyt.armor[sys.user.arrmor]) {
        currentDef = sys.lyt.armor[sys.user.arrmor].def || 0;
      }
      const levelDefBonus = 1 + (sys.user.lvl - 1) * 0.05;
      currentDef = Math.round(currentDef * levelDefBonus);

      const enemyDmg = sys.yron.damage(enemy.atk, currentDef);
      sys.user.hp = sys.yron.rezyltat(sys.user.hp, enemy.atk, currentDef);
      useLog += `\n${enemy.name} атакует в ответ и наносит ${enemyDmg} урона. (Ваше HP: ${sys.user.hp})`;

      if (sys.user.hp <= 0) {
        engine.activeCombat = null;
        sys.user.hp = 100;
        sys.user.loc = "centre";
        return `${useLog}\nВы погибли! Возрождение у костра в... Деревне.`;
      }
      return useLog;
    }

    if (action === "побег") {
      if (sys.prch.checkChance(50)) {
        engine.activeCombat = null;
        return "Вы успешно убежали обратно в безопасную зону!";
      }
      // При неудачном побеге монстр бьет беззащитного игрока (учитываем лвл защиту)
      let currentDef = 0;
      if (sys.user.arrmor !== "null" && sys.lyt.armor[sys.user.arrmor]) {
        currentDef = sys.lyt.armor[sys.user.arrmor].def || 0;
      }
      const levelDefBonus = 1 + (sys.user.lvl - 1) * 0.05;
      currentDef = Math.round(currentDef * levelDefBonus);

      const enemyDmg = sys.yron.damage(enemy.atk, currentDef);
      sys.user.hp = sys.yron.rezyltat(sys.user.hp, enemy.atk, currentDef);

      if (sys.user.hp <= 0) {
        engine.activeCombat = null;
        sys.user.hp = 100;
        sys.user.loc = "centre";
        return `Вы не смогли сбежать! ${enemy.name} наносит смертельный удар в ${enemyDmg} урона.\nВы погибли! Возрождение у костра в... Деревне.`;
      }
      return `Вы не смогли сбежать! ${enemy.name} блокирует путь и атакует, нанося ${enemyDmg} урона! (Ваше HP: ${sys.user.hp})`;
    }

    // 7. МЕХАНИКА: Реализация магической атаки по ключу "магия"
    if (action === "магия") {
      if (sys.user.acvip === "null" || !sys.lyt.magic[sys.user.acvip]) {
        return "У вас в руках нет магического посоха или жезла для сотворения заклинания.";
      }

      const magicObj = sys.lyt.magic[sys.user.acvip];

      if (sys.user.mana < magicObj.expensesMana) {
        return `Недостаточно маны! Заклинание требует ${magicObj.expensesMana} MP, а у вас осталось всего ${sys.user.mana}.`;
      }

      sys.user.mana -= magicObj.expensesMana;
      let log = `Вы концентрируете энергию через ${magicObj.name} (Потрачено маны: ${magicObj.expensesMana}).\n`;

      // К урону магии применяется бонус +5% за каждый уровень выше первого
      const levelAtkBonus = 1 + (sys.user.lvl - 1) * 0.05;
      const playerDmg = Math.round(magicObj.magicAtac * levelAtkBonus);

      enemy.hp -= playerDmg;
      if (enemy.hp < 0) enemy.hp = 0;

      log += `Ваша магия наносит чистый урон в обход брони: ${enemy.name} получил ${playerDmg} урона. (Осталось HP монстра: ${enemy.hp})\n`;

      if (enemy.hp <= 0) {
        engine.activeCombat = null;
        const lvlCounter =
          typeof sys.lvl === "function" ? sys.lvl : sys.lvl.calculate;
        const [newXp, newLvl] = lvlCounter(
          sys.user.xp + enemy.xpDrop,
          sys.user.lvl,
        );
        sys.user.xp = newXp;
        sys.user.lvl = newLvl;

        const dropItem = sys.prch.tryGetRandomDrop(sys.loc.list[sys.user.loc]);
        let dropLog = "";
        if (dropItem) {
          let freeSlot = null;
          for (let i = 1; i <= 9; i++) {
            if (sys.user[`slot${i}`] === "null") {
              freeSlot = `slot${i}`;
              break;
            }
          }
          if (freeSlot) {
            sys.user[freeSlot] = dropItem;
            dropLog = ` Найдено на земле и положено в инвентарь: [${dropItem}].`;
          } else {
            dropLog = ` Найдено на земле [${dropItem}], но ваш инвентарь полон!`;
          }
        }
        return `${log}${enemy.name} уничтожен магическим взрывом! Вы получили ${enemy.xpDrop} XP.${dropLog} Уровень: ${sys.user.lvl}. Остаток XP: ${sys.user.xp}`;
      }

      let currentDef = 0;
      if (sys.user.arrmor !== "null" && sys.lyt.armor[sys.user.arrmor]) {
        currentDef = sys.lyt.armor[sys.user.arrmor].def || 0;
      }
      const levelDefBonus = 1 + (sys.user.lvl - 1) * 0.05;
      currentDef = Math.round(currentDef * levelDefBonus);

      const enemyDmg = sys.yron.damage(enemy.atk, currentDef);
      sys.user.hp = sys.yron.rezyltat(sys.user.hp, enemy.atk, currentDef);
      log += `${enemy.name} атакует вас в ответ и наносит ${enemyDmg} урона. (Ваше HP: ${sys.user.hp})`;

      if (sys.user.hp <= 0) {
        engine.activeCombat = null;
        sys.user.hp = 100;
        sys.user.loc = "centre";
        return `${log}\nВы погибли от ответного удара! Возрождение в Деревне.`;
      }
      return log;
    }

    // 8. ФИЗИЧЕСКАЯ АТАКА ИГРОКА
    if (action === "атака") {
      let log = "";

      let currentAtk = 15; // Базовая сила рук персонажа без оружия
      if (sys.user.acvip !== "null") {
        const weaponObj =
          sys.lyt.weapons[sys.user.acvip] || sys.lyt.magic[sys.user.acvip];
        if (weaponObj && weaponObj.atk) {
          currentAtk += weaponObj.atk;
        }
      }
      const levelAtkBonus = 1 + (sys.user.lvl - 1) * 0.05;
      currentAtk = Math.round(currentAtk * levelAtkBonus);

      const totalCritChance = sys.user.crit + (sys.user.lvl - 1) * 2;

      const playerCritCalc = sys.prch.calculateCrit(
        currentAtk,
        totalCritChance,
      );
      const playerDmg = sys.yron.damage(playerCritCalc.damage, enemy.def);

      enemy.hp = sys.yron.rezyltat(enemy.hp, playerCritCalc.damage, enemy.def);
      log += playerCritCalc.isCrit ? "Критический удар! " : "";
      log += `Вы нанесли ${enemy.name} ${playerDmg} урона. (Осталось HP монстра: ${enemy.hp})\n`;

      if (enemy.hp <= 0) {
        engine.activeCombat = null;
        const lvlCounter =
          typeof sys.lvl === "function" ? sys.lvl : sys.lvl.calculate;
        const [newXp, newLvl] = lvlCounter(
          sys.user.xp + enemy.xpDrop,
          sys.user.lvl,
        );
        sys.user.xp = newXp;
        sys.user.lvl = newLvl;

        const dropItem = sys.prch.tryGetRandomDrop(sys.loc.list[sys.user.loc]);
        let dropLog = "";
        if (dropItem) {
          let freeSlot = null;
          for (let i = 1; i <= 9; i++) {
            if (sys.user[`slot${i}`] === "null") {
              freeSlot = `slot${i}`;
              break;
            }
          }
          if (freeSlot) {
            sys.user[freeSlot] = dropItem;
            dropLog = ` Найдено на земле и положено в инвентарь: [${dropItem}].`;
          } else {
            dropLog = ` Найдено на земле [${dropItem}], но ваш инвентарь полон!`;
          }
        }
        return `${log}${enemy.name} повержен! Вы получили ${enemy.xpDrop} XP.${dropLog} Текущий уровень: ${sys.user.lvl}. Остаток XP до некст лвла: ${sys.user.xp}`;
      }

      let currentDef = 0;
      if (sys.user.arrmor !== "null" && sys.lyt.armor[sys.user.arrmor]) {
        currentDef = sys.lyt.armor[sys.user.arrmor].def || 0;
      }
      const levelDefBonus = 1 + (sys.user.lvl - 1) * 0.05;
      currentDef = Math.round(currentDef * levelDefBonus);

      const enemyDmg = sys.yron.damage(enemy.atk, currentDef);
      sys.user.hp = sys.yron.rezyltat(sys.user.hp, enemy.atk, currentDef);
      log += `${enemy.name} атакует вас и наносит ${enemyDmg} урона. (Ваше HP: ${sys.user.hp})`;

      if (sys.user.hp <= 0) {
        engine.activeCombat = null;
        sys.user.hp = 100;
        sys.user.loc = "centre";
        return `${log}\nВы погибли! Возрождение у костра в... Деревне.`;
      }
      return log;
    }

    return "Идет бой! Доступные команды: [атака / магия / побег / использовать название]";
  },
};

// Экспорт объекта для гибридной среды
if (typeof module !== "undefined") {
  module.exports = engine;
}
