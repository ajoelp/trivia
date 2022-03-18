import { useState } from "react";
import { useMutation } from "react-query";
import { apiClient } from "../../api/apiClient";
import { Game } from "../../types/models";
import { useForm } from "react-hook-form";

function useCreateGame() {
  return useMutation((game: Partial<Game>) => {
    return apiClient.post("/games", game);
  });
}

export default function DashboardScreen() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Partial<Game>>();

  const onSubmit = (game: Partial<Game>) => createGameMutation.mutate(game);

  const createGameMutation = useCreateGame();

  console.log(watch());

  return (
    <div className={"flex flex-col"}>
      <form className={"flex flex-col"} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="#is-active">Active Game</label>
          <input type="checkbox" id="is-active" {...register("active")} />
        </div>
        <div>
          <label htmlFor="#name">Name</label>
          <input className="text-black w-32" id="name" type="text" {...register("name")} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
