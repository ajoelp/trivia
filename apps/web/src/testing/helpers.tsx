import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
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

export function mockedFunction<T extends (...args: any[]) => any>(fn: T) {
  return fn as jest.MockedFunction<T>;
}
