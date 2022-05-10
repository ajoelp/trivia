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
import { Box, Button, Heading } from "@chakra-ui/react";
import styled from "styled-components";
import { getSizing } from "../../theme/helpers";

const FormWrapper = styled.form`
  display: flex;
  gap: ${getSizing("spacing.4")};
  flex-direction: column;
`;

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
        <Heading>Game Settings</Heading>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            className="flex-1"
            control={control}
            label="Name"
            name="name"
            data-testid="name-input"
            defaultValue=""
          />
          <Box display="flex" gap="4">
            {game?.code && <CopyToClipboard value={game.code} />}
            <Toggle
              label="Active"
              name="active"
              control={control}
              className="ml-auto"
              data-testid="active-input"
              defaultValue={false}
            />
          </Box>
          <Button type="submit" data-testid="submit-button" isLoading={createGameMutation.isLoading}>
            Save
          </Button>
        </FormWrapper>
      </div>
      <Box mt="4">{game?.id && <QuestionsList gameId={game.id} />}</Box>
    </div>
  );
}
