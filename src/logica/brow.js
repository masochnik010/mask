document.addEventListener("DOMContentLoaded", function() {
  let activeSlot = "slot1";

  // HTML Экраны
  const menuScreen = document.getElementById("main-menu-screen");
  const gameScreens = document.getElementById("game-play-screens");

  // Элементы интерфейса
  const userDisplayName = document.getElementById("user-display-name");
  const enemyInfo = document.getElementById("enemy-info");
  const locName = document.getElementById("loc-name");
  const locOpis = document.getElementById("loc-opis");
  const locInfo = document.getElementById("loc-info");
  const userHp = document.getElementById("user-hp");
  const userMana = document.getElementById("user-mana");
  const userLvl = document.getElementById("user-lvl");
  const userXp = document.getElementById("user-xp");
  const userGold = document.getElementById("user-gold"); // Ссылка на счетчик золота
  const questDisplayInfo = document.getElementById("quest-display-info"); // Ссылка на блок квеста
  const playerInput = document.getElementById("player-input");
  const saveButton = document.getElementById("save-button");
  const fightButton = document.getElementById("fight-button"); // Находим кнопку боя
  const menuBackButton = document.getElementById("menu-back-button");

  gameScreens.style.display = "none";
  menuScreen.style.display = "block";

  // Инициализация движка
  engine.start({
    nps: nps,
    brow: null,
    user: user,
    vrag: vrag,
    loc: loc,
    yron: yron,
    lvl: lvl,
    prch: prch,
    nav: nav,
    lyt: lyt,
    saveSys: {
      saveGame: function(slot, userObj) {
        localStorage.setItem(slot, JSON.stringify(userObj));
        return { msg: "Игра сохранена в браузере!" };
      },
      loadGame: function(slot) {
        const saved = localStorage.getItem(slot);
        return saved ? JSON.parse(saved) : null;
      },
    },
  });

  function refreshMenuStatus() {
    for (let i = 1; i <= 3; i++) {
      const savedData = localStorage.getItem("slot" + i);
      const statusText = document.getElementById("menu-slot" + i + "-status");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        statusText.textContent = `Занят (Уровень: ${parsed.lvl || 1})`;
        statusText.style.color = "#00ff00";
      } else {
        statusText.textContent = "Пусто";
        statusText.style.color = "#888";
      }
    }
  }

  function initGamePlay(slotName, isNewGame) {
    activeSlot = slotName;

    if (isNewGame) {
      // Окно выбора имени при старте Новой игры
      const playerName = prompt("Введите имя вашего героя:", "Рыцарь");

      user.hp = 100;
      user.mana = 100;
      user.lvl = 1;
      user.xp = 0;
      user.gold = 10; // Стартовое числовое золото со скриншота
      user.que = "null"; // Сброс ID квеста под ваши новые переменные
      user.queProg = 0; // Сброс прогресса квеста
      user.loc = "centre";
      user.acvip = "null";
      user.acvip2 = "null"; // Вторая рука
      user.arrmor = "null";
      for (let i = 1; i <= 9; i++) user["slot" + i] = "null";

      user.neme =
        playerName && playerName.trim() !== ""
          ? playerName.trim()
          : "Без имени";

      localStorage.setItem(slotName, JSON.stringify(user));
    } else {
      const saved = localStorage.getItem(slotName);
      if (saved) {
        Object.assign(user, JSON.parse(saved));
      }
    }

    menuScreen.style.display = "none";
    gameScreens.style.display = "contents";
    updateScreen();
    playerInput.focus();
  }

  for (let i = 1; i <= 3; i++) {
    document
      .getElementById("btn-load-" + i)
      .addEventListener("click", function() {
        if (!localStorage.getItem("slot" + i)) {
          alert("Этот слот пустой! Нажмите 'Новая игра'.");
          return;
        }
        initGamePlay("slot" + i, false);
      });

    document
      .getElementById("btn-new-" + i)
      .addEventListener("click", function() {
        if (
          localStorage.getItem("slot" + i) &&
          !confirm("Перезаписать слот " + i + "? Старый прогресс будет удален.")
        ) {
          return;
        }
        initGamePlay("slot" + i, true);
      });
  }

  // Функция автоматической перерисовки графического экрана
  function updateScreen(engineResponseText) {
    userHp.textContent = user.hp;
    userMana.textContent = user.mana;
    userLvl.textContent = user.lvl;
    userXp.textContent = user.xp;
    if (userGold) userGold.textContent = user.gold; // Обновление числового золота на плашке
    if (userDisplayName)
      userDisplayName.textContent =
        user.neme === "null" ? "Без имени" : user.neme;

    const currentLocObj = loc.list[user.loc];
    locName.textContent = currentLocObj.name;

    // Сбор подробных направлений переходов
    const exitsObj = nav.where(user, loc);
    let exitsLines = [];
    for (const [directionKey, targetLocKey] of Object.entries(exitsObj)) {
      const targetLocName = loc.list[targetLocKey].name;
      exitsLines.push(`• <b>${directionKey}</b> -> ведет в: ${targetLocName}`);
    }
    const exitsText = `<br><br><b>Направления для хода:</b><br>${exitsLines.join(
      "<br>",
    )}`;

    // Динамический перечень доступных действий игрока (без смайликов)
    let actionsLines = [];
    if (engine.activeCombat) {
      actionsLines.push("• <b>атака</b> - ударить текущего противника");
      actionsLines.push(
        "• <b>магия</b> - использовать заклинание надетого посоха",
      );
      actionsLines.push(
        "• <b>побег</b> - попытаться сбежать из боя (шанс 50%)",
      );
      actionsLines.push(
        "• <b>использовать [название]</b> - выпить зелье из инвентаря",
      );
      fightButton.style.display = "none"; // Прячем кнопку нового боя во время сражения
    } else {
      actionsLines.push(
        "• <i>[направление]</i> - переместиться в другую локацию",
      );
      actionsLines.push("• <b>статы</b> - детальный просмотр экипировки");
      actionsLines.push(
        "• <b>экипировать [название]</b> - надеть предмет из инвентаря",
      );
      actionsLines.push(
        "• <b>использовать [название]</b> - выпить лечебное зелье",
      );
      actionsLines.push(
        "• <b>выбор имени [имя]</b> - сменить имя вашего персонажа",
      );

      // Отображение кнопки боя в опасных зонах
      if (
        !currentLocObj.isSafe &&
        currentLocObj.enemies &&
        currentLocObj.enemies.length > 0
      ) {
        actionsLines.push(
          "• <b>бой</b> - начать сражение с местными монстрами",
        );
        fightButton.style.display = "block";
      } else {
        fightButton.style.display = "none";
      }

      if (currentLocObj.isSafe) {
        actionsLines.push("• <b>говорить</b> - побеседовать с NPC у костра");
        if (currentLocObj.nps.includes("valera")) {
          actionsLines.push(
            "• <b>валера список</b> - открыть магазин товаров Валеры",
          );
        }
        if (currentLocObj.nps.includes("yorick")) {
          actionsLines.push(
            "• <b>ёрик квесты</b> - открыть список поручений Ёрика",
          );
        }
      }
    }
    const actionsText = `<br><br><b>Доступные действия:</b><br>${actionsLines.join(
      "<br>",
    )}`;

    // Обновление графического блока активного квеста под ваши новые переменные массива
    if (questDisplayInfo) {
      if (user.que !== "null") {
        const yorick = nps.list.find((n) => n.id === "yorick");
        const currentQuestData = yorick.quests[user.que];
        questDisplayInfo.innerHTML = `Охота: <b>${currentQuestData[0]}</b><br>Прогресс: ${user.queProg} / ${currentQuestData[1]} шт.`;
      } else {
        questDisplayInfo.textContent = "Нет активных квестов.";
      }
    }

    // Сборка текста в панели локации
    if (engineResponseText) {
      locOpis.innerHTML =
        engineResponseText.replace(/\n/g, "<br>") + exitsText + actionsText;
    } else {
      locOpis.innerHTML = currentLocObj.opis + exitsText + actionsText;
    }

    if (currentLocObj.nps && currentLocObj.nps.length > 0) {
      locInfo.textContent = "Рядом стоят: " + currentLocObj.nps.join(", ");
    } else {
      locInfo.textContent = "Здесь никого нет.";
    }

    for (let i = 1; i <= 9; i++) {
      const cell = document.getElementById("slot" + i);
      if (cell) {
        const item = user["slot" + i];
        cell.textContent = item === "null" || !item ? "Пусто" : item;
      }
    }

    // Исправленная логика для отображения врагов сверху панели
    if (engine.activeCombat) {
      enemyInfo.textContent = `Текущий бой: ${engine.activeCombat.name} (HP: ${engine.activeCombat.hp})`;
    } else {
      if (currentLocObj.enemies && currentLocObj.enemies.length > 0) {
        enemyInfo.textContent = `Враги на локации: ${currentLocObj.enemies.join(
          ", ",
        )}`;
      } else {
        enemyInfo.textContent = "Враги на локации: пусто";
      }
    }
  }

  playerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      const textCommand = playerInput.value;
      if (textCommand.trim() === "") return;
      playerInput.value = "";

      const result = engine.handleInput(textCommand);
      updateScreen(result);
    }
  });

  fightButton.addEventListener("click", function() {
    const result = engine.handleInput("бой");
    updateScreen(result);
  });

  saveButton.addEventListener("click", function() {
    localStorage.setItem(activeSlot, JSON.stringify(user));
    alert(`Игра успешно сохранена в ${activeSlot}!`);
  });

  menuBackButton.addEventListener("click", function() {
    engine.activeCombat = null;
    gameScreens.style.display = "none";
    menuScreen.style.display = "block";
    refreshMenuStatus();
  });

  refreshMenuStatus();
});
