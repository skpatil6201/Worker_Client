import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

export default function Contact() {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      const parallax = (el: HTMLDivElement | null, force = 14) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const rx = (x - (r.left + r.width / 2)) / r.width;
        const ry = (y - (r.top + r.height / 2)) / r.height;

        el.style.transform = `perspective(1200px) rotateX(${-ry * force}deg) rotateY(${rx * force}deg) translateY(-4px) scale(1.02)`;
      };

      parallax(leftRef.current, 10);
      parallax(rightRef.current, 10);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-24 overflow-hidden">
      {/* Background: gradients + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-cyan-50 to-teal-100/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe80_0,_transparent_55%),radial-gradient(circle_at_bottom,_#ccfbf180_0,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe55_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe55_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-100 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-cyan-700 uppercase">
            Get in touch
          </span>
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Contact S.K. ASSOCIATES
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-700">
            Complete Accounting, Auditing, Taxation and Financial Consulting support. Reach out and the team will get
            back as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact info card */}
          <div
            ref={leftRef}
            className="relative rounded-3xl border border-cyan-200 bg-white/90 px-10 py-12 shadow-xl backdrop-blur-2xl transition-all duration-500"
          >
            {/* Glow border */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-blue-300 via-cyan-300 to-teal-300 opacity-40 blur-2xl" />

            <h2 className="mb-8 text-3xl sm:text-4xl font-bold text-gray-800">
              S.K. ASSOCIATES
            </h2>

            <div className="space-y-8 text-gray-700">
              {/* Email */}
              <div className="flex items-start gap-5 rounded-2xl bg-blue-50 p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-blue-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 ring-1 ring-blue-300">
                  <EnvelopeIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                    Email
                  </h3>
                  <p className="text-lg font-medium text-gray-800">
                    info.skassociates4@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 rounded-2xl bg-teal-50 p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-teal-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 ring-1 ring-teal-300">
                  <PhoneIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                    Phone
                  </h3>
                  <p className="text-lg text-gray-800">9730517424</p>
                  <p className="text-lg text-gray-800">7276469398</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-5 rounded-2xl bg-cyan-50 p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-cyan-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 ring-1 ring-cyan-300">
                  <MapPinIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                    Address
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-800">
                    Teerth Technospace,
                    <br />
                    Baner, Pune – 411045
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5 rounded-2xl bg-indigo-50 p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-indigo-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 ring-1 ring-indigo-300">
                  <ClockIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                    Business Hours
                  </h3>
                  <p className="text-lg text-gray-800">Mon – Sat: 10 AM – 7 PM</p>
                  <p className="text-lg text-gray-800">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Small status pill */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
              Typically responds within 1 business day
            </div>
          </div>

          {/* Form card */}
          <div
            ref={rightRef}
            className="relative rounded-3xl border border-blue-200 bg-white/90 px-10 py-12 shadow-xl backdrop-blur-2xl transition-all duration-500"
          >
            {/* Accent gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-blue-200/40 via-cyan-200/40 to-teal-200/40 opacity-50 blur-2xl" />

            <h2 className="mb-3 text-3xl sm:text-4xl font-bold text-gray-800">
              Send a message
            </h2>
            <p className="mb-8 text-sm sm:text-base text-gray-600">
              Share your requirements and contact details and the team will connect with you for a quick consultation.
            </p>

            <form className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Your contact number"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <select
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Accounting & Bookkeeping</option>
                    <option>Auditing</option>
                    <option>Taxation</option>
                    <option>Financial Consulting</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Share a brief about your requirement..."
                />
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-300/50 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Send Message
                <span className="text-lg transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-500">
              By submitting this form, you agree to be contacted regarding your enquiry. Your details are kept
              confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
