import { useCallback } from "react";
import { useGameSocket } from "../../providers/GameProvider";
import { useTeamId } from "../../services/useTeamId";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";

interface FormState {
  name: string;
}

export function JoinTeam() {
  const { gameState, instance } = useGameSocket();
  const { setTeamId } = useTeamId();
  const { control, reset, handleSubmit } = useForm<FormState>();

  const handleClick = useCallback(
    ({ name }: FormState) => {
      if (name.length <= 0) return;
      instance.createTeam({ name: name });
      reset();
    },
    [instance, reset],
  );

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-4 my-auto">
      <h1 className="text-2xl font-extrabold">Join A Team</h1>
      <div className="flex flex-col gap-2">
        {gameState?.teams?.map((team) => (
          <Button
            variant="big-ol-button"
            key={team.id}
            onClick={() => {
              setTeamId(team.id);
            }}
          >
            {team.name}
          </Button>
        ))}
      </div>
      <form onSubmit={handleSubmit(handleClick)}>
        <TextInput control={control} label="New Team Name" name="name" defaultValue="" />
      </form>
    </div>
  );
}
