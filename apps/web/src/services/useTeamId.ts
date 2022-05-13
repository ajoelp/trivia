import { useParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export function useTeamId() {
  const { code } = useParams();

  const [teamId, setTeamId] = useLocalStorage<string | null>(`@trivia/${code}/teamId`, null);
  return { teamId, setTeamId };
}
