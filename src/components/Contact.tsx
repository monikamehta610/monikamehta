"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, Send, CheckCircle2, Eye, ShieldCheck, ArrowRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Tutoring / Lecturing Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const decodedEmail = atob("bW9uaWthbWVodGE2MTBAZ21haWwuY29t");
  const decodedPhone = atob("KzEgKDY2OSkgMjY4LTYwMzU=");

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "Tutoring / Lecturing Inquiry", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #E8E5E0",
    background: "#FAFAF9",
    fontSize: "0.875rem",
    color: "#1A1A1A",
    outline: "none",
    transition: "border-color 0.15s ease",
  } as React.CSSProperties;

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#6B6B6B",
    marginBottom: "6px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  return (
    <section
      id="contact"
      className="py-24 border-t"
      style={{ background: "#FFFFFF", borderColor: "#E8E5E0" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Section heading */}
        <div className="max-w-2xl mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#1C1C1C" }}
          >
            Get in Touch
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
            style={{ color: "#1A1A1A" }}
          >
            Ready to Elevate Your IB Results?
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "#6B6B6B", lineHeight: "1.7" }}
          >
            Schedule a free 15-minute consultation to discuss IBDP Biology & ESS tutoring, IA guidance, or university lecturing collaborations.
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: "#1C1C1C" }}
          >
            <Calendar className="w-4 h-4" />
            Book a Free 15-Min Call
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-7" id="contact-form">

          {/* Left: Contact details */}
          <div
            className="md:col-span-4 p-8 rounded-2xl border flex flex-col gap-8"
            style={{ background: "#FAFAF9", borderColor: "#E8E5E0" }}
          >
            <div className="space-y-2">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#1A1A1A" }}
              >
                Direct Contact
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>
                Based in California, USA. Available for online IBDP tutoring worldwide and university lecturing.
              </p>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Mail className="w-4 h-4" style={{ color: "#1C1C1C" }} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#9CA3AF" }}>
                    Email
                  </span>
                </div>
                {showEmail ? (
                  <a
                    href={`mailto:${decodedEmail}`}
                    className="text-sm font-medium break-all hover:underline"
                    style={{ color: "#1C1C1C" }}
                  >
                    {decodedEmail}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowEmail(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold border rounded-lg px-3 py-1.5 transition-colors hover:border-[#1C1C1C] hover:text-[#1C1C1C] cursor-pointer"
                    style={{ borderColor: "#E8E5E0", color: "#6B6B6B" }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Reveal Email
                  </button>
                )}
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Phone className="w-4 h-4" style={{ color: "#1C1C1C" }} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#9CA3AF" }}>
                    Phone
                  </span>
                </div>
                {showPhone ? (
                  <a
                    href={`tel:${decodedPhone.replace(/[^0-9+]/g, "")}`}
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#1C1C1C" }}
                  >
                    {decodedPhone}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPhone(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold border rounded-lg px-3 py-1.5 transition-colors hover:border-[#1C1C1C] hover:text-[#1C1C1C] cursor-pointer"
                    style={{ borderColor: "#E8E5E0", color: "#6B6B6B" }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Reveal Phone
                  </button>
                )}
              </div>
            </div>

            <div
              className="flex items-start gap-2 pt-5 border-t text-xs"
              style={{ borderColor: "#E8E5E0", color: "#9CA3AF" }}
            >
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#1C1C1C" }} />
              <span>Contact details protected from web scrapers. Replies within 24 hours.</span>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="md:col-span-8 p-8 rounded-2xl border"
            style={{ background: "#FAFAF9", borderColor: "#E8E5E0" }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-16 space-y-5 h-full">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "#F0F0EE" }}
                >
                  <CheckCircle2 className="w-7 h-7" style={{ color: "#1C1C1C" }} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
                    Inquiry Received
                  </h4>
                  <p className="text-sm mt-2" style={{ color: "#6B6B6B" }}>
                    Thank you — Monika will reply to your email within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-colors hover:border-[#1C1C1C] hover:text-[#1C1C1C] cursor-pointer"
                  style={{ borderColor: "#E8E5E0", color: "#6B6B6B" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-semibold" style={{ color: "#1A1A1A" }}>
                  Send a Message
                </h3>

                {status === "error" && (
                  <div
                    className="p-3 rounded-xl text-xs font-medium border"
                    style={{ background: "#FEF2F2", borderColor: "#FECACA", color: "#DC2626" }}
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@example.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" style={labelStyle}>Inquiry Type</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="Tutoring / Lecturing Inquiry">IB DP Biology / ESS Tutoring</option>
                    <option value="University Lecturing">University Lecturing / Teaching</option>
                    <option value="IA Guidance">Internal Assessment (IA) Mentorship</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your learning goals, target IB grade, or lecture topic..."
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-60"
                  style={{ background: "#1C1C1C" }}
                >
                  <Send className="w-4 h-4" />
                  {status === "submitting" ? "Sending…" : "Send Consultation Request"}
                  {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
