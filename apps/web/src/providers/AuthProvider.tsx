import { User } from "../types/models";
import { createContext, ReactNode, useContext } from "react";
import { useCurrentUser } from "../api/users";

interface AuthProviderState {
  user?: User
  bootstrap: () => Promise<void>
  logout: () => Promise<void>
}

const context = createContext<AuthProviderState>({} as AuthProviderState)

interface AuthProviderProps { children: ReactNode}
export function AuthProvider({ children }: AuthProviderProps) {
  const {data: user, isFetched: hasLoaded, refetch, remove } = useCurrentUser()

  const bootstrap = async () => {
    await refetch()
  }

  const logout = async () => {
    await remove()
  }

  const state = { bootstrap, logout, user }

  if(!hasLoaded) return null;

  return <context.Provider value={state}>
    {children}
  </context.Provider>
}

export function useAuth() {
  return useContext(context);
}
