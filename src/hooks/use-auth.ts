import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let initialLoad = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // Skip setting loading=false on initial event; getSession handles that
        if (initialLoad) return;
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          const { data } = await supabase.rpc("has_role", {
            _user_id: u.id,
            _role: "admin",
          });
          setIsAdmin(!!data);
        } else {
          setIsAdmin(false);
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      initialLoad = false;
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const { data } = await supabase.rpc("has_role", {
          _user_id: u.id,
          _role: "admin",
        });
        setIsAdmin(!!data);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading, isAdmin };
}
