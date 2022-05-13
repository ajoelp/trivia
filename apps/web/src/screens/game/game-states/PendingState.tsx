import { GameStateProps } from "./shared";

export default function PendingState({}: GameStateProps) {
  return <p className="text-4xl">Game has not been started.</p>;
}
