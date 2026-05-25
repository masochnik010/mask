// Подключаем стандартную команду Node.js для работы с файлами
const fs = require("fs");

const save = {
  // Записать игрока в файл
  saveGame: function(slotName, userObj) {
    // 1. Читаем текст из файла savDeta.json
    const fileText = fs.readFileSync("./bin/savDeta.json", "utf-8");

    // 2. Переводим текст в обычный JS-объект
    const allSlots = JSON.parse(fileText);

    // 3. Перезаписываем выбранный слот объектом игрока
    allSlots[slotName] = userObj;

    // 4. Превращаем обратно в красивый текст и сохраняем на диск
    const newText = JSON.stringify(allSlots, null, 2);
    fs.writeFileSync("./bin/savDeta.json", newText, "utf-8");

    return { msg: `Успешно сохранено в ${slotName}!` };
  },

  // Загрузить игрока из файла
  loadGame: function(slotName) {
    // 1. Читаем текст из файла
    const fileText = fs.readFileSync("./bin/savDeta.json", "utf-8");

    // 2. Переводим текст в объект
    const allSlots = JSON.parse(fileText);

    // 3. Просто отдаем движку сохраненные данные из этого слота
    return allSlots[slotName];
  },
};

// Проверка среды для обеспечения гибридности кода
if (typeof module !== "undefined") {
  module.exports = save;
}
