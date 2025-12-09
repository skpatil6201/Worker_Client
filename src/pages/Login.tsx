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
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-4 py-12 overflow-hidden">
      {/* Background: gradient + grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-cyan-50 to-teal-100/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe80_0,_transparent_55%),radial-gradient(circle_at_bottom,_#ccfbf180_0,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe55_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe55_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="absolute -top-40 -left-40 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        {/* Glow ring behind card */}
        <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-tr from-blue-300 via-cyan-300 to-teal-300 opacity-50 blur-2xl" />

        <div className="rounded-3xl border border-cyan-200 bg-white/90 px-8 py-10 shadow-xl backdrop-blur-2xl">
          <div className="mb-6 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-700">
              Welcome back
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-800">
              Login to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your CA Worker Platform dashboard to manage clients, work and finances.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-white text-cyan-500 focus:ring-cyan-300"
                />
                <label htmlFor="remember" className="cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-cyan-600 hover:text-cyan-700 hover:underline underline-offset-2"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-300/50 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Login
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="px-3">OR</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              {/* Simple placeholder icon circle */}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px]">
                G
              </span>
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
