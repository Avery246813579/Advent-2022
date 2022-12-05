import fs from "fs";

const BOXES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rawData = await fs.readFileSync("data/5.txt", "utf8");
const lines = rawData.split("\n");

if (lines[lines.length - 1] === "") lines.splice(lines.length - 1, 1);

function constructQueues() {
  const queues = {};

  for (let line of lines) {
    if (line.startsWith("move")) break;

    const charArr = line.split("");
    for (let i = 0; i < charArr.length; i++) {
      const char = charArr[i];
      const box = Math.round((i + 1) / 4)

      if (BOXES.indexOf(char) === -1) continue;
      if (!queues[box]) queues[box] = [char];
      else queues[box].unshift(char);
    }
  }

  return queues;
}


const MOVE_INDEX = 1;
const FROM_INDEX = 3;
const TO_INDEX = 5;

function findTopBoxesQueue() {
  const queues = constructQueues();

  for (let line of lines) {
    if (!line.startsWith("move")) continue;

    const wordSplit = line.split(" ");
    const moveAmount = parseInt(wordSplit[MOVE_INDEX]);
    const fromQueue = parseInt(wordSplit[FROM_INDEX]);
    const toQueue = parseInt(wordSplit[TO_INDEX]);

    for (let i = 0; i < moveAmount; i++) {
      const poppedChar = queues[fromQueue].pop();

      queues[toQueue].push(poppedChar);
    }
  }

  let topStack = "";
  for (let queue of Object.values(queues)) {
    topStack += queue.pop();
  }

  return topStack;
}

function findTopBoxesConcat() {
  const queues = constructQueues();

  for (let line of lines) {
    if (!line.startsWith("move")) continue;

    const wordSplit = line.split(" ");
    const moveAmount = parseInt(wordSplit[MOVE_INDEX]);
    const fromQueue = parseInt(wordSplit[FROM_INDEX]);
    const toQueue = parseInt(wordSplit[TO_INDEX]);

    const poppedArr = queues[fromQueue].splice(queues[fromQueue].length - moveAmount, moveAmount);
    queues[toQueue].push(...poppedArr);
  }

  let topStack = "";
  for (let queue of Object.values(queues)) {
    topStack += queue.pop();
  }

  return topStack;
}

// console.log(findTopBoxesQueue());
console.log(findTopBoxesConcat());
