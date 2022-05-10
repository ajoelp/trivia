import { Game, GameState, Question } from "@trivia/shared/types";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { GameSocket } from "../services/GameSocket";
import { useToast } from "@chakra-ui/react";
import { useFetchQuestion } from "../api/questions";

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
  const toast = useToast();
  const [socket, setSocket] = useState<Socket>();
  const [game, setGame] = useState<Game>();
  const [gameState, setGameState] = useState<GameState>();

  const { data: question } = useFetchQuestion(game?.id, gameState?.currentQuestionId);

  const instance = useMemo(() => {
    return new GameSocket(code)
      .listenConnectionChange(setSocket)
      .listenGameState(setGameState)
      .listenGame(setGame)
      .listenClientError((error) => {
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, [code, toast]);

  const value = { instance, socket, gameState, game, question };

  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useGameSocket() {
  return useContext(context);
}
