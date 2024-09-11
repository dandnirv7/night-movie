import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
