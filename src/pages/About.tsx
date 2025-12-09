export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 overflow-hidden">
      {/* Background grid + blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe66_0,_transparent_55%),radial-gradient(circle_at_bottom,_#e0e7ff66_0,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f033_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f033_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-indigo-300/40 blur-3xl" />
        <div className="absolute -bottom-36 -left-24 h-72 w-72 rounded-full bg-purple-300/35 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
      </div>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-24">
        {/* Hero + intro (centered) */}
        <section className="flex flex-col items-center text-center gap-8 mb-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600 shadow-sm">
            S.K. ASSOCIATES
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
              About Our Firm
            </span>
          </h1>
          <p className="max-w-3xl text-base sm:text-lg text-slate-700">
            S.K. ASSOCIATES is a specialised tax consultancy and accounting firm helping businesses across India
            outsource accounting, audits, taxation and financial staffing with confidence and clarity.
          </p>

          {/* Highlight stats card centered */}
          <div className="mt-6 w-full max-w-xl rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl backdrop-blur-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 mb-4">
              At a glance
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-900">2019</p>
                <p className="text-xs text-slate-500">Year founded</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">PAN</p>
                <p className="text-xs text-slate-500">India presence</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">24/7</p>
                <p className="text-xs text-slate-500">Process focus</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-600">
              Founded by <span className="font-semibold">Pradip Thorat</span> under{" "}
              <span className="font-semibold">Shree Kotling Industries</span>.
            </p>
          </div>
        </section>

        {/* Company overview (centered) */}
        <section className="flex justify-center">
          <div className="w-full max-w-4xl rounded-3xl border border-white/80 bg-white/95 p-9 shadow-2xl backdrop-blur-xl text-center">
            <div className="mb-5 flex flex-col items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <span className="text-sm font-bold">SK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Company Overview
              </h2>
            </div>
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-slate-700">
              S K ASSOCIATES is a professional tax consultancy and accounting firm established in 2019 by Pradip
              Thorat under the parent company Shree Kotling Industries. The firm specializes in outsourced
              accounting, auditing, taxation, and financial staffing services across India, with a strong focus on
              accuracy and reliability. The core objective is to build transparent, efficient financial processes so
              businesses can scale without operational bottlenecks.
            </p>
          </div>
        </section>

        {/* Mission & vision (centered cards) */}
        <section className="grid gap-8 md:grid-cols-2 text-center">
          {/* Mission */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 shadow-lg">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-200/40 blur-2xl" />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                  🎯
                </div>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-emerald-900">
                Mission
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-emerald-900/90 max-w-md mx-auto">
                To deliver accurate, reliable and technology‑driven accounting, auditing and taxation solutions that
                allow businesses to grow with confidence. The firm focuses on simplifying financial complexities and
                ensuring full compliance through transparent, structured workflows.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-violet-50 to-sky-50 p-8 shadow-lg">
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-200/40 blur-2xl" />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md">
                  🌐
                </div>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-indigo-900">
                Vision
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-indigo-900/90 max-w-md mx-auto">
                To be recognised as one of India&apos;s most trusted and client‑centric consultancy partners for
                outsourced accounting, auditing, taxation and financial staffing, known for dependable delivery and
                long‑term relationships.
              </p>
            </div>
          </div>
        </section>

        {/* Why choose us (centered) */}
        <section className="pt-4 text-center">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Why clients choose S.K. ASSOCIATES
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              A blend of domain expertise, process‑driven execution, and scalable staffing support tailored for
              growing businesses.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "👥",
                title: "Experienced team",
                desc: "Seasoned accounting and tax professionals with multi‑industry exposure."
              },
              {
                icon: "🔄",
                title: "End‑to‑end processes",
                desc: "Coverage from bookkeeping to audit support and financial reporting."
              },
              {
                icon: "✅",
                title: "Regulatory discipline",
                desc: "Workflows aligned with statutory, GST and income‑tax requirements."
              },
              {
                icon: "📍",
                title: "PAN‑India reach",
                desc: "Audit and financial staffing support available across locations."
              },
              {
                icon: "⚡",
                title: "On‑time delivery",
                desc: "Structured checklists and review cycles to keep timelines on track."
              },
              {
                icon: "💰",
                title: "Cost‑efficient model",
                desc: "Outsourcing that reduces in‑house finance overheads without losing control."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-7 shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <span className="text-2xl">{feature.icon}</span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
