import { Link } from "react-router-dom";
import portrait from "../assets/company/israel-emmanuel.jpg";
import lighting from "../assets/works/IMG_1508.JPG";
import { contact } from "../utils/brand";
const services = [
  [
    "01",
    "Installation",
    "Wiring, sockets, switches, lighting systems and circuit breakers.",
  ],
  [
    "02",
    "Maintenance & repairs",
    "Inspection of electrical systems for faults or hazards, with repairs where needed.",
  ],
  [
    "03",
    "Testing & troubleshooting",
    "Diagnosis of electrical problems and power failures, including circuit, voltage and load testing.",
  ],
];
export function About() {
  return (
    <main id="main-content" className="about-page">
      <section className="about-hero">
        <div className="content-width">
          <p className="eyebrow">ABOUT FOLEMAN / THE COMPANY & THE PEOPLE</p>
          <h1>
            Behind every light.
            <br />
            <span>A human touch.</span>
          </h1>
          <div className="about-hero-bottom">
            <p>
              Electrical work is personal. It’s your home, your business and the
              people who use it every day.
            </p>
            <span>
              LAGOS, NIGERIA
              <br />
              FOLEMAN ELECTRICALS
            </span>
          </div>
        </div>
        <div className="about-rule" />
      </section>
      <section className="about-story">
        <div className="content-width story-grid">
          <p className="eyebrow">01 / OUR COMPANY</p>
          <div>
            <h2>
              Practical expertise.
              <br />
              Personal attention.
            </h2>
            <p className="story-lead">
              Foleman Electricals specialises in electrical installation,
              maintenance, repairs, testing and troubleshooting.
            </p>
            <p>
              Based in Lagos and led by Israel Emmanuel O., the company works on
              the electrical systems that support everyday life—from lighting
              and sockets to circuit breakers and fault diagnosis.
            </p>
            <p>
              Whether you’re planning an installation or dealing with a system
              that needs attention, the first step is a conversation about what
              you need.
            </p>
            <Link to="/#contact" className="button-text">
              Let’s discuss your project →
            </Link>
          </div>
        </div>
      </section>
      <section className="founder-section">
        <div className="content-width founder-grid">
          <div className="founder-portrait">
            <img
              src={portrait}
              alt="Israel Emmanuel O., founder and Managing Director of Foleman Electricals"
              loading="lazy"
            />
            <div className="portrait-tag">
              THE PERSON BEHIND FOLEMAN <span>↗</span>
            </div>
          </div>
          <div className="founder-copy">
            <p className="eyebrow">02 / MEET THE FOUNDER</p>
            <h2>
              Israel
              <br />
              Emmanuel O.
            </h2>
            <p className="founder-role">Founder & Managing Director</p>
            <div className="founder-divider" />
            <p>
              Meet the person behind Foleman Electricals. Israel leads the
              company’s work across installation, maintenance, repairs and
              electrical troubleshooting.
            </p>
            <p>
              From a new installation to a fault that needs attention, a
              conversation with Foleman starts with your space, your needs and
              the work ahead.
            </p>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              Talk to Foleman ↗
            </a>
          </div>
        </div>
      </section>
      <section className="about-services">
        <div className="content-width">
          <div className="section-heading">
            <p className="eyebrow">03 / WHAT WE DO</p>
            <h2>
              From a single fault
              <br />
              to a fresh installation.
            </h2>
          </div>
          <div className="about-service-list">
            {services.map(([n, title, description]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-work">
        <div className="content-width about-work-grid">
          <div>
            <p className="eyebrow">SEE THE WORK</p>
            <h2>
              The details
              <br />
              tell the story.
            </h2>
            <p>
              Explore photographs and videos from our electrical and lighting
              work.
            </p>
            <Link to="/works" className="button-primary">
              View our work ↗
            </Link>
          </div>
          <img
            src={lighting}
            alt="Warm ceiling lighting and recessed spotlights"
            loading="lazy"
          />
        </div>
      </section>
      <section className="about-cta">
        <div className="content-width">
          <p className="eyebrow">YOUR NEXT PROJECT</p>
          <h2>
            Let’s get
            <br />
            it working.
          </h2>
          <Link to="/#contact" className="button-dark">
            Start a conversation ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
