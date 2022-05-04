import { Routes } from "./router/router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./providers/AuthProvider";
import { ToastMessages } from "./services/toast";
import { PortalProvider } from "./components/Portal";
import { DialogManager } from "./dialogs/DialogManager";
import { ThemeManager } from "./theme/ThemeManager";

const client = new QueryClient();

export default function App() {
  return (
    <ThemeManager>
      <PortalProvider>
        <QueryClientProvider client={client}>
          <DialogManager>
            <BrowserRouter>
              <AuthProvider>
                <Routes />
                <ToastMessages />
              </AuthProvider>
            </BrowserRouter>
          </DialogManager>
        </QueryClientProvider>
      </PortalProvider>
    </ThemeManager>
  );
}
