import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

import { DarkProvider } from "./context/dark-context.tsx";

const App = () => (
  <DarkProvider>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </DarkProvider>
);

export default App;
