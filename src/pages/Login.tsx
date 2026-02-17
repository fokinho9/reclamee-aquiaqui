import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    // Auth state change will handle redirect
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F2F4F6" }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#1B8B4F" }}>
            Reclame<span style={{ color: "#333" }}>AQUI</span>
          </h1>
          <p className="text-sm mt-2" style={{ color: "#5A6872" }}>Painel Administrativo</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#1A2B3D" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
              style={{ borderColor: "#E8ECF0" }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#1A2B3D" }}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
              style={{ borderColor: "#E8ECF0" }}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white text-sm disabled:opacity-50"
            style={{ backgroundColor: "#1B8B4F" }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="text-center mt-6">
          <a href="/" className="text-sm" style={{ color: "#2B6CB0" }}>← Voltar ao site</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
