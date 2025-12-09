import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800 overflow-hidden">
      {/* Background glow and grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Trusted Financial & Compliance Partner
          </span>

          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-gray-900">
            CA Worker Platform
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-gray-600 leading-relaxed">
            Connect with professional Chartered Accountants and skilled workers to handle accounting, auditing,
            taxation, and compliance while you focus on growing your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started as Client
              <span className="ml-2 text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 hover:-translate-y-0.5"
            >
              Join as Professional
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Verified CAs & finance experts
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              PAN India coverage
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Secure & compliant workflows
            </span>
          </div>
        </div>

        {/* Glassmorphism intro card */}
        <div className="mx-auto mb-16 max-w-3xl">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition hover:shadow-xl hover:-translate-y-1">
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
              Welcome to S.K. ASSOCIATES
            </h2>
            <p className="text-center text-base leading-relaxed text-gray-600">
              A trusted consultancy firm delivering outsourced accounting, auditing, taxation, and financial staffing
              services across India. Established in 2019 under Shree Kotling Industries, we help businesses grow with
              accuracy, compliance, and transparency.
            </p>
          </div>
        </div>

        {/* Two main cards */}
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Clients card */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-md transition hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                For Clients
              </div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Hire CAs & experts</h2>
              <p className="mb-6 text-base text-gray-600 leading-relaxed">
                Find verified Chartered Accountants and skilled workers for bookkeeping, audits, tax filing, GST, and
                day‑to‑day compliance so your business always stays on track.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:-translate-y-0.5"
              >
                Get Started
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Professionals card */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-md transition hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                For Professionals
              </div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Grow your practice</h2>
              <p className="mb-6 text-base text-gray-600 leading-relaxed">
                Join a curated network of CAs, accountants, and finance professionals to get matched with quality
                clients, steady projects, and long‑term retainers.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:-translate-y-0.5"
              >
                Sign In
                <span className="ml-2 transition-transform group-hover:translate-x-1">
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
