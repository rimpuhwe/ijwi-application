"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Auth = dynamic(
  () => import("@supabase/auth-ui-react").then((m) => m.Auth),
  { ssr: false }
);

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Listen for auth state change and redirect on SIGNED_IN
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        if (_event === "SIGNED_IN" || _event === "TOKEN_REFRESHED") {
          // redirect after small delay to ensure session persisted
          setTimeout(() => router.replace("/admin/dashboard"), 150);
        }
      }
    );

    // If already signed in, go to dashboard
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) router.replace("/admin/dashboard");
    })();

    return () => {
      try {
        listener.subscription.unsubscribe();
      } catch (e) {
        /* ignore */
      }
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Admin Sign in
        </h1>

        {/* Override auth UI input colors to be visible on our dark theme */}
        <div className="admin-auth">
          <style>{`
            .admin-auth input,
            .admin-auth select,
            .admin-auth textarea {
              background-color: #0E0E0E !important;
              color: #F3F4F6 !important;
              border: 1px solid #27272A !important;
              caret-color: #F97316 !important;
              padding: 0.5rem 0.75rem !important;
              border-radius: 0.375rem !important;
            }
            .admin-auth input::placeholder,
            .admin-auth textarea::placeholder {
              color: #9CA3AF !important;
              opacity: 1 !important;
            }
            /* make the auth buttons more visible */
            .admin-auth button {
              color: white !important;
            }
            /* larger hit areas for touch devices */
            .admin-auth .sbui-button,
            .admin-auth button {
              padding: 0.6rem 0.9rem !important;
            }
          `}</style>

          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            view="sign_in"
            showLinks={false}
          />
        </div>
      </div>
    </div>
  );
}
