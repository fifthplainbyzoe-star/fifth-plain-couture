import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send, User, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Fifth Plain" },
      { name: "description", content: "Get in touch with our atelier for inquiries, custom orders, or client services." },
      { property: "og:title", content: "Contact — Fifth Plain" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-[700px] px-6 py-24 text-center">
        <div className="mx-auto w-16 h-16 rounded-full border border-gold flex items-center justify-center">
          <Send className="w-7 h-7 text-gold" />
        </div>
        <div className="mt-8 text-[10px] uppercase tracking-[0.32em] text-gold">Message Received</div>
        <h1 className="mt-3 font-editorial text-4xl text-ivory">Thank you</h1>
        <p className="mt-6 text-muted-foreground">Our atelier team will respond within 24–48 hours.</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
          className="mt-10 border border-gold text-gold px-8 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-background transition-colors"
        >
          Send Another Message
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 lg:px-12 py-24">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16">
        <div>
          <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Client Services</div>
          <h1 className="mt-3 font-editorial text-4xl md:text-5xl text-ivory">Contact the Atelier</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Whether you have a question about sizing, need guidance on a custom piece, or simply wish to share your experience with our maison — we are here to listen.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">Full Name</label>
                <div className="mt-2 flex items-center border border-border focus-within:border-gold bg-background">
                  <span className="px-4 text-muted-foreground"><User className="w-4 h-4" /></span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="flex-1 bg-transparent px-3 py-3 text-ivory outline-none text-sm"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">Email Address</label>
                <div className="mt-2 flex items-center border border-border focus-within:border-gold bg-background">
                  <span className="px-4 text-muted-foreground"><Mail className="w-4 h-4" /></span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="flex-1 bg-transparent px-3 py-3 text-ivory outline-none text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">Subject</label>
              <div className="mt-2 flex items-center border border-border focus-within:border-gold bg-background">
                <span className="px-4 text-muted-foreground"><MessageSquare className="w-4 h-4" /></span>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="flex-1 bg-transparent px-3 py-3 text-ivory outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-muted-foreground">Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="shipping">Shipping &amp; Delivery</option>
                  <option value="returns">Returns &amp; Exchanges</option>
                  <option value="custom">Custom Order Request</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.28em] text-ivory">Message</label>
              <div className="mt-2 border border-border focus-within:border-gold bg-background">
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent px-4 py-3 text-ivory outline-none text-sm resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-ivory transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="lg:border-l lg:border-border lg:pl-16 space-y-10">
          <div>
            <h3 className="font-display text-sm tracking-[0.28em] text-ivory">ATELIER</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Fifth Plain is headquartered in Johannesburg, South Africa. Our atelier operates by appointment only, ensuring each piece receives the attention it deserves.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm tracking-[0.28em] text-ivory">EMAIL</h3>
            <a href="mailto:atelier@fifthplain.com" className="mt-4 block text-sm text-gold hover:text-ivory transition-colors">
              atelier@fifthplain.com
            </a>
          </div>

          <div>
            <h3 className="font-display text-sm tracking-[0.28em] text-ivory">RESPONSE TIME</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Monday – Friday<br />
              Within 24–48 hours
            </p>
          </div>

          <div className="pt-6 border-t border-border">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-gold">THE PLOT</h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Subscribe to receive notifications about new arrivals, restocks, and exclusive updates from the maison.
            </p>
            <form className="mt-4 flex border-b border-border focus-within:border-gold transition-colors">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="text-[11px] uppercase tracking-[0.22em] text-gold">Join →</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
