import { GameStateProps } from "./shared";
import { Heading } from "@chakra-ui/react";

export default function PendingState({}: GameStateProps) {
  return <Heading>Game has not been started.</Heading>;
}
