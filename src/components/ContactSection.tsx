import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { contact, LogoMark } from "../utils/brand";

gsap.registerPlugin(ScrollTrigger);

const fields = ["Name", "Phone"];

export function ContactSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-copy, .contact-form", {
        y: 54,
        opacity: 0,
        duration: 0.85,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 65%" },
      });
    },
    { scope },
  );

  return (
    <section
      id="contact"
      ref={scope}
      className="section-shell noise relative bg-[#080808] px-5 py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="contact-copy">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.34em] text-foleman-yellow">
            Contact
          </p>
          <h2 className="font-display text-7xl leading-none text-white md:text-9xl">
            Let&apos;s Talk Power
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">
            Book Foleman Electricals for installation, maintenance, repairs,
            testing, and troubleshooting in Lagos or anywhere your project needs
            reliable power.
          </p>
          <div className="mt-10 space-y-4 text-white/74">
            <p>
              <span className="text-foleman-yellow">Phone:</span>{" "}
              {contact.phoneDisplay}
            </p>
            <p>
              <span className="text-foleman-yellow">Email:</span>{" "}
              <a className="hover:text-white" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
            <p>
              <span className="text-foleman-yellow">Social:</span>{" "}
              {contact.instagram}
            </p>
          </div>
          <a
            href={contact.whatsapp}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-bold text-black transition hover:scale-[1.03]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16 3a12.8 12.8 0 0 0-11 19.4L3.8 29l6.8-1.8A12.9 12.9 0 1 0 16 3Zm0 23.4c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4 1.1 1.1-3.9-.3-.4A10.4 10.4 0 1 1 16 26.4Zm5.8-7.8c-.3-.2-1.9-1-2.2-1.1s-.5-.2-.8.2c-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.8.1a8.5 8.5 0 0 1-4.2-3.7c-.3-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7s-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.3.3-1.3 1.3-1.3 3.1s1.4 3.6 1.5 3.8c.2.3 2.7 4.1 6.5 5.7.9.4 1.6.6 2.2.8.9.3 1.7.2 2.4.1.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.7-.5Z" />
            </svg>
            WhatsApp Foleman
          </a>
        </div>
        <form className="contact-form rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-inner-line backdrop-blur-xl md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field} className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-white/54">
                  {field}
                </span>
                <input
                  className="w-full rounded-md border border-white/10 bg-black/50 px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-foleman-yellow"
                  placeholder={field === "Phone" ? "+234" : "Israel Emmanuel"}
                  type={field === "Phone" ? "tel" : "text"}
                />
              </label>
            ))}
          </div>
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-white/54">
              Service Type
            </span>
            <select className="w-full rounded-md border border-white/10 bg-black/50 px-4 py-4 text-white outline-none transition focus:border-foleman-yellow">
              <option>Electrical installation</option>
              <option>Maintenance & repairs</option>
              <option>Testing & troubleshooting</option>
              <option>Industrial electrical project</option>
            </select>
          </label>
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-white/54">
              Message
            </span>
            <textarea
              className="min-h-40 w-full resize-none rounded-md border border-white/10 bg-black/50 px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-foleman-yellow"
              placeholder="Tell us what needs power, repair, testing, or installation."
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-foleman-yellow px-8 py-4 font-bold text-black shadow-glow transition hover:scale-[1.01]"
          >
            Send Request
          </button>
        </form>
      </div>
      <footer className="relative z-10 mx-auto mt-20 flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-8 w-8 text-foleman-yellow" />
          <span>Foleman Electricals © 2025 · Lagos, Nigeria</span>
        </div>
        <span>Run by Israel Emmanuel O., Managing Director</span>
        <span>TIN:1070427032</span>
      </footer>
    </section>
  );
}
