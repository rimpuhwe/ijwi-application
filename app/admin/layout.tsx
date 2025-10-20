"use client";

import type React from "react";
import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // log events for debugging; if explicit sign-out happens, redirect
        console.log("[auth] event", event);
        if (event === "SIGNED_OUT") {
          router.replace("/admin/login");
        }
      }
    );

    // Catch global unhandled promise rejections (e.g., AuthApiError from token refresh)
    const onUnhandledRejection = (e: PromiseRejectionEvent) => {
      try {
        const reason = (e && (e.reason as any)) || (e as any).detail || null;
        const message = reason?.message || String(reason);
        // Detect Supabase invalid refresh token errors
        if (
          message &&
          /refresh token not found|invalid refresh token/i.test(message)
        ) {
          console.warn("[auth] detected invalid refresh token, signing out");
          // Clear supabase client session and local storage keys
          supabase.auth.signOut().finally(() => {
            try {
              // remove common supabase keys from localStorage
              Object.keys(localStorage).forEach((k) => {
                if (/supabase|sb:|sb-/.test(k)) localStorage.removeItem(k);
              });
            } catch (err) {
              /* ignore */
            }
            router.replace("/admin/login");
          });
        }
      } catch (err) {
        console.error("error handling unhandledrejection", err);
      }
    };
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      try {
        listener.subscription.unsubscribe();
      } catch (e) {
        /* ignore */
      }
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, [router]);

  return <>{children}</>;
}
