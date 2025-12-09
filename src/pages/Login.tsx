import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", formData);
    alert("Login functionality - connect to your auth system");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 overflow-hidden">
      {/* Background: gradient + grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#6366f133_0,_transparent_55%),radial-gradient(circle_at_bottom,_#ec489933_0,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b55_1px,transparent_1px),linear-gradient(to_bottom,#02061766_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
        <div className="absolute -top-40 -left-40 h-72 w-72 rounded-full bg-indigo-500/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-72 w-72 rounded-full bg-pink-500/40 blur-3xl" />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        {/* Glow ring behind card */}
        <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 opacity-70 blur-2xl" />

        <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 px-8 py-10 shadow-2xl backdrop-blur-2xl">
          <div className="mb-6 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-200">
              Welcome back
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-50">
              Login to your account
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Access your CA Worker Platform dashboard to manage clients, work and finances.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-md outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-md outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500/60"
                />
                <label htmlFor="remember" className="cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-indigo-300 hover:text-indigo-200 hover:underline underline-offset-2"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/40 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Login
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-700" />
            <span className="px-3">OR</span>
            <span className="h-px flex-1 bg-slate-700" />
          </div>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-100 shadow-md transition hover:border-indigo-400 hover:bg-slate-900/80"
            >
              {/* Simple placeholder icon circle */}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px]">
                G
              </span>
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-300 hover:text-indigo-200 hover:underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
