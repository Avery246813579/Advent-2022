import fs from "fs";

const rawData = await fs.readFileSync("data/6.txt", "utf8");
const lines = rawData.split("\n");

if (lines[lines.length - 1] === "") lines.splice(lines.length - 1, 1);

function fetchPacketStart(amount) {
  for (let line of lines) {
    const charArr = line.split("");

    for (let i = 0; i < charArr.length; i++) {
      console.log(charArr.slice(i, i + amount));

      let newSet = new Set(charArr.slice(i, i + amount));

      if (newSet.size === amount) {
        return i + amount;
      }
    }
  }
}

// console.log(fetchPacketStart(4));
console.log(fetchPacketStart(14));
