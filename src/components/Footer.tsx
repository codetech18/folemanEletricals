import { Link } from "react-router-dom";
import { contact, LogoMark } from "../utils/brand";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-width footer-grid">
        <Link to="/" className="brand-lockup">
          <LogoMark />
          <span>
            FOLEMAN<small>ELECTRICALS</small>
          </span>
        </Link>
        <p>
          Installation. Maintenance. Peace of mind.
          <br />
          <span>Lagos, Nigeria.</span>
        </p>
        <div className="footer-links">
          <Link to="/about">About us</Link>
          <Link to="/works">Our work</Link>
          <a href={`tel:${contact.phone}`}>Call Foleman</a>
          <a href={contact.instagramUrl} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </div>
      </div>
      <div className="content-width footer-bottom">
        <span>© {new Date().getFullYear()} Foleman Electricals</span>
        <span>Led by Israel Emmanuel O.</span>
      </div>
    </footer>
  );
}
