import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { AuthProvider } from "../providers/AuthProvider";
import { User } from "../types/models";

export const testingClient = new QueryClient();

interface AppWrapperProps {
  children: ReactNode;
  user?: User;
}

export const AppWrapper = ({ children, user }: AppWrapperProps) => {
  return (
    <QueryClientProvider client={testingClient}>
      <AuthProvider user={user} fetchOnMount={false}>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export function flushPromises() {
  return new Promise(function (resolve) {
    setTimeout(resolve);
  });
}
