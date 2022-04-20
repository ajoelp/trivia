import { createTable } from "@tanstack/react-table";
import { Game } from "@trivia/shared/types";

export const gamesTable = createTable<Game>();

export const gamesTableColumns = gamesTable.createColumns([
  gamesTable.createDataColumn("name", {
    id: "name",
    header: "Name",
  }),
  gamesTable.createDataColumn("code", {
    id: "code",
    header: "Code",
  }),
]);
