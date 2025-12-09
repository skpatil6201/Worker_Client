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
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-700 uppercase">
            Services
          </span>
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Our Financial Expertise
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
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
              {/* Glass card */}
              <div className="relative flex h-full flex-col rounded-xl bg-white px-8 py-8 shadow-md border border-gray-200 group-hover:shadow-xl transition-all duration-300">
                {/* Top row: icon + title */}
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-2xl shadow-sm group-hover:scale-105 transition-all duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                {/* Bullet list */}
                <ul className="space-y-3 text-base text-gray-600">
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                    >
                      <svg className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
