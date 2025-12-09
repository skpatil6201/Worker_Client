export default function Features() {
  const services = [
    {
      title: "Outsourced Accounting",
      color: "from-blue-400 via-cyan-400 to-teal-400",
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
      color: "from-cyan-400 via-sky-400 to-blue-400",
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
      color: "from-teal-400 via-emerald-400 to-green-400",
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
      color: "from-sky-400 via-blue-400 to-indigo-400",
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
    <div className="relative min-h-screen bg-gray-50 py-24 overflow-hidden">

      <div className="relative container mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-100 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-cyan-700 uppercase">
            Services
          </span>
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Our Financial Expertise
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-700">
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
                className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${service.color} opacity-40 blur-xl group-hover:opacity-60 group-hover:blur-2xl transition-all duration-500`}
              />

              {/* Glass card */}
              <div className="relative flex h-full flex-col rounded-3xl bg-white/90 px-8 py-9 shadow-xl backdrop-blur-2xl border border-cyan-200">
                {/* Top row: icon + title */}
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${service.color} text-2xl shadow-lg shadow-black/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {service.title}
                    </h3>
                  </div>
                  <span className="hidden text-xs font-medium text-gray-500 sm:inline-flex">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>

                {/* Bullet list */}
                <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 transition-colors duration-300 group-hover:text-gray-900"
                    >
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-100 text-[11px] font-bold text-cyan-600 ring-1 ring-cyan-300 group-hover:bg-cyan-400 group-hover:text-white">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent group-hover:from-cyan-400 group-hover:to-cyan-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
