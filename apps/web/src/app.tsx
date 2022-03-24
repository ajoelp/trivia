import { Routes } from "./router/router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./providers/AuthProvider";
import { ToastMessages } from "./services/toast";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
          <ToastMessages />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
