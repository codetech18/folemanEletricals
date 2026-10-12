import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProblemSection } from "./components/ProblemSection";
import { Hero } from "./components/Hero";
import { ServicesSection } from "./components/ServicesSection";
import { StatsSection } from "./components/StatsSection";
import { ProcessSection } from "./components/ProcessSection";
import { ContactSection } from "./components/ContactSection";
const About = lazy(() =>
  import("./pages/About").then((m) => ({ default: m.About })),
);
const Works = lazy(() =>
  import("./pages/Works").then((m) => ({ default: m.Works })),
);
function PageContext() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Electrical installation & repairs in Lagos",
      "/about": "About Foleman & our founder",
      "/works": "Our electrical work",
    };
    document.title = `${titles[pathname] || "Page not found"} | Foleman Electricals`;
    const descriptions: Record<string, string> = {
      "/": "Foleman Electricals provides electrical installation, maintenance, repairs, testing and troubleshooting in Lagos. Speak with us about your project.",
      "/about":
        "Meet Israel Emmanuel O., founder and Managing Director of Foleman Electricals, and discover our approach to electrical work.",
      "/works":
        "Explore installation and lighting photographs from Foleman Electricals.",
    };
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        descriptions[pathname] || "Foleman Electricals, Lagos.",
      );
    window.scrollTo(0, 0);
    if (hash) {
      const frame = requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname, hash]);
  return null;
}
function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <StatsSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <PageContext />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <Suspense
        fallback={
          <main id="main-content" className="route-loading" aria-live="polite">
            Loading page…
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route
            path="*"
            element={
              <main id="main-content" className="route-loading">
                <h1>Page not found</h1>
                <Link to="/">Return home ↗</Link>
              </main>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
