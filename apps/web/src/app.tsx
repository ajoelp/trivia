import {Routes} from "./router/router";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

const client = new QueryClient()

export default function App() {
  return (
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
  )
}
