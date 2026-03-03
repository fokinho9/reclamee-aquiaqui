import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Reclamacoes from "./pages/Reclamacoes";
import Reclamacao from "./pages/Reclamacao";
import Sobre from "./pages/Sobre";
import EmpresaReclamacoes from "./pages/EmpresaReclamacoes";
import DescontosPage from "./pages/DescontosPage";
import FaqPage from "./pages/FaqPage";
import PostsPage from "./pages/PostsPage";
import ProblemasPage from "./pages/ProblemasPage";
import TermosDeUso from "./pages/TermosDeUso";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import Institucional from "./pages/Institucional";
import FaleConosco from "./pages/FaleConosco";
import CentralDeAjuda from "./pages/CentralDeAjuda";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes?.("MetaMask") || String(event.reason).includes("MetaMask")) {
        event.preventDefault();
        console.warn("MetaMask extension error suppressed");
      }
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/empresa-reclamacoes" element={<EmpresaReclamacoes />} />
          <Route path="/empresa-descontos" element={<DescontosPage />} />
          <Route path="/empresa-faq" element={<FaqPage />} />
          <Route path="/empresa-posts" element={<PostsPage />} />
          <Route path="/principais-problemas" element={<ProblemasPage />} />
          <Route path="/reclamacoes" element={<Reclamacoes />} />
          <Route path="/reclamacao/:id" element={<Reclamacao />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/fale-conosco" element={<FaleConosco />} />
          <Route path="/central-de-ajuda" element={<CentralDeAjuda />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
