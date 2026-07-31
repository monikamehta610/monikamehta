"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, Send, CheckCircle2, Eye, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Tutoring / Lecturing Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Scraper protection: Obfuscate email & phone in JS state
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Decoded values (base64 encoded originally in source to prevent scraping)
  const decodedEmail = atob("bW9uaWthbWVodGE2MTBAZ21haWwuY29t"); // monikamehta610@gmail.com
  const decodedPhone = atob("KzEgKDY2OSkgMjY0LTYwMzU="); // +1 (669) 264-6035

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      // Form submission simulation
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus("success");
      setFormData({ name: "", email: "", subject: "Tutoring / Lecturing Inquiry", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Strong Call To Action */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            Direct Consultation &amp; Tutoring Booking
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Ready to Elevate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Science Results?
            </span>
          </h2>
          <p className="text-slate-600 max-w-xl text-center text-sm sm:text-base leading-relaxed">
            Schedule a free 15-minute consultation to discuss IB DP Biology &amp; ESS tutoring, Internal Assessment guidance, or university lecturing collaborations.
          </p>

          {/* Quick Action Button: Book Call */}
          <div className="pt-2">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md shadow-indigo-500/20 hover:scale-[1.02] transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book a Free 15-Min Intro Call
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch" id="contact-form">
          {/* Card left side: Protected Contact Details */}
          <div className="md:col-span-5 flex flex-col justify-between p-8 rounded-3xl border border-slate-200 bg-slate-50/70 space-y-8 shadow-xs">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Direct Contact &amp; Inquiries
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Based in California, USA. Available for online IBDP tutoring worldwide, university research lecturing, and educational curriculum design.
              </p>
            </div>

            <div className="space-y-6">
              {/* Protected Email */}
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-xl bg-white border border-slate-200 text-indigo-600 shadow-xs">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Email Address
                  </p>
                  {showEmail ? (
                    <a
                      href={`mailto:${decodedEmail}`}
                      className="text-sm font-bold text-indigo-600 hover:underline break-all"
                    >
                      {decodedEmail}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowEmail(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer mt-0.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-600" />
                      Click to Reveal Email
                    </button>
                  )}
                </div>
              </div>

              {/* Protected Phone */}
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-xl bg-white border border-slate-200 text-emerald-600 shadow-xs">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Direct Phone
                  </p>
                  {showPhone ? (
                    <a
                      href={`tel:${decodedPhone.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-bold text-emerald-600 hover:underline"
                    >
                      {decodedPhone}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowPhone(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer mt-0.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      Click to Reveal Phone
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-4 border-t border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Contact details protected from web scrapers. Replying within 24 hours.</span>
            </div>
          </div>

          {/* Card right side: Primary Contact Form */}
          <div className="md:col-span-7 p-8 rounded-3xl border border-slate-200 bg-white shadow-md">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 h-full">
                <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-slate-900">
                  Inquiry Received!
                </h4>
                <p className="text-sm text-slate-600 max-w-sm">
                  Thank you for booking your consultation request. Monika will reply to your email within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Send a Consultation Message
                </h3>

                {status === "error" && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Inquiry Type
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                  >
                    <option value="Tutoring / Lecturing Inquiry">IB DP Biology / ESS Tutoring</option>
                    <option value="University Lecturing">University Lecturing / Teaching</option>
                    <option value="IA Guidance">Internal Assessment (IA) Mentorship</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Message / Goal Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your learning goals, target IB grade, or lecture topic..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {status === "submitting" ? "Sending Request..." : "Send Consultation Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
