import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/seo/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Seo title="Página não encontrada - Reclame Aqui" description="A página que você procura não existe." noindex />
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-2 text-xl font-semibold text-foreground">Página não encontrada</p>
        <p className="mb-6 text-sm text-muted-foreground">A página que você procura não existe ou foi removida.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
          ← Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
