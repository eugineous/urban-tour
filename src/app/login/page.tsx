"use client";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const pending = params.get("pending");

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { password, redirect: false });
    if (res?.ok) {
      window.location.href = "/admin";
    } else {
      setError("Wrong password. Try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4" style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1a0a2e 50%, #0A0A0A 100%)" }}>
      <div className="w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-8">
          <h1 className="font-graffiti text-6xl neon-lime mb-1" style={{ textShadow: "0 0 20px #AAFF00" }}>URBAN</h1>
          <h1 className="font-graffiti text-6xl text-white mb-4" style={{ textShadow: "0 0 20px rgba(255,255,255,0.5)" }}>TOUR</h1>
          <p className="text-sm text-gray-400 uppercase tracking-widest">Urban News on PPP TV Kenya</p>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        {pending && (
          <div className="card mb-4 border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm text-center">
            ⏳ Your account is pending approval. Eugine will approve you shortly.
          </div>
        )}

        <div className="card" style={{ border: "1px solid rgba(170,255,0,0.2)" }}>
          <h2 className="font-graffiti text-2xl neon-lime mb-6 text-center">ACCESS THE BOOTH</h2>

          {/* Password login */}
          <form onSubmit={handlePassword} className="space-y-4 mb-6">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Team Password</label>
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-lime w-full text-center font-graffiti text-xl tracking-wider">
              {loading ? "CHECKING..." : "LET ME IN 🔥"}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google login */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full flex items-center justify-center gap-3 btn-ghost font-semibold"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">Google accounts require admin approval</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
