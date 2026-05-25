const lyt = {
  // Оружие (влияет только на атаку)
  weapons: {
    дубинка: {
      name: "Дубинка",
      expensesSlot: 1, // основная рука
      atk: 4,
      price: 5, // цена продажи
      priceSell: 10, // цена покупки
    },
    кинжал: {
      name: "Кинжал",
      expensesSlot: 1, // основная рука
      atk: 6,
      price: 7,
      priceSell: 15,
    },
    меч: {
      name: "Меч",
      expensesSlot: 1, // основная рука
      atk: 12,
      price: 12,
      priceSell: 25,
    },
    лук: {
      name: "Лук",
      expensesSlot: 3, // двуручное
      atk: 10,
      price: 12,
      priceSell: 25,
    },
    "тяжелый меч": {
      name: "Тяжелый меч",
      expensesSlot: 3, // двуручное
      atk: 25,
      price: 25,
      priceSell: 50,
    },
  },

  // Магическое оружие (требует ману, наносит магический урон)
  magic: {
    посох: {
      name: "Посох",
      expensesSlot: 3, // двуручное
      atk: 1,
      price: 20, // цена продажи
      priceSell: 40, // цена покупки
      magicAtac: 10, // урон магии
      expensesMana: 5, // Исключение: мана осталась без изменений
    },
    "ученический жезл": {
      name: "Ученический жезл",
      expensesSlot: 1, // основная рука
      atk: 1,
      price: 15,
      priceSell: 30,
      magicAtac: 7,
      expensesMana: 8,
    },
    "огненный жезл": {
      name: "Огненный жезл",
      expensesSlot: 1, // основная рука
      atk: 1,
      price: 35,
      priceSell: 70,
      magicAtac: 15,
      expensesMana: 12, // Увеличено: было 6 -> стало 8 (6 * 1.25 = 7.5, округлено)
    },
    "посох старейшины": {
      name: "Посох старейшины",
      expensesSlot: 3, // двуручное
      atk: 1,
      price: 60,
      priceSell: 120,
      magicAtac: 24,
      expensesMana: 15, // Увеличено: было 10 -> стало 13 (10 * 1.25 = 12.5, округлено)
    },
    "архимагический посох": {
      name: "Архимагический посох",
      expensesSlot: 3, // двуручное
      atk: 1,
      price: 150,
      priceSell: 300,
      magicAtac: 45,
      expensesMana: 25,
    },
  },

  // Броня и защита (влияет только на защиту)
  armor: {
    "деревяный щит": {
      name: "деревяный щит",
      expensesSlot: 2, // доп рука
      def: 1,
      price: null,
      priceSell: 20,
    },
    "ржавый щит": {
      name: "Ржавый щит",
      expensesSlot: 2, // доп рука
      def: 4,
      price: 5,
      priceSell: 35,
    },
    "железный щит": {
      name: "железный щит",
      expensesSlot: 2, // доп рука
      def: 8,
      price: null,
      priceSell: 45,
    },
    "башенный щит": {
      name: "башенный щит",
      expensesSlot: 2, // доп рука
      def: 15,
      price: null,
      priceSell: 90,
    },
    кожанка: {
      name: "кожанка",
      expensesSlot: 4, // броня
      def: 2,
      price: null,
      priceSell: 25,
    },
    "железная броня": {
      name: "железная броня",
      expensesSlot: 4, // броня
      def: 6,
      price: null,
      priceSell: 60,
    },
    "титановая броня": {
      name: "титановая броня",
      expensesSlot: 4, // броня
      def: 12,
      price: null,
      priceSell: 80,
    },
    "тяжелый доспех": {
      name: "Тяжелый доспех",
      expensesSlot: 4, // броня
      def: 18,
      price: 50,
      priceSell: 100,
    },
  },

  // чистые ресурсы и хлам без боевых стат
  misc: {
    слизь: {
      name: "Слизь",
      price: 2,
      priceSell: null,
    },
    монета: {
      name: "Монета",
      price: 1,
      priceSell: null,
    },
    "орочий амулет": {
      name: "Орочий амулет",
      price: 15,
      priceSell: null,
    },
    золото: {
      name: "Золото",
      price: 10,
      priceSell: null,
    },
    сундук: {
      name: "Сундук",
      price: 50,
      priceSell: null,
    },
    "перо гарпии": {
      name: "Перо гарпии",
      price: 8,
      priceSell: null,
    },
    "рог минотавра": {
      name: "Рог минотавра",
      price: 30,
      priceSell: null,
    },
    "чешуя кобальта": {
      name: "Чешуя кобальта",
      price: 10,
      priceSell: null,
    },
    "старый дневник": {
      name: "Старый дневник",
      price: 20,
      priceSell: null,
    },
    кость: {
      name: "Кость",
      price: 1,
      priceSell: null,
    },
    "магическая сфера": {
      name: "Магическая сфера",
      price: 40,
      priceSell: null,
    },
  },
};

if (typeof module !== "undefined") {
  module.exports = lyt;
}
