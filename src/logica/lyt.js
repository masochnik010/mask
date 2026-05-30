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
    тяжелый_меч: {
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
      expensesSlot: 1, // двуручное
      atk: 1,
      price: 20, // цена продажи
      priceSell: 40, // цена покупки
      magicAtac: 10, // урон магии
      expensesMana: 5, // Исключение: мана осталась без изменений
    },
    ученический_жезл: {
      name: "Ученический жезл",
      expensesSlot: 1, // основная рука
      atk: 1,
      price: 15,
      priceSell: 30,
      magicAtac: 7,
      expensesMana: 8,
    },
    огненный_жезл: {
      name: "Огненный жезл",
      expensesSlot: 1, // основная рука
      atk: 1,
      price: 35,
      priceSell: 70,
      magicAtac: 15,
      expensesMana: 12,
    },
    посох_старейшины: {
      name: "Посох старейшины",
      expensesSlot: 1, // двуручное
      atk: 1,
      price: 60,
      priceSell: 120,
      magicAtac: 24,
      expensesMana: 15,
    },
    архимагический_посох: {
      name: "Архимагический посох",
      expensesSlot: 1, // двуручное
      atk: 1,
      price: 150,
      priceSell: 300,
      magicAtac: 45,
      expensesMana: 25,
    },
    книга_чар: {
      name: "Книга чар",
      expensesSlot: 2,
      manaUp: 25,
      price: 75,
      priceSell: 150,
    },
    книга_чар2: {
      name: "Книга чар",
      expensesSlot: 2,
      manaUp: 50,
      price: 93.75,
      priceSell: 187.5,
    },
    книга_чар3: {
      name: "Книга чар",
      expensesSlot: 2,
      manaUp: 75,
      price: 112.5,
      priceSell: 225,
    },
    книга_чар3: {
      name: "Книга чар",
      expensesSlot: 2,
      manaUp: 100,
      price: 150,
      priceSell: 300,
    },
    артефакт1: {
      name: "Артефакт1",
      expensesSlot: 5,
      price: 250,
      priceSell: 500,
    },
    аксессуар1: {
      name: "Аксессуар1",
      expensesSlot: 5,
      price: 100,
      priceSell: 200,
    },
  },

  // Броня и защита (влияет только на защиту)
  armor: {
    деревяный_щит: {
      name: "деревяный щит",
      expensesSlot: 2, // доп рука
      def: 1,
      price: 10,
      priceSell: 20,
    },
    ржавый_щит: {
      name: "Ржавый щит",
      expensesSlot: 2, // доп рука
      def: 4,
      price: 17.5,
      priceSell: 35,
    },
    железный_щит: {
      name: "железный щит",
      expensesSlot: 2, // доп рука
      def: 8,
      price: 22.5,
      priceSell: 45,
    },
    башенный_щит: {
      name: "башенный щит",
      expensesSlot: 2, // доп рука
      def: 15,
      price: 45,
      priceSell: 90,
    },
    кожанка: {
      name: "кожанка",
      expensesSlot: 4, // броня
      def: 2,
      price: 12.5,
      priceSell: 25,
    },
    железная_броня: {
      name: "железная броня",
      expensesSlot: 4, // броня
      def: 6,
      price: 30,
      priceSell: 60,
    },
    титановая_броня: {
      name: "титановая броня",
      expensesSlot: 4, // броня
      def: 12,
      price: 40,
      priceSell: 80,
    },
    тяжелый_доспех: {
      name: "Тяжелый доспех",
      expensesSlot: 4, // броня
      def: 18,
      price: 50,
      priceSell: 100,
    },
  },

  potions: {
    малое_зелье_лечения: {
      name: "Малое зелье лечения",
      expensesSlot: 0, // Нельзя экипировать, это расходник
      healHp: 25,
      price: 2,
      priceSell: 5,
    },
    среднее_зелье_лечения: {
      name: "Среднее зелье лечения",
      expensesSlot: 0,
      healHp: 50,
      price: 7,
      priceSell: 15,
    },
    большое_зелье_лечения: {
      name: "Большое зелье лечения",
      expensesSlot: 0,
      healHp: 75,
      price: 15,
      priceSell: 30,
    },
    зелье_маны: {
      name: "Зелье маны",
      expensesSlot: 0,
      healMana: 25,
      price: 5,
      priceSell: 10,
    },
    зелье_маны_среднее: {
      name: "Зелье маны среднее",
      expensesSlot: 0,
      healMana: 25,
      price: 5,
      priceSell: 10,
    },
    зелье_маны_большое: {
      name: "Зелье маны большое",
      expensesSlot: 0,
      healMana: 25,
      price: 5,
      priceSell: 10,
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
    орочий_амулет: {
      name: "Орочий амулет",
      price: 15,
      priceSell: null,
    },
    золото: {
      name: "Золото",
      price: 10,
      priceSell: null,
    },
    ухо_гоблина: {
      name: "ухо гоблина",
      price: 6,
      priceSell: null,
    },
    сундук: {
      name: "Сундук",
      price: 50,
      priceSell: null,
    },
    перо_гарпии: {
      name: "Перо гарпии",
      price: 8,
      priceSell: null,
    },
    рог_минотавра: {
      name: "Рог минотавра",
      price: 30,
      priceSell: null,
    },
    чешуя_кобальта: {
      name: "Чешуя кобальта",
      price: 10,
      priceSell: null,
    },
    старый_дневник: {
      name: "Старый дневник",
      price: 20,
      priceSell: null,
    },
    кость: {
      name: "Кость",
      price: 1,
      priceSell: null,
    },
    магическая_сфера: {
      name: "Магическая сфера",
      price: 40,
      priceSell: null,
    },
  },
};

if (typeof module !== "undefined") {
  module.exports = lyt;
}
