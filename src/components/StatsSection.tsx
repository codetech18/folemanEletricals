import { Link } from "react-router-dom";
export function StatsSection() {
  return (
    <section className="company-intro">
      <div className="content-width company-intro-grid">
        <p className="eyebrow">THE PEOPLE BEHIND THE POWER</p>
        <div>
          <h2>
            Good work starts
            <br />
            with people who care.
          </h2>
          <p>
            Foleman Electricals is led by Israel Emmanuel O. From installing
            lighting to diagnosing electrical faults, our services cover the
            practical needs of homes and businesses.
          </p>
          <Link className="button-text" to="/about">
            Meet Foleman →
          </Link>
        </div>
      </div>
    </section>
  );
}
