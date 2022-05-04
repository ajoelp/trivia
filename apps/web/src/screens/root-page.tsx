import { Link } from "react-router-dom";
import styled from "styled-components";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";
import { getColor, getSizing } from "../theme/helpers";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${getColor("primary")};
  text-align: center;
  padding: ${getSizing("spacing.2")};
`;

const Title = styled.h1`
  color: white;
  font-size: 4rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: ${getSizing("maxWidth.xl")};
  display: flex;
  flex-direction: column;
  gap: ${getSizing("spacing.2")};
`;

const Button = styled(Link)`
  border-radius: ${getSizing("spacing.20")};
  padding: ${getSizing("spacing.10")};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  color: black;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  &:hover {
    background-color: ${getColor("secondary")};
    color: white;
  }
`;

export default function RootPage() {
  return (
    <Wrapper>
      <Title>OpenTrivia</Title>
      <ButtonWrapper>
        <Button to={routePath(RouteNames.GAME)}>Join Game</Button>
        <Button to={routePath(RouteNames.DASHBOARD)}>Create Game</Button>
        <Button to={routePath(RouteNames.WATCH)}>Watch Game</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}
