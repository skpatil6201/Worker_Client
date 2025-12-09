export default function Features() {
  const services = [
    {
      title: "Outsourced Accounting",
      color: "from-indigo-500 via-sky-500 to-purple-500",
      icon: "📊",
      items: [
        "Bookkeeping",
        "Accounts Payable & Receivable",
        "Financial Reporting",
        "Payroll Processing",
        "Ledger Maintenance"
      ]
    },
    {
      title: "Auditing Services",
      color: "from-purple-500 via-fuchsia-500 to-pink-500",
      icon: "🧾",
      items: [
        "Internal Audits",
        "External & Statutory Audits",
        "Stock Audits",
        "Process & Compliance Audits",
        "Management Audits",
        "Pre-audit Preparations",
        "Audit Staff Available Nationwide"
      ]
    },
    {
      title: "Taxation Services",
      color: "from-pink-500 via-rose-500 to-amber-500",
      icon: "🧮",
      items: [
        "GST Registration & Filing",
        "Income Tax Filing",
        "TDS/TCS Management",
        "Tax Planning & Advisory",
        "Scrutiny & Assessment Support"
      ]
    },
    {
      title: "Financial Consulting",
      color: "from-blue-500 via-cyan-500 to-indigo-500",
      icon: "💼",
      items: [
        "Budgeting & Forecasting",
        "MIS Reporting",
        "Cost Reduction Strategies",
        "Financial Decision Support",
        "Business Process Improvements"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 py-24 overflow-hidden">
      {/* Animated gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#4f46e533_0,_transparent_55%),radial-gradient(circle_at_bottom,_#ec489933_0,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b55_1px,transparent_1px),linear-gradient(to_bottom,#02061766_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      </div>

      <div className="relative container mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-indigo-200 uppercase">
            Services
          </span>
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-pink-300 bg-clip-text text-transparent">
              Our Financial Expertise
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-200/85">
            End‑to‑end accounting, auditing, taxation and consulting support designed to keep your business compliant,
            profitable and future‑ready.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-3xl p-[1px] transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02]"
            >
              {/* Outer animated gradient border */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${service.color} opacity-70 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500`}
              />

              {/* Glass card */}
              <div className="relative flex h-full flex-col rounded-3xl bg-slate-900/70 px-8 py-9 shadow-2xl backdrop-blur-2xl border border-slate-700/70">
                {/* Top row: icon + title */}
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${service.color} text-2xl shadow-lg shadow-black/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-50">
                      {service.title}
                    </h3>
                  </div>
                  <span className="hidden text-xs font-medium text-slate-300/80 sm:inline-flex">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>

                {/* Bullet list */}
                <ul className="space-y-3 text-sm sm:text-base text-slate-200/90">
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 transition-colors duration-300 group-hover:text-slate-50"
                    >
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/70 text-[11px] font-bold text-indigo-300 ring-1 ring-indigo-400/50 group-hover:bg-indigo-400 group-hover:text-slate-950">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-500/60 to-transparent group-hover:from-slate-500/60 group-hover:to-slate-500/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
