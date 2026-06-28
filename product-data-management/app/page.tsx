"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Antigravity PDM Demo - Login";
    
    // If already logged in, skip login page
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock loading delay of 0.5s for Smart Wait demo
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
      } else {
        setError("Tài khoản hoặc mật khẩu không chính xác!");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-2xl glass-panel relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-gradient-to-r from-sky-400 to-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/35 mb-4 animate-pulse">
            <svg
              className="h-6 w-6 text-zinc-950"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Antigravity PDM Demo
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Đăng nhập hệ thống quản lý sản phẩm
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-450 mb-2">
              Tài khoản
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Nhập admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl premium-input font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-455 mb-2">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Nhập password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl premium-input font-medium"
            />
          </div>

          {error && (
            <div
              id="error-message"
              className="p-3 text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl text-center animate-pulse"
            >
              {error}
            </div>
          )}

          <button
            id="btn-login"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-[0.98] text-zinc-950 shadow-lg shadow-sky-500/20 transition-all-custom flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="spinner border-zinc-950 border-left-zinc-900 animate-spin" />
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <span>Đăng nhập</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
