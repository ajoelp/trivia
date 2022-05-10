import { User } from "@trivia/shared/types";
import { createContext, ReactNode, useContext } from "react";
import { useCurrentUser } from "../api/users";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router/routes";
import { routePath } from "../router/router";

interface AuthProviderState {
  user?: User;
  bootstrap: () => Promise<void>;
  logout: () => Promise<void>;
}

const context = createContext<AuthProviderState>({} as AuthProviderState);

interface AuthProviderProps {
  children: ReactNode;
  fetchOnMount?: boolean;
  user?: User;
}
export function AuthProvider({ children, fetchOnMount = true, user: baseUser }: AuthProviderProps) {
  const { data: user, isFetched: hasLoaded, refetch, remove } = useCurrentUser(fetchOnMount);
  const navigate = useNavigate();
  const bootstrap = async () => {
    await refetch();
  };

  const logout = async () => {
    await Cookies.remove("AUTH_TOKEN");
    await remove();
    navigate(routePath(RouteNames.ROOT));
  };

  const state = { bootstrap, logout, user: user ?? baseUser };

  if (!hasLoaded && fetchOnMount) return null;

  return <context.Provider value={state}>{children}</context.Provider>;
}

export function useAuth() {
  return useContext(context);
}
