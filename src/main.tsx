import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./context/Context.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    {" "}
    <HelmetProvider>
      <ContextProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ContextProvider>{" "}
    </HelmetProvider>
  </Router>,
);
