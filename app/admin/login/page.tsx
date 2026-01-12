"use client";



import { useState } from "react";
import { useRouter } from "next/navigation";
import { setJwtCookie } from "@/lib/jwt";

export default function AdminLoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let data = { success: false, error: "Unknown error", token: undefined };
      try {
        data = await res.json();
      } catch (e) {
        setError("Invalid server response");
        setLoading(false);
        return;
      }
      if (res.ok && data.token) {
        setJwtCookie(data.token);
        router.replace("/admin/dashboard");
      } else {
        setError(data.error || `Login failed (${res.status})`);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Sign in</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-[#27272A] text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-[#27272A] text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded transition-colors"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
