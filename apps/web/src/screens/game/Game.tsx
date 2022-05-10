import { useParams } from "react-router-dom";
import { useFetchQuestion } from "../../api/questions";
import { useLocalStorage } from "usehooks-ts";
import { Game as GameType, GameState, GameStates } from "@trivia/shared/types";
import { JoinTeam } from "./JoinTeam";
import { ComponentType, lazy, LazyExoticComponent, Suspense } from "react";
import { GameStateProps } from "./game-states/shared";
import { OwnerLogin } from "../../components/OwnerLogin";
import { GameNav } from "../../components/GameNav";
import { GameProvider, useGameSocket } from "../../providers/GameProvider";

const State: Partial<Record<GameStates, LazyExoticComponent<ComponentType<GameStateProps>>>> = {
  [GameStates.QUESTION_ASKED]: lazy(() => import("./game-states/QuestionAsked")),
};

function RenderGameState() {
  const { gameState, instance, game, question } = useGameSocket();

  if (!gameState) return <p>Loading</p>;

  const Component = State[gameState.state];

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

  const [teamId] = useLocalStorage("teamId", null);

  return (
    <GameProvider code={code as string}>
      <GameNav />
      {!teamId ? <JoinTeam /> : <RenderGameState />}
    </GameProvider>
  );
}
