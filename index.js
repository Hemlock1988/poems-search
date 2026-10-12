const { colorize, highlight } = require("./colors");
const fs = require("fs");

const searchWord = process.argv[2];
const searchWord2 = process.argv[3];

function plural(n, one, many) {
  return n === 1 ? one : many;
}

if (!searchWord) {
  console.log("Укажи слово для поиска. Например: node index.js дорога дорога2");
  process.exit(1);
}

if (!fs.existsSync("./poems")) {
  console.log("Папка ./poems не найдена. Проверь, что она существует.");
  process.exit(1);
}

const files = fs.readdirSync("./poems");

if (files.length === 0) {
  console.log("Папка ./poems пуста");
  process.exit(1);
}

let lineCount = 0;
let fileCount = 0;

for (const file of files) {
  let content;
  try {
    content = fs.readFileSync("./poems/" + file, "utf-8");
  } catch (error) {
    console.log("Не удалось прочитать файл: " + file);
    continue;
  }
  const lines = content.split("\n");

  let foundInFile = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const lineLower = line.toLowerCase();
    const matchFirst = lineLower.includes(searchWord.toLowerCase());
    const matchSecond = searchWord2
      ? lineLower.includes(searchWord2.toLowerCase())
      : false;

    if (matchFirst || matchSecond) {
      let highlightedLine = line;

      lineCount++;
      foundInFile = true;

      if (matchFirst) {
        highlightedLine = highlight(highlightedLine, searchWord, "yellow");
      }
      if (matchSecond) {
        highlightedLine = highlight(highlightedLine, searchWord2, "yellow");
      }

      console.log(
        colorize(file + ":" + (i + 1), "magenta") + " — " + highlightedLine,
      );
    }
  }
  if (foundInFile) {
    fileCount++;
  }
}

console.log("");
console.log("—".repeat(30));
if (lineCount === 0) {
  console.log("Ничего не найдено");
} else {
  console.log(
    "Найдено " +
      lineCount +
      " строк в " +
      fileCount +
      " " +
      plural(fileCount, "файле", "файлах"),
  );
}
