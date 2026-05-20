import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Works } from "./pages/Works";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { PageLoader } from "./components/PageLoader";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { ServicesSection } from "./components/ServicesSection";
import { StatsSection } from "./components/StatsSection";
import { ProcessSection } from "./components/ProcessSection";
import { ContactSection } from "./components/ContactSection";
import { useLenis } from "./hooks/useLenis";
import { useScrollTriggerRefresh } from "./hooks/useScrollTrigger";

function Home() {
  return (
    <main>
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
  useLenis();
  useScrollTriggerRefresh();

  return (
    <BrowserRouter>
      <PageLoader />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
      </Routes>
    </BrowserRouter>
  );
}
