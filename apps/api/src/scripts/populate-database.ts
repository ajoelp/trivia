import prompts from "prompts";
import { prisma } from "../../prisma";
import axios from "axios";
import { generateGameCode } from "../services/generateGameCode";

async function populateDatabase() {
  const userData = await prompts({
    type: "text",
    name: "email",
    message: "Enter the email of the user you would like to populate:",
  });

  const user = await prisma.user.findUnique({ where: { email: userData.email } });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.game.deleteMany({ where: { authorId: user.id } });

  const categories = await listAllCategories();

  for (const category of categories) {
    const game = await prisma.game.create({
      data: {
        name: category.name,
        code: await generateGameCode(),
        state: {},
        author: { connect: { id: user.id } },
      },
    });

    const questions = await listQuestionsByCategory(category);

    await prisma.question.createMany({
      data: questions.map((question) => ({
        value: question.question,
        difficulty: question.difficulty,
        answer: question.correct_answer,
        gameId: game.id,
      })),
    });
  }

  console.log("Done");
}

type Category = {
  id: number;
  name: string;
};

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function listAllCategories(): Promise<Category[]> {
  const { data } = await axios.get("https://opentdb.com/api_category.php");
  return data.trivia_categories;
}

async function listQuestionsByCategory(category: Category): Promise<Question[]> {
  const randomAmount = randomInt(20, 50);
  const { data } = await axios.get(
    `https://opentdb.com/api.php?amount=${randomAmount}&category=${category.id}&type=multiple`,
  );
  return data.results;
}

populateDatabase()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
