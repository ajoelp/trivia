import { Game } from "@trivia/shared/types";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";
import styled from "styled-components";
import { getColor, getSizing } from "../theme/helpers";

const Button = styled.a`
  border-radius: ${getSizing("spacing.20")};
  padding: ${getSizing("spacing.2")} ${getSizing("spacing.4")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  color: black;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  &:hover {
    background-color: ${getColor("secondary.500")};
    transition: background-color 0.2s linear, color 0.2s linear;
    color: white;
  }
`;

interface OwnerLoginProps {
  game: Game;
}

export function OwnerLogin({ game }: OwnerLoginProps) {
  const location = useLocation();
  const { user } = useAuth();

  if (user) {
    return <Button as="button">{user.email}</Button>;
  }

  return (
    <Button href={routePath(RouteNames.LOGIN, {}, { redirect: location.pathname })}>Are you the owner? Login</Button>
  );
}
