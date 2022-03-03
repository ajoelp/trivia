import { shuffle } from "lodash";
import { prisma } from "../../prisma";
const DIGITS = 5;
const ALLOWED_CHARACTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
];

export async function generateGameCode() {
  const code = shuffle(ALLOWED_CHARACTERS).splice(0, DIGITS).join("");

  const codeExists = Boolean(await prisma.game.findUnique({ where: { code: code } }));

  if (codeExists) {
    return await generateGameCode();
  }

  return code;
}
