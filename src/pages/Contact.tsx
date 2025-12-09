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
    <div className="relative min-h-screen bg-slate-950 py-24 overflow-hidden">
      {/* Background: gradients + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#6366f133_0,_transparent_55%),radial-gradient(circle_at_bottom,_#ec489933_0,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b55_1px,transparent_1px),linear-gradient(to_bottom,#02061766_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-indigo-200 uppercase">
            Get in touch
          </span>
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-pink-300 bg-clip-text text-transparent">
              Contact S.K. ASSOCIATES
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-200/85">
            Complete Accounting, Auditing, Taxation and Financial Consulting support. Reach out and the team will get
            back as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact info card */}
          <div
            ref={leftRef}
            className="relative rounded-3xl border border-slate-700/70 bg-slate-900/70 px-10 py-12 shadow-2xl backdrop-blur-2xl transition-all duration-500"
          >
            {/* Glow border */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-60 blur-2xl" />

            <h2 className="mb-8 text-3xl sm:text-4xl font-bold text-slate-50">
              S.K. ASSOCIATES
            </h2>

            <div className="space-y-8 text-slate-100/90">
              {/* Email */}
              <div className="flex items-start gap-5 rounded-2xl bg-slate-900/60 p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-900/90">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/40">
                  <EnvelopeIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Email
                  </h3>
                  <p className="text-lg font-medium text-slate-50">
                    info.skassociates4@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 rounded-2xl bg-slate-900/60 p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-900/90">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40">
                  <PhoneIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Phone
                  </h3>
                  <p className="text-lg text-slate-50">9730517424</p>
                  <p className="text-lg text-slate-50">7276469398</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-5 rounded-2xl bg-slate-900/60 p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-900/90">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/40">
                  <MapPinIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Address
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-50">
                    Teerth Technospace,
                    <br />
                    Baner, Pune – 411045
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5 rounded-2xl bg-slate-900/60 p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-900/90">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/15 text-pink-300 ring-1 ring-pink-400/40">
                  <ClockIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Business Hours
                  </h3>
                  <p className="text-lg text-slate-50">Mon – Sat: 10 AM – 7 PM</p>
                  <p className="text-lg text-slate-50">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Small status pill */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Typically responds within 1 business day
            </div>
          </div>

          {/* Form card */}
          <div
            ref={rightRef}
            className="relative rounded-3xl border border-slate-700/70 bg-slate-900/60 px-10 py-12 shadow-2xl backdrop-blur-2xl transition-all duration-500"
          >
            {/* Accent gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-purple-500/40 via-indigo-500/10 to-sky-500/40 opacity-70 blur-2xl" />

            <h2 className="mb-3 text-3xl sm:text-4xl font-bold text-slate-50">
              Send a message
            </h2>
            <p className="mb-8 text-sm sm:text-base text-slate-300">
              Share your requirements and contact details and the team will connect with you for a quick consultation.
            </p>

            <form className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-md outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-md outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-md outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Your contact number"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Service Type
                  </label>
                  <select
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-md outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50"
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
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-md outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Share a brief about your requirement..."
                />
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-indigo-500/40 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Send Message
                <span className="text-lg transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-400">
              By submitting this form, you agree to be contacted regarding your enquiry. Your details are kept
              confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
