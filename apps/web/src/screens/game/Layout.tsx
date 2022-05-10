import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
`;

export default function GameLayout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
