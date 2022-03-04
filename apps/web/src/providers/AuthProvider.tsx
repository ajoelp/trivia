import { User } from "../types/models";
import { createContext, ReactNode, useContext } from "react";
import { useCurrentUser } from "../api/users";

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

  const bootstrap = async () => {
    await refetch();
  };

  const logout = async () => {
    await remove();
  };

  const state = { bootstrap, logout, user: user ?? baseUser };

  if (!hasLoaded && fetchOnMount) return null;

  return <context.Provider value={state}>{children}</context.Provider>;
}

export function useAuth() {
  return useContext(context);
}
