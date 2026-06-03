import { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";

import { AmbientBackground } from "./components/ambient-background";
import Index from "./pages/Index.tsx";
import Achievements from "./pages/Achievements.tsx";
import Projects from "./pages/Projects.tsx";
import NotFound from "./pages/NotFound.tsx";

import { DarkProvider } from "./context/dark-context.tsx";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Andrei Lopez — Software Engineer";
    } else if (location.pathname === "/achievements") {
      document.title = "Achievements — Andrei Lopez";
    } else if (location.pathname === "/projects") {
      document.title = "Projects — Andrei Lopez";
    } else {
      document.title = "Not Found — Andrei Lopez";
    }
  }, [location.pathname]);

  return (
    <>
      <AmbientBackground />
      <div style={{ display: location.pathname === "/" ? undefined : "none" }}>
        <Index />
      </div>
      {location.pathname !== "/" && <Outlet />}
    </>
  );
};

export const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => (
  <DarkProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </DarkProvider>
);

export default App;
