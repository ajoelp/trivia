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
    await prisma.game.create({
      data: {
        name: category.name,
        code: await generateGameCode(),
        state: {},
        author: { connect: { id: user.id } },
      },
    });
  }

  console.log("Done");
}

type Category = {
  id: number;
  name: string;
};

async function listAllCategories(): Promise<Category[]> {
  const { data } = await axios.get("https://opentdb.com/api_category.php");
  return data.trivia_categories;
}

populateDatabase()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
