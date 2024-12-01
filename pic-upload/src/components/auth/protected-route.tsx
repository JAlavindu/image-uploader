// src/components/auth/protected-route.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession();
    if (!session) {
      router.push("/sign-in");
    }
  }, [router]);

  return <>{children}</>;
}
