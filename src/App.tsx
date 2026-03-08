import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Eagerly loaded pages (critical path)
import Index from "./pages/Index";
import StorePage from "./pages/StorePage";
import Reclamacoes from "./pages/Reclamacoes";
import Reclamacao from "./pages/Reclamacao";
import NotFound from "./pages/NotFound";

// Lazy loaded pages (non-critical)
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const Sobre = lazy(() => import("./pages/Sobre"));
const EmpresaReclamacoes = lazy(() => import("./pages/EmpresaReclamacoes"));
const DescontosPage = lazy(() => import("./pages/DescontosPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const PostsPage = lazy(() => import("./pages/PostsPage"));
const ProblemasPage = lazy(() => import("./pages/ProblemasPage"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
const PoliticaDePrivacidade = lazy(() => import("./pages/PoliticaDePrivacidade"));
const Institucional = lazy(() => import("./pages/Institucional"));
const FaleConosco = lazy(() => import("./pages/FaleConosco"));
const CentralDeAjuda = lazy(() => import("./pages/CentralDeAjuda"));
const StoreSobre = lazy(() => import("./pages/store/StoreSobre"));
const StoreReclamacoes = lazy(() => import("./pages/store/StoreReclamacoes"));
const StoreDescontos = lazy(() => import("./pages/store/StoreDescontos"));
const StoreFaq = lazy(() => import("./pages/store/StoreFaq"));
const StorePosts = lazy(() => import("./pages/store/StorePosts"));
const StoreProblemas = lazy(() => import("./pages/store/StoreProblemas"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 2, // 2 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-muted">
    <p className="text-sm text-muted-foreground">Carregando...</p>
  </div>
);

const App = () => {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      const reason = String(event.reason?.message || event.reason || "");
      const stack = String(event.reason?.stack || "");
      if (reason.includes("MetaMask") || stack.includes("chrome-extension://") || stack.includes("moz-extension://")) {
        event.preventDefault();
        console.warn("Browser extension error suppressed:", reason);
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
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/loja/:storeId" element={<StorePage />} />
              <Route path="/loja/:storeId/sobre" element={<StoreSobre />} />
              <Route path="/loja/:storeId/reclamacoes" element={<StoreReclamacoes />} />
              <Route path="/loja/:storeId/descontos" element={<StoreDescontos />} />
              <Route path="/loja/:storeId/faq" element={<StoreFaq />} />
              <Route path="/loja/:storeId/posts" element={<StorePosts />} />
              <Route path="/loja/:storeId/problemas" element={<StoreProblemas />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
