import fs from "fs";

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const rawData = await fs.readFileSync("data/3.txt", "utf8");
const lines = rawData.split("\n");

if (lines[lines.length - 1] === "") lines.splice(lines.length - 1, 1);

function calculateSum() {
  let total = 0;

  for (let line of lines) {
    const lineSet = new Set();
    const charSplit = line.split("");

    let str = "";
    for (let char of charSplit) {
      if (str.length < (line.length / 2)) {
        lineSet.add(char);
        str += char;
        continue;
      }

      if (lineSet.has(char)) {
        total += CHARS.indexOf(char) + 1;
        break;
      }
    }
  }

  return total;
}

function calculateThreeGroup() {
  let total = 0;

  for (let i = 0; i < lines.length; i += 3) {
    let firstSet = new Set(lines[i].split(""));
    let secondSet = new Set(lines[i + 1].split(""));

    for (let char of lines[i + 2].split("")) {
      if (firstSet.has(char) && secondSet.has(char)) {
        total += CHARS.indexOf(char) + 1;
        break;
      }
    }
  }

  return total;
}

// console.log(calculateSum());
console.log(calculateThreeGroup());
