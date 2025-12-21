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
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-80 mt-20">
        <img 
          src="/img1.jpeg" 
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl">Get in Touch with Our Expert Team</p>
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact info card */}
          <div
            ref={leftRef}
            className="relative rounded-xl border border-gray-200 bg-white px-10 py-12 shadow-md transition-all duration-500"
          >
            <h2 className="mb-8 text-3xl sm:text-4xl font-bold text-gray-900">
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
            className="relative rounded-xl border border-gray-200 bg-white px-10 py-12 shadow-md transition-all duration-500"
          >
            <h2 className="mb-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Send a message
            </h2>
            <p className="mb-8 text-base text-gray-600">
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
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:-translate-y-0.5"
              >
                Send Message
                <span className="transition-transform group-hover:translate-x-1">
                  →
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
