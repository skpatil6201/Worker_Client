import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    userType: "Worker" as "Worker" | "CA"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50 px-4 py-12 overflow-hidden">
      {/* Soft light background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-16 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe80_0,_transparent_55%),radial-gradient(circle_at_bottom,_#ffe4e680_0,_transparent_55%)]" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-center">
        {/* Left text / marketing block */}
        <div className="md:w-1/2">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-700">
            Create account
          </span>
          <h1 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Join the CA Worker Platform
          </h1>
          <p className="mb-6 max-w-md text-sm sm:text-base text-slate-600">
            Register as a Worker or Chartered Accountant and start collaborating with verified businesses across India
            for accounting, auditing, taxation and consulting work.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• One profile for all your professional details</li>
            <li>• Secure access to clients and assignments</li>
            <li>• Built for S.K. ASSOCIATES partner network</li>
          </ul>
        </div>

        {/* Signup card */}
        <div className="md:w-1/2">
          <div className="relative mx-auto max-w-md">
            {/* Light gradient ring behind card */}
            <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-tr from-sky-300 via-indigo-300 to-rose-300 opacity-70 blur-xl" />

            <div className="rounded-3xl border border-white/70 bg-white/80 px-8 py-9 shadow-xl backdrop-blur-2xl">
              <h2 className="mb-2 text-center text-2xl font-bold text-slate-900">
                Sign Up
              </h2>
              <p className="mb-6 text-center text-sm text-slate-600">
                Fill in your details to create your account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Your address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    placeholder="+91 1234567890"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Minimum 6 characters for better security.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    User Type *
                  </label>
                  <select
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    value={formData.userType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        userType: e.target.value as "Worker" | "CA"
                      })
                    }
                  >
                    <option value="Worker">Worker / Staff</option>
                    <option value="CA">CA (Chartered Accountant)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  Sign Up
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-2"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
