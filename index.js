const user = {
  name: "",
  hp: 100,
  MaxHp: 100,
  crit: 0.02, //2%
  xp: 0,
  lvl: 1,
  gold: 10,
  atc: 5,
  dex: 5,
  acvip: "",
  acvip2: "",
  arrmor: "",
  invent: [],
  loc: "village",
  que: false,
  histori: [],
  alive: true,
};
const loc = {
  village: {
    name: "Деревня",
    description: "Тихая деревня. Здесь живёт староста.",
  },
  forest: {
    name: "Лес",
    description:
      "Тёмный лес. Здесь можно искать добычу тут волк и альфа версия.",
  },
  cave: {
    name: "Пещера",
    description: "Сырая пещера. Здесь скрывается гоблин альфа версия.",
  },
  tower: {
    name: "Башня",
    description: "Логово главаря разбойников.",
  },
  market: {
    name: "Рынок",
    description: "Здесь можно купить предметы.",
  },
};
let enemies = {
  wolf: {
    name: "Волк",
    hp: 40,
    atk: 6,
    reward: 20,
    ex: 4,
    alive: true,
  },
  alpha_wolf: {
    name: "Волк",
    hp: 80,
    atk: 12,
    reward: 40,
    ex: 8,
    alive: true,
  },
  goblin: {
    name: "Гоблин",
    hp: 90,
    atk: 8,
    reward: 40,
    ex: 9,
    alive: true,
  },
  alpha_goblin: {
    name: "Гоблин",
    hp: 180,
    atk: 16,
    reward: 80,
    ex: 18,
    alive: true,
  },
  robber: {
    name: "разбойников",
    hp: 110,
    atk: 9,
    reward: 50,
    ex: 11,
    alive: true,
  },
  alfa_robber: {
    name: "Главарь разбойников",
    hp: 220,
    atk: 18,
    reward: 100,
    ex: 22,
    alive: true,
  },
};
function print(tex) {
  const output = document.getElementById("output");
  output.innerHTML += `<p>${tex}</p>`;
  output.scrollTop = output.scrollHeight;
}
function updSt() {
  document.getElementById("stats").innerHTML = ` <b>${user.name ||
    "бзымянный чел"}</b>
    ${user.hp}/${user.MaxHp} 
    ${user.lvl}  | XP ${user.xp}        <br>
    ${user.atc}         |  ${user.dex}        <br>
    ${user.invent.join(", ") || "Пусто"} |  ${user.crit}   <br>
    ${loc[user.loc].name}     |  ${user.gold}      
  `;
}
if ((user.alive = true)) {
  function lvl(lvlUser) {
    const xpNAlvl = lvlUser * 2 + 1;
    const xp = user.xp;
    let lvlUp = false;
    while (lvlUp === true) {
      if (xp >= xpNAlvl) {
        lvlUp = true;
      }
      if (lvlUp === true) {
        user.lvl += 1;
        user.xp -= xpNAlvl;
        user.crit += 0.02;
        print(`Новый уровень: ${user.lvl}`);
      } else lvlUp = false;
    }
  }
  function fight(enemy) {
    if (!enemy.alive) {
      print("труп беспомощен ");
      return;
    }

    let damage = Math.floor(Math.random() * user.atc) + 1;
    if (Math.random() < user.crit) {
      damage *= 2;
      print("Критический удар!");
    }
    enemy.hp -= damage;
    print(`вы ударили ${enemy.name} на ${damage}`);

    if (enemy.hp <= 0) {
      enemy.alert = false;
      print(`ты убил ${enemy.name}`);
      user.gold += enemy.reward;
    }

    lvl(enemy.xp);
    user.histori.push(`wictori the ${enemy.name}`);
    if (enemy.name === "Главарь разбойников") {
      user.que = true;
      user.gold += 100;

      print("Главное задание выполнено!");
    }
    return console.log(`you победил`);

    let enDam = enemy.atc - user.dex;

    if (player.hp <= 0) {
      player.hp = 0;
      print("монстры победили.");
      user.alive = false;
    }
  }

  function saveGame() {
    localStorage.setItem(
      "legendSave",
      JSON.stringify({
        user,
        enemies,
      }),
    );

    print("Игра сохранена");
  }
}
function loadGame() {
  const save = JSON.parse(localStorage.getItem("legendSave"));

  if (!save) {
    print("Сохранение не найдено.");
    return;
  }

  Object.assign(user, save.user);
  enemies = save.enemies;

  updateStats();

  print("Игра загружена");
}
//
//
//
//
//
//аааааааааааааааааааааааааааааааааааааааааааааааааааааааааааа
//
//
//
//
//
if ((user.alive = true)) {
  function processCommand() {
    const input = document.getElementById("command");

    const command = input.value.toLowerCase().trim();

    if (!command) return;

    if (!command) return;

    if (command.startsWith("имя ")) {
      user.name = command.replace("имя ", "");

      print(`Добро пожаловать, ${user.name}!`);
    } else if (command === "класс нападающий") {
      user.class = "нападающий";
      user.atc += 5;

      print("Вы стали нападающий.");
    } else if (command === "класс защищающим") {
      user.class = "защищающим";
      user.dex += 5;

      print("Вы стали защищающим.");
    } else if (command === "осмотреться") {
      print(locs[user.loc].description);
    } else if (command === "говорить") {
      if (user.loc === "village") {
        print("Староста: Победи главаря разбойников, но сначала подготовся.");

        user.histori.push("Получил задание");
      } else if (user.loc === "market") {
        print("Торговец: Меч по хуже стоит 50 золота, зелье маленькое 10.");
        print("Торговец: Меч нормальный стоит 100 золота, зелье среднее 15.");
        print("Торговец: Меч по лучше стоит 150 золота, зелье большое 20.");
        print("Масочник: чтобы купить пиши меч1 меч2 меч3 для зеле также");
        print(
          "Торговец: мечи не обычные, ну ты поймешь когда купешь несколько",
        );
      } else {
        print("Здесь не с кем говорить.");
      }
    } else if (
      command === "идти деревня" ||
      command === "деревня" ||
      command === "д"
    ) {
      user.loc = "village";
      print("Вы пришли в деревню.");
    } else if (command === "идти лес" || command === "лес" || command === "л") {
      user.loc = "forest";
      print("Вы вошли в лес.");
    } else if (
      command === "идти пещера" ||
      command === "пещера" ||
      command === "п"
    ) {
      user.loc = "cave";
      print("Вы вошли в пещеру.");
    } else if (
      command === "идти башня" ||
      command === "башня" ||
      command === "б"
    ) {
      user.loc = "tower";
      print("Вы подошли к башне.");
    } else if (
      command === "идти рынок" ||
      command === "рынок" ||
      command === "р"
    ) {
      user.loc = "market";
      print("Вы пришли на рынок.");
    } else if (command === "искать") {
      if (user.loc === "forest") {
        if (Math.random() < 0.5) {
          user.invent.push("Зелье1");

          print("Вы нашли зелье1.");
        }
        if (Math.random() < 0.001) {
          print(
            "шанс выпадение ну писец какой маленький на золота равное количеству этого шаса",
          );
          user.gold += 1000;
          print("а еще макс лягушка");
        } else {
          user.gold += 5;

          print("Вы нашли 5 золота.");
        }
      } else {
        print("Здесь нечего искать.");
      }
    } else if (command === "отдых") {
      if (user.loc === "village") {
        user.hp = user.maxhp;

        print("Вы восстановили здоровье.");
        print("бармен:ну я у тебя в долгу так что бесплатно ");
      } else {
        print("Отдыхать можно только в деревне. лол ");
      }
    } else if (command === "купить зелье1") {
      if (user.loc !== "market") {
        print("Нужно быть на рынке.");
      } else if (user.gold < 10) {
        print("Недостаточно золота.");
      } else {
        user.gold -= 10;
        user.invent.push("Зелье3");

        print("Зелье малое куплено.");
      }
    } else if (command === "купить зелье2") {
      if (user.loc !== "market") {
        print("Нужно быть на рынке.");
      } else if (user.gold < 15) {
        print("Недостаточно золота.");
      } else {
        user.gold -= 15;
        user.invent.push("Зелье2");

        print("Зелье срелнее куплено.");
      }
    } else if (command === "купить зелье3") {
      if (user.loc !== "market") {
        print("Нужно быть на рынке.");
      } else if (user.gold < 20) {
        print("Недостаточно золота.");
      } else {
        user.gold -= 20;
        user.invent.push("Зелье3");

        print("Зелье большое куплено.");
      }
    } else if (command === "купить меч1") {
      if (user.loc !== "market") {
        print("Нужно быть на рынке.");
      } else if (user.gold < 50) {
        print("Недостаточно золота.");
      } else {
        user.gold -= 50;
        user.atc += 5;
        user.invent.push("Меч1");

        print("Меч куплен.");
      }
    } else if (command === "купить меч2") {
      if (user.loc !== "market") {
        print("Нужно быть на рынке.");
      } else if (user.gold < 100) {
        print("Недостаточно золота.");
      } else {
        user.gold -= 100;
        user.atc += 10;
        user.invent.push("Меч2");

        print("Меч нормальный куплен.");
      }
    } else if (command === "купить меч3") {
      if (user.loc !== "market") {
        print("Нужно быть на рынке.");
      } else if (user.gold < 150) {
        print("Недостаточно золота.");
      } else {
        user.gold -= 150;
        user.atc += 15;
        user.invent.push("Меч3");

        print("Меч по лучше куплен.");
      }
    } else if (command === "использовать зелье1") {
      const index = user.invent.indexOf("Зелье1");

      if (index === -1) {
        print("Зелья малое нет.");
      } else {
        user.invent.splice(index, 1);

        user.hp += 30;

        if (user.hp > user.maxhp) {
          user.hp = user.maxhp;
        }

        print("Здоровье восстановлено.");
      }
    } else if (command === "использовать зелье2") {
      const index = user.invent.indexOf("Зелье2");

      if (index === -1) {
        print("Зелья срелнее нет.");
      } else {
        user.invent.splice(index, 1);

        user.hp += 60;

        if (user.hp > user.maxhp) {
          user.hp = user.maxhp;
        }

        print("Здоровье восстановлено.");
      }
    } else if (command === "использовать зелье3") {
      const index = user.invent.indexOf("Зелье3");

      if (index === -1) {
        print("Зелья по больше нет.");
      } else {
        user.invent.splice(index, 1);

        user.hp += 90;

        if (user.hp > user.maxhp) {
          user.hp = user.maxhp;
        }

        print("Здоровье восстановлено.");
      }
    } else if (command === "атаковать волк") {
      if (user.loc === "forest") {
        fight(enemies.wolf);
      } else {
        print("Волка здесь нет.");
      }
    } else if (command === "атаковать альфа волк") {
      if (user.loc === "forest") {
        fight(enemies.alpha_wolf);
      } else {
        print("альфа волк здесь нет.");
      }
    } else if (command === "атаковать гоблин") {
      if (user.loc === "cave") {
        fight(enemies.goblin);
      } else {
        print("Гоблина здесь нет.");
      }
    } else if (command === "атаковать альфа гоблин") {
      if (user.loc === "cave") {
        fight(enemies.alpha_goblin);
      } else {
        print("альфа гоблин здесь нет.");
      }
    } else if (command === "атаковать босс") {
      if (user.loc === "tower") {
        fight(enemies.boss);
      } else {
        print("Босса здесь нет.");
      }
    } else if (command === "атаковать разбойников") {
      if (user.loc === "tower") {
        fight(enemies.robber);
      } else {
        print("разбойников здесь нет.");
      }
    } else if (command === "задание") {
      if (user.que) {
        print("Задание выполнено.");
      } else {
        print("Победите главаря разбойников.");
      }
    } else if (command === "карта") {
      print(`


Деревня
|
Лес
|
Пещера
|
Башня

Рынок

а что вы делаете в моем хо... моей карте?
`);
    } else if (command === "инвентарь") {
      print(user.invent.join(", ") || "Инвентарь пуст.");
    } else if (command === "характеристики") {
      print(`


Имя: ${user.name}
Класс: ${user.class}
Уровень: ${user.lvl}
Опыт: ${user.xp}
Здоровье: ${user.hp}
Золото: ${user.gold}
Сила: ${user.atc}
Защита: ${user.dex}
`);
    } else if (command === "история") {
      print(user.histori.join("<br>") || "История пуста.");
    } else {
      print("оператор связи №228:не распознал команду");
    }

    updSt();

    input.value = "";
  }
}
document.getElementById("command").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    processCommand();
  }
});

updSt();

print("ну выживай");
print("Введите имя: таксист");
print("Выберите класс:");
print("класс нападающий");
print("или");
print("класс защищающай");
