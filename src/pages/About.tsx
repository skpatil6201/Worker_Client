export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative mt-32 h-64 w-full md:h-80">
        <img 
          src="/img1.jpeg" 
          alt="About S.K. Associates"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">About Us</h1>
            <p className="text-lg sm:text-xl">Your Success, Our Expertise</p>
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-16">
        {/* Welcome Section */}
        <div className="mx-auto mb-16 max-w-3xl">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-lg transition hover:shadow-xl hover:-translate-y-1 sm:p-8">
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
              About S.K. ASSOCIATES
            </h2>
            <p className="text-center text-base leading-relaxed text-gray-600 mb-6">
              S.K. ASSOCIATES is a specialised tax consultancy and accounting firm helping businesses across India
              outsource accounting, audits, taxation and financial staffing with confidence and clarity.
            </p>
            
            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 text-center sm:grid-cols-3">
              <div>
                <p className="text-2xl font-bold text-green-600">2019</p>
                <p className="text-xs text-gray-500">Year founded</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">PAN</p>
                <p className="text-xs text-gray-500">India presence</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">24/7</p>
                <p className="text-xs text-gray-500">Process focus</p>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-gray-600">
              Founded by <span className="font-semibold">Pradip Thorat</span> under{" "}
              <span className="font-semibold">Shree Kotling Industries</span>.
            </p>
          </div>
        </div>

        {/* Company overview */}
        <div className="mx-auto mb-16 max-w-4xl">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg transition hover:shadow-xl hover:-translate-y-1">
            <div className="text-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg mx-auto mb-4">
                <span className="text-lg font-bold">SK</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Company Overview
              </h2>
            </div>
            <p className="text-center text-base leading-relaxed text-gray-600">
              S K ASSOCIATES is a professional tax consultancy and accounting firm established in 2019 by Pradip
              Thorat under the parent company Shree Kotling Industries. The firm specializes in outsourced
              accounting, auditing, taxation, and financial staffing services across India, with a strong focus on
              accuracy and reliability. The core objective is to build transparent, efficient financial processes so
              businesses can scale without operational bottlenecks.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg transition hover:shadow-xl hover:-translate-y-1">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg mx-auto mb-4">
                🎯
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mission
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                To deliver accurate, reliable and technology‑driven accounting, auditing and taxation solutions that
                allow businesses to grow with confidence. The firm focuses on simplifying financial complexities and
                ensuring full compliance through transparent, structured workflows.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg transition hover:shadow-xl hover:-translate-y-1">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg mx-auto mb-4">
                🌐
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Vision
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                To be recognised as one of India&apos;s most trusted and client‑centric consultancy partners for
                outsourced accounting, auditing, taxation and financial staffing, known for dependable delivery and
                long‑term relationships.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose S.K. ASSOCIATES
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-12">
            A blend of domain expertise, process‑driven execution, and scalable staffing support tailored for
            growing businesses.
          </p>

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
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg transition hover:shadow-xl hover:-translate-y-1"
              >
                <div className="text-center">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
