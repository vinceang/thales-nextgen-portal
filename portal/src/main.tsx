import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./design-system/styles.css"; // fonts + all design tokens
import "./index.css";
import App from "./App.tsx";
import { I18nProvider } from "./i18n";
import { FavoritesProvider } from "./favorites";
import { ConnectivityProvider } from "./connectivity";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <FavoritesProvider>
        <ConnectivityProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConnectivityProvider>
      </FavoritesProvider>
    </I18nProvider>
  </StrictMode>,
);
