import fs from "fs";

const ELF_ROCK = "A";
const ELF_PAPER = "B";
const ELF_SCISSOR = "C";

const HUMAN_ROCK = "X";
const HUMAN_PAPER = "Y";
const HUMAN_SCISSOR = "Z";

const OUTCOME_LOSE = "X";
const OUTCOME_TIE = "Y";
const OUTCOME_WIN = "Z";

const LOST = 0;
const TIE = 3;
const WIN = 6;

const HAND_SCORES = {
  [HUMAN_ROCK]: 1,
  [HUMAN_PAPER]: 2,
  [HUMAN_SCISSOR]: 3
}

const OUTCOME_SCORES = {
  [OUTCOME_WIN]: 6,
  [OUTCOME_TIE]: 3,
  [OUTCOME_LOSE]: 0
}

const WINNING_HANDS = {
  [ELF_ROCK]: HUMAN_SCISSOR,
  [ELF_PAPER]: HUMAN_ROCK,
  [ELF_SCISSOR]: HUMAN_PAPER,
};

const TYING_HANDS = {
  [ELF_ROCK]: HUMAN_ROCK,
  [ELF_PAPER]: HUMAN_PAPER,
  [ELF_SCISSOR]: HUMAN_SCISSOR,
};

const LOSING_HANDS = {
  [ELF_ROCK]: HUMAN_PAPER,
  [ELF_PAPER]: HUMAN_SCISSOR,
  [ELF_SCISSOR]: HUMAN_ROCK,
};

const rawData = await fs.readFileSync("data/2.txt", "utf8");
const lines = rawData.split("\n");

if (lines[lines.length - 1] === "") lines.splice(lines.length - 1, 1);

/**
 * A Y - 2 + 6
 * B X - 1 + 0
 * C Z - 3 + 3
 *
 *
 */

function totalScore() {
  return lines.reduce((accum, line) => {
    const [opponent, mine] = line.split(" ");

    let score = HAND_SCORES[mine];
    if (TYING_HANDS[opponent] === mine) {
      score += TIE;
    } else if (WINNING_HANDS[opponent] === mine) {
      score += LOST;
    } else {
      score += WIN;
    }

    return accum + score;
  }, 0);
}

function totalScoreOutcome() {
  return lines.reduce((accum, line) => {
    const [opponent, outcome] = line.split(" ");

    let score = OUTCOME_SCORES[outcome];
    if (score === WIN) {
      score += HAND_SCORES[LOSING_HANDS[opponent]];
    } else if (score === TIE) {
      score += HAND_SCORES[TYING_HANDS[opponent]];
    } else {
      score += HAND_SCORES[WINNING_HANDS[opponent]];
    }

    return accum + score;
  }, 0);
}

// console.log(totalScore());
// console.log(totalScoreOutcome());
