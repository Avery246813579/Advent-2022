import fs from "fs";

const contents = await fs.readFileSync("data/1.txt", "utf8");
const nlSplit = contents.split("\n");

let first = 0;
let second = 0;
let third = 0;

let elves = [];
let currentCalories = 0;
for (let line of nlSplit) {
  if (line === '') {
    // if (currentCalories > first) {
    //   third = second;
    //   second = first;
    //   first = currentCalories;
    //   currentCalories = 0;
    //   continue;
    // }
    //
    // if (currentCalories > second) {
    //   third = second;
    //   second = currentCalories;
    //   currentCalories = 0;
    //   continue;
    // }
    //
    // if (currentCalories > third) {
    //   third = currentCalories;
    //   currentCalories = 0;
    //   continue;
    // }

    elves.push(currentCalories);
    currentCalories = 0;
    continue;
  }

  currentCalories += parseInt(line);
}

elves.sort((a, b) => a - b);

console.log(...elves);

console.log("Current max", elves.slice(-3), elves.slice(-3).reduce((accum, item) => {
  return accum + item;
}, 0));
