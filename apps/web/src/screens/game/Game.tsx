import { useParams } from "react-router-dom";
import { Game as GameType, GameStates } from "@trivia/shared/types";
import { JoinTeam } from "./JoinTeam";
import { ComponentType, lazy, LazyExoticComponent, Suspense, useMemo } from "react";
import { GameStateProps } from "./game-states/shared";
import { GameNav } from "../../components/GameNav";
import { GameProvider, useGameSocket } from "../../providers/GameProvider";
import { useTeamId } from "../../services/useTeamId";

const State: Partial<Record<GameStates, LazyExoticComponent<ComponentType<GameStateProps>>>> = {
  [GameStates.QUESTION_ASKED]: lazy(() => import("./game-states/QuestionAsked")),
  [GameStates.PENDING]: lazy(() => import("./game-states/PendingState")),
};

function RenderGameState() {
  const { gameState, instance, game, question } = useGameSocket();

  const Component = useMemo(() => {
    if (gameState?.state == null || !gameState) return State[GameStates.PENDING];
    return State[gameState.state];
  }, [gameState]);

  if (!gameState) return <p>Loading</p>;

  if (!Component) {
    return <p>Invalid state {gameState.state}</p>;
  }

  return (
    <Suspense fallback={null}>
      <Component gameState={gameState} instance={instance} game={game as GameType} question={question} />
    </Suspense>
  );
}

export default function Game() {
  const { code } = useParams();

  const { teamId } = useTeamId();

  console.log(teamId);

  return (
    <GameProvider code={code as string}>
      <GameNav />
      {!teamId ? <JoinTeam /> : <RenderGameState />}
    </GameProvider>
  );
}
