import { Game } from "@trivia/shared/types";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Toggle from "../../components/Toggle";
import { useNavigate, useParams } from "react-router-dom";
import { routePath } from "../../router/router";
import { RouteNames } from "../../router/routes";
import { useCreateGame, useGame, useUpdateGame } from "../../api/games";
import { CopyToClipboard } from "../../components/CopyToClipboard";
import { useMemo } from "react";
import { QuestionsList } from "../../components/QuestionsList";
import { Button } from "../../components/Button";

export default function ManageGame() {
  const { handleSubmit, control, setError, reset } = useForm<Partial<Game>>();
  const navigate = useNavigate();
  const params = useParams();

  const createGameMutation = useCreateGame();
  const updateGameMutation = useUpdateGame(params?.id);

  const { data: game } = useGame(params?.id, reset);

  const method = useMemo(
    () => (params?.id ? updateGameMutation : createGameMutation),
    [createGameMutation, params?.id, updateGameMutation],
  );

  const onSubmit = (game: Partial<Game>) =>
    method.mutate(game, {
      onSuccess(data) {
        if (!params?.id) {
          navigate(routePath(RouteNames.EDIT_GAME, { id: data.id }));
        }
      },
      onError(error: any) {
        if (error?.response?.data?.messages) {
          Object.entries(error?.response?.data?.messages).forEach(([key, message]) => {
            setError(key as keyof Game, {
              type: "manual",
              message: message as string,
            });
          });
        }
      },
    });

  return (
    <div className="flex h-full">
      <div className="p-4 border-r border-gray-500 h-full min-w-[350px]">
        <h1 className="text-xl font-extrabold">Game Settings</h1>
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            className="flex-1"
            control={control}
            label="Name"
            name="name"
            data-testid="name-input"
            defaultValue=""
          />
          <div className="flex gap-4">
            {game?.code && <CopyToClipboard value={game.code} />}
            <Toggle
              label="Active"
              name="active"
              control={control}
              className="ml-auto"
              data-testid="active-input"
              defaultValue={false}
            />
          </div>
          <Button type="submit" data-testid="submit-button" loading={createGameMutation.isLoading}>
            Save
          </Button>
        </form>
      </div>
      <div className="mt-4">{game?.id && <QuestionsList gameId={game.id} />}</div>
    </div>
  );
}
