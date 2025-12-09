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
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 overflow-hidden">
      {/* Main card */}
      <div className="relative w-full max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white px-8 py-10 shadow-lg">
          <div className="mb-6 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Welcome back
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Login to your account
            </h2>
            <p className="mt-2 text-base text-gray-600">
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
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:-translate-y-0.5"
            >
              Login
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="px-3">OR</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 font-medium shadow-sm transition hover:bg-gray-50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-bold">
                G
              </span>
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-base text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
