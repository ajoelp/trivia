import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
import { AuthProvider } from "../providers/AuthProvider";
import { User } from "@trivia/shared/types";
import { Services } from "../api/services";
import { DeepMockProxy } from "jest-mock-extended";
import { PortalProvider } from "../components/Portal";

export const testingClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

interface AppWrapperProps {
  children: ReactNode;
  user?: User;
}

interface TestingWrapperProps {
  children: ReactNode;
}

export function testingWrapper(user?: User) {
  return ({ children }: TestingWrapperProps) => {
    return <AppWrapper user={user}>{children}</AppWrapper>;
  };
}

export const AppWrapper = ({ children, user }: AppWrapperProps) => {
  return (
    <PortalProvider>
      <QueryClientProvider client={testingClient}>
        <AuthProvider user={user} fetchOnMount={false}>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </PortalProvider>
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

jest.mock("../api/services");
export const mockServices = Services as unknown as DeepMockProxy<typeof Services>;
