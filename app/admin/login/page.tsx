"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        router.replace("/admin/dashboard");
      }
    });

    // Listen for future logins
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session && session.user) {
          router.replace("/admin/dashboard");
        }
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="dark"
          view="sign_in"
          showLinks={false}
        />
      </div>
    </div>
  );
}
