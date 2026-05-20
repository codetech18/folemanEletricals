import { useEffect, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { PageLoader } from './components/PageLoader';
import { ProblemSection } from './components/ProblemSection';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { useLenis } from './hooks/useLenis';
import { useScrollTriggerRefresh } from './hooks/useScrollTrigger';
import { Works } from './pages/Works';

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  useLenis();
  useScrollTriggerRefresh();

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  const isWorksPage = pathname === '/works';

  return (
    <>
      <PageLoader />
      {isWorksPage ? null : <CustomCursor />}
      <Navbar />
      {isWorksPage ? (
        <Works />
      ) : (
        <main>
          <Hero />
          <ProblemSection />
          <ServicesSection />
          <StatsSection />
          <ProcessSection />
          <ContactSection />
        </main>
      )}
    </>
  );
}
