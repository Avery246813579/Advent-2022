import fs from "fs";

const rawData = await fs.readFileSync("data/4.txt", "utf8");
const lines = rawData.split("\n");

if (lines[lines.length - 1] === "") lines.splice(lines.length - 1, 1);

function calculateFullIntersects() {
  let overlaps = 0;

  for (let line of lines) {
    const [first, second] = line.split(",");

    const [firstA, firstB] = first.split("-");
    const [secondA, secondB] = second.split("-");

    const intersectSet = new Set();
    for (let i = parseInt(firstA); i < parseInt(firstB) + 1; i++) {
      intersectSet.add(i);
    }

    let secondOverlaps = 0;
    for (let i = parseInt(secondA); i < parseInt(secondB) + 1; i++) {
      if (intersectSet.has(i)) {
        secondOverlaps += 1;
      }
    }

    if (secondOverlaps === (parseInt(secondB) - parseInt(secondA) + 1)) {
      overlaps += 1;
    } else if (secondOverlaps === (parseInt(firstB) - parseInt(firstA) + 1)) {
      overlaps += 1;
    }
  }

  return overlaps;
}

function calculateIntersects() {
  let overlaps = 0;

  for (let line of lines) {
    const [first, second] = line.split(",");

    const [firstA, firstB] = first.split("-");
    const [secondA, secondB] = second.split("-");

    const intersectSet = new Set();
    for (let i = parseInt(firstA); i < parseInt(firstB) + 1; i++) {
      intersectSet.add(i);
    }

    for (let i = parseInt(secondA); i < parseInt(secondB) + 1; i++) {
      if (intersectSet.has(i)) {
        overlaps += 1;
        break;
      }
    }
  }

  return overlaps;
}

// console.log(calculateFullIntersects());
console.log(calculateIntersects());
