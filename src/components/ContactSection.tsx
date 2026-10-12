import { useState, type FormEvent } from "react";
import { contact } from "../utils/brand";
export function ContactSection() {
  const [opened, setOpened] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Hello Foleman, I'd like to discuss a project.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nService: ${data.get("service")}\nLocation: ${data.get("location")}\n\n${data.get("message")}`;
    window.open(
      `${contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setOpened(true);
  }
  return (
    <section id="contact" className="contact-section">
      <div className="content-width contact-grid">
        <div>
          <p className="eyebrow">LET’S TALK</p>
          <h2>
            What needs
            <br />
            <span>power?</span>
          </h2>
          <p>
            Tell us about your installation, repair or electrical fault. We’ll
            discuss the next step with you.
          </p>
          <a className="contact-phone" href={`tel:${contact.phone}`}>
            {contact.phoneDisplay}
          </a>
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <a
            className="button-text"
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Message us on WhatsApp ↗
          </a>
        </div>
        <form className="enquiry-form" onSubmit={submit}>
          <div className="form-grid">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Full name"
              />
            </label>
            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={40}
                placeholder="+234…"
              />
            </label>
            <label>
              Service
              <select name="service">
                <option>Electrical installation</option>
                <option>Maintenance & repairs</option>
                <option>Testing & troubleshooting</option>
                <option>Something else</option>
              </select>
            </label>
            <label>
              Project location
              <input
                name="location"
                autoComplete="address-level2"
                required
                maxLength={160}
                placeholder="Area / city"
              />
            </label>
          </div>
          <label>
            Tell us about the work
            <textarea
              name="message"
              required
              maxLength={2000}
              placeholder="What do you need help with?"
              rows={4}
            />
          </label>
          <button className="button-primary" type="submit">
            Continue on WhatsApp ↗
          </button>
          <p className="form-note">
            Your details open in WhatsApp. Review the message and send it there.
          </p>
          {opened && (
            <p className="form-status" role="status">
              Complete your enquiry in WhatsApp. If it didn’t open,{" "}
              <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                message us directly
              </a>{" "}
              or call {contact.phoneDisplay}.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
