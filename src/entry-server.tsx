import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { DarkProvider } from "./context/dark-context";
import { AppRoutes } from "./App";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <DarkProvider>
        <AppRoutes />
      </DarkProvider>
    </StaticRouter>
  );
}
