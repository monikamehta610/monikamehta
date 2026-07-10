"use client";

import { useState } from "react";
import { Mail, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      // Simulate form submission
      // To connect to a live backend (e.g. Formspree or Web3Forms), replace this block
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[10%] left-[20%] w-[200px] h-[200px] rounded-full bg-primary/10 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground max-w-xl text-center">
            Have a question about my teaching methodology, want to collaborate on biotechnology research, or hire me? Drop a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Card left side: Info */}
          <div className="md:col-span-5 flex flex-col justify-between p-8 rounded-2xl border border-border bg-card/40 backdrop-blur-sm space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Let&apos;s collaborate
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I am currently based in California, USA and open to new opportunities in science education, research lecturing, and biotech consultation. Feel free to contact me directly.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email item */}
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-xl bg-secondary border border-border text-primary">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Email Me
                  </p>
                  <a
                    href="mailto:monikamehta610@gmail.com"
                    className="text-sm font-semibold hover:text-primary transition-colors break-all"
                  >
                    monikamehta610@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone item */}
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-xl bg-secondary border border-border text-primary">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Call Me
                  </p>
                  <a
                    href="tel:+16692646035"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    +1 (669) 264-6035
                  </a>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground pt-4 border-t border-border/60">
              ⚡ Replying within 24-48 hours.
            </div>
          </div>

          {/* Card right side: Form */}
          <div className="md:col-span-7 p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 h-full animate-fade-in-up">
                <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-foreground">
                  Message Sent!
                </h4>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Thank you for reaching out. I have received your message and will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-xl bg-secondary border border-border text-foreground hover:bg-muted font-semibold transition-all duration-200 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all duration-200 disabled:opacity-50"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all duration-200 disabled:opacity-50"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all duration-200 resize-none disabled:opacity-50"
                      placeholder="Type your message here..."
                      required
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-sm font-semibold text-destructive animate-pulse-slow">
                    ⚠️ {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-all duration-200 shadow-md shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
