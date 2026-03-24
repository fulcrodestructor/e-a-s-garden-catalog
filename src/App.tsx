import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import Navbar from "@/components/Navbar";
import Conocenos from "./pages/Conocenos";
import Vivero from "./pages/Vivero";
import Cafeteria from "./pages/Cafeteria";
import Actividades from "./pages/Actividades";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Must match Vite `base` so routes match on GitHub Pages (project URL path).
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={routerBasename}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Conocenos />} />
            <Route path="/vivero" element={<Vivero />} />
            <Route path="/cafeteria" element={<Cafeteria />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
