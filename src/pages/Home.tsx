import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Background glow and grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0,_transparent_55%),radial-gradient(circle_at_bottom,_#0f172a_0,_transparent_55%)] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-indigo-200 backdrop-blur">
            Trusted Financial & Compliance Partner
          </span>

          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              CA Worker Platform
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-slate-200/80">
            Connect with professional Chartered Accountants and skilled workers to handle accounting, auditing,
            taxation, and compliance while you focus on growing your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400 hover:-translate-y-0.5"
            >
              Get Started as Client
              <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-500/70 bg-slate-900/40 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-indigo-400 hover:bg-slate-900/70 hover:-translate-y-0.5"
            >
              Join as Professional
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300/80">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Verified CAs & finance experts
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              PAN India coverage
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Secure & compliant workflows
            </span>
          </div>
        </div>

        {/* Glassmorphism intro card */}
        <div className="mx-auto mb-16 max-w-3xl">
          <div className="group relative overflow-hidden rounded-3xl border border-slate-700/70 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition hover:border-indigo-400/70 hover:bg-white/10 hover:-translate-y-1">
            <div className="pointer-events-none absolute inset-y-0 -left-32 w-40 bg-gradient-to-r from-white/20 via-white/0 to-white/0 opacity-0 transition group-hover:translate-x-[400px] group-hover:opacity-100" />
            <h2 className="mb-3 text-center text-2xl font-semibold tracking-tight text-indigo-200">
              Welcome to S.K. ASSOCIATES
            </h2>
            <p className="text-center text-sm sm:text-base leading-relaxed text-slate-100/85">
              A trusted consultancy firm delivering outsourced accounting, auditing, taxation, and financial staffing
              services across India. Established in 2019 under Shree Kotling Industries, we help businesses grow with
              accuracy, compliance, and transparency.
            </p>
          </div>
        </div>

        {/* Two main cards */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Clients card */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl transition hover:border-emerald-400/60 hover:bg-slate-900/80 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                For Clients
              </div>
              <h2 className="mb-3 text-2xl font-semibold text-slate-50">Hire CAs & experts</h2>
              <p className="mb-6 text-sm sm:text-base text-slate-200/85">
                Find verified Chartered Accountants and skilled workers for bookkeeping, audits, tax filing, GST, and
                day‑to‑day compliance so your business always stays on track.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/40 transition hover:bg-emerald-400 hover:-translate-y-0.5"
              >
                Get Started
                <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* Professionals card */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl transition hover:border-sky-400/60 hover:bg-slate-900/80 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                For Professionals
              </div>
              <h2 className="mb-3 text-2xl font-semibold text-slate-50">Grow your practice</h2>
              <p className="mb-6 text-sm sm:text-base text-slate-200/85">
                Join a curated network of CAs, accountants, and finance professionals to get matched with quality
                clients, steady projects, and long‑term retainers.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/40 transition hover:bg-sky-400 hover:-translate-y-0.5"
              >
                Sign In
                <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
