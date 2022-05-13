import { Game, GameState, Question } from "@trivia/shared/types";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { GameSocket } from "../services/GameSocket";
import { useFetchQuestion } from "../api/questions";
import { useQuery } from "../services/useQuery";
import { toast } from "../services/toast";

interface GameContextState {
  socket?: Socket;
  game?: Game;
  gameState?: GameState;
  instance: GameSocket;
  question?: Question;
}

const context = createContext<GameContextState>({} as GameContextState);

interface GameProviderProps {
  children: ReactNode;
  code: string;
}
export function GameProvider({ children, code }: GameProviderProps) {
  const [socket, setSocket] = useState<Socket>();
  const [game, setGame] = useState<Game>();
  const [gameState, setGameState] = useState<GameState>();
  const query = useQuery();

  const { data: question } = useFetchQuestion(game?.id, gameState?.currentQuestionId);

  const instance = useMemo(() => {
    return new GameSocket(code)
      .listenConnectionChange(setSocket)
      .listenGameState(setGameState)
      .listenGame(setGame)
      .listenClientError((error) => {
        toast.error(error);
      });
  }, [code]);

  const value = { instance, socket, gameState, game, question };

  return (
    <context.Provider value={value}>
      {children}
      {query.get("debug") && <pre>{JSON.stringify(gameState, null, 2)}</pre>}
    </context.Provider>
  );
}

export function useGameSocket() {
  return useContext(context);
}
