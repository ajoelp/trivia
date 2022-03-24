import { Game } from "../../types/models";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Toggle from "../../components/Toggle";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { routePath } from "../../router/router";
import { RouteNames } from "../../router/routes";
import { useCreateGame, useGame, useUpdateGame } from "../../api/games";
import { CopyToClipboard } from "../../components/CopyToClipboard";
import { useMemo } from "react";

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
        navigate(routePath(RouteNames.EDIT_GAME, { id: data.id }));
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
        <p className="text-2xl font-bold mb-4">Game Settings</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
      <div></div>
    </div>
  );
}
