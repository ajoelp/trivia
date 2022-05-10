import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";
import styled from "styled-components";
import { getColor, getSizing } from "../theme/helpers";
import { GoogleLogo } from "../assets/google_logo";
import { useCallback, useMemo } from "react";
import { LoginRedirect } from "../services/LoginRedirect";
import { useQuery } from "../services/useQuery";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  border-radius: ${getSizing("spacing.20")};
  padding: ${getSizing("spacing.10")};
  display: inline-flex;
  align-items: center;
  min-width: 400px;
  justify-content: center;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  color: black;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  gap: ${getSizing("spacing.2")};
  &:hover {
    background-color: ${getColor("secondary.500")};
    transition: background-color 0.2s linear, color 0.2s linear;
    color: white;
  }
`;

export default function LoginScreen() {
  const { user } = useAuth();
  const query = useQuery();

  const loginUrl = `${import.meta.env.VITE_API_URL}/auth/login`;

  const redirectToLogin = useCallback(() => {
    LoginRedirect.set(query.get("redirect") ?? routePath(RouteNames.DASHBOARD));
    window.location.href = loginUrl;
  }, [loginUrl, query]);

  if (user != null) return <Navigate to={query.get("redirect") ?? routePath(RouteNames.DASHBOARD)} />;

  return (
    <Wrapper>
      <LoginButton onClick={redirectToLogin}>
        <GoogleLogo />
        Login
      </LoginButton>
    </Wrapper>
  );
}
