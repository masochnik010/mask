const loc = {
  list: {
    // --- ЦЕНТРАЛЬНЫЙ ХАБ ---
    centre: {
      name: "Центральная деревня (сейв)",
      opis: "Безопасное место. Здесь у костра стоят Валера и Ёрик.",
      ex: { север: "forest", запад: "cave", восток: "peak" },
      randomDrop: [],
      nps: ["yorick", "valera"],
      enemies: [],
      isSafe: true,
    },

    //  ВЕТКА ЛЕСА
    forest: {
      name: "Лес",
      opis: "Обычный лес. На севере тропа уходит вглубь.",
      ex: { юг: "centre", север: "deep_forest" },
      randomDrop: ["палка", "ягода"],
      nps: [],
      enemies: ["Слизень"],
      isSafe: false,
    },
    deep_forest: {
      name: "Глубокий лес",
      opis: "Здесь очень темно. Виднеются руины древнего храма.",
      ex: { юг: "forest", запад: "forest_temple" },
      randomDrop: ["редкий гриб"],
      nps: [],
      enemies: ["Гоблин", "Орк"],
      isSafe: false,
    },
    forest_temple: {
      name: "Лесной храм (сейв)",
      opis: "Тихое и святое место. Здесь монстры не смеют нападать.",
      ex: { восток: "deep_forest" },
      randomDrop: ["святая вода"],
      nps: [], // добавить лекаря потом
      enemies: [],
      isSafe: true,
    },

    // ВЕТКА ПЕЩЕРЫ (ДАНЖ №1)
    cave: {
      name: "Вход в пещеру",
      opis: "Сырость и запах гари. Здесь часто видят разведчиков бандитов.",
      ex: { восток: "centre", вперед: "camp" },
      randomDrop: ["камень", "обрывок ткани"],
      nps: [],
      enemies: ["Разбойник плут", "Разбойник охотник"],
      isSafe: false,
    },
    camp: {
      name: "Лагерь исследователей (сейв)",
      opis: "Небольшой лагерь у самого спуска. Здесь безопасно.",
      ex: { назад: "cave", вниз: "ancient_dungeon" },
      randomDrop: ["бинт"],
      nps: [],
      enemies: [],
      isSafe: true,
    },
    ancient_dungeon: {
      name: "Древнее подземелье (ДАНЖ)",
      opis: "Забытые катакомбы. Здесь засело ядро бандитской группировки.",
      ex: { вверх: "camp" },
      randomDrop: ["монета", "кинжал", "древний осколок"],
      nps: [],
      enemies: [
        "Разбойник воин",
        "Разбойник плут (элитный)",
        "Минотавр",
        "Кобальт",
      ],
      isSafe: false,
      isDungeon: true,
    },

    // ВЕТКА ГОРЫ И ШАХТЫ (ДАНЖ №2)
    peak: {
      name: "Горный пик",
      opis: "Холодный ветер. Отсюда виден вход в заброшенную шахту.",
      ex: { запад: "centre", вверх: "miners_camp" },
      randomDrop: ["перо"],
      nps: [],
      enemies: ["Гарпия"],
      isSafe: false,
    },
    mine: {
      name: "Старая шахта",
      opis: "Ржавые рельсы уходят в темноту.",
      ex: { вниз: "peak", вперед: "miners_camp" },
      randomDrop: ["руда"],
      nps: [],
      enemies: ["Мимик"],
      isSafe: false,
    },
    miners_camp: {
      name: "Лагерь исследователей (сейв)",
      opis: "Палатки рабочих у самого забоя. Повсюду разбросано снарежение.",
      ex: { назад: "mine", глубже: "death_vault" },
      randomDrop: ["кирка", "каска", "фонарь"],
      nps: [],
      enemies: [],
      isSafe: true,
    },
    death_vault: {
      name: "Склеп Смерти (ДАНЖ)",
      opis: "Финальное испытание. Здесь обитает Рыцарь Смерти.",
      ex: { назад: "miners_camp" },
      randomDrop: ["кристалл"],
      nps: [],
      enemies: ["Скелет", "Лич", "Рыцарь смерти"],
      isSafe: false,
      isDungeon: true,
    },
  },
};

if (typeof module !== "undefined") module.exports = loc;
