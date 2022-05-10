import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import styled from "styled-components";
import { getSizing } from "../../theme/helpers";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: ${getSizing("spacing.4")};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  background-color: white;
  border-radius: ${getSizing("spacing.10")};
  padding: ${getSizing("spacing.10")};
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export default function Layout() {
  return (
    <Wrapper>
      <NavBar />
      <MainContent>
        <Outlet />
      </MainContent>
    </Wrapper>
  );
}
